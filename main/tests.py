from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.test import TransactionTestCase
from .models import Teams
from .serializers import TeamsSerializer



class TopGoleadoresTeamTestCase(TestCase):
    def test_top_goleadores(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/topScorers/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("player", item)
            self.assertIn("apellido", item)
            self.assertIn("goles", item)

# class CoeficienteAtaqueTeamTestCase(ProductionDatabaseTestCase):
#     def test_coeficiente_ataque(self):
#         team_id = 684  # ID del equipo de prueba
#         url = f'/api/events/teams/{team_id}/attack/'

#         response = self.client.get(url)

#         self.assertEqual(response.status_code, 200)

class RadarTeamTestCase(TestCase):
    def test_radar(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/radar/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, dict)
        self.assertIn("goles", data)
        self.assertIn("pases", data)
        self.assertIn("tiros", data)
        self.assertIn("faltas", data)
        self.assertIn("intercepciones", data)

class TopAsistentesTeamTestCase(TestCase):
    def test_top_asistentes(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/topAssistants/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("player", item)
            self.assertIn("apellido", item)
            self.assertIn("asistencias", item)

class GolesPorMinutoTeamTestCase(TestCase):
    def test_goles_por_minuto(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/goalsByMinute/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("min", item)
            self.assertIn("goles", item)

class FaltasPorMinutoTeamTestCase(TestCase):
    def test_faltas_por_minuto(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/foulsByMinute/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("min", item)
            self.assertIn("faltas", item)

class BarrasDivergentesTeamTestCase(TestCase):
    def test_barras_divergentes(self):
        team_id = 684  # ID del equipo de prueba
        url = f'/api/events/teams/{team_id}/divergingChart/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        rangos_esperados = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90"]

        data = response.json()
        self.assertIsInstance(data, list)
        for i in range (0, len(data)):
            item = data[i]
            if i == 0:
                self.assertIn("Minuto", item)
                self.assertIn("Ataque", item)
                self.assertIn("Defensa", item)
            else:
               self.assertIn(item[0], rangos_esperados)
                

class TopGoleadoresMatchTestCase(TestCase):
    def test_top_goleadores(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/topScorers/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("player", item)
            self.assertIn("apellido", item)
            self.assertIn("goles", item)

class TopFaltasMatchTestCase(TestCase):
    def test_top_faltas(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/topFouls/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("player", item)
            self.assertIn("apellido", item)
            self.assertIn("faltas", item)

class TopPasesMatchTestCase(TestCase):
    def test_top_pases(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/topPasses/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("player", item)
            self.assertIn("apellido", item)
            self.assertIn("pases", item)

class FaltasPorMinutoMatchTestCase(TestCase):
    def test_faltas_por_minuto(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/foulsByMinute/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("min", item)
            self.assertIn("faltas", item)

class GolesPorMinutoMatchTestCase(TestCase):
    def test_goles_por_minuto(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/goalsByMinute/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("min", item)
            self.assertIn("goles", item)

class PasesPorMinutoMatchTestCase(TestCase):
    def test_pases_por_minuto(self):
        match_id = 2565566  
        url = f'/api/events/matches/{match_id}/passesByMinute/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, list)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn("min", item)
            self.assertIn("pases", item)
        
# class BarrasDivergentesMatchTestCase(TestCase):
#     def test_barras_divergentes(self):
#         match_id = 2565566  
#         url = f'/api/events/matches/{match_id}/divergentChart/'

#         response = self.client.get(url)

#         self.assertEqual(response.status_code, 200)

#         rangos_esperados = ["0-10", "10-20", "20-30", "30-40", "40-50", "50-60", "60-70", "70-80", "80-90"]

#         data = response.json()
#         self.assertIsInstance(data, list)
#         for i in range (0, len(data)):
#             item = data[i]
#             if i == 0:
#                 self.assertIn("Minuto", item)
#                 self.assertIn("Local", item)
#                 self.assertIn("Visitante", item)
#             else:
#                self.assertIn(item[0], rangos_esperados)

class RadarPlayerTestCase(TestCase):
    def test_radar_player(self):
        player_id = 3306
        url = f'/api/events/players/{player_id}/radar/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, dict)
        self.assertIn("goles", data)
        self.assertIn("faltas", data)
        self.assertIn("pases", data)
        self.assertIn("tiros", data)
        self.assertIn("intercepciones", data)
        self.assertIn("asistencias", data)

class EventCountPlayerTestCase(TestCase):
    def test_event_count_player(self):
        player_id = 3306
        url = f'/api/events/players/{player_id}/events_count/'

        response = self.client.get(url)

        self.assertEqual(response.status_code, 200)

        data = response.json()
        self.assertIsInstance(data, dict)
        self.assertIn("goles", data)
        self.assertIn("faltas", data)
        self.assertIn("tiros", data)
        self.assertIn("asistencias", data)

# class EventosPorPartidoPlayerTestCase(TestCase):
#     def test_eventos_por_partido(self):
#         player_id = 3306
#         url = f'/api/events/players/{player_id}/events_by_match/'

#         response = self.client.get(url)

#         self.assertEqual(response.status_code, 200)

#         data = response.json()
#         self.assertIsInstance(data, list)
#         for item in data:
#             self.assertIsInstance(item, dict)
#             self.assertIn("goles", item)
#             self.assertIn("faltas", item)
#             self.assertIn("asitencias", item)
#             self.assertIn("amarillas", item)
#             self.assertIn("rojas", item)