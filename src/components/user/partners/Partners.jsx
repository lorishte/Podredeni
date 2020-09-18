import React from 'react';
import {Grid, Col, Clearfix, Panel, PanelGroup} from 'react-bootstrap';
import {ToastContainer} from 'react-toastr';

// SEO
import SEO_MetaTags from '../../common/SEO/SEO_MetaTags'

// Services
import partnersService from '../../../services/partners/partnersService';

// Partials
import PartnerCard from './partials/PartnerCard';

// Constants
import {RESOLUTIONS} from '../../../data/constants/componentConstants';

class Partners extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            partners: [],
            cardsToDisplayOnRow: 0,
            resolution: window.innerWidth
        };
    }

    componentDidMount() {
        this.loadPartners();
        this.calculateCardsOnRow();
        window.addEventListener('resize', this.handleResolutionChange);
        window.addEventListener('orientationchange', this.handleResolutionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResolutionChange);
        window.removeEventListener('orientationchange', this.handleResolutionChange);
    }

    calculateCardsOnRow = () => {

        let resolution = this.state.resolution;

        if (resolution < RESOLUTIONS.bootstrapXS) {
            if (resolution < RESOLUTIONS.xs) {
                this.setState({cardsToDisplayOnRow: 1});
            } else {
                this.setState({cardsToDisplayOnRow: 2});
            }

        } else if (resolution < RESOLUTIONS.bootstrapSM) {
            this.setState({cardsToDisplayOnRow: 2});
        } else if (resolution < RESOLUTIONS.bootstrapMD) {
            this.setState({cardsToDisplayOnRow: 3});
        } else {
            this.setState({cardsToDisplayOnRow: 4});
        }
    };

    handleResolutionChange = () => {
        this.setState({resolution: window.innerWidth}, () => {
            this.calculateCardsOnRow();
        });
    };

    loadPartners = () => {
        partnersService.loadGroupedByCity()
            .then(res => {

                // let online = res.filter((a) => a.key === 'n/a')[0]


                let sofiaCity = res.filter((a) => a.key === 'София')[0];
                let otherCities = res.filter((a) => a.key !== 'София');
                // let otherCities = res.filter((a) => a.key !== 'n/a');

                let ordered = [];

                // ordered.push(online);
                ordered.push(sofiaCity);

                otherCities.forEach(e => {
                    ordered.push(e);
                });

                this.setState({partners: ordered});
            })
            .catch(err => {
                this.props.history.push('/error');
            });
    };

    render() {

        let partners;
        let cardsOnRow = this.state.cardsToDisplayOnRow;

        let resolution = this.state.resolution < RESOLUTIONS.xs;


        if (this.state.partners.length > 0) {
            partners = this.state.partners.map((el, i) => {

                let resultsRender = [];

                let partnerCards = el.value.map(p => {
                    return (
                        <Col key={p.id} lg={3} md={4} sm={6} xs={resolution ? 12 : 6}>
                            <PartnerCard partner={p}/>
                        </Col>);
                });

                for (let j = 1; j <= partnerCards.length; j++) {
                    resultsRender.push(partnerCards[j - 1]);

                    if (j % cardsOnRow === 0) {
                        resultsRender.push(<Clearfix key={j}/>);
                    }
                }

                let online = el.key === 'n/a'

                let eventKey = i.toString()

                return (

                    <Panel key={i} eventKey={eventKey}>

                        <Panel.Heading>
                            <Panel.Title componentClass="h3" toggle>{online ? 'Онлайн' : el.key}</Panel.Title>
                        </Panel.Heading>

                        <Panel.Body collapsible>
                            {resultsRender}
                        </Panel.Body>

                    </Panel>

                );
            });
        }

        let urlPath = this.props.location.pathname;


        return (
            <Grid id="partners">

                <SEO_MetaTags activeLanguage={'bg'} pageName={'partners'} url={urlPath}/>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <PanelGroup id="accordion-uncontrolled-example" accordion defaultActiveKey='0'>
                    {partners}
                </PanelGroup>


            </Grid>
        );
    }
}

export default Partners;