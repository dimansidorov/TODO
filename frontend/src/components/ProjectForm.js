import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            link: '',
            creators: props.users[0]
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
        console.log(this.state.title)
        console.log(this.state.link)
        console.log(this.state.creators)
    }

    handleSubmit(event) {

        this.props.createProject(this.state.title, this.state.link, this.state.creators)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="title">Название</label>
                    <input type="text" className="form-control" name="title"
                           value={this.state.title} onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Ссылка на репозиторий</label>
                    <input type="url" className="form-control" name="link"
                           value={this.state.link} onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="creators">Авторы проекта</label>
                    <select name="creators" className='form-control'
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

export default ProjectForm;