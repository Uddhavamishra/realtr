import React, { useState, useEffect } from 'react';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { newsletterAPI } from '../../services/api';

const NewsletterList = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await newsletterAPI.getAll();
      setSubscribers(response.data);
    } catch (error) {
      toast.error('Failed to fetch subscribers');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this subscriber?')) {
      try {
        await newsletterAPI.unsubscribe(id);
        toast.success('Subscriber removed successfully');
        fetchSubscribers();
      } catch (error) {
        toast.error('Failed to remove subscriber');
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

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed On'],
      ...subscribers.map(sub => [sub.email, formatDate(sub.subscribedAt)])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  if (loading) {
    return <div className="admin-card">Loading subscribers...</div>;
  }

  return (
    <div>
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, padding: 0, border: 'none' }}>Newsletter Subscribers</h2>
          {subscribers.length > 0 && (
            <button className="btn btn-secondary" onClick={exportToCSV}>
              Export to CSV
            </button>
          )}
        </div>

        {subscribers.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No newsletter subscribers yet.
          </p>
        ) : (
          <div>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              Total subscribers: <strong>{subscribers.length}</strong>
            </p>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email Address</th>
                  <th>Subscribed On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber, index) => (
                  <tr key={subscriber._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <FaEnvelope />
                        </div>
                        <a href={`mailto:${subscriber.email}`} style={{ color: '#1976d2', fontWeight: 500 }}>
                          {subscriber.email}
                        </a>
                      </div>
                    </td>
                    <td style={{ color: '#666' }}>
                      {formatDate(subscriber.subscribedAt)}
                    </td>
                    <td>
                      <button 
                        className="action-btn delete"
                        onClick={() => handleDelete(subscriber._id)}
                      >
                        <FaTrash /> Remove
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

export default NewsletterList;
