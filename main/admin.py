from django.contrib import admin
from .models import Teams, Roles, Players, Matches, TeamsData, Events, Tags

# Register your models here.
"""admin.site.register(Areas)
admin.site.register(EventId2Names)
admin.site.register(Competitions)
admin.site.register(Tags2Name)"""
admin.site.register(Teams)
admin.site.register(Roles)
admin.site.register(Players)
admin.site.register(Matches)
admin.site.register(TeamsData)
admin.site.register(Events)
"""admin.site.register(Bench)
admin.site.register(LineUp)
admin.site.register(Substitutions)
admin.site.register(EventsTags)"""
admin.site.register(Tags)