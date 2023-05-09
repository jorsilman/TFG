from rest_framework import serializers
from .models import Teams, Events, Matches

class TeamsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teams
        fields = '__all__'

class MatchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Matches
        fields = '__all__'



class EventsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Events
        fields = '__all__'


