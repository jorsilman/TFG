from datetime import datetime
import json
import csv
from main.models import Events, Matches, Players, Roles,Tags, Teams,TeamsData

path='data'

"""def populateEventId2Names():

    EventId2Names.objects.all().delete()
    lista = []

    with open(path+'\\eventid2name.csv') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            event_id = int(row['event'])
            subevent_id = int(row['subevent'])
            event_label = row['event_label']
            subevent_label = row['subevent_label']
            lista.append(EventId2Names(eventId=event_id, subEventId=subevent_id, eventLabel=event_label, subEventLabel=subevent_label))
  
    EventId2Names.objects.bulk_create(lista)

def populateTags2Name():
    Tags2Name.objects.all().delete()
    lista = []
    with open(path+'\\tags2name.csv') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        for row in reader:
            tagId = int(row['Tag'])
            description = row['Description']
            lista.append(Tags2Name(tagId = tagId, description=description))
    Tags2Name.objects.bulk_create(lista)

def populateCompetitions():
    Competitions.objects.all().delete()
    Areas.objects.all().delete()
    lista = []
    with open(path+'\\competitions.json') as f:
        data = json.load(f)
        for item in data:
            area_data = item['area']
            area_id = int(area_data['id'])
            if not Areas.objects.filter(id=area_id).exists():

                area_name = area_data['name']
                alpha3code = area_data['alpha3code']
                alpha2code = area_data['alpha2code']

                area = Areas(id=area_id, name=area_name, alpha3code=alpha3code, alpha2code=alpha2code)

                area.save()
            else:
                area = Areas.objects.get(id = area_id)

            
            competition_name = item['name']
            competition_id = int(item['wyId'])
            competition_format = item['format']
            competition_type = item['type']
            competition_image = 'data\images\default.png' 
            
            competition = Competitions(name=competition_name, wyId=competition_id, formato=competition_format, 
                                    type=competition_type, image=competition_image, areaId=area)
            lista.append(competition)
    Competitions.objects.bulk_create(lista)"""

def populateTeams():
    Teams.objects.all().delete()
    lista = []
    with open(path+'\\teams.json', encoding="iso-8859-1") as f:
        data = json.load(f)
        for item in data:
            # Create and save the team object
            team = Teams(city=item['city'],
                         name=item['name'],
                         wyId=int(item['wyId']),
                         officialName=item['officialName'],
                         type=item['type'],
                         image = 'data\images\default.png')
            lista.append(team)
    Teams.objects.bulk_create(lista)

print("Terminado equipos")

def populatePlayers():
    Players.objects.all().delete()
    Roles.objects.all().delete()
    lista = []
    with open(path+'\\players.json', encoding="iso-8859-1") as f:
        data = json.load(f)
        for item in data:
            role_data = item['role']
            role_code2 = role_data['code2']
            if not Roles.objects.filter(code2=role_code2).exists():
                role_code3 = role_data['code3']
                role_name = role_data['name']
                role = Roles(code2 = role_code2, code3 = role_code3, name = role_name)

                role.save()
            else:
                role = Roles.objects.get(code2 = role_code2)

            

            if item['currentTeamId'] is not None and item['currentTeamId'] != 'null' and Teams.objects.filter(wyId = int(item['currentTeamId'])).exists():
                team = Teams.objects.get(wyId = int(item['currentTeamId']))
            else:
                team = None

            if item['currentNationalTeamId'] is not None and item['currentNationalTeamId'] != 'null' and Teams.objects.filter(wyId = int(item['currentNationalTeamId'])).exists():
                nTeam = Teams.objects.get(wyId = int(item['currentNationalTeamId']))
            else:
                nTeam = None

            player = Players(weight=int(item['weight']), 
                             firstName=item['firstName'], 
                             middleName=item['middleName'], 
                             lastName=item['lastName'], 
                             birthDate=datetime.strptime(item['birthDate'], '%Y-%m-%d'),
                             height=int(item['height']), 
                             roleId=role, 
                             currentTeamId=team, 
                             wyId=int(item['wyId']), 
                             foot=item['foot'], 
                             shortName=item['shortName'], 
                             currentNationalTeamId=nTeam)
            lista.append(player)
    Players.objects.bulk_create(lista)

print("Terminado jugadores")

