import { useEffect, useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

  const handleProjectAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/projects/create', { title });
      alert('Project added!');
      //handleProjectAdded(response.data); // Add the new project to the list
      setProjects([...projects, response.data.Project]); 
      setTitle(''); // Clear the input

    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`); // Navigate to ProjectPage with the project id
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold mt-6">Your Projects</h1>

      {/* Add Project */}
      <form onSubmit={handleProjectAdd} className="flex space-x-4 max-w-sm">
        <Input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="Project Title" 
          required
        />
        <Button type="submit">Add Project</Button>
      </form>

      {/* List of Projects */}
      <ul className="w-full max-w-sm space-y-4">
        {projects.map(project => (
          <li key={project.id} className="flex justify-center">
            <button onClick={() => handleProjectClick(project.id)}>{project.title}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
