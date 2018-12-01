import React from 'react';
import {Link} from 'react-router-dom';

import {TERMS_AND_CONDITIONS} from '../../data/constants/componentConstants';

class Footer extends React.Component {

    render() {
        if (sessionStorage.getItem('role') === 'admin') return null;

        return (
            <footer>

                <div className="wrapper">

                    <Link to="/terms" className="terms">{TERMS_AND_CONDITIONS.terms}</Link>

                    <div className="social-media-icons">
                        <a className="icon" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/moiteochila/">
                            <i className="fa fa-facebook-official" aria-hidden="true"/>
                        </a>
                        <a className="icon" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/podredeni.eu">
                            <i className="fa fa-instagram" aria-hidden="true"/>
                        </a>
                    </div>

                    <div className="copy">
                        <span> &copy; 2018 podredeni.eu</span>
                    </div>

                </div>
            </footer>
        );
    }
}

export default Footer;

{/*<div  className="facebook-wrapper">*/}
{/*<iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%2Fmoiteochila&tabs&width=340&height=70&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false&appId=602878320047542"*/}
{/*width="220"*/}
{/*height="70"*/}
{/*style={{"border":"none", "overflow":"hidden"}}*/}
{/*scrolling="no"*/}
{/*frameBorder="0"*/}
{/*allowtransparency="true"*/}
{/*allow="encrypted-media">*/}
{/*</iframe>*/}
{/*</div>*/}

{/*<iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fpodredeni.eu&width=62&layout=button_count&action=like&size=small&show_faces=false&share=false&height=21&appId=602878320047542"*/}
        {/*width="62"*/}
        {/*height="21"*/}
        {/*style={{"border":"none", "overflow":"hidden"}}*/}
        {/*scrolling="no"*/}
        {/*frameBorder="0"*/}
        {/*allowtransparency="true"*/}
        {/*allow="encrypted-media">*/}
{/*</iframe>*/}