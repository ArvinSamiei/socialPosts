import React from 'react'
import { withCookies } from 'react-cookie'
import {withRouter} from 'react-router-dom'
import Menu from './Menu'

class PostList extends React.Component{
    render() {
        if (this.props.cookies.get('token')) {
            return <Menu />
        }
        else{
            this.props.history.push('./login')
            return null
        }
    }
}

export default withRouter(withCookies(PostList))