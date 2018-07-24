import React from 'react';
import { Link } from 'react-router-dom';

class NewsCard extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {

        const data = this.props.data;

        return (

            <Link to={'/news/' + data.id}>
                <div className="news-card" style={{padding: 250 + 'px'}}>
                    <div className="news-image">
                        <img className="" src={data.imageUrl} alt="News image"/>
                    </div>
                    <div className="news-body">
                        <h4 className="news-title">{data.title}</h4>
                        <p className="news-publishedOn">{data.creationDate}</p>
                    </div>
                </div>
            </Link>

        );
    }
}

export default NewsCard;
