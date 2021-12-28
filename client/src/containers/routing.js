import React, { Component } from 'react'

import { Route, Switch } from "react-router-dom";
import Statistics from './statistics';
import Viewcontact from './viewcontact';
import Addcontact from './addcontact';
import Home from './home';
import Feedback from './feedback';
import Profile from './profile';
import Edit from './edit';

export default class routing extends Component {
    render() {
        return (
            <Switch>
                <Route path="/profile/:id" component={Profile} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/viewcontact" component={Viewcontact} />
                <Route path="/addcontact" component={Addcontact} />
                <Route path="/feedback" component={Feedback} />
                <Route path="/edit/:id" component={Edit} />
                <Route path="/" component={Home} />
            </Switch>
        )
    }
}
