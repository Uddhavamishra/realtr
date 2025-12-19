import React, { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope, FaPhone, FaUser, FaCity } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { contactsAPI } from '../../services/api';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await contactsAPI.getAll();
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactsAPI.delete(id);
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (error) {
        toast.error('Failed to delete contact');
        console.error('Error:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="admin-card">Loading contact forms...</div>;
  }

  return (
    <div>
      <div className="admin-card">
        <h2>Contact Form Submissions</h2>

        {contacts.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No contact form submissions yet.
          </p>
        ) : (
          <div>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Total submissions: <strong>{contacts.length}</strong>
            </p>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>City</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaUser style={{ color: '#667eea' }} />
                        <strong>{contact.fullName}</strong>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaEnvelope style={{ color: '#667eea' }} />
                        <a href={`mailto:${contact.email}`} style={{ color: '#1976d2' }}>
                          {contact.email}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaPhone style={{ color: '#667eea' }} />
                        <a href={`tel:${contact.mobile}`} style={{ color: '#1976d2' }}>
                          {contact.mobile}
                        </a>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCity style={{ color: '#667eea' }} />
                        {contact.city}
                      </div>
                    </td>
                    <td style={{ color: '#666', fontSize: '14px' }}>
                      {formatDate(contact.createdAt)}
                    </td>
                    <td>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(contact._id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;
