import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AddNodeForm from './AddNodeForm';
import '../App.css';

export class AddNodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parentNode: this.getNodeWithId(props.parentNodeId)
        }
    }

    onFormSubmit = (formData) => {
        if(formData) {
            this.props.onSubmit(formData);
            this.props.onClose();
        }
    }

    getNodeWithId = (nodeId) => {
        let node = this.props.nodes.filter((node) => {
            return node.id === nodeId;
        });
        return node[0] ? node[0] : {};
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.parentNodeId !== this.props.parentNodeId) {
            this.setState({
                parentNode: this.getNodeWithId(nextProps.parentNodeId)
            });
        }
    }

    render = () => {
        let headerText = this.state.parentNode.title ? `Add to ${this.state.parentNode.title}` : "Set a goal"
        return (
                <div className="backdrop">
                    <div className="modal">
                        <div onClick={this.props.onClose} className={'closeButton clickable'}>X</div> 
                        <div className={"header"}>{headerText}</div>
                        <AddNodeForm onSubmit={this.onFormSubmit} className={"modal_contents"}/>
                    </div>
                </div>
        );
    }
}

AddNodeModal.propTypes = {
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