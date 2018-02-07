import React from 'react';
import PropTypes from 'prop-types';

class AddNodeForm extends React.Component {

    constructor(props) {
        super();
        this.state = {
            title: '',
            description: ''
        }
    }

    onFieldChange = (event) => {
        if(event.target.name === 'title') {
            this.setState({title: event.target.value});
        }
        if(event.target.name === 'description') {
            this.setState({description: event.target.value});
        }
    }

    onSubmit = (event) => {
        if(this.state.title.length > 0) {
            this.props.onSubmit(this.state);
            this.setState({
                title: '',
                description: ''
            });
        }
        event.preventDefault();
    }

    render = () => {
        return (
            <div className={this.props.className}>
                <form id='addAddNodeForm' onSubmit={this.onSubmit}>
                    <label htmlFor='nodeTitle'>Title</label>
                    <input id='nodeTitle' type="text" name='title' value={this.state.title} onChange={this.onFieldChange}/>

                    <label htmlFor='nodeDescription'>Description</label>
                    <textarea id='nodeDescription' type="text" name='description' value={this.state.description} onChange={this.onFieldChange}/>

                    <input type='submit' name='submit' value="Add"/>
                </form>
            </div>
        );
    }
}

AddNodeForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddNodeForm;