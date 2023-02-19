import React from 'react'

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props.projects[0]?.id,
            text: '',
            creator: props.users[0]?.id
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.text)
        console.log(this.state.project)
        console.log(this.state.creator)
        console.log(this.state.users)
    }


    handleSubmit(event) {

        this.props.createNote(this.state.project, this.state.text, this.state.creator)
        event.preventDefault()
        console.log(this.state.text)
        console.log(this.state.project)
        console.log(this.state.creator)
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">Проект</label>
                    <select name="project" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option
                            value={item.id}>{item.title}</option>)}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="text">name</label>
                    <input type="text" className="form-control" name="text"
                           value={this.state.text} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="creator">Creator</label>
                    <select name="creator" className='form-control'
                            onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option
                            value={item.id}>{item.username}</option>)}
                    </select>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>

        )
    }
}

export default NoteForm;