def populateMatches():
    Matches.objects.all().delete()
    TeamsData.objects.all().delete()

    partidos = []
    datos = []

    with open(path+'\\matches\list_of_matches.txt', 'r', encoding="iso-8859-1") as nombres:
        for archivo in nombres:
            with open('data\matches\\'+archivo.strip(), encoding="iso-8859-1") as f:
                data = json.load(f)
                for item in data:
                    status = item['status']
                    roundId = int(item['roundId'])
                    gameWeek = int(item['gameweek'])
                    seasonId = int(item['seasonId'])
                    dateUtc = datetime.strptime(item['dateutc'], '%Y-%m-%d %H:%M:%S')
                    if item['winner'] is not None and item['winner'] != 'null' and Teams.objects.filter(wyId = int(item['winner'])).exists():
                        winnerId = Teams.objects.get(wyId = int(item['winner']))
                    else:
                        winnerId = None
                    venue = item['venue']
                    wyId = int(item['wyId'])
                    label = item['label']
                    duration = item['duration']

                    m = Matches(status = status, roundId = roundId, gameWeek = gameWeek, seasonId = seasonId, dateUtc = dateUtc, winnerId = winnerId, venue = venue, wyId = wyId, label = label, duration = duration)

                    partidos.append(m)

                   

                    for team_id, team_data in item['teamsData'].items():
                        matchId = m
                        if team_data['teamId'] is not None and team_data['teamId'] != 'null' and Teams.objects.filter(wyId = int(team_data['teamId'])).exists():
                            teamId = Teams.objects.get(wyId = int(team_data['teamId']))
                        else:
                            teamId = None
                        
                        scoreET = int(team_data['scoreET'])
                        side = team_data['side']
                        score = int(team_data['score'])
                        scoreP = int(team_data['scoreP'])
                        hasFormation = int(team_data['hasFormation'])
                        scoreHT = int(team_data['scoreHT'])
                        tD = TeamsData(matchId = matchId, teamId = teamId, scoreET = scoreET, side = side, score = score, scoreP = scoreP, hasFormation = hasFormation, scoreHT = scoreHT)

                        datos.append(tD)

    Matches.objects.bulk_create(partidos)
    TeamsData.objects.bulk_create(datos)

print("Terminado partidos")

                        
    

def popolateEvents():
    Events.objects.all().delete()
    Tags.objects.all().delete()


    
    with open('data\events\events_Spain.json', encoding="iso-8859-1") as f:
        data = json.load(f)
        for item in data:
            tags = []
            for t in item['tags']:
                if not Tags.objects.filter(id=t['id']).exists():
                    tg = Tags(id = t['id'])
                    tg.save()
                    tags.append(tg)
                else:
                    tg = Tags.objects.get(id = t['id'])
                    tags.append(tg)
            

                
            if isinstance(item['eventId'], int):
                eventId = int(item['eventId'])
            else:
                eventId = None
            if isinstance(item['subEventId'], int):
                subEventId = int(item['subEventId'])
            else:
                subEventId = None

            subEventName = item['subEventName']

            if item.get('playerId') is not None and item.get('playerId') != 'null' and Players.objects.filter(wyId = int(item['playerId'])).exists():
                playerId = Players.objects.get(wyId = int(item['playerId']))
            else:
                playerId = None

            if item.get('matchId') is not None and item.get('matchId') != 'null' and Matches.objects.filter(wyId = int(item['matchId'])).exists():
                matchId = Matches.objects.get(wyId = int(item['matchId']))
            else:
                matchId = None

            eventName = item['eventName']

            if item.get('teamId') is not None and item.get('teamId') != 'null' and Teams.objects.filter(wyId = int(item['teamId'])).exists():
                teamId = Teams.objects.get(wyId = int(item['teamId']))
            else:
                teamId = None

            matchPeriod = item['matchPeriod']

            eventSec = float(item['eventSec'])

            id = int(item['id'])

            x1 = int(item['positions'][0]['x'])
            y1 = int(item['positions'][0]['y'])
            if len(item['positions']) > 1:
                x2 = int(item['positions'][1]['x'])
                y2 = int(item['positions'][1]['y'])

            

            e = Events(eventId = eventId, subEventId = subEventId, subEventName = subEventName, playerId = playerId, matchId = matchId, eventName = eventName, teamId = teamId, matchPeriod = matchPeriod, eventSec = eventSec, id = id, x1 = x1, y1 = y1, x2 = x2, y2 = y2)

            e.save()

            e.tags.set(tags)

                    
print("Terminado eventos")

def populate():
    populateTeams()
    print("Terminado equipos")
    populatePlayers()
    print("Terminado jugadores")
    populateMatches()
    print("Terminado partidos")
    popolateEvents()
    print("Terminado eventos")