import React, { useState, useEffect, useRef } from 'react';
import { FaPlus, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { projectsAPI } from '../../services/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
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

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description
      });
      setImagePreview(`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.image}`);
    } else {
      setEditingProject(null);
      setFormData({ name: '', description: '' });
      setImagePreview(null);
    }
    setSelectedImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
    setFormData({ name: '', description: '' });
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!editingProject && !selectedImage) {
      toast.error('Please select an image');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    if (selectedImage) {
      data.append('image', selectedImage);
    }

    try {
      if (editingProject) {
        await projectsAPI.update(editingProject._id, data);
        toast.success('Project updated successfully');
      } else {
        await projectsAPI.create(data);
        toast.success('Project added successfully');
      }
      fetchProjects();
      closeModal();
    } catch (error) {
      toast.error('Failed to save project');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsAPI.delete(id);
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
        console.error('Error:', error);
      }
    }
  };

  if (loading) {
    return <div className="admin-card">Loading projects...</div>;
  }

  return (
    <div>
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, padding: 0, border: 'none' }}>Project Management</h2>
          <button className="btn btn-primary" onClick={() => openModal()}>
            <FaPlus style={{ marginRight: '8px' }} />
            Add Project
          </button>
        </div>

        {projects.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
            No projects added yet. Click "Add Project" to get started.
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>
                    <img 
                      src={`${process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000'}${project.image}`} 
                      alt={project.name} 
                    />
                  </td>
                  <td><strong>{project.name}</strong></td>
                  <td>{project.description.substring(0, 100)}...</td>
                  <td>
                    <button 
                      className="action-btn edit"
                      onClick={() => openModal(project)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(project._id)}
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
              <h2>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
              <button className="modal-close" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Image</label>
                {imagePreview && (
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="image-preview"
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
                <label>Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter project description"
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
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
