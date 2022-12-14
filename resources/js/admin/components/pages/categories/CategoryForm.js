import React from 'react';
import Spinner from '../../partials/Spinner';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';

class Form extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>

                <Spinner show={this.props.categories.create_update_spinner}/>
                <SuccessAlert msg={this.props.categories.success_message}/>
                <ErrorAlert msg={this.props.categories.error_message}/>

                <div>
                    <div className={`form-group ${this.props.categories.validation_errors!=null?'has-error':''}`}>
                        <label>Category title</label>
                        <input type="text" className="form-control" placeholder="Category title" onChange={this.props.onchange} value={this.props.categories.category.title?this.props.categories.category.title:''} name="title" />
                        {
                            this.props.categories.validation_errors!=null?(<div className="help-block">{this.props.categories.validation_errors.title[0]}</div>):null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Form;