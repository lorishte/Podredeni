import React from 'react';
import PropTypes from 'prop-types'
import {Grid} from 'react-bootstrap';

// Partials
import Teaser from "./partials/Teaser";

// Constants
import {teasersText, aboutText} from '../../../../../data/teasers';


class About extends React.Component {

    render() {

        let teasers = teasersText.map(e => {
            return <Teaser key={e.imageUrl} imageUrl={e.imageUrl} heading={e.heading} text={e.text} buttonLink={e.buttonLink}/>
        })

        return (
            <Grid id={'home-about'}>

                <div className={'section-heading'} dangerouslySetInnerHTML={{__html: aboutText.heading}}/>
                <div className={'section-text'} dangerouslySetInnerHTML={{__html: aboutText.text}}/>

                {teasers}
            </Grid>
        );
    }
}

export default About;

About.propTypes = {
}