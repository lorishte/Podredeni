import React from 'react';
import {Link} from 'react-router-dom';

import {TERMS_AND_CONDITIONS} from '../../data/constants/componentConstants';

class Footer extends React.Component {

    render() {
        if (sessionStorage.getItem('role') === 'admin') return null;

        let currentYear = new Date().getFullYear();

        return (
            <footer>

                <div className="wrapper">

                    <Link to="/terms" className="terms">{TERMS_AND_CONDITIONS.terms}</Link>

                    <div className="social-media-icons">
                        <a className="icon" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/VakanciaSportOchila/">
                            <i className="fa fa-facebook-official" aria-hidden="true"/>
                        </a>
                        <a className="icon" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/podredeni.eu">
                            <i className="fa fa-instagram" aria-hidden="true"/>
                        </a>
                    </div>

                    <div className="copy">
                        <span> &copy; {currentYear} podredeni.eu</span>
                    </div>

                </div>
            </footer>
        );
    }
}

export default Footer;

