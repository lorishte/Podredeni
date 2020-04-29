import React from 'react';

// Partials
import AboutTeasers from './aboutTeasers/AboutTeasers';
import CarouselContent from './carousel/CarouselContent';

// Helpers
import {Grid, Tabs, Tab} from 'react-bootstrap';


class HomeContent extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            <Grid id="home-content">

                <Tabs defaultActiveKey={1} id="homeContent-tabs">

                    <Tab eventKey={1} title="Карусел">
                        <CarouselContent/>
                    </Tab>

                    <Tab eventKey={2} title="Статия">
                        <AboutTeasers />
                    </Tab>
                </Tabs>

            </Grid>
        );
    }
}

export default HomeContent;
