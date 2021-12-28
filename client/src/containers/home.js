import React, { Component } from 'react';
import Image from '../images/images.jpg';

export default class home extends Component {
    handleHomeClick() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="jumbotron my-0">
                        <div className="display-2 col-12 text-center">
                            Welcome to &nbsp; 
                            <span className=" text-warning display-3" onClick={() => this.handleHomeClick()}>
                                <i class="fa fa-user" aria-hidden="true"></i>
                                CBooK &nbsp; &nbsp;
                            </span>
                        </div>
                        <div className="text-light alert" style={{
                            backgroundImage: `url(${Image})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            width: "100 %",
                            backgrounSize: "cover", display: "inline-block"
                        }}>
                            <div className="container px-5">
                                <div className="container px-5">
                                    <div className="container px-5">
                                        <div className="alert px-5 text-warning alert-transparent">
                                            <div>
                                                <div >
                                                    <p className="text-warning font-weight-bold">
                                                        <h1 className="display-4 font-weight-bold">
                                                            <i class="fa fa-address-book" aria-hidden="true"></i>
                                                            Your ContactBook
                                                        </h1>
                                                        <br />
                                                    </p>
                                                    <div className="border-top border-warning" />
                                                    <span className=" my-5 alert alert-transparent font-weight-bold">
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis nobis mollitia molestias nesciunt doloribus
                                                        repudiandae nostrum. Dolorem aliquid autem magnam pariatur. Quis sed soluta
                                                        voluptatibus corporis consequuntur facilis ab quae excepturi? Eum quas dolore omnis sequi tempora labore molestiae vitae.
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-warning font-weight-bold h2">
                            Enjoy Our Community
                        </p>
                        <hr className="my-2" />
                        <p>
                            <span className="text-warning font-weight-bold h5 border-bottom border-warning">
                                Checkout Our facilities
                            </span>
                        </p>
                        <p className="lead">
                            <div className="text-center d-flex justify-content-center">
                                <ul className="list-group w-50">
                                    <li className="list-group-item bg-transparent">Add Your Contact</li>
                                    <li className="list-group-item bg-transparent">Modify Your Contact</li>
                                    <li className="list-group-item bg-transparent">Display Your Contact</li>
                                    <li className="list-group-item bg-transparent">Search Your Contact</li>
                                    <li className="list-group-item bg-transparent">Your Statistics</li>
                                </ul>
                            </div>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}