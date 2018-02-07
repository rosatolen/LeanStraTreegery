import React from 'react';
import PropTypes from 'prop-types';

class AddVisionForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            vision: ''
        }
    }

    onFieldChange = (event) => {
        if(event.target.name === 'vision') {
            this.setState({vision: event.target.value});
        }
    }

    onSubmit = (event) => {
        if(this.state.vision.length > 0) {
            this.props.onSubmit(this.state);
            this.setState({
                vision: ''
            });
        }
        event.preventDefault();
    }

    render = () => {
        return (
            <div className={this.props.className}>
                <form id='addAddVisionForm' onSubmit={this.onSubmit}>
                    <label htmlFor='vision'>Vision</label>
                    <input id='vision' type="text" name='vision' value={this.state.vision} onChange={this.onFieldChange}/>

                    <input type='submit' name='submit' value="Add"/>
                </form>
            </div>
        );
    }
}

AddVisionForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddVisionForm;