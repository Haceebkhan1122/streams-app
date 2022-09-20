import React from 'react';
import { fetchStreams, signIn } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }


    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className='right floated content'>
                    <Link to={`/stream/edit/${stream.id}`} className='ui button primary'>
                        Edit
                    </Link>
                    <Link to={`/stream/delete/${stream.id}`} className='ui button negative'>
                        Delete
                    </Link>
                </div >
            )
        }
    }

    renderStreamsList() {
        return (
            <div>
                {this.props.streams.map(stream => {
                    return (
                        <div className='ui relaxed divided list'>
                            <div className='item' key={stream.id}>
                                {this.renderAdmin(stream)}
                                <i className='large middle aligned icon camera' />
                                <div className='content'>
                                    <Link to={`/streams-detail/${stream.id}`} className='header'>
                                        <h3>{stream.title}</h3>
                                    </Link>
                                    <div className='description'>{stream.description}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ 'text-align': 'right', 'marginTop': '10px' }}>
                    <Link to='/stream/new' className='ui secondary button'>
                        Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    {this.renderStreamsList()}
                    {this.renderCreate()}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
}
export default connect(mapStateToProps, { fetchStreams, signIn })(StreamList);