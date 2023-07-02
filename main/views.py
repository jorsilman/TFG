from django.http import JsonResponse
from django.shortcuts import render
from django.urls import path
from rest_framework import generics
from rest_framework.decorators import api_view
from main.models import *
from main.populateDB import populate
from .serializers import EventsSerializer, TeamsSerializer, MatchesSerializer, PlayersSerializer
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.views import View
from django.views.generic import CreateView, ListView
from django.http import JsonResponse
from .models import Configuracion

from django.db.models import Q

from main import serializers

from django.contrib.auth import login, authenticate
from django.views import View



# ======= CONFIGURACIÓN =======


@csrf_exempt
def configuracion(request):
    if request.method == "POST":
        nombre = request.POST.get('nombre')
        num_columns = request.POST.get('num_columns')
        graficas_seleccionadas = request.POST.get('graficas_seleccionadas')
        wyId = request.POST.get('wyId')
        tipo = request.POST.get('tipo')
        print(nombre, num_columns, graficas_seleccionadas, wyId, tipo)
        if not nombre or not num_columns or not graficas_seleccionadas or not wyId or not tipo:
            return JsonResponse({'message': 'Por favor, completa todos los campos'}, status=400)
        
        try:
            configuracion = Configuracion.objects.create(nombre=nombre, num_columns=num_columns, graficas_seleccionadas=graficas_seleccionadas, wyId=wyId, tipo=tipo)
            configuracion.save()
            return JsonResponse({'message': 'Configuración creada exitosamente'})
        except Exception as e:
            return JsonResponse({'message': 'Error en la creación de la configuración: {}'.format(str(e))}, status=400)
    elif  request.method == "GET":
        configuraciones = Configuracion.objects.all().values('id','nombre', 'num_columns', 'graficas_seleccionadas', 'wyId', 'tipo')
        return JsonResponse({'configuraciones': list(configuraciones)})
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)

 
    
@csrf_exempt
def get_configuracion(request, id):
    configuracion = Configuracion.objects.get(id=id)
    id = configuracion.id
    nombre = configuracion.nombre
    num_columns = configuracion.num_columns
    graficas_seleccionadas = configuracion.graficas_seleccionadas
    wyId = configuracion.wyId
    tipo = configuracion.tipo
    data = {
        'id': id,
        'nombre': nombre,
        'num_columns': num_columns,
        'graficas_seleccionadas': graficas_seleccionadas,
        'wyId': wyId,
        'tipo': tipo
    }
    return JsonResponse(data)
    
@csrf_exempt
def delete_configuracion(request, id):
    if request.method == "DELETE":
        configuracion = Configuracion.objects.filter(id=id)
        configuracion.delete()
        return JsonResponse({'message': 'Configuración eliminada exitosamente'})
    else:
        return JsonResponse({'message': 'Método no permitido'}, status=405)
    




# ======= EQUIPOS =======
class TeamList(generics.ListAPIView):
    queryset = Teams.objects.all()
    serializer_class = TeamsSerializer

@csrf_exempt
def get_team(request, team_id):
    team = Teams.objects.get(wyId=team_id)
    officialName = team.officialName
    data = {
        'officialName': officialName
    }
    return JsonResponse(data)

class EventsList(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        return Events.objects.filter(teamId=team_id, eventName = "Shot")
    
class GoalTeamEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        GoalTeamEvents = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=101) & ~Q(playerId__roleId__roleId=9))
        
        return GoalTeamEvents
    
class FoulTeamEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        events = Events.objects.filter(teamId=team_id, eventName = "Foul")
        return events

class AssistTeamEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        AssistTeamEvents = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=301))
        return AssistTeamEvents

class FreeKickTeamEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        team_id = self.kwargs['team_id']
        FreeKickTeamEvents = Events.objects.filter(teamId=team_id, eventName = "Free Kick")
        return FreeKickTeamEvents

#DATOS PROCESADOS GRÁFICAS

