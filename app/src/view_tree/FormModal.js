import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

let FormModal = (props) => {
    let onFormSubmit = (formData) => {
        if(formData) {
            props.onSubmit(formData);
            props.onClose();
        }
    }

    let children = React.Children.map(props.children, (child) => {
        let childWithProps = React.cloneElement(child, {
            onSubmit: onFormSubmit,
            className: "modal_contents"
        });
        return childWithProps;
    });

    return (
        <div className="backdrop">
            <div className="modal">
                <div onClick={props.onClose} className={'closeButton clickable'}>X</div> 
                <div className="header">{props.title}</div>
                { children }
            </div>
        </div>
    );
}

FormModal.propTypes = {
    onClose: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default FormModal;