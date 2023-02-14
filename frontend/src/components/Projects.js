import React from "react";

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

    );
}

export default ProjectList;