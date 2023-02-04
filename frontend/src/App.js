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

    obtainAuthToken(login, password) {
        axios
            .post('http://127.0.0.1:8002/api-auth-token/', {
                username: login,
                password,
            })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                this.setState({
                    token,
                }, this.getData);
            });
    }
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
                this.setState({
                        'projects': projects['results']
                    },
                );
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/notes', {headers})
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes
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

    componentDidMount() {
        this.getTokenFromBack();
    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
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
                    <Routes>
                        <Route path='/' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/notes' element={<NoteList notes={this.state.notes}/>}/>
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