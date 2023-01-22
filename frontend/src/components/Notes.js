import React from "react";


const NoteItem = ({note}) => {
    if (note.active) {
        return (
        <tr>
            <td>
                {note.project}
            </td>
            <td>
                {note.text}
            </td>
            <td>
                {note.created_at}
            </td>
            <td>
                {note.updated_at}
            </td>
            <td>
                {note.creator.username}
            </td>
        </tr>
    )
    }
}


const NoteList = ({notes}) => {
    return (
        <table className="container">
            <thead>
                <tr>
                    <th>
                        Проект
                    </th>
                    <th>
                        Текст
                    </th>
                    <th>
                        Создана
                    </th>
                    <th>
                        Отредактирована
                    </th>
                    <th>
                        Автор
                    </th>
                </tr>
            </thead>
            <tbody>
            { notes.map((note) => <NoteItem note={note} />) }
            </tbody>
        </table>
    );
}

export default NoteList;
