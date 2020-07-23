import React from 'react'
import { Router, BrowserRouter, Route, Switch } from "react-router-dom";
import { CookiesProvider } from 'react-cookie'
import Login from './Login'
import PostList from './posts/PostList'
import Register from './Register'
import Header from './Header';
import Profile from './Profile'
import OtherProfiles from './OtherProfiles';
import Channel from './Channel'

class App extends React.Component{
    render() {
        return (
            <CookiesProvider>
                <BrowserRouter>
                    <Header />
                    <Switch>
                        <Route exact path='/' component={PostList} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/profile' component={Profile} />
                        <Route exact path='/otherprofile/:id' component={OtherProfiles} />
                        <Route exact path='/channel/:id' component={Channel} />
                    </Switch>
                </BrowserRouter>
            </CookiesProvider>
        )
    }
}

export default App;