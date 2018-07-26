import React from 'react';

// Helpers
import {Grid, Row} from 'react-bootstrap';

//Partials
import CarouselItemEditButton from './buttons/CarouselItemEditButton';

class CarouselItem extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        const {id, imageUrl, heading} = this.props.item;

        return (

            <tr>
                <td>
                    <img src={imageUrl} alt="carouselItem-image"/>
                </td>
                <td>
                    {heading}
                </td>
                <td>
                    <CarouselItemEditButton

                        id={id}
                    />
                </td>
            </tr>

        );
    }
}

export default CarouselItem;
