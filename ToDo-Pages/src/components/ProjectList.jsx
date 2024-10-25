// import { useEffect, useState } from 'react';
// import { api } from '../api';
// import { Link } from 'react-router-dom';
// import AddProject from './AddProject';

// const ProjectList = () => {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await api.get('/projects');
//         setProjects(response.data);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };
//     fetchProjects();
//   }, []);

//   const handleProjectAdded = (newProject) => {
//     setProjects([...projects, newProject]);
//   };

//   return (
//     <div>
//       <h1>Your Projects</h1>
//       <AddProject onProjectAdded={handleProjectAdded} />
//       <ul>
//         {projects.map(project => (
//           <li key={project.id}>
//             <Link to={`/project/${project.id}`}>{project.title}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProjectList;


import { useEffect, useState } from 'react';
import { api } from '../api';
import { Link } from 'react-router-dom';
import AddProject from './AddProject';


const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get('/projects');
        // Extract the "Project" data from the response and update state
        const projectData = response.data.map(item => item.Project);
        setProjects(projectData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

    const handleProjectAdded = (newProject) => {
    setProjects([...projects, newProject]);
  };


  return (
    <div>
      <h1>Your Projects</h1>
            <AddProject onProjectAdded={handleProjectAdded} />

      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/project/${project.id}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
