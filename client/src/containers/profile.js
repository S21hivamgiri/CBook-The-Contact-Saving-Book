import React, { Component } from 'react'
import ContactService from '../services/contact.service'

export default class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [], id: ''
        }
    }

    handleSelect() {
        var copyText = this.refs.id;
        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
    }

    handleDelete() {
        ContactService.deleteContact(this.state.id).then(res => {
            if (res.status === 201 || res.status === 200) {
                this.props.history.push("/viewcontact");
            }
        });
    }

    handleEdit() {
        this.props.history.push("/edit/" + this.state.id);
    }

    componentDidMount() {
        var kid = this.props.match.params.id;
        ContactService.searchUserbyId(kid).then(res => {
            setTimeout(() => {
                this.setState({ users: res.data, id: kid });
            }, 1)
        });
    }
    
    render() {
        return (
            <div className="container">
                <div class="row">
                    <div className="col-12 col-md-4 col-sm-4 col-xl-4 col-lg-4" ></div>
                    <div className="col-12 col-md-4 col-sm-4 col-xl-4 col-lg-4" >
                        <div className="alert alert-warning border-borser-secondary my-0">
                            <table className="table">
                                <tbody>
                                    <tr className="h3">
                                        <td><i class="fa fa-user" aria-hidden="true"></i></td>
                                        <td style={{ textTransform: 'capitalize' }}>{this.state.users.name}</td>
                                    </tr>
                                    <tr className="h3">
                                        <td> <i class="fa fa-phone" aria-hidden="true"></i></td>
                                        <td> {this.state.users.code + "-"} <span ref={"id"} >{this.state.users.contact}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                            <table class="table">
                                <tbody>
                                    <tr className="h5">
                                        <td><i class="fa fa-envelope" aria-hidden="true"></i></td>
                                        <td>{this.state.users.email}</td>
                                    </tr>
                                    <tr className="h5">
                                        <td> <i class="fa fa-address-book" aria-hidden="true"></i></td>
                                        <td> {this.state.users.address}</td>
                                    </tr>
                                    <tr className="h5">
                                        <td> <i class="fa fa-flag" aria-hidden="true"></i></td>
                                        <td>{this.state.users.country}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button className="btn btn-secondary mx-2 my-1" title="Edit Your Contact" onClick={() => this.handleEdit()}>
                                Edit
                            </button>
                            <button className="btn btn-secondary mx-2 my-1" title="Copy Contact Number to Keyboard" onClick={() => this.handleSelect()}>
                                Contact to Clipboard
                            </button>
                            <button className="btn btn-danger mx-2 my-1" data-toggle="modal" data-target="#myModal" title="Delete Your Contact">
                                Delete
                            </button>
                            <div id="myModal" class="modal fade" role="dialog">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header row alert alert-warning">
                                            <div className="col-12 col-md-1 col-sm-1 col-xl-1 col-lg-1" >
                                                <button type="button " class="close" data-dismiss="modal">&times;</button>
                                            </div>
                                            <h4 class="modal-title">
                                                Confirm Delete
                                            </h4>
                                        </div>
                                        <div class="modal-body">
                                            <p>Are you sure to delete<span style={{ textTransform: "capitalize" }}> {this.state.users.name}</span></p>
                                            <div class="text-right">
                                                <button type="submit" onClick={() => this.handleDelete()} class="btn btn-warning" data-dismiss="modal">
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 col-sm-4 col-xl-4 col-lg-4" />
                </div>
            </div>
        )
    }
}
