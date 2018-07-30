import React from 'react';
import {ToastContainer} from 'react-toastr';

import homeContentService from '../../../../../services/homeContent/homeContentService'

// Helpers
import {Button, Grid} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import {TOASTR_MESSAGES} from '../../../../../data/constants/componentConstants';

class CarouselItem extends React.Component {
    constructor(props) {
        super(props);

    }

    deleteItem = (itemId) => {

        homeContentService
            .deleteCarouselItem(itemId)
            .then(res => {
                this.toastContainer.success(TOASTR_MESSAGES.successCarouselItemDelete, '', {
                    closeButton: false,
                });

                setTimeout(() => window.location.reload(), 3000)

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };

    render() {

        const {id, imageUrl} = this.props.item;

        return (

            <tr>
                <td>
                    <ToastContainer
                        ref={ref => this.toastContainer = ref}
                        className="toast-bottom-right"
                    />
                    <img src={imageUrl} alt="carouselItem-image"/>
                </td>
                <td>
                    <span>
                        <Link className={"btn-custom md"} to={'/carousel-item/edit/' + id}>
                            <span className="glyphicon glyphicon-pencil"></span></Link>
                        <Button className={"default md"} style={{margin: 5 + 'px'}} onClick={() => this.deleteItem(id)}>
                            <span className="glyphicon glyphicon-erase"></span></Button>
                    </span>

                </td>
            </tr>

        );
    }
}

export default CarouselItem;
