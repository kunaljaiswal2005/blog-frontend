import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 🔴 यह line add करो!
  const API_URL = import.meta.env.VITE_API_URL || 'https://blog-backend-f56m.onrender.com';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first!');
      navigate('/login');
      return;
    }

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      
      // 🔴 यहाँ API_URL use करो!
      await axios.post(`${API_URL}/api/posts`, postData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert('✅ Post created successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <div className="create-post-page">
      <h2>Write a New Post</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Write your post content here..."
          value={formData.content}
          onChange={handleChange}
          rows="15"
          required
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated, e.g: tech, coding, tutorial)"
          value={formData.tags}
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary">Publish Post</button>
      </form>
    </div>
  );
}

export default CreatePost;