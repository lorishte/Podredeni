import React from 'react';
import {Link} from 'react-router-dom';
import {confirmAlert} from "react-confirm-alert";
import {ToastContainer} from "react-toastr";

// Partials
import CarouselItem from './partials/CarouselItem';


// Services
import homeContentService from "../../../../services/homeContent/homeContentService";


// Constants
import {BUTTONS_BG, CONFIRM_DIALOGS, TOASTR_MESSAGES} from '../../../../data/constants/componentConstants';


class CarouselContent extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            carouselItems: []
        }
    }

    componentDidMount() {
        this.loadCarouselItems();
    }

    loadCarouselItems = () => {
        homeContentService
            .loadCarouselItems()
            .then(res => {
                this.setState({carouselItems: res.carouselItems});
            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });

    };

    deleteCarouselItem = (itemId) => {
        homeContentService
            .deleteCarouselItem(itemId)
            .then(res => {
                this.toastContainer.success(TOASTR_MESSAGES.successCarouselItemDelete, '', {
                    closeButton: false,
                });

                setTimeout(() => window.location.reload(), 3000);

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });
            });
    };


    confirmDelete = (itemId) => {
        confirmAlert({
            title: '',
            message: CONFIRM_DIALOGS.deleteCarouselItem,
            buttons: [{
                label: BUTTONS_BG.yes,
                onClick: () => this.deleteCarouselItem(itemId)
            },
                {label: BUTTONS_BG.no}]
        });
    };


    render() {

        let carouselItems = this.state.carouselItems;

        let items = [];

        if (carouselItems.length > 0) {
            items = carouselItems.map(i => {
                return <CarouselItem key={i.id} item={i} deleteItem={this.deleteItem}/>;
            });
        }

        return (
            <div id="carousel-content">
                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <div className="buttons-container">
                    <Link className={'btn btn-success btn-md'}
                          to={'/carousel-item/create/'}>{BUTTONS_BG.create}
                    </Link>
                </div>

                <div id="carousel-items-list">
                    {items}
                </div>

            </div>
        );
    }


}

export default CarouselContent;
