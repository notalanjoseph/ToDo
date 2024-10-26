import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState(''); // For new project title
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        const projectData = response.data.map(item => item.Project);
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectAdded = (newProject) => {
    // Use spread operator to include the new project at the beginning of the list
    setProjects([...projects, newProject.Project]); 
    setTitle(''); // Clear the input after adding
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects/create', { title });
      handleProjectAdded(response.data); // Add the new project to the list
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`); // Navigate to ProjectPage with the project id
  };

  return (
    <div>
      <h1>Your Projects</h1>

      {/* Add Project */}
      <form onSubmit={handleAddProject}>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Project Title" 
          required 
        />
        <button type="submit">Add Project</button>
      </form>

      {/* List of Projects */}
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <button onClick={() => handleProjectClick(project.id)}>{project.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
