"""Centro_De_Mandos_Configurable URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from main import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',views.index),
    path('register/', views.register, name='registro'),
    path('login/', views.login_view, name='inicio_sesion'),
    path('configuraciones/', views.configuracion, name='configuraciones'),
    path('configuraciones/<int:id>/', views.get_configuracion, name='get_configuracion'),
    path('configuraciones/<int:id>/delete/', views.delete_configuracion, name='delete_configuracion'),
    path('populate/', views.populateDatabase),
    path('api/teams/', views.TeamList.as_view()),
    path('api/events/teams/<int:team_id>/', views.EventsList.as_view()),
    path('api/events/teams/<int:team_id>/goals/', views.GoalTeamEvents.as_view()),
    path('api/events/teams/<int:team_id>/assitant/', views.AssistTeamEvents.as_view()),
    path('api/events/teams/<int:team_id>/fouls/', views.FoulTeamEvents.as_view()),
    path('api/events/teams/<int:team_id>/free_kicks/', views.FreeKickTeamEvents.as_view()),
    path('api/events/teams/<int:team_id>/attack/', views.coeficienteAtaqueEquipo),
    path('api/events/teams/<int:team_id>/radar/', views.radarTeam),
    path('api/events/teams/<int:team_id>/topScorers/', views.topGoleadores),
    path('api/events/teams/<int:team_id>/topAssistants/', views.topAsistentes),
    path('api/events/teams/<int:team_id>/goalsByMinute/', views.golesPorMinuto),
    path('api/events/teams/<int:team_id>/foulsByMinute/', views.faltasPorMinuto),
    path('api/events/teams/<int:team_id>/divergingChart/', views.barrasDivergentes),
    path('api/events/teams/<int:team_id>/sankey/', views.sankey),
    path('api/matches/', views.MatchList.as_view()),
    path('api/events/matches/<int:match_id>/goals/', views.GoalMatchEvents.as_view()),
    path('api/events/matches/<int:match_id>/assitant/', views.AssistMatchEvents.as_view()),
    path('api/events/matches/<int:match_id>/fouls/', views.FoulMatchEvents.as_view()),
    path('api/events/matches/<int:match_id>/free_kicks/', views.FreeKickMatchEvents.as_view()),
    path('api/events/matches/<int:match_id>/topScorers/', views.topGoleadoresPartido),
    path('api/events/matches/<int:match_id>/topAssistants/', views.topAsistentesPartido),
    path('api/events/matches/<int:match_id>/topFouls/', views.topFaltasPartido),
    path('api/events/matches/<int:match_id>/topPasses/', views.topPasesPartido),
    path('api/events/matches/<int:match_id>/foulsByMinute/', views.faltasPorMinutoPartido),
    path('api/events/matches/<int:match_id>/goalsByMinute/', views.golesPorMinutoPartido),
    path('api/events/matches/<int:match_id>/passesByMinute/', views.pasesPorMinutoPartido),
    path('api/events/matches/<int:match_id>/divergentChart/', views.barrasDivergentesPartido),
    path('api/players/', views.PlayerList.as_view()),
    path('api/events/players/<int:player_id>/goals/', views.GoalPlayerEvents.as_view()),
    path('api/events/players/<int:player_id>/fouls/', views.FoulPlayerEvents.as_view()),
    path('api/events/players/<int:player_id>/assitant/', views.AssistPlayerEvents.as_view()),
    path('api/events/players/<int:player_id>/free_kicks/', views.FreeKickPlayerEvents.as_view()),
    path('api/events/players/<int:player_id>/radar/', views.radarPlayer),  
    path('api/events/players/<int:player_id>/events_count/', views.barrasPlayer),  
    path('api/events/players/<int:player_id>/events_by_match/', views.eventosPorPartido),   


]
