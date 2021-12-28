import React, { Component } from 'react'
import Navbar from "./navbar";
import Routing from "./routing";
import Footer from "./footer";
import { BrowserRouter as Router } from "react-router-dom";

export default class layout extends Component {
    render() {
        return (
            <Router>
                <Navbar></Navbar>
                <Routing></Routing>
                <Footer></Footer>
            </Router>
        )
    }
}
