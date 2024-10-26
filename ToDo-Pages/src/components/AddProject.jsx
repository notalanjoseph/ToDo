import { useState } from 'react';
import { api } from '../api';

const AddProject = ({ onProjectAdded }) => {
  const [title, setTitle] = useState('');

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects/create', { title });
      onProjectAdded(response.data);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <form onSubmit={handleAddProject}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" required />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;
