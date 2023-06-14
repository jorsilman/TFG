from datetime import datetime
import json
import csv
from main.models import Events, Matches, Players, Roles,Tags, Teams,TeamsData

path='data'



def populateTeams():
    Teams.objects.all().delete()
    lista = []
    with open(path+'\\teams.json', encoding="iso-8859-1") as f:
        datau = json.load(f)
        data = json.loads(json.dumps(datau))
        for item in data:
            item['name'] = item['name'].encode('latin-1').decode('unicode_escape')
            item['city'] = item['city'].encode('latin-1').decode('unicode_escape')
            item['officialName'] = item['officialName'].encode('latin-1').decode('unicode_escape')

            team = Teams(city=item['city'],
                         name=item['name'],
                         wyId=int(item['wyId']),
                         officialName=item['officialName'],
                         type=item['type'],
                         image='data\images\default.png')
            lista.append(team)
    Teams.objects.bulk_create(lista)


def populatePlayers():
    Players.objects.all().delete()
    Roles.objects.all().delete()
    lista = []
    with open(path+'\\players.json', encoding="iso-8859-1") as f:
        datau = json.load(f)
        data = json.loads(json.dumps(datau))
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

            item['firstName'] = item['firstName'].encode('latin-1').decode('unicode_escape')
            item['middleName'] = item['middleName'].encode('latin-1').decode('unicode_escape')
            item['lastName'] = item['lastName'].encode('latin-1').decode('unicode_escape')
            item['shortName'] = item['shortName'].encode('latin-1').decode('unicode_escape')


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



def populateMatches():
    Matches.objects.all().delete()
    TeamsData.objects.all().delete()

    partidos = []
    datos = []

    with open(path+'\\matches\list_of_matches.txt', 'r', encoding="iso-8859-1") as nombres:
        for archivo in nombres:
            with open('data\matches\\'+archivo.strip(), encoding="iso-8859-1") as f:
                datau = json.load(f)
                data = json.loads(json.dumps(datau))
                for item in data:
                    item['venue'] = item['venue'].encode('latin-1').decode('unicode_escape')
                    item['label'] = item['label'].encode('latin-1').decode('unicode_escape')
                    item['duration'] = item['duration'].encode('latin-1').decode('unicode_escape')

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

                    


def populate():
    populateTeams()
    populatePlayers()
    populateMatches()
    popolateEvents()