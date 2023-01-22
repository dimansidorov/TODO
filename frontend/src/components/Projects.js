import React from "react";

const ProjectItem = ({project}) => {
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
        </tr>
    )
}


const ProjectList = ({projects}) => {
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
            {projects.map((project) => <ProjectItem project={project}/>)}
            </tbody>
        </table>
    );
}

export default ProjectList;