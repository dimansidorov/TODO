import React from 'react'
import './App.css';
import axios from 'axios';
import UserList from './components/User';
import ProjectList from "./components/Projects";
import NoteList from "./components/Notes";
import Footer from './components/footer';
import LoginForm from "./components/Auth";
import {BrowserRouter, Link, Navigate, Route, Routes} from 'react-router-dom';
import Cookies from "universal-cookie/es6";

import NoteForm from "./components/NoteForm";
import ProjectForm from "./components/ProjectForm";

const NotFound404 = () => {
    return (
        <h1>Страницы по данному адресу не существует.</h1>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'projects': [],
            'notes': [],
            'users': [],
            'token': []
        }

    }

    // obtainAuthToken(login, password) {
    //     axios
    //         .post('http://127.0.0.1:8002/api-auth-token/', {
    //             username: login,
    //             password,
    //         })
    //         .then((response) => {
    //             const token = response.data.token;
    //             localStorage.setItem('token', token);
    //             this.setState({
    //                 token,
    //             }, this.getData);
    //         });
    // }

    setToken(token) {
        const cookies = new Cookies();
        cookies.set('token', token)
        this.setState({'token': token}, () => this.loadData())
    }


    isAuthenticated() {
        return this.state.token !== '';
    }


    logout() {
        this.setToken('')
    }

    getTokenFromBack() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.loadData())
    }

    getToken(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {
            username: username,
            password: password
        })
            .then(response => {
                this.setToken(response.data['token'])
            });
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'token ' + this.state.token
            // console.log(headers['Authorization'])
        }

        return headers
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data;
                // console.log(projects)
                this.setState({
                        'projects': projects['results']
                    },
                );
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes', {headers})
            .then(response => {
                const notes = response.data
                // console.log(notes)
                this.setState(
                    {
                        'notes': notes['results']
                    }
                );
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                    }
                );
            })
            .catch(error => console.log(error))

    }

    deleteNote(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/notes/${id}`, {headers})
            .then(response => {
                this.setState({
                    notes: this.state.notes.filter((note) => note.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.getHeaders()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                this.setState({
                    projects: this.state.projects.filter((project) => project.id !==
                        id)
                })
            }).catch(error => console.log(error))
    }

    createNote(project, text, creator) {
        const headers = this.getHeaders()
        const data = {project: project, text: text, creator: creator}
        axios.post(`http://127.0.0.1:8000/api/notes/`, data, {headers})
            .then(response => {
                let newNote = response.data
                const project = this.state.projects.filter((item) => item.id ===
                    newNote?.project)[0]
                const creator = this.state.users.filter((item) => item.id ===
                    newNote.creator)[0]
                newNote.creator = creator
                newNote.project = project
                this.setState({notes: [...this.state.notes, newNote]})

            }).catch(error => console.log(error))
    }

    createProject(title, link, creators) {
        const headers = this.getHeaders()
        const data = {title: title, link: link, creators: creators}
         axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                let newProject = response.data
                const creators = [this.state.users.filter((item) => item.id ===
                    newProject.creator)[0]]
                newProject.creators = creators
                this.setState({projects: [...this.state.projects, newProject]})
            }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTokenFromBack();
    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                    <div className="container">
                        <nav className="container">
                            <ul className="nav nav-pills">
                                <li className="nav-item nav-link">
                                    <Link to='/'>Проекты</Link>
                                </li>
                                <li className="nav-item nav-link">
                                    <Link to='/notes'>Заметки</Link>
                                </li>
                                <li className="nav-item nav-link">
                                    <Link to='/users'>Пользователи</Link>
                                </li>
                                <li className="nav-item nav-link">
                                    {
                                        this.isAuthenticated()
                                            ? <button className="btn btn-outline-primary me-2"
                                                      onClick={() => this.logout()}>Выйти</button>
                                            : <Link to='/login'>Авторизоваться</Link>
                                    }
                                </li>
                            </ul>
                        </nav>
                        {/*<div>*/}
                        {/*    {*/}
                        {/*        this.isAuthenticated()*/}
                        {/*            ? <button className="btn btn-outline-primary me-2"*/}
                        {/*                      onClick={() => this.logout()}>Выйти</button>*/}
                        {/*            : <Link to='/login'>Авторизоваться</Link>*/}
                        {/*    }*/}

                        {/*</div>*/}
                    </div>

                    <Routes>
                        <Route path='/' element={<ProjectList projects={this.state.projects}
                                                              deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route path='/createproject' element={<ProjectForm users={this.state.users}
                                                                           createProject={(title, link, creators) =>
                                                                               this.createProject(title, link, creators)}/>}/>
                        <Route path='/notes' element={<NoteList notes={this.state.notes}
                                                                createNote={(project, text, creator) =>
                                                                           this.createNote(project, text, creator)}
                                                                deleteNote={(id) => this.deleteNote(id)}/>}/>
                        <Route path='/notes/create' element={<NoteForm users={this.state.users}
                                                                       projects={this.state.projects}
                                                                       createNote={(project, text, creator) =>
                                                                           this.createNote(project, text, creator)}/>}/>

                        <Route path='/users' element={<UserList users={this.state.users}/>}/>
                        <Route path='/login' element={<LoginForm
                            getToken={(username, password) => this.getToken(username, password)}/>}/>
                        <Route path='/projects' element={<Navigate to='/'/>}/>
                        <Route path='*' element={<NotFound404/>}/>
                    </Routes>

                    <Footer/>

                </BrowserRouter>
            </div>
        );
    }

}

export default App;