import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';

const ProjectPage = () => {
  const { id } = useParams(); // Get the project id from the URL
  const [projectTitle, setProjectTitle] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');


  useEffect(() => {
    const fetchProjectDetails  = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        const projectData = response.data; 
        setProjectTitle(projectData.title);  // Set the current project title
        setNewTitle(projectData.title);
        setTodos(projectData.todos.map(item => item.Todo));  // Extract todos from response
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
      setProjectTitle(newTitle); // Update the displayed project title
      alert('Project renamed successfully');
    } catch (error) {
      console.error('Error renaming project:', error);
    }
  };

const handleExport = async () => {
  try {
    const response = await api.get(`/projects/${id}/markdown`, {
      responseType: 'blob' // Specify that you're expecting a blob (binary) response
    });
    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create a link and trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${projectTitle}.md`); // Download as .md file
    document.body.appendChild(link);
    link.click();
    // Clean up by removing the link after the download starts
    link.remove();
  } catch (error) {
    console.error('Error exporting project:', error);
  }
};

  const handleTodoAdd = async () => {
    try {
      await api.post(`/projects/${id}/todos/create`, { description: newTodo });
      setNewTodo('');
      const response = await api.get(`/projects/${id}`);
      const projectData = response.data;
      setTodos(projectData.todos.map(item => item.Todo)); // Extract todos from response
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleTodoUpdate = async (todoId, description, status) => {
    try {
      await api.put(`/projects/${id}/todos/update/${todoId}`, {
        description,
        status,
      });
      const response = await api.get(`/projects/${id}`);
      const projectData = response.data;
      setTodos(projectData.todos.map(item => item.Todo)); // Extract todos from response
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleTodoDelete = async (todoId) => {
    try {
      await api.delete(`/projects/${id}/todos/delete/${todoId}`);
      // Update the state to remove the deleted todo
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold m-6">Detailed Project View</h1>
        <div className="flex items-center space-x-4 mb-6">
          <Label htmlFor="project-name">Project: </Label>
          <Input
            id="project-name"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Project Name"
          />
          <Button onClick={handleRename}>Rename</Button>
          <Button onClick={handleExport}>Export</Button>
        </div>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center space-x-4 space-y-2 ml-10">
            <Input
              type="text"
              value={todo.description}
              className="w-auto"              
              onChange={(e) => {
                const updatedTodos = todos.map(t =>
                  t.id === todo.id ? { ...t, description: e.target.value } : t
                );
                setTodos(updatedTodos);
              }}
            />
            <label>
              Status:
              <input
                type="checkbox"
                checked={todo.status}
                onChange={(e) => {
                  const updatedTodos = todos.map(t =>
                    t.id === todo.id ? { ...t, status: e.target.checked } : t
                  );
                  setTodos(updatedTodos);
                }}
                className="ml-1"
              />
            </label>
            <Button variant="secondary" onClick={() => handleTodoUpdate(todo.id, todo.description, todo.status)}>Update</Button>
            <Button variant="destructive" onClick={() => handleTodoDelete(todo.id)}>Delete</Button>
            <p>Created at: {new Date(todo.created_at).toLocaleString()}</p>
            <p>Updated at: {new Date(todo.updated_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      {/* add Todo */}
      <div className="flex items-center space-x-4 mt-4 ml-10">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
          className="w-auto"
        />
        <Button onClick={handleTodoAdd}>Add Todo</Button>
      </div>

    </div>
  );
};

export default ProjectPage;
