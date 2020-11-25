import React from 'react';

import PropTypes from 'prop-types'
import {Link} from "react-router-dom";

// Constants
import {BUTTONS_BG} from '../../../../../../data/constants/componentConstants'

class Teaser extends React.Component {

    render() {

        const {imageUrl, heading, text, buttonLink, buttonText} = this.props;

        let buttonContent = buttonText ? buttonText : BUTTONS_BG.seeProducts

        return (


            <article className="article-box">
                <div className="article-image">
                    <img src={'images/sections/' + imageUrl} alt={imageUrl}/>
                </div>

                <div className="article-content">
                    <h2 className={'article-heading'} dangerouslySetInnerHTML={{__html: heading}}/>
                    <p className={'article-text'} dangerouslySetInnerHTML={{__html: text}}/>
                    {buttonLink &&
                    <Link className={'btn btn-custom primary sm'} to={buttonLink}>{buttonContent}</Link>
                    }

                    {buttonText && !buttonLink &&
                    <p className={'accent'}>{buttonContent}</p>
                    }

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