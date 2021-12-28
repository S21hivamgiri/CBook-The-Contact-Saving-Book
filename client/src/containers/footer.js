import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class footer extends Component {
    render() {
        return (
            <div>
                <footer className="bg-dark align-bottom footer py-0 px-0 mx-0" style={{
                    clear: "both", width: "100%", bottom: "0", position: "relative",
                    left: "0", textAlign: " center", display: "inline-block"}}>
                    <div className="bg-dark border-top border-warning" />
                    <div className="container">
                        <div className=" text-center "><span className="h5 border-bottom border-top border-light text-light" style={{ fontFamily: 'Quantico' }}>Connect With Us</span>
                        </div>
                        <div className="container">
                            <ul className="list-unstyled list-inline text-center h1 ">
                                <li className="list-inline-item px-4">
                                    <span className="text-warning  display-5 ">
                                        <i className="fa fa-facebook-f"> </i>
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning display-5 ">
                                        <i className="fa fa-snapchat"> </i>
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-google-plus" aria-hidden="true" />
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-twitter"> </i>
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-youtube" aria-hidden="true" />
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-instagram" aria-hidden="true" />
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-linkedin" aria-hidden="true" />
                                    </span>
                                </li>
                                <li className="list-inline-item px-4">
                                    <span className="text-warning rounded-circle display-5 ">
                                        <i className="fa fa-dribbble"> </i>
                                    </span>
                                </li>
                            </ul>
                        </div>
                        <div className="alert btn-outline-warning btn-warning text-center"><span className="text-dark strong">© 2019 Copyright:</span>
                            <span className="text-dark h5 border-bottom border-dark">
                                <Link to={{ pathname: `/` }}>
                                    www.cbook.com
                                </Link>
                            </span>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}