@csrf_exempt
def topGoleadores(request, team_id):
    # events = Events.objects.filter(Q(teamId=team_id) & (Q(eventName="Shot") | Q(eventName="Free Kick") | Q(eventName="Pass")) & Q(tags__id=101))
    #eventos con tag 101 y que no tenga tag 102
    events = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
    goleadores = {}
    for event in events:
        if event.playerId.roleId.roleId !=9:
            if event.playerId.wyId in goleadores:
                goleadores[event.playerId.wyId] += 1
            else:
                goleadores[event.playerId.wyId] = 1
    goleadores = sorted(goleadores.items(), key=lambda x: x[1], reverse=True)
    goleadores = goleadores[:5]
    data = []
    for goleador in goleadores:
        try:
            player = Players.objects.get(wyId=goleador[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "goles": goleador[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

@csrf_exempt
def topAsistentes(request, team_id):
    events = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=301))
    asistentes = {}
    for event in events:
        if event.playerId.wyId in asistentes:
            asistentes[event.playerId.wyId] += 1
        else:
            asistentes[event.playerId.wyId] = 1
    asistentes = sorted(asistentes.items(), key=lambda x: x[1], reverse=True)
    asistentes = asistentes[:5]
    data = []
    for asistente in asistentes:
        try:
            player = Players.objects.get(wyId=asistente[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "asistencias": asistente[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

@csrf_exempt
def golesPorMinuto(request, team_id):
    events = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
    minutos = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    for event in events:
        if (event.matchPeriod == "1H" or event.matchPeriod == "2H" or event.matchPeriod == "E1" or event.matchPeriod == "E2"):
            min = event.eventSec / 60
            if event.matchPeriod == "1H":
                if 0<= min < 10:
                    minutos["0-10"] += 1
                elif min < 20:
                    minutos["10-20"] += 1
                elif min < 30:
                    minutos["20-30"] += 1
                elif min < 40:
                    minutos["30-40"] += 1
                elif min < 50:
                    minutos["40-50"] += 1
            elif event.matchPeriod == "2H":
                if min < 10:
                    minutos["50-60"] += 1
                elif min < 20:
                    minutos["60-70"] += 1
                elif min < 30:
                    minutos["70-80"] += 1
                elif min < 40:
                    minutos["80-90"] += 1
            elif event.matchPeriod == "E1":
                minutos["40-50"] += 1
            elif event.matchPeriod == "E2":
                minutos["80-90"] += 1
    data = []
    for key in minutos:
        data.append({"min": key, "goles": minutos[key]})
    return JsonResponse(data, safe=False)

@csrf_exempt
def faltasPorMinuto(request, team_id):
    events = Events.objects.filter(teamId=team_id, eventName = "Foul")
    minutos = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    for event in events:
        if (event.matchPeriod == "1H" or event.matchPeriod == "2H" or event.matchPeriod == "E1" or event.matchPeriod == "E2"):
            min = event.eventSec / 60
            if event.matchPeriod == "1H":
                if 0<= min < 10:
                    minutos["0-10"] += 1
                elif min < 20:
                    minutos["10-20"] += 1
                elif min < 30:
                    minutos["20-30"] += 1
                elif min < 40:
                    minutos["30-40"] += 1
                elif min < 50:
                    minutos["40-50"] += 1
            elif event.matchPeriod == "2H":
                if min < 10:
                    minutos["50-60"] += 1
                elif min < 20:
                    minutos["60-70"] += 1
                elif min < 30:
                    minutos["70-80"] += 1
                elif min < 40:
                    minutos["80-90"] += 1
            elif event.matchPeriod == "E1":
                minutos["40-50"] += 1
            elif event.matchPeriod == "E2":
                minutos["80-90"] += 1
    data = []
    for key in minutos:
        data.append({"min": key, "faltas": minutos[key]})
    return JsonResponse(data, safe=False)

@csrf_exempt
def radarTeam(request, team_id):
    goles = Events.objects.filter(Q(teamId=team_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9)).count()
    pases = Events.objects.filter(Q(teamId=team_id) & Q(eventName="Pass")).count()
    tiros = Events.objects.filter(Q(teamId=team_id) & Q(eventName="Shot")).count()
    faltas = Events.objects.filter(Q(teamId=team_id) & Q(eventName="Foul")).count()
    intercepciones = Events.objects.filter(Q(teamId=team_id) & Q(eventName="Duel") & Q(tags__id=1801)).count()
    
    data = {
        "goles": goles/96,
        "pases": pases/23260,
        "tiros": tiros/631,
        "faltas": faltas/2117,
        "intercepciones": intercepciones/5603
    }
    return JsonResponse(data)



def barrasDivergentes(request, team_id):
    ataqueDic = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    defensaDic = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}

    ataques = [("0-10", 0, 600), ("10-20", 600, 1200), ("20-30", 1200, 1800), ("30-40", 1800, 2400), ("40-50", 2400, 3000),            ("50-60", 0, 600), ("60-70", 600, 1200), ("70-80", 1200, 1800), ("80-90", 1800, 2400)]

    for ataque in ataques:
        ataqueDic[ataque[0]] = calculaAtaqueEquipo(EventModel = Events.objects.filter(
            Q(teamId=team_id)  & Q(matchPeriod="1H" if ataque[1] < 1800 else "2H") & Q(eventSec__gte=ataque[1]) & Q(eventSec__lte=ataque[2])))
        defensaDic[ataque[0]] = calculaDefensaEquipo(EventModel = Events.objects.filter(
            Q(teamId=team_id)  & Q(matchPeriod="1H" if ataque[1] < 1800 else "2H") & Q(eventSec__gte=ataque[1]) & Q(eventSec__lte=ataque[2])))

    data = [["Minuto", "Ataque", "Defensa"]]
    for key in defensaDic:
        data.append([key, ataqueDic[key], defensaDic[key]])

    return JsonResponse(data, safe=False)

def calculaAtaqueEquipo(EventModel):
    puntuacion = 0
    goles = Events.objects.filter(Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9)).count()
    pasesX2 = EventModel.filter(Q(eventName="Pass") & (Q(tags__id=302) | Q(tags__id=301) | Q(tags__id=201))).count()
    pasesX2_tags = [302, 301, 201, 101]
    pasesX1 = EventModel.filter(eventName="Pass").exclude(tags__id__in=pasesX2_tags).count()
    shotsX2_tags = [101]
    shotsX2 = EventModel.filter(eventName="Shot").exclude(tags__id__in=shotsX2_tags).count()
    penaltiesX2 = EventModel.filter(subEventName="Penalty").count()
    freeKickX2 = EventModel.filter(Q(eventName="Free Kick") & (Q(tags__id=302) | Q(tags__id=301) | Q(tags__id=201))).count()


    puntuacion += goles*3
    puntuacion += pasesX2*2
    puntuacion += pasesX1*0.5
    puntuacion += shotsX2*2
    puntuacion += penaltiesX2*2
    puntuacion += freeKickX2*2

        
     
    return puntuacion

def calculaDefensaEquipo(EventModel):
    puntuacion = 0
    faltasX3 = EventModel.filter(Q(eventName="Foul") & (Q(tags__id=1701))).count()
    faltasX2 = EventModel.filter(Q(eventName="Foul") & (Q(tags__id=1702))).count()
    faltasX25 = EventModel.filter(Q(eventName="Foul") & (Q(tags__id=1703))).count()
    excludes = [1701, 1702, 1703]
    faltasX1 = EventModel.filter(eventName="Foul").exclude(tags__id__in=excludes).count()
    duelos = EventModel.filter(eventName="Duel").count()
    ooBall3 = EventModel.filter(Q(eventName="Others on the ball") & (Q(tags__id=101))).count()
    ooBallX2 = EventModel.filter(Q(eventName="Others on the ball") & (Q(tags__id=301) | Q(tags__id=201) | Q(tags__id=1901))).count()
   
    puntuacion += faltasX3*3
    puntuacion += faltasX2*2
    puntuacion += faltasX25*2.5
    puntuacion += faltasX1
    puntuacion += duelos
    puntuacion += ooBall3*3
    puntuacion += ooBallX2*2

    
    return puntuacion

def resultadosEquipos(request, team_id):
    matches = Events.objects.filter(teamId=team_id).values("matchId").distinct()
    ganados = 0
    empatados = 0
    perdidos = 0
    equipo = Teams.objects.get(wyId=team_id)
    for match in matches:
        partido = Matches.objects.get(wyId=match["matchId"])
        print(partido.winnerId)
        if partido.winnerId == equipo:
            ganados += 1
        elif partido.winnerId == None:
            empatados += 1
        else:
            perdidos += 1
    data = {
        "ganados": ganados,
        "empatados": empatados,
        "perdidos": perdidos
    }
    return JsonResponse(data, safe=False)
    
# Create your views here.
def populateDatabase(request):
    populate()
    informacion="Datos cargados correctamente\n"
    return render(request, 'carga.html', {'inf':informacion})

def index(request):
    return render(request, 'index.html')

#Algoritmos

@csrf_exempt
def coeficienteAtaqueEquipo(request, team_id):
    events = Events.objects.filter(teamId=team_id)
    puntuacion = 0
    pases2 = events.filter(Q(eventName="Pass") & (Q(tags__id=302) | Q(tags__id=301) | Q(tags__id=201))).count()
    pases3 = events.filter(Q(eventName="Pass") & (Q(tags__id=101))).count()
    tiros3 = events.filter(Q(eventName="Shot") & (Q(tags__id=101))).count()
    tiros2 = events.filter(Q(eventName="Shot") & (Q(tags__id=1801) | Q(tags__id=301) | Q(tags__id=201))).count()
    penalties = events.filter(Q(subEventName="Penalty")).count()
    faltas2 = events.filter(Q(eventName="Free Kick")& (Q(tags__id=302) | Q(tags__id=301) | Q(tags__id=201))).count()
    faltas3 = events.filter(Q(eventName="Free Kick")& (Q(tags__id=101))).count()
    num_partidos = TeamsData.objects.filter(teamId=team_id).count()
    puntuacion += pases2*2
    puntuacion += pases3*3
    puntuacion += tiros3*3
    puntuacion += tiros2*2
    puntuacion += penalties*3
    puntuacion += faltas2*2
    puntuacion += faltas3*3

    coeficiente = round(puntuacion / num_partidos, 2)
    coeficiente_normalizado = round(coeficiente / 64.29, 2)
    return JsonResponse({'coeficiente': coeficiente_normalizado})


                    
def sankey(request, team_id):
    partidos = TeamsData.objects.filter(teamId=team_id)
    partidos_matches = [partido.matchId for partido in partidos]
    diccionario = {}
    for partido in partidos_matches:
        events = Events.objects.filter(Q(matchId=partido) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
        diccionario = evolucionGoles(events, diccionario, team_id)
    data = [["From", "To", "Weight"]]
    for key, value in diccionario.items():
        if key[0] != key[1]:
            data.append([key[0], key[1], value])
        else:
            data.append([key[0], "FIN", value])

    return JsonResponse(data, safe=False)
           
def evolucionGoles(events, diccionario, team_id):
    golesMiEquipo = 0
    golesOtroEquipo = 0
    eventos1H = events.filter(matchPeriod="1H").order_by('eventSec')
    eventos2H = events.filter(matchPeriod="2H").order_by('eventSec')

    for event in eventos1H:
        if event.teamId.wyId != team_id:
            golesOtroEquipo += 1
            form = str(golesMiEquipo) + "-" + str(golesOtroEquipo)
            to = str(golesMiEquipo) + "-" + str(golesOtroEquipo)
            clave = (form, to)
            if clave in diccionario:
                diccionario[clave] += 1
            else:
                diccionario[clave] = 1
        else:
            golesMiEquipo += 1
            form = str(golesMiEquipo) + "-" + str(golesOtroEquipo)
            to = str(golesMiEquipo ) + "-" + str(golesOtroEquipo)
            clave = (form, to)
            if clave in diccionario:
                diccionario[clave] += 1
            else:
                diccionario[clave] = 1
    for event in eventos2H:
        if event.teamId.wyId != team_id:
            form = str(golesMiEquipo) + "-" + str(golesOtroEquipo)
            to = str(golesMiEquipo) + "-" + str(golesOtroEquipo + 1)
            clave = (form, to)
            if clave in diccionario:
                diccionario[clave] += 1
            else:
                diccionario[clave] = 1
            golesOtroEquipo += 1
        else:
            form = str(golesMiEquipo) + "-" + str(golesOtroEquipo)
            to = str(golesMiEquipo + 1) + "-" + str(golesOtroEquipo)
            clave = (form, to)
            if clave in diccionario:
                diccionario[clave] += 1
            else:
                diccionario[clave] = 1
            golesMiEquipo += 1
    return diccionario
            
#======= PARTIDOS =========

class MatchList(generics.ListAPIView):
    queryset = Matches.objects.all()
    serializer_class = MatchesSerializer

@csrf_exempt
def get_match(request, match_id):
    match = Matches.objects.get(wyId=match_id)
    label = match.label
    data = {
        'label': label
    }
    return JsonResponse(data)

class GoalMatchEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        GoalMatchEvents = Events.objects.filter(Q(matchId=match_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
        return GoalMatchEvents

class FoulMatchEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        events = Events.objects.filter(matchId = match_id, eventName = "Foul")
        return events
    
class AssistMatchEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        events = Events.objects.filter(Q(matchId=match_id) & Q(tags__id=301))
        return events

class FreeKickMatchEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        match_id = self.kwargs['match_id']
        events = Events.objects.filter(matchId=match_id, eventName = "Free Kick")
        return events

@csrf_exempt
def topGoleadoresPartido(request, match_id):
    events = Events.objects.filter(Q(matchId=match_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
    goleadores = {}
    for event in events:
            if event.playerId.wyId in goleadores:
                goleadores[event.playerId.wyId] += 1
            else:
                goleadores[event.playerId.wyId] = 1
    goleadores = sorted(goleadores.items(), key=lambda x: x[1], reverse=True)
    data = []
    for goleador in goleadores:
        try:
            player = Players.objects.get(wyId=goleador[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "goles": goleador[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

@csrf_exempt
def topAsistentesPartido(request, match_id):
    events = Events.objects.filter(Q(matchId=match_id) & Q(tags__id=301))
    asistentes = {}
    for event in events:
        if event.playerId.wyId in asistentes:
            asistentes[event.playerId.wyId] += 1
        else:
            asistentes[event.playerId.wyId] = 1
    asistentes = sorted(asistentes.items(), key=lambda x: x[1], reverse=True)
    asistentes = asistentes[:5]
    data = []
    for asistente in asistentes:
        try:
            player = Players.objects.get(wyId=asistente[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "asistencias": asistente[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

@csrf_exempt
def topFaltasPartido(request, match_id):
    events = Events.objects.filter(Q(matchId=match_id) & Q(eventName="Foul"))
    asistentes = {}
    for event in events:
        if event.playerId.wyId in asistentes:
            asistentes[event.playerId.wyId] += 1
        else:
            asistentes[event.playerId.wyId] = 1
    asistentes = sorted(asistentes.items(), key=lambda x: x[1], reverse=True)
    asistentes = asistentes[:5]
    data = []
    for asistente in asistentes:
        try:
            player = Players.objects.get(wyId=asistente[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "faltas": asistente[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

def topPasesPartido(request, match_id):
    events = Events.objects.filter(Q(matchId=match_id) & Q(eventName="Pass"))
    asistentes = {}
    for event in events:
        if event.playerId.wyId in asistentes:
            asistentes[event.playerId.wyId] += 1
        else:
            asistentes[event.playerId.wyId] = 1
    asistentes = sorted(asistentes.items(), key=lambda x: x[1], reverse=True)
    asistentes = asistentes[:5]
    data = []
    for asistente in asistentes:
        try:
            player = Players.objects.get(wyId=asistente[0])
            data.append({"player": player.firstName, "apellido": player.lastName, "pases": asistente[1]})
        except Players.DoesNotExist:
            pass
    return JsonResponse(data, safe=False)

@csrf_exempt
def faltasPorMinutoPartido(request, match_id):
    events = Events.objects.filter(matchId=match_id, eventName = "Foul")
    minutos = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    for event in events:
        if (event.matchPeriod == "1H" or event.matchPeriod == "2H" or event.matchPeriod == "E1" or event.matchPeriod == "E2"):
            min = event.eventSec / 60
            if event.matchPeriod == "1H":
                if 0<= min < 10:
                    minutos["0-10"] += 1
                elif min < 20:
                    minutos["10-20"] += 1
                elif min < 30:
                    minutos["20-30"] += 1
                elif min < 40:
                    minutos["30-40"] += 1
                elif min < 50:
                    minutos["40-50"] += 1
            elif event.matchPeriod == "2H":
                if min < 10:
                    minutos["40-50"] += 1
                elif min < 20:
                    minutos["50-60"] += 1
                elif min < 30:
                    minutos["60-70"] += 1
                elif min < 40:
                    minutos["70-80"] += 1
                elif min < 50:
                    minutos["80-90"] += 1
            elif event.matchPeriod == "E1":
                minutos["40-50"] += 1
            elif event.matchPeriod == "E2":
                minutos["80-90"] += 1
    data = []
    for key in minutos:
        data.append({"min": key, "faltas": minutos[key]})
    return JsonResponse(data, safe=False)

@csrf_exempt
def pasesPorMinutoPartido(request, match_id):
    events = Events.objects.filter(matchId=match_id, eventName = "Pass")
    minutos = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    for event in events:
        if (event.matchPeriod == "1H" or event.matchPeriod == "2H" or event.matchPeriod == "E1" or event.matchPeriod == "E2"):
            min = event.eventSec / 60
            if event.matchPeriod == "1H":
                if 0<= min < 10:
                    minutos["0-10"] += 1
                elif min < 20:
                    minutos["10-20"] += 1
                elif min < 30:
                    minutos["20-30"] += 1
                elif min < 40:
                    minutos["30-40"] += 1
                elif min < 50:
                    minutos["40-50"] += 1
            elif event.matchPeriod == "2H":
                if min < 10:
                    minutos["40-50"] += 1
                elif min < 20:
                    minutos["50-60"] += 1
                elif min < 30:
                    minutos["60-70"] += 1
                elif min < 40:
                    minutos["70-80"] += 1
                elif min < 50:
                    minutos["80-90"] += 1
            elif event.matchPeriod == "E1":
                minutos["40-50"] += 1
            elif event.matchPeriod == "E2":
                minutos["80-90"] += 1
    data = []
    for key in minutos:
        data.append({"min": key, "pases": minutos[key]})
    return JsonResponse(data, safe=False)

def golesPorMinutoPartido(request, match_id):
    events = Events.objects.filter(Q(matchId=match_id) & Q(tags__id=101) & ~Q(tags__id=102) & ~Q(playerId__roleId__roleId=9))
    print(events.__len__())
    minutos = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    for event in events:
        if (event.matchPeriod == "1H" or event.matchPeriod == "2H" or event.matchPeriod == "E1" or event.matchPeriod == "E2"):
            min = event.eventSec / 60
            if event.matchPeriod == "1H":
                if 0<= min < 10:
                    minutos["0-10"] += 1
                elif min < 20:
                    minutos["10-20"] += 1
                elif min < 30:
                    minutos["20-30"] += 1
                elif min < 40:
                    minutos["30-40"] += 1
                elif min < 50:
                    minutos["40-50"] += 1
            elif event.matchPeriod == "2H":
                if min < 10:
                    minutos["40-50"] += 1
                elif min < 20:
                    minutos["50-60"] += 1
                elif min < 30:
                    minutos["60-70"] += 1
                elif min < 40:
                    minutos["70-80"] += 1
                elif min < 50:
                    minutos["80-90"] += 1
            elif event.matchPeriod == "E1":
                minutos["40-50"] += 1
            elif event.matchPeriod == "E2":
                minutos["80-90"] += 1
    data = []
    for key in minutos:
        data.append({"min": key, "goles": minutos[key]})
    return JsonResponse(data, safe=False)

@csrf_exempt
def barrasDivergentesPartido(request, match_id):
    local = TeamsData.objects.get(matchId=match_id, side="home")
    visitante = TeamsData.objects.get(matchId=match_id, side="away")
    ataqueLocal = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}
    ataqueVisitante = {"0-10": 0, "10-20": 0, "20-30": 0, "30-40": 0, "40-50": 0, "50-60": 0, "60-70": 0, "70-80": 0, "80-90": 0}

    ataques = [("0-10", 0, 600), ("10-20", 600, 1200), ("20-30", 1200, 1800), ("30-40", 1800, 2400), ("40-50", 2400, 3000),            ("50-60", 0, 600), ("60-70", 600, 1200), ("70-80", 1200, 1800), ("80-90", 1800, 2400)]

    for ataque in ataques:
        ataqueLocal[ataque[0]] = calculaAtaqueEquipo(EventModel = Events.objects.filter(
            Q(teamId=local.teamId) & Q(matchId=match_id) & Q(matchPeriod="1H" if ataque[1] < 1800 else "2H") & Q(eventSec__gte=ataque[1]) & Q(eventSec__lte=ataque[2])))
        ataqueVisitante[ataque[0]] = calculaAtaqueEquipo(EventModel = Events.objects.filter(
            Q(teamId=visitante.teamId) & Q(matchId=match_id) & Q(matchPeriod="1H" if ataque[1] < 1800 else "2H") & Q(eventSec__gte=ataque[1]) & Q(eventSec__lte=ataque[2])))

    data = [["Minuto", "Local", "Visitante"]]
    for key in ataqueLocal:
        data.append([key, ataqueLocal[key], -ataqueVisitante[key]])

    return JsonResponse(data, safe=False)


# ==== Jugadores ====
class PlayerList(generics.ListAPIView):
    queryset = Players.objects.all()
    serializer_class = PlayersSerializer

@csrf_exempt
def get_player(request, player_id):
    player = Players.objects.get(wyId=player_id)
    firstName = player.firstName
    lastName = player.lastName
    middleName = player.middleName
    data = {
        'firstName': firstName,
        'lastName': lastName,
        'middleName': middleName
    }
    return JsonResponse(data)

class GoalPlayerEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        player_id = self.kwargs['player_id']
        GoalPlayerEvents = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=101))

        return GoalPlayerEvents
    
class FoulPlayerEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        player_id = self.kwargs['player_id']
        events = Events.objects.filter(playerId=player_id, eventName = "Foul")
        return events

class AssistPlayerEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        player_id = self.kwargs['player_id']
        AssistPlayerEvents = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=301))
        return AssistPlayerEvents

class FreeKickPlayerEvents(generics.ListAPIView):
    serializer_class = EventsSerializer

    def get_queryset(self):
        player_id = self.kwargs['player_id']
        FreeKickPlayerEvents = Events.objects.filter(playerId=player_id, eventName = "Free Kick")
        return FreeKickPlayerEvents
    
@csrf_exempt
def radarPlayer(request, player_id):
    goles = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=101)).count()
    pases = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Pass")).count()
    tiros = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Shot")).count()
    faltas = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Foul")).count()
    intercepciones = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Duel") & Q(tags__id=1801)).count()
    asitencias = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=301)).count()
    
    data = {
        "goles": goles/34,
        "pases": pases/2417,
        "tiros": tiros/151,
        "faltas": faltas/87,
        "intercepciones": intercepciones/685,
        "asistencias": asitencias/13
    }
    return JsonResponse(data)



@csrf_exempt
def barrasPlayer(request, player_id):
    goles = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=101)).count()
    tiros = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Shot")).count()
    faltas = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Foul")).count()
    asistencias = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=301)).count()
    
    data = {
        "goles": goles,
        "tiros": tiros,
        "faltas": faltas,
        "asistencias": asistencias
    }
    return JsonResponse(data)

@csrf_exempt
def eventosPorPartido(request, player_id):
    partidos = Events.objects.filter(playerId=player_id).values("matchId").distinct().count()
    goles = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=101)).count()
    faltas = Events.objects.filter(Q(playerId=player_id) & Q(eventName="Foul")).count()
    asitencias = Events.objects.filter(Q(playerId=player_id) & Q(tags__id=301)).count()
    amarillas = Events.objects.filter(Q(playerId=player_id) &  Q(tags__id=1702)).count()
    rojas = Events.objects.filter(Q(playerId=player_id) &  Q(tags__id=1701)).count()
    data = {
        "goles": goles/partidos,
        "faltas": faltas/partidos,
        "asitencias": asitencias/partidos,
        "amarillas": amarillas/partidos,
        "rojas": rojas/partidos

    }
    return JsonResponse(data)

