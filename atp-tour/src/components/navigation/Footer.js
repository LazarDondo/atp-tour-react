import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';


const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <h6>About</h6>
                        <p className="text-justify">As a global governing body of men’s professional tennis
                            the ATP’s mission is to serve tennis.
                            We entertain a billion global fans,
                            showcase the world’s greatest players at the most prestigious tournaments,
                            and inspire the next generation of fans and players. From the ATP Cup in Australia,
                            to Europe, the Americas and Asia,
                            the stars of the game battle for titles and ATP Rankings points at ATP Masters 1000,
                            500 and 250 events, and Grand Slams.,
                            All roads lead towards the Nitto ATP Finals,
                            the prestigious season finale held in Turin, Italy.,
                            Featuring only the world’s top 8 qualified singles players and doubles teams,,
                            the tournament also sees the official crowning of the year-end ATP World No. 1,
                            the ultimate achievement in tennis.</p>
                    </div>

                    <div className="col-xs-6 col-md-3 quick-access">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                            <li><Link to="tournament">Tournaments</Link></li>
                            <li><Link to="player">Players</Link></li>
                            <li><Link to="matches">Matches</Link></li>
                        </ul>
                    </div>

                    <div className="col-xs-6 col-md-3 quick-access">
                        <h6>Categories</h6>
                        <ul className="footer-links">
                            <li><Link to="tournament">Tournaments</Link></li>
                            <li><Link to="player">Players</Link></li>
                            <li><Link to="matches">Matches</Link></li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 col-sm-6 col-xs-12">
                        <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by
                            <Link to="#">ATP</Link>.
                        </p>
                    </div>

                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <ul className="social-icons">
                            <li><a className="facebook" target="_blank" href="https://www.facebook.com/ATPTour" rel="noreferrer"><FontAwesomeIcon icon={[faCoffee]}/></a></li>
                            <li><a className="twitter" target="_blank" href="https://twitter.com/atptour" rel="noreferrer"><FontAwesomeIcon icon={[faCoffee]}/></a></li>
                            <li><a className="linkedin" target="_blank" href="https://www.linkedin.com/company/atp-always-ready" rel="noreferrer"><FontAwesomeIcon icon={['fab', 'google']}/></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;