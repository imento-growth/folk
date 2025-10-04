import { useState, useEffect } from 'react';
import { folkApi } from '../services/folkApi';
import './Dashboard.css';

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [contactsData, groupsData] = await Promise.all([
        folkApi.getContacts(),
        folkApi.getGroups()
      ]);
      
      setContacts(contactsData.contacts || []);
      setGroups(groupsData.groups || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error">
          <h3>Erreur</h3>
          <p>{error}</p>
          <button onClick={loadData}>Réessayer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>📊 Dashboard Folk CRM</h1>
        <button onClick={loadData} className="refresh-btn">
          🔄 Actualiser
        </button>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Contacts</h3>
          <p className="stat-number">{contacts.length}</p>
        </div>
        <div className="stat-card">
          <h3>Groupes</h3>
          <p className="stat-number">{groups.length}</p>
        </div>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'contacts' ? 'active' : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
        <button 
          className={`tab ${activeTab === 'groups' ? 'active' : ''}`}
          onClick={() => setActiveTab('groups')}
        >
          Groupes
        </button>
      </div>

      {activeTab === 'contacts' && (
        <div className="data-section">
          <h2>Liste des contacts</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Entreprise</th>
                  <th>Téléphone</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.contactId}>
                    <td>{contact.name || '-'}</td>
                    <td>{contact.email || '-'}</td>
                    <td>{contact.company || '-'}</td>
                    <td>{contact.phone || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {contacts.length === 0 && (
              <p className="no-data">Aucun contact trouvé</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'groups' && (
        <div className="data-section">
          <h2>Liste des groupes</h2>
          <div className="groups-grid">
            {groups.map((group) => (
              <div key={group.groupId} className="group-card">
                <h3>{group.name}</h3>
                <p>{group.contactCount || 0} contacts</p>
              </div>
            ))}
            {groups.length === 0 && (
              <p className="no-data">Aucun groupe trouvé</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;