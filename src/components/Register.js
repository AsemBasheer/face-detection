import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    onNameInput = (event) => {
        this.setState({ name: event.target.value })
    }

    onEmailInput = (event) => {
        this.setState({ email: event.target.value })
    }

    onPassInput = (event) => {
        this.setState({ password: event.target.value })
    }

    onRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json()).then(user => {
            console.log(user)
            if (user.name) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.onRegister()
        }
    }

    render() {
        return (
            <article className="br2 ba bg-white-20 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 white-70">Register</legend>
                            <div className="mt3">
                                <label className="white-70 db fw6 lh-copy f6"
                                    htmlFor="name">Name</label>
                                <input onChange={this.onNameInput} onKeyPress={this.keyPressed}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text" name="name" id="name" />
                            </div>
                            <div className="mt3">
                                <label className="white-70 db fw6 lh-copy f6"
                                    htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailInput} onKeyPress={this.keyPressed}
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="white-70 db fw6 lh-copy f6"
                                    htmlFor="password">Password</label>
                                <input onChange={this.onPassInput} onKeyPress={this.keyPressed}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password" name="password" id="password" />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onRegister}
                                className="white-70 b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                                type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default Register; 