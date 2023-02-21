import React from "react";
import {Link} from "react-router-dom";

const NoteItem = ({note, deleteNote}) => {
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
                    {note.creator.id}
                </td>
                <td>
                    <button type='button' className="btn btn-outline-primary"
                            onClick={() => deleteNote(note.id)}>Delete
                    </button>
                </td>
            </tr>
        )
    }
}


const NoteList = ({notes, deleteNote}) => {
    return (
        <div>

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
                {notes.map((note) => <NoteItem key={note.id.toString()} note={note} deleteNote={deleteNote}/>)}
                </tbody>
            </table>
            <Link to='/notes/create'>Создать заметку</Link>
        </div>
    );
}


export default NoteList;
