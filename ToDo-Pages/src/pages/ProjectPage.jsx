import { useParams } from 'react-router-dom';
import TodoList from '../components/TodoList';

const ProjectPage = () => {
  const { projectId } = useParams();

  return (
    <div>
      <TodoList projectId={projectId} />
    </div>
  );
};

export default ProjectPage;
