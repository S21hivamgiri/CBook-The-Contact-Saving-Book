import React, { Component } from 'react'
import ContactService from '../services/contact.service'
import { Link } from 'react-router-dom'

export default class viewcontact extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            emerusers: [],
            view: "grid",
            vclass: "fa fa-list  my-3 mx-3"
        }
    }
    componentDidMount() {
        ContactService.getUserContact().then(res => {
            this.setState({
                users: res.data
            });
        });
        ContactService.getEmergencyContact().then(res => {
            this.setState({
                emerusers: res.data
            });
        });
    }
    handleSetItem() {
        if (this.state.view === "grid")
            this.setState({
                view: "list",
                vclass: "fa fa-table  my-3 mx-3"
            });
        else {
            this.setState({
                view: "grid",
                vclass: "fa fa-list  my-3 mx-3"
            });
        }
    }
    
    handleSelect(item) {
        item = "this.refs." + item;
        var copyText = eval(item);
        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }
    
    render() {
        return (
            <div className="container">
                <div className="jumbotron py-0">
                    <div className="row">
                        <div className="col-12 col-md-9 col-sm-9 col-xl-9 col-lg-9 py-2" >
                            <h1>
                                <i class="fa fa-address-book" aria-hidden="true"></i>
                                Your Contact List
                            </h1>
                        </div>
                        <div className="col-12 col-md-3 col-sm-3 col-xl-3 col-lg-3 py-2" >
                            <button className="btn btn-outline-warning py-0 px-0" onClick={() => this.handleSetItem()}>
                                <i className={this.state.vclass} aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="border-top border-warning"></div>
                        <div className="alert alert-warning block col-12">
                            <div className="text-warning h1 text-center py-2">  VIP contacts</div>
                            <div className="text-center">
                                {this.state.emerusers.length ? <span /> : <div className="text-center">The Emergency List is Empty</div>}
                            </div>
                            <div className="row ">
                                {
                                    this.state.view === "grid" && this.state.emerusers.map((item) => {
                                        return (
                                            <div className="col-12 col-md-3 col-sm-3 col-xl-3 col-lg-3 py-2 mx-auto" >
                                                <div className="card border border-warning" style={{ display: 'inline-flex' }}>
                                                    <Link to={{ pathname: `/profile/${item._id}` }}>
                                                        <div className="text-dark bg-warning h5 py-3">
                                                            <span className="h2">
                                                                <i class="fa fa-ship" aria-hidden="true"></i>
                                                            </span>
                                                            <span style={{ textTransform: 'capitalize' }}>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <h1>
                                                            <i class="fa fa-user-circle  text-warning "></i>
                                                        </h1>
                                                    </Link>
                                                    <div className="card-body">
                                                        <div style={{ display: "inline-block" }}>
                                                            <div className="border-top border-warning" />
                                                            <h5 className="card-title text-warning">
                                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                                {item.code + "-"}
                                                                <span ref={"id" + item._id}>
                                                                    {item.contact}
                                                                </span>
                                                            </h5>
                                                            <button className=" btn btn-xs btn-warning px-0 py-0 mx-0 my-0" onClick={() => this.handleSelect("id" + item._id)}>
                                                                <small><small>Copy</small></small>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {
                                    this.state.view === "list" && this.state.emerusers.map((item) => {
                                        return (
                                            <div className="col-12 col-md-12 col-sm-12 col-xl-12 col-lg-12 py-2">
                                                <div className="border border-warning row">
                                                    <div className="col-12 col-md-4 col-sm-4 col-xl-4 col-lg-4 py-2 border-right">
                                                        <Link to={{ pathname: `/profile/${item._id}` }}>
                                                            <div className="bg-warning text-white h5 py-3">
                                                                <span className="h2">
                                                                    <i class="fa fa-user" aria-hidden="true"> </i>
                                                                </span>
                                                                <span style={{ textTransform: 'capitalize' }}>
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                            <h1>
                                                                <i class="fa fa-user-circle text-warning" aria-hidden="true"></i>
                                                            </h1>
                                                        </Link>
                                                    </div>
                                                    <div className="col-12 col-md-8 col-sm-8 col-xl-8 col-lg-8 py-2 bg-white">
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning">
                                                                <i class="fa fa-phone" aria-hidden="true"></i>
                                                                {item.code + "-"}
                                                                <span ref={"id" + item._id} >
                                                                    {item.contact}
                                                                </span>
                                                            </h5>
                                                            <button className=" btn btn-xs btn-warning px-3 py-1 mx-3 my-3" onClick={() => this.handleSelect("id" + item._id)}>
                                                                Copy
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="border-top border-warning">
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.state.view === "grid" && this.state.users.map((item) => {
                                    return (
                                        <div className="col-12 col-md-3 col-sm-3 col-xl-3 col-lg-3 py-2 mx-auto">
                                            <div className="card border border-secondary" style={{ display: 'inline-flex' }}>
                                                <Link to={{ pathname: `/profile/${item._id}` }}>
                                                    <div className="bg-secondary text-white h5 py-3">
                                                        <span className="h2">
                                                            <i class="fa fa-user" aria-hidden="true"></i>
                                                        </span>
                                                        <span style={{ textTransform: 'capitalize' }}>
                                                            {item.name}
                                                        </span>
                                                    </div>
                                                    <h1>
                                                        <i class="fa fa-user-circle text-secondary" aria-hidden="true"></i>
                                                    </h1>
                                                </Link>
                                                <div className="card-body">
                                                    <div style={{ display: "inline-block" }}>
                                                        <div className="border-top border-secondary" />
                                                        <h5 className="card-title text-secondary">
                                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                                            {item.code + "-"}
                                                            <span ref={"id" + item._id} >
                                                                {item.contact}
                                                            </span>
                                                        </h5>
                                                        <button className=" btn btn-xs btn-secondary px-0 py-0 mx-0 my-0" onClick={() => this.handleSelect("id" + item._id)}>
                                                            <small><small>Copy</small></small>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {
                                this.state.view === "list" && this.state.users.map((item) => {
                                    return (
                                        <div className="col-12 col-md-12 col-sm-12 col-xl-12 col-lg-12 py-2">
                                            <div className="border border-secondary row">
                                                <div className="col-12 col-md-4 col-sm-4 col-xl-4 col-lg-4 py-2 border-right">
                                                    <Link to={{ pathname: `/profile/${item._id}` }}>
                                                        <div className="bg-secondary text-white h5 py-3">
                                                            <span className="h2"><i class="fa fa-user" aria-hidden="true"></i></span>
                                                            <span style={{ textTransform: 'capitalize' }}>{item.name}</span>
                                                        </div>
                                                        <h1>
                                                            <i class="fa fa-user-circle text-secondary" aria-hidden="true"></i>
                                                        </h1>
                                                    </Link>
                                                </div>
                                                <div className="col-12 col-md-8 col-sm-8 col-xl-8 col-lg-8 py-2 bg-white">
                                                    <div className="card-body">
                                                        <div>
                                                            <table className=" my-0 py-0">
                                                                <tr>
                                                                    <td className="text-left">
                                                                        <h5 className="card-title text-secondary">
                                                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                                                            {item.code + "-"}
                                                                            <span ref={"id" + item._id}>
                                                                                {item.contact}
                                                                            </span>
                                                                        </h5>
                                                                    </td>
                                                                    <td className="text-right" >
                                                                        <button className=" btn btn-xs btn-secondary px-3 py-1 mx-3 my-3" onClick={() => this.handleSelect("id" + item._id)}>
                                                                            Copy
                                                                    </button>
                                                                    </td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
