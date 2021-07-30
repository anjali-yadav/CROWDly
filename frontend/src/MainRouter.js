import React from 'react'
import {Route, Switch } from 'react-router-dom'
import Home_ from './components/Home_'
import Signup from './components/pages/auth/Signup'
import Signin from './components/pages/auth/Signin'
import Users from './components/pages/user/Users'
import EditProfile from './components/pages/user/EditProfile'
import Profile from './components/pages/user/Profile'
import PrivateRoute from './components/pages/auth/PrivateRoute'
import Box from '@material-ui/core/box'
import CreatePost from './components/pages/user/CreatePost'

function MainRouter() {
    return (
        <Box style={{minHeight:"68vh"}}>
        <Switch>
            <Route exact path="/" component={Home_}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/signup" component={Signup}></Route>
            <PrivateRoute path="/users/edit/:userId" component={EditProfile}/>
            <PrivateRoute path="/create" component={CreatePost}></PrivateRoute>
            <Route path="/users/:userId" component={Profile}/>
        </Switch>
        </Box>
    )
}

export default MainRouter
