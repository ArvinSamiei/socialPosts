import React from 'react'
import { withRouter } from 'react-router-dom'
import {withCookies} from 'react-cookie'
import ImageUploader from 'react-images-upload';
import axios from 'axios'

class Register extends React.Component{
    state = {credentials: {username: '', password: '', first_name: '', last_name: ''}, image: []}
    myRef = React.createRef();
    
    onDrop = (picture) => {
        this.setState({
            image: this.state.image.concat(picture),
        });
    }

    inputChanged = (e) => {
        let cred = this.state.credentials
        cred[e.target.id] = e.target.value
        this.setState({credentials: cred})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:8000/api/accounts/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({user: this.state.credentials})
        })
        .then(res => res.json())
        .then(res => {
            this.props.history.push('/login')
        //     let formData = new FormData();
        //     formData.append("image", this.state.image[0]);
        //     axios
		// 	.put(`http://localhost:8000/api/accounts/${res.id}/`, formData, {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     });
        })
    }

    render() {
        return (
            <form className="container" style={{alignContent: 'center', alignItems: 'center', marginTop: 50}} onSubmit={this.handleSubmit}>
                <h1 className="page-header" style={{marginBottom: 20}}>Register</h1>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input value={this.state.username} onChange={this.inputChanged} type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input value={this.state.firstname} onChange={this.inputChanged} type="text" className="form-control" id="first_name" />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input value={this.state.lastname} onChange={this.inputChanged} type="text" className="form-control" id="last_name" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={this.state.password} onChange={this.inputChanged} type="password" className="form-control" id="password" />
                </div>
                <div className="form-group" style={{marginTop: 20}}>
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
                
            </form>
        )
    }
}

export default withCookies(withRouter(Register))