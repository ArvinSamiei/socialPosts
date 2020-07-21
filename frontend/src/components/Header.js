import React from 'react'
import { connect } from "react-redux";
import './Header.css'
import {Link} from 'react-router-dom'
import {withCookies} from 'react-cookie'
import { login } from "../actions";

class Header extends React.Component{
    state = {activeTabClassName: 'home'}
    homeRef = React.createRef();
    loginRef = React.createRef();
    profileRef = React.createRef();

    componentDidMount() {
        let currentTab = window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
        if(currentTab === ''){
            this.setState({activeTabClassName: 'home'})
        }
        else{
            this.setState({activeTabClassName: currentTab})
        }
        
    }

    componentDidUpdate(prevProps, prevtState) {
        if(prevtState.activeTabClassName == this.state.activeTabClassName && !(this.props.isLoggedIn === true && prevProps.isLoggedIn === false)){
            return
        }
        let currentTab = ''
        if(this.props.isLoggedIn === true && prevProps.isLoggedIn === false){
            currentTab = ''    
        }
        else{
            currentTab = window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
        }
        
        if(currentTab === ''){
            this.setState({activeTabClassName: 'home'})
        }
        else{
            this.setState({activeTabClassName: currentTab})
        }
    }

    handleClick = (e) => {
        this.setState({activeTabClassName: e.target.name})
    }

    logout = () => {
        this.props.cookies.remove('token')
        this.props.login(false);
        this.setState({activeTabClassName: ''})
    }

    renderLogin = () =>{
        if(!this.props.cookies.get('token'))
            return <Link name="login" onClick={this.handleClick} ref={this.loginRef} className={(this.state.activeTabClassName === "login") ? "active" : ""} to='/login'>Login</Link>
        else 
            return null
    }

    renderSignup = () =>{
        if(!this.props.cookies.get('token'))
            return <Link name="register" onClick={this.handleClick} ref={this.loginRef} className={(this.state.activeTabClassName === "register") ? "active" : ""} to='/register'>Register</Link>
        else 
            return null
    }

    renderHome = () => {
        if(this.props.cookies.get('token'))
            return <Link name="home" onClick={this.handleClick} ref={this.homeRef} className={(this.state.activeTabClassName === "home") ? "active" : ""} to='/'>Home</Link>
        else return null
    }

    renderProfile = () => {
        if(this.props.cookies.get('token'))
            return <Link name="profile" onClick={this.handleClick} ref={this.profileRef} className={(this.state.activeTabClassName === "profile") ? "active" : ""} to='/profile'>Profile</Link>
        else return null
    }

    renderLogout = () => {
        if(this.props.cookies.get('token'))
            return <Link name="logout" onClick={this.logout} className={(this.state.activeTabClassName === "logout") ? "active" : ""} to='/login'>Logout</Link>
        else return null
    }

    render() {
        return (
            <div className="topnav">
                {this.renderHome()}
                {this.renderLogin()}
                {this.renderProfile()}
                {this.renderLogout()}
                {this.renderSignup()}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return ({
	isLoggedIn: state.login,
})};

export default connect(mapStateToProps, { login })(withCookies(Header));