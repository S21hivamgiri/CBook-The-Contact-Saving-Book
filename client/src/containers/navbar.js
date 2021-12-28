import React, { Component } from 'react'
import { NavLink } from "react-router-dom";
import ContactService from '../services/contact.service'
import { Link } from 'react-router-dom'
var search = '';

export default class navbar extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            emerusers: [],
            search: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit = (e) => {
        search = this.refs.search.value.toLowerCase();
        if (search !== "") {
            this.setState({
                search: search
            })
            ContactService.searchUserContact(search).then(res => {
                this.setState({
                    users: res.data||[]
                });
            });
            ContactService.searchEmergencyContact(search).then(res => {
                this.setState({
                    emerusers: res.data||[]
                });
            });
        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="nav-item dropdown">
                    </div>
                    <NavLink to="/" className="navbar-brand bg-warning text-dark border border-warning font-weight-bolder  h1" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#"> &nbsp; &nbsp; <i class="fa fa-user" aria-hidden="true"></i> CBooK &nbsp; &nbsp;</NavLink>
                    <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                        <NavLink to="/feedback" className="bg-dark dropdown-item text-warning"> <i className="fa fa-newspaper-o" aria-hidden="true" /> Drop a
                             FeedBack
                        </NavLink>
                        <div className="dropdown-divider border-bottom border-warning pb-0 mb-0" />
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <NavLink to="/" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Back TO HomePage"> <i class="fa fa-home" aria-hidden="true"></i> Home <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/statistics" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="View The Statistics"> <i class="fa fa-pie-chart" aria-hidden="true"></i> Statistics <span className="sr-only">(current)</span></NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/addcontact" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Add Your Contact"> <i class="fa fa-user-plus" aria-hidden="true"></i> Add Contact </NavLink>
                            </li>
                            <li className="nav-item active">
                                <NavLink to="/viewcontact" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="View Your Saved Contact"> <i class="fa fa-street-view" aria-hidden="true"></i> View Contact </NavLink>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0 dropdown">
                            <div class="form-group">
                                <input className="form-control mr-sm-2 border-warning" id="search" ref="search" type="search" placeholder="Search" aria-label="Search" />
                                <input type="submit" class="form-control btn btn-outline-warning my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown"
                                    id="navbarDropdown" value="Search" onClick={this.handleSubmit} />
                                <div class="dropdown-menu bg-light" aria-labelledby="navbarDropdown">
                                    <ul class="list-group">
                                        {
                                            this.state.emerusers.length?
                                            this.state.emerusers.map((item) => {
                                                return (
                                                    <Link to={{ pathname: `/profile/${item._id}`}}>
                                                        <li class="list-group-item" style={{ background: "#fff3cd" }} key={item._id}>
                                                            <span class="text-warning font">Name:</span>{item.name} <br /> <span class="text-warning font">Contact:</span>{item.contact}
                                                        </li>
                                                    </Link>
                                                )
                                            }): (<div>No Emergency Contact Found</div>)
                                        }
                                        {
                                            this.state.users.length ?
                                            this.state.users.map((item) => {
                                                return (
                                                    <Link to={{pathname: `/profile/${item._id}`}}>
                                                        <li class="list-group-item" key={item._id}>
                                                            <span class="text-secondary font">Name:</span>{item.name} <br /> <span class="text-secondary font">Contact:</span>{item.contact}
                                                        </li>
                                                    </Link>)
                                            }) : (<div>No User Contact Found</div>)
                                        }
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
                <div className="border-bottom border-warning " />
            </div>
        )
    }
}
