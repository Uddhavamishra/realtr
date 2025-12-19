import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { FaHome, FaProjectDiagram, FaUsers, FaEnvelope, FaNewspaper, FaBars } from 'react-icons/fa';
import Dashboard from '../components/Admin/Dashboard';
import ProjectManagement from '../components/Admin/ProjectManagement';
import ClientManagement from '../components/Admin/ClientManagement';
import ContactList from '../components/Admin/ContactList';
import NewsletterList from '../components/Admin/NewsletterList';
import './AdminPanel.css';

const AdminPanel = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/projects', label: 'Projects', icon: <FaProjectDiagram /> },
    { path: '/admin/clients', label: 'Clients', icon: <FaUsers /> },
    { path: '/admin/contacts', label: 'Contact Forms', icon: <FaEnvelope /> },
    { path: '/admin/newsletter', label: 'Newsletter', icon: <FaNewspaper /> },
  ];

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="admin-panel">
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <FaHome />
            <span>RealTrust</span>
          </Link>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/" className="back-to-site">
            ← Back to Website
          </Link>
        </div>
      </aside>
      
      <main className="admin-main">
        <header className="admin-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1>Admin Panel</h1>
        </header>
        
        <div className="admin-content">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="contacts" element={<ContactList />} />
            <Route path="newsletter" element={<NewsletterList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
