import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux';

class StreamShow extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }


    renderStreamDetail() {
        const { title, description } = this.props.stream;
        return (
            <div>
                <h1 style={{ 'margin-bottom': '0px', 'margin-top': '20px' }}>{title}</h1>
                <h4 style={{ 'margin-top': '0px' }}>{description}</h4>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderStreamDetail()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);