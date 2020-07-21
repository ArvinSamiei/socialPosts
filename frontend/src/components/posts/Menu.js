import React from 'react'
import './Menu.css'
import axios from 'axios'
import { withCookies } from 'react-cookie'

class Menu extends React.Component{
    state = {activeTab: 'following'}
    handleClick = (e) => {
        let name = e.target.name
        if (this.state.activeTab == name){
            return
        }
        this.setState({activeTab: name})
        this.getPosts('followings')
        
    }

    getPosts = (name) => {
        axios.get(`http://localhost:8000/api/posts/${name}/`, {headers: {
            Authorization: `Token ${this.props.cookies.get('token')}`
        }})
        .then(res => res.data)
        .then(resp => {console.log(resp)})
    }

    render(){
        if (this.props.cookies.get('token') !== undefined) {
            return (
                <div>
                    <button name='following' onClick={this.handleClick} className={this.state.activeTab === 'following'? 'btn btn-success': 'btn btn-primary'}>Following</button>
                    <button name='latest' onClick={this.handleClick} className={this.state.activeTab === 'latest'? 'btn btn-success': 'btn btn-primary'}>Latest</button>
                    <button name='hottest' onClick={this.handleClick} className={this.state.activeTab === 'hottest'? 'btn btn-success': 'btn btn-primary'}>Hottest</button>
                    <button name='participating' onClick={this.handleClick} className={this.state.activeTab === 'participating'? 'btn btn-success': 'btn btn-primary'}>Participating</button>
                    <div>

                    </div>
                </div>
            )
        }
        else{
            this.props.history.push('./login')
            return null
        }
        
    }
}

export default withCookies(Menu)