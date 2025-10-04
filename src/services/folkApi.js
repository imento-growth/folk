const FOLK_API_URL = 'https://api.folk.app/v1';
const API_KEY = 'FOLKu9YbLOHCzABCobrjcDqHTVk41tHm';

export const folkApi = {
  // Récupérer tous les contacts
  async getContacts() {
    try {
      const response = await fetch(`${FOLK_API_URL}/contacts`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des contacts:', error);
      throw error;
    }
  },

  // Récupérer un contact spécifique
  async getContact(contactId) {
    try {
      const response = await fetch(`${FOLK_API_URL}/contacts/${contactId}`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération du contact:', error);
      throw error;
    }
  },

  // Récupérer tous les groupes
  async getGroups() {
    try {
      const response = await fetch(`${FOLK_API_URL}/groups`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors de la récupération des groupes:', error);
      throw error;
    }
  }
};