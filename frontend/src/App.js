import React from 'react'
import './App.css';
import axios from 'axios';
import UserList from './components/User';
import ProjectList from "./components/Projects";
import NoteList from "./components/Notes";
import Header from './components/header';
import Footer from './components/footer';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

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
        }

    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results;
                this.setState({
                        'projects': projects
                    },
                );
            });

        axios.get('http://127.0.0.1:8000/api/notes')
            .then(response => {
                const notes = response.data.results
                this.setState(
                    {
                        'notes': notes
                    }
                )
            })
            .catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState(
                    {
                        'users': users,
                    }
                )
            })
            .catch(error => console.log(error))

    }

    render() {
        return (
            <div className='container'>
                <BrowserRouter>
                    <Header/>
                    <Routes>
                        <Route path='/' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/notes' element={<NoteList notes={this.state.notes}/>}/>
                        <Route path='/users' element={<UserList users={this.state.users}/>}/>
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
