import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import './Header.css';


class Header extends React.Component {

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                    aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul id="navLinks" className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="tournament">Tournaments</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="player">Players</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="matches">Matches</Link>
                        </li>
                    </ul>
                    <div id="atp" className="navbar-brand" to="#"><img id="logo" src={logo} alt='logo' /></div>
                    <div id="greetingsMessage">Greetings <br />''userinfo'</div>
                    <div>
                        <Link className="language" to="#" onClick="">eng</Link>
                        <Link className="language" to="#" onClick="">срп</Link>
                    </div >
                    <Link className="nav-link" to="login">Login</Link>
                    <Link className="nav-link" to="player" onClick="logout()" > Logout</Link >
                </div >
            </nav >
        );
    }
}

export default Header;