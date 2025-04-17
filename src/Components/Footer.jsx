import React from 'react';
import { Link } from 'react-router-dom';
import "../Styles/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-4 col-xs-12">
                        <div className="single_footer">
                            <h4>Services</h4>
                            <ul>
                                <li><a href="#">Lorem Ipsum</a></li>
                                <li><a href="#">Simply dummy text</a></li>
                                <li><a href="#">The printing and typesetting </a></li>
                                <li><a href="#">Standard dummy text</a></li>
                                <li><a href="#">Type specimen book</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="single_footer single_footer_address">
                            <h4>Page Link</h4>
                            <ul>
                                <li><Link className="nav-link" to="/">Home</Link></li>
                                <li><Link className="nav-link" to="/about">About</Link></li>
                                <li><Link className="nav-link" to="">Lorem Ipsum</Link></li>
                                <li><Link className="nav-link" to="">Simply dummy text</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-4 col-xs-12">
                        <div className="single_footer single_footer_address">
                            <h4>Subscribe today</h4>
                            <div className="signup_form">
                                <form action="#" className="subscribe">
                                    <input type="text" className="subscribe_input" placeholder="Enter Email Address" />
                                    <button type="button" className="subscribe_btn"><i className="fas fa-paper-plane"></i></button>
                                </form>
                            </div>
                        </div>
                        <div className="social_profile">
                            <ul style={{paddingLeft:"0px"}}>
                                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                <li><a className="waves-effect waves-dark" href="#"><i className="fa-brands fa-youtube"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-sm-12 col-xs-12">
                        <p className="copyright">Copyright © 2019 <a href="#">Mayank Verma</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
