import React from 'react';
import Breadcrumb from '../../partials/Breadcrumb';
import SuccessAlert from '../../partials/SuccessAlert';
import ErrorAlert from '../../partials/ErrorAlert';
import User from '../../../apis/User';

class Profile extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            success: "",
            error: "",
            validation_errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        let self = this;

        User.profile().then(response => {
            self.setState({
               name: response.data.data.name,
               email: response.data.data.email
            });
        });
    }

    handleChange(e) {
        let inputName = e.target.name;

        this.setState({
            [inputName]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;

        User.updateProfile({name: this.state.name,
            email: this.state.email,
            password: this.state.password}).then(response => {


            localStorage.removeItem("user.email");
            localStorage.removeItem("user.name");

            for (let i in response.data.data) {
                localStorage.setItem("user." + i, response.data.data[i]);
            }

            self.setState({
               success: response.data.message,
                error: "",
                validation_errors: {}
            });
        }).catch(error => {
            self.setState({
                success: "",
                error: error.response.data.message,
                validation_errors: error.response.data.errors
            });
        });
    }

    render()
    {
        return (
            <div className="content-wrapper">

                <section className="content-header">
                    <h1>
                        My profile
                    </h1>

                    <Breadcrumb />

                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="box box-primary">
                                <div className="box-body box-profile">
                                    <img src={process.env.MIX_APP_URL + '/assets/admin/dist/img/avatar04.png'} className="profile-user-img img-responsive img-circle" />
                                    <h3 className="profile-username text-center">{localStorage.getItem("user.name")}</h3>
                                    <p className="text-muted text-center">Member since {localStorage.getItem("user.created_at")}</p>
                                    <ul className="list-group list-group-unbordered">
                                        <li className="list-group-item">
                                            <b>Name</b> <a className="pull-right">{localStorage.getItem("user.name")}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Email</b> <a className="pull-right">{localStorage.getItem("user.email")}</a>
                                        </li>
                                        <li className="list-group-item">
                                            <b>Created</b> <a className="pull-right">{localStorage.getItem("user.created_at")}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <SuccessAlert msg={this.state.success} />
                            <ErrorAlert msg={this.state.error} />
                            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                                <div className={`form-group ${this.state.validation_errors.name?'has-error':''}`}>
                                    <label className="col-sm-2 control-label">Name</label>

                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
                                    </div>
                                    {
                                        this.state.validation_errors.name!=null?(<div className="help-block">{this.state.validation_errors.name[0]}</div>):null
                                    }
                                </div>
                                <div className={`form-group ${this.state.validation_errors.email?'has-error':''}`}>
                                    <label className="col-sm-2 control-label">Email</label>

                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
                                    </div>
                                    {
                                        this.state.validation_errors.email!=null?(<div className="help-block">{this.state.validation_errors.email[0]}</div>):null
                                    }
                                </div>
                                <div className={`form-group ${this.state.validation_errors.password?'has-error':''}`}>
                                    <label className="col-sm-2 control-label">Password</label>

                                    <div className="col-sm-10">
                                        <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                    {
                                        this.state.validation_errors.password!=null?(<div className="help-block">{this.state.validation_errors.password[0]}</div>):null
                                    }
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button type="submit" className="btn btn-danger">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Profile;