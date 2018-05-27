import React from 'react';
import {Link} from 'react-router-dom';

import {TERMS_AND_CONDITIONS} from '../../data/constants/componentConstants';

class Footer extends React.Component {

    render() {
        if (sessionStorage.getItem('role') === 'admin') return null;

        return (
            <footer>

                <div  className="facebook-wrapper">
                    <div className="fb-like"
                         data-href="https://podredeni.eu"
                         data-layout="button_count"
                         data-action="like"
                         data-size="large"
                         data-show-faces="false"
                         data-share="true"></div>


                    <div className="fb-page"
                         data-href="https://www.facebook.com/moiteochila"
                         data-tabs=""
                         data-small-header="true"
                         data-adapt-container-width="false"
                         data-hide-cover="false"
                         data-show-facepile="false">
                        <blockquote cite="https://www.facebook.com/moiteochila"
                                    className="fb-xfbml-parse-ignore">
                            <a href="https://www.facebook.com/moiteochila">PODREDeni</a>
                        </blockquote>
                    </div>
                </div>

                <br/>

                <div className="wrapper">
                    <div className="copy">
                        <p> &copy; 2018 podredeni.eu</p>
                    </div>


                    {/*<div className="fb-like"*/}
                         {/*data-href="https://podredeni.eu"*/}
                         {/*data-layout="button_count"*/}
                         {/*data-action="like"*/}
                         {/*data-size="large"*/}
                         {/*data-show-faces="false"*/}
                         {/*data-share="true"></div>*/}


                    {/*<div className="fb-page"*/}
                         {/*data-href="https://www.facebook.com/moiteochila"*/}
                         {/*data-tabs=""*/}
                         {/*data-small-header="true"*/}
                         {/*data-adapt-container-width="false"*/}
                         {/*data-hide-cover="false"*/}
                         {/*data-show-facepile="false">*/}
                        {/*<blockquote cite="https://www.facebook.com/moiteochila"*/}
                                    {/*className="fb-xfbml-parse-ignore">*/}
                            {/*<a href="https://www.facebook.com/moiteochila">PODREDeni</a>*/}
                        {/*</blockquote>*/}
                    {/*</div>*/}

                    <Link to="/terms">{TERMS_AND_CONDITIONS.terms}</Link>


                    {/*<div className="created-by">*/}
                    {/*<p> A web page by <a href="" target="_blank" className="text-accent-secondary">US</a>*/}
                    {/*</p>*/}
                    {/*</div>*/}
                </div>
            </footer>
        );
    }
}

export default Footer;
