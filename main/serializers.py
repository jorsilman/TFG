from rest_framework import serializers
from .models import Teams, Events, Matches, Players

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields = '__all__'

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'

class PlayersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Players
        fields = '__all__'



class EventsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Events
        fields = '__all__'


