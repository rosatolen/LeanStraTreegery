import React from 'react';
import PropTypes from 'prop-types';
import AddVisionForm from './AddVisionForm';
import '../App.css';

export default class AddVisionModal extends React.Component {
    onFormSubmit = (formData) => {
        if(formData) {
            this.props.onSubmit(formData);
            this.props.onClose();
        }
    }

    render = () => {
        let headerText = "Vision Statement"
        return (
            <div className="backdrop">
                <div className="modal">
                    <div onClick={this.props.onClose} className={'closeButton clickable'}>X</div> 
                    <div className={"header"}>{headerText}</div>
                    <AddVisionForm onSubmit={this.onFormSubmit} className={"modal_contents"}/>
                </div>
            </div>
        );
    }
}

AddVisionModal.propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired
};