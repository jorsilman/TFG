import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

class ApiService {
  
  static async getGoalEventsPlayers(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/goals/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAssistEventsPlayers(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/assitant/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFoulEventsPlayers(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/fouls/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFreeKicksEventsPlayers(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/free_kicks/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEventosPlayer(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/events_count/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getEventosPorPartidoPlayer(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/events_by_match/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getRadarPlayerData(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/players/${param}/radar/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getGoalEventsTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/goals/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAssistEventsTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/assitant/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getResultsTeam(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/results/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFoulEventsTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/fouls/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFreeKicksEventsTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/free_kicks/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getGoalsByMinuteTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/goalsByMinute/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFoulsByMinuteTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/foulsByMinute/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }  

  static async getSankeyTeams(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/sankey/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getTopScorers(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/topScorers/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getTopAssistants(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/topAssistants/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getDiverging(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/divergingChart/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getRadarTeam(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/radar/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getCoeficiente(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/teams/${param}/attack/`);
      return response.data.coeficiente;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } 

  static async getGoalEventsMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/goals/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAssistEventsMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/assitant/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFoulEventsMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/fouls/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFreeKicksEventsMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/free_kicks/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getGoalsByMinuteMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/goalsByMinute/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getFoulsByMinuteMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/foulsByMinute/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getTopScorersMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/topScorers/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getTopAssistantsMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/topAssistants/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getDivergingMatches(param) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/events/matches/${param}/divergentChart/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMatches() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/matches/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPlayers() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/players/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getTeams() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teams/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getConfiguraciones() {
    try {
      const response = await axios.get(`${API_BASE_URL}/configuraciones/`);
      return response.data.configuraciones;
    } catch (error) {
      console.error('Error al obtener las configuraciones:', error);
      throw error;
    }
  }

  static async eliminarConfiguracion(id) {
    try {
      await axios.delete(`${API_BASE_URL}/configuraciones/${id}/delete/`);
    } catch (error) {
      console.error('Error al eliminar la configuración:', error);
      throw error;
    }
  }

  static async getConfiguracion(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/configuraciones/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async guardarConfiguracion(formData) {
    try {
      const response = await axios.post('http://localhost:8000/configuraciones/', formData);
      return response.data;
    } catch (error) {
      console.error('Error al guardar la configuración:', error);
      throw error;
    }
  }

  static async getTeam(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/teams/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPlayer(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/players/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getMatch(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/matches/${id}/`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}

export default ApiService;