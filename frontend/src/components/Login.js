import React from 'react'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import {withCookies} from 'react-cookie'
import { login } from "../actions";
import axios from 'axios';

class Login extends React.Component{
    state = {username: '', password: '', tried: false, error: false}

    passwordChanged = (e) => {
        this.setState({password: e.target.value})
    }

    usernameChanged = (e) => {
        this.setState({username: e.target.value})
        console.log(this.state.username)
    }

    handleSubmit = (e) => {
        this.setState({tried: true})
        e.preventDefault()
        axios.post('http://localhost:8000/auth/', {
            headers: {'Content-Type': 'application/json'},
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            if(res.status != 200){
                this.setState({error: true})
                return
            }
            console.log(res)
            this.props.cookies.set('token', res.data.token, { path: '/' })
            this.props.history.push('/')
            this.props.login(true);
        })
        .then(res => {
            
            
        })
    }

    render() {
        return (
            <div className="container">
                {this.state.tried && this.state.error? <h1 className='alert alert-danger'>Login Unsuccessful</h1>: null}
                <form style={{alignContent: 'center', alignItems: 'center', marginTop: 50}} onSubmit={this.handleSubmit}>
                    <h1 className="page-header" style={{marginBottom: 20}}>Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input value={this.state.username} onChange={this.usernameChanged} type="text" className="form-control" id="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={this.state.password} onChange={this.passwordChanged} type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
	isLoggedIn: state.login,
})};

export default connect(mapStateToProps, { login })(withCookies(withRouter(Login)))