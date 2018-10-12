import React from 'react';

import utils from '../../../../../utils/utils';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import {BUTTONS_BG} from '../../../../../data/constants/componentConstants';

const SortableItem = SortableElement(({value, deleteVideo}) =>


    <div className="sortable-video">
        {utils.getVideoDescription(value)}

        <button onClick={() => deleteVideo(value.split(' ')[0])}>
            {BUTTONS_BG.delete}
        </button>
    </div>);

const SortableList = SortableContainer(({items, deleteVideo}) => {

    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} deleteVideo={deleteVideo}/>
            ))}
        </ul>
    );
});

class SortableVideos extends React.Component {
    state = {
        items: this.props.sortableItems
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });

        this.handleOrderChange(this.state.items);
    };

    handleOrderChange;

    render() {

        this.handleOrderChange = this.props.handleOrderChange;

        let deleteVideo = this.props.deleteVideo;

        return <SortableList items={this.state.items} deleteVideo={deleteVideo} onSortEnd={this.onSortEnd}/>;
    }
}

export default SortableVideos
