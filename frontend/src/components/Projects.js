import React from "react";
import {Link} from "react-router-dom";

const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                {project.title}
            </td>
            <td>
                {project.link}
            </td>
            <td>
                {JSON.stringify(project.creators)}
            </td>
            <td>
                <button type='button' className="btn btn-outline-primary"
                        onClick={() => deleteProject(project.id)}>Delete</button>
            </td>

        </tr>
    )
}


const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
            <table className="container">
            <thead>
            <tr>
                <th>
                    Название
                </th>
                <th>
                    Ссылка
                </th>
                <th>
                    Создатели
                </th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem key={project.id.toString()} project={project}
            deleteProject={deleteProject}/>)}
            </tbody>
        </table>
        <Link to='/createproject'>Создать проект</Link>
        </div>

    );
}

export default ProjectList;