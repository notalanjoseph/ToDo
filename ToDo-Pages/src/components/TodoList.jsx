import { useEffect, useState } from 'react';
import { api } from '../api';

const TodoList = ({ projectId }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await api.get(`/projects/${projectId}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [projectId]);

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.description} - {new Date(todo.date).toLocaleDateString()} - {todo.completed ? 'Completed' : 'Pending'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
