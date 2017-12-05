import React from 'react';
import PropTypes from 'prop-types';
import AddNodeForm from './AddNodeForm';
import './App.css';

class AddNodeModal extends React.Component {

    constructor(props) {
        super(props);
        this.element = document.createElement('div');
    }

    onFormSubmitted = (formData) => {
        if(formData) {
            this.props.onSubmit(formData);
            this.props.onClose();
        }
    }

    render = () => {
        let modal = (
                <div className="backdrop">
                    <div className="modal">
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
    onSubmit: PropTypes.func.isRequired
};

export default AddNodeModal;