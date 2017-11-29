import React from 'react';
import PropTypes from 'prop-types';

class NodeForm extends React.Component {

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
        this.props.onSubmit(this.state);
        event.preventDefault();
    }

    render = () => {
        return (
            <form onSubmit={this.onSubmit}>
                <div>
                    <label>
                        Title <input id='nodeTitle' type="text" name='title' value={this.state.title} onChange={this.onFieldChange}/>
                    </label>
                </div>
                <div>
                    <label>
                        Description <input id='nodeDescription' type="text" name='description' value={this.state.description} onChange={this.onFieldChange}/>
                    </label>
                </div>
                <div>
                    <input type='submit' name='submit'/>
                </div>
            </form>
        );
    }
}

NodeForm.propTypes = {
    onSubmit: PropTypes.func
}

export default NodeForm;