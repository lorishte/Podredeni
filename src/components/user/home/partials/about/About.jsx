import React from 'react';
import PropTypes from 'prop-types'
import {Grid} from 'react-bootstrap';

// Partials
import Teaser from "./partials/Teaser";

// Services
import miscDataService from "../../../../../services/miscData/miscDataService";

// Constants
import {TOASTR_MESSAGES} from "../../../../../data/constants/componentConstants";


class About extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            aboutText: {},
            teasersText: [],

            loading: true
        };
    }

    componentDidMount () {
        this.loadHomeContent();
    }

    loadHomeContent = () => {
        miscDataService
            .loadMiscData('homeAboutTeasers')
            .then(res => {

                let data = JSON.parse(res);

                this.setState({
                    aboutText: data.aboutText,
                    teasersText: data.teasersText.filter(e => e.isVisible),
                    loading: false
                })
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    render() {

        if (this.state.loading) return <div className="loader"/>

        let teasers = this.state.teasersText.map(e => {
            return <Teaser key={e.imageUrl} imageUrl={e.imageUrl} heading={e.heading} text={e.text} buttonLink={e.buttonLink} buttonText={e.buttonText}/>
        })

        return (
            <Grid id={'home-about'}>

                <div className={'section-heading'} dangerouslySetInnerHTML={{__html: this.state.aboutText.heading}}/>
                <div className={'section-text'} dangerouslySetInnerHTML={{__html: this.state.aboutText.text}}/>

                {teasers}
            </Grid>
        );
    }
}

export default About;

About.propTypes = {
}