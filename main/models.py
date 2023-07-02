from django.db import models

from django.contrib.auth.models import AbstractUser,Group, Permission


class Configuracion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255, null=False, default='Configuracion')
    num_columns = models.IntegerField()
    graficas_seleccionadas = models.JSONField()
    wyId = models.IntegerField(null=False)
    tipo = models.CharField(max_length=255, null=False, default='Configuracion')

    
class Teams (models.Model):
    city = models.TextField(null=False, blank=False)
    name = models.TextField(max_length=10000,null=False, blank=False)
    wyId = models.PositiveIntegerField(primary_key=True, null=False)
    officialName = models.TextField(blank=False, null=False)
    type = models.TextField(blank=False, null=False)
    image = models.ImageField()

    def __str__(self):
        return self.name
    
class Roles (models.Model):
    roleId = models.AutoField(primary_key=True)
    code2 = models.CharField(null=False, blank=False, max_length=2)
    code3 = models.CharField(null=False, blank=False, max_length=3)
    name = models.TextField(null=False, blank=False)

    def __str__(self):
        return self.name    

class Players (models.Model):
   
    weight = models.PositiveIntegerField()
    firstName = models.TextField()
    middleName = models.TextField()
    lastName = models.TextField()
    birthDate = models.DateField()
    height = models.PositiveIntegerField()
    roleId = models.ForeignKey(Roles, on_delete=models.CASCADE)
    currentTeamId = models.ForeignKey(Teams, on_delete=models.CASCADE, related_name='current_team', null = True)
    wyId = models.PositiveIntegerField(primary_key=True, null=False)
    foot = models.TextField()
    shortName = models.TextField()

    def __str__(self):
        return self.firstName

class Matches (models.Model):
    status = models.TextField(null=False, blank=False)
    roundId = models.PositiveIntegerField(null=False)
    gameWeek = models.PositiveIntegerField(null=False)
    seasonId = models.PositiveIntegerField(null=False)
    dateUtc = models.DateTimeField(null=False)
    winnerId = models.ForeignKey(Teams, on_delete=models.CASCADE, null=True)
    venue = models.TextField(null=False, blank=False)
    wyId = models.PositiveIntegerField(primary_key=True, null=False)
    label = models.TextField(null=False, blank=False)
    duration = models.TextField(null=False, blank=False)

    def __str__(self):
        return self.label
    
class TeamsData (models.Model):
    teamsDataId = models.AutoField(primary_key=True)
    matchId = models.ForeignKey(Matches, on_delete=models.CASCADE)
    teamId = models.ForeignKey(Teams, on_delete=models.CASCADE)
    scoreET = models.PositiveIntegerField(null=False)
    side = models.TextField(null=False, blank=False)
    score = models.PositiveIntegerField(null=False, blank=False)
    scoreP = models.PositiveIntegerField(null=False, blank=False)
    hasFormation = models.PositiveIntegerField(null=False)
    scoreHT = models.PositiveIntegerField(null=False)

    def __str__(self):
        return self.matchId.label+" "+self.teamId.name
    

class Tags(models.Model):
    id = models.PositiveSmallIntegerField(null=False, primary_key=True)
    def __str__(self):
        return str(self.id)

class Events (models.Model):
    eventId = models.PositiveIntegerField(null=True)
    subEventId = models.PositiveIntegerField(null=True)
    subEventName = models.TextField()
    playerId = models.ForeignKey(Players, on_delete= models.CASCADE, null=True)
    matchId = models.ForeignKey(Matches, on_delete= models.CASCADE, null=True)
    eventName = models.TextField()
    teamId = models.ForeignKey(Teams, on_delete= models.CASCADE, null=True)
    matchPeriod = models.TextField()
    eventSec = models.FloatField()
    id = models.PositiveIntegerField(null=False, primary_key=True)
    x1 = models.PositiveIntegerField()
    y1 = models.PositiveIntegerField()
    x2 = models.PositiveIntegerField()
    y2 = models.PositiveIntegerField()
    tags = models.ManyToManyField(Tags)

    def __str__(self):
        return self.eventName+"-"+self.subEventName
    
   



