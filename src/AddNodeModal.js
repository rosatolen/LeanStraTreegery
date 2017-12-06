import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddNodeForm from './AddNodeForm';
import './App.css';

export class AddNodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentNode: {}
        }
    }

    onFormSubmitted = (formData) => {
        if(formData) {
            this.props.onSubmit(formData);
            this.props.onClose();
        }
    }

    getNodeWithId = (nodeId) => {
        let node = this.props.nodes.filter((node) => {
            return node.id === nodeId;
        });
        return node[0];
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.parentNodeId !== this.props.parentNodeId) {
            this.setState({
                parentNode: this.getNodeWithId(nextProps.parentNodeId)
            });
        }
    }

    render = () => {
        let modal = (
                <div className="backdrop">
                    <div className="modal">
                        <div>Add to {this.state.parentNode.title} </div>
                        <AddNodeForm onSubmit={this.onFormSubmitted}/>
                        <button onClick={this.props.onClose}>Close</button>
                    </div>
                </div>
        );

        return this.props.isOpen ? modal : null;
    }
}

AddNodeModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    parentNodeId: PropTypes.number.isRequired
};

const mapStateToProps = (state) => {
    return {
        nodes: state.nodes
    }
}
export default connect(mapStateToProps)(AddNodeModal);