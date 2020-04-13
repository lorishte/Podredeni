import React from 'react';

import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

// Constants
import {BUTTONS_BG} from '../../../../../../data/constants/componentConstants'

class Teaser extends React.Component {

    render() {

        const {imageUrl, heading, text, buttonLink} = this.props;

        return (


            <article className="article-box">
                <div className="article-image">
                    <img src={imageUrl}/>
                </div>

                <div className="article-content">
                    <h4 className={'article-heading'} dangerouslySetInnerHTML={{__html: heading}}/>
                    <p className={'article-text'} dangerouslySetInnerHTML={{__html: text}}/>
                    <Link className={'btn btn-custom primary sm'} to={buttonLink}>{BUTTONS_BG.seeProducts}</Link>
                </div>
            </article>
        )


    }
}

export default Teaser;

Teaser.propTypes = {
    imageUrl: PropTypes.string,
    heading: PropTypes.string,
    text: PropTypes.string,
    buttonLink: PropTypes.string
}