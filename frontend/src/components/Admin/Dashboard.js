import React, { useState, useEffect } from 'react';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaNewspaper } from 'react-icons/fa';
import { projectsAPI, clientsAPI, contactsAPI, newsletterAPI } from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, newsletterRes] = await Promise.all([
        projectsAPI.getAll(),
        clientsAPI.getAll(),
        contactsAPI.getAll(),
        newsletterAPI.getAll()
      ]);

      setStats({
        projects: projectsRes.data.length,
        clients: clientsRes.data.length,
        contacts: contactsRes.data.length,
        subscribers: newsletterRes.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="admin-card">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon projects">
            <FaProjectDiagram />
          </div>
          <div className="stat-info">
            <h3>{stats.projects}</h3>
            <p>Total Projects</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon clients">
            <FaUsers />
          </div>
          <div className="stat-info">
            <h3>{stats.clients}</h3>
            <p>Happy Clients</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon contacts">
            <FaEnvelope />
          </div>
          <div className="stat-info">
            <h3>{stats.contacts}</h3>
            <p>Contact Forms</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon newsletter">
            <FaNewspaper />
          </div>
          <div className="stat-info">
            <h3>{stats.subscribers}</h3>
            <p>Subscribers</p>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h2>Welcome to Admin Panel</h2>
        <p>Use the sidebar navigation to manage your website content:</p>
        <ul style={{ marginTop: '15px', marginLeft: '20px', lineHeight: '2' }}>
          <li><strong>Projects:</strong> Add, edit, or remove project listings</li>
          <li><strong>Clients:</strong> Manage client testimonials</li>
          <li><strong>Contact Forms:</strong> View submitted contact forms</li>
          <li><strong>Newsletter:</strong> View subscribed email addresses</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
