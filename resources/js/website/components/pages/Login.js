import React from 'react';
import Sidebar from '../partials/Sidebar';
import {Link} from "react-router-dom";
import Auth from '../../apis/Auth';
import { withRouter } from "react-router";
import "../../css/form.css";

class Login extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            email: "",
            password: "",
            error_message: null,
            errors: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            error_message: null,
            errors: null
        });

        if(this.state.email == "" || this.state.password == "") {
            this.setState({
                error_message: "Please enter login credentials"
            });

            return false;
        }

        Auth.login({email: this.state.email, password: this.state.password}, (response) => {

            for (var i in response.data.user) {
                localStorage.setItem("user." + i, response.data.user[i]);

                setTimeout(() => {
                    this.props.history.push("/");
                }, 500);
            }

        }, (err) => {
            this.setState({
                error_message: err.response.data.message,
                errors: err.response.data.errors
            });
        });
    }

    render()
    {
        return (
            <div id="content-wrap">
                <div className="row">
                    <div id="main" className="eight columns">

                        <h2>Login</h2>

                        {
                            this.state.error_message?(<div className="alert alert-danger">{this.state.error_message}</div>):null
                        }

                        <form name="contactForm" method="post" action="" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <div className="group">
                                    <label>Email</label>
                                    <input name="email" type="text" onChange={this.handleInput} value={this.state.email} placeholder="Email" />
                                    {
                                        this.state.errors && this.state.errors.email?(<div className="error-block">{this.state.errors.email[0]}</div>):null
                                    }
                                </div>
                                <div className="group">
                                    <label>Password</label>
                                    <input name="password" type="password" onChange={this.handleInput} value={this.state.password} placeholder="Password" />
                                    {
                                        this.state.errors && this.state.errors.password?(<div className="error-block">{this.state.errors.password[0]}</div>):null
                                    }
                                </div>

                                <button type="submit" className="submit">Login</button>
                                &nbsp;<Link to="/register">Create account</Link>
                            </fieldset>
                        </form>

                    </div>

                    <Sidebar/>

                </div>
            </div>
        )
    }
}

export default withRouter(Login);