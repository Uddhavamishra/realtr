import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { clientsAPI } from '../../services/api';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    designation: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await clientsAPI.getAll();
      setClients(response.data);
    } catch (error) {
      toast.error('Failed to fetch clients');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setFormData({
        name: client.name,
        description: client.description,
        designation: client.designation
      });
      setImagePreview(`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${client.image}`);
    } else {
      setEditingClient(null);
      setFormData({ name: '', description: '', designation: '' });
      setImagePreview(null);
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingClient(null);
    setFormData({ name: '', description: '', designation: '' });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.designation) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!editingClient && !selectedImage) {
      toast.error('Please select an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('designation', formData.designation);
    if (selectedImage) {
      data.append('image', selectedImage);
    }

    try {
      if (editingClient) {
        await clientsAPI.update(editingClient._id, data);
        toast.success('Client updated successfully');
      } else {
        await clientsAPI.create(data);
        toast.success('Client added successfully');
      }
      fetchClients();
      closeModal();
    } catch (error) {
      toast.error('Failed to save client');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await clientsAPI.delete(id);
        toast.success('Client deleted successfully');
        fetchClients();
      } catch (error) {
        toast.error('Failed to delete client');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div className="admin-card">Loading clients...</div>;
  }

  return (
    <div>
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, padding: 0, border: 'none' }}>Client Management</h2>
          <button className="btn btn-primary" onClick={() => openModal()}>
            <FaPlus style={{ marginRight: '8px' }} />
            Add Client
          </button>
        </div>

        {clients.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No clients added yet. Click "Add Client" to get started.
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td>
                    <img 
                      src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${client.image}`} 
                      alt={client.name}
                      style={{ borderRadius: '50%' }}
                    />
                  </td>
                  <td><strong>{client.name}</strong></td>
                  <td>{client.designation}</td>
                  <td>{client.description.substring(0, 80)}...</td>
                  <td>
                    <button 
                      className="action-btn edit"
                      onClick={() => openModal(client)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(client._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingClient ? 'Edit Client' : 'Add New Client'}</h2>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Client Image</label>
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
                    style={{ borderRadius: '50%', width: '150px', height: '150px' }}
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                />
                <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                  Image will be automatically cropped to 450x350 pixels
                </small>
              </div>

              <div className="form-group">
                <label>Client Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Designation</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  placeholder="e.g., CEO, Web Developer, Designer"
                  required
                />
              </div>

              <div className="form-group">
                <label>Testimonial / Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter client testimonial"
                  rows="4"
                  required
                  style={{ 
                    width: '100%', 
                    padding: '12px 15px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                {editingClient ? 'Update Client' : 'Add Client'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
