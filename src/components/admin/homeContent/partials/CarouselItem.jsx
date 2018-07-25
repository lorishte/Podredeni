import React from 'react';

// Helpers
import {Grid, Row} from 'react-bootstrap';

//Partials
import CarouselItemEditButton from './CarouselItemEditButton';

class CarouselItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const {id, imageUrl, heading} = this.props.item;

        return (
            <Grid id="carouselItem">

                <Row>
                    <tr>{imageUrl}</tr>
                    <tr>{heading}</tr>
                    <tr>
                        <CarouselItemEditButton

                            id={id}
                        />
                    </tr>
                </Row>
            </Grid>
        );
    }
}

export default CarouselItem;
