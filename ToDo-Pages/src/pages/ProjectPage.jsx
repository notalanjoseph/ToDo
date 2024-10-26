import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';

const ProjectPage = () => {
  const { id } = useParams(); // Get the project id from the URL
  const [todos, setTodos] = useState([]);
  const [projectTitle, setProjectTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    const fetchProjectDetails  = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        const projectData = response.data; 
        setTodos(projectData.todos.map(item => item.Todo));  // Extract todos from response
        setProjectTitle(projectData.title);  // Set the current project title
        setNewTitle(projectData.title);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchProjectDetails();
  }, [id]);

  const handleRename = async () => {
    try {
      await api.put(`/projects/${id}/rename`, {
        title: newTitle,
      });
      setProjectTitle(newTitle); // Update the displayed project title after renaming
      alert('Project renamed successfully');
    } catch (error) {
      console.error('Error renaming project:', error);
    }
  };

  return (
    <div>
      <h1>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Project Name"
        />
        <button onClick={handleRename}>Rename</button>
      </h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <p>Description: {todo.description}</p>
            <p>Status: {todo.status ? 'Completed' : 'Incomplete'}</p>
            <p>Created at: {new Date(todo.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(todo.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
