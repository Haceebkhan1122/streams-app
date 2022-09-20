import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }


    renderAction() {
        const { id } = this.props.match.params;

        return (
            <>
                <button className='ui button negative' onClick={() => this.props.deleteStream(id)}>Delete</button>
                <Link to="/" className='ui button'>Cancel</Link>
            </>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return 'Are you sure you want to delete this stream'
        }
        return `Are you sure you want to delete this stream: ${this.props.stream.title}`
    }

    render() {
        return (
            <>
                < Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderAction()}
                    onDismiss={() => history.push('/')}
                />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);