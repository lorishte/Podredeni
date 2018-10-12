import React from 'react';
import {ToastContainer} from 'react-toastr';
import {Grid} from 'react-bootstrap';

import CreatePopup from './partials/CreatePopup'

import FormInputField from '../../../common/formComponents/FormInputField'

import SortableVideos from './partials/SortableVideos';

import videosService from './../../../../services/videos/videosService'

import {TOASTR_MESSAGES, BUTTONS_BG} from '../../../../data/constants/componentConstants';

class VideosList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videoId: '',
            description: '',
            videos: [],
            orderedVideoIds: []
        }
    }

    componentDidMount() {

        this.loadVideos();
    }

    submitInfo = (e) => {

        e.preventDefault();

        let videoUrl = "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fmoiteochila%2Fvideos%2F" + this.state.videoId + "%2F";

        videosService.create(videoUrl, this.state.description).then(res => {

            this.setState({videoId: ''});

            window.location.reload();

            this.toastContainer.success(null, TOASTR_MESSAGES.videoAdded, {
                closeButton: false,
            });

        }).catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });

        });

    };

    loadVideos = () => {

        videosService.loadAll()
            .then(res => {

                let orderedVideoIds = res.map(v => '' + v.id + ' ' + v.index + ' ' + v.description);

                this.setState({videos: res, orderedVideoIds: orderedVideoIds});


            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            })
    };

    deleteVideo = (videoId) => {

        videosService.delete(videoId)
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
            this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                closeButton: false,
            });

        });
    };

    saveNewOrder = () => {

        let videoIds = this.state.orderedVideoIds.map(v => v.split(' ')[0]);

        videosService.saveNewOrder(videoIds)
            .then(res => {

            })
            .catch(err => {
                this.toastContainer.error(err.responseText, TOASTR_MESSAGES.error, {
                    closeButton: false,
                });

            });
    };

    handleChange = (e) => {

        this.setState({[e.target.name]: e.target.value});
    };

    handleOrderChange = (reorderedItems) => {

        this.setState({orderedVideoIds: reorderedItems});

    };

    render() {

        let content = <div>
            <FormInputField
                label="Описание"
                name="description"
                type="text"
                value={this.state.description}
                required={true}
                disabled={false}
                onChange={this.handleChange}
            />


            <FormInputField
                label="Видео ID"
                name="videoId"
                type="text"
                value={this.state.videoId}
                required={true}
                disabled={false}
                onChange={this.handleChange}
            />

            </div>;

        return (
            <Grid>

                <ToastContainer
                    ref={ref => this.toastContainer = ref}
                    className="toast-bottom-right"
                />

                <CreatePopup
                    buttonLabel={BUTTONS_BG.add}
                    position="right center"
                    content={content}
                    onSubmit={this.submitInfo}
                    triggerButtonLabel={BUTTONS_BG.add}
                    triggerButtonClass="add-video-trigger-button"
                />

                <button onClick={this.saveNewOrder}>
                    {BUTTONS_BG.saveChanges}
                </button>

                {this.state.videos.length > 0 &&
                <SortableVideos
                    sortableItems={this.state.orderedVideoIds}
                    handleOrderChange={this.handleOrderChange}
                    deleteVideo={this.deleteVideo}
                />
                }
            </Grid>
        );
    }
}

export default VideosList;
