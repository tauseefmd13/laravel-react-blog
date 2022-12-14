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

                <Spinner show={this.props.tag.create_update_spinner}/>
                <SuccessAlert msg={this.props.tag.success_message}/>
                <ErrorAlert msg={this.props.tag.error_message}/>

                <div className="box-body">
                    <div className={`form-group ${this.props.tag.validation_errors!=null?'has-error':''}`}>
                        <label>Tag title</label>
                        <input type="text" className="form-control" placeholder="Tag title" onChange={this.props.onchange} value={this.props.tag.tag.title?this.props.tag.tag.title:''} name="title" />
                        {
                            this.props.tag.validation_errors!=null?(<div className="help-block">{this.props.tag.validation_errors.title[0]}</div>):null
                        }
                    </div>
                </div>

            </div>
        )
    }
}

export default Form;