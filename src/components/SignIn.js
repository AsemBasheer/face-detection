import React from 'react';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPass: ''
        }
    }

    onEmailInput = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPassInput = (event) => {
        this.setState({ signInPass: event.target.value })
    }

    onSignIn = () => {
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPass
            })
        }).then(res => res.json()).then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    keyPressed = (event) => {
        if (event.key === "Enter") {
            this.onSignIn()
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br2 ba bg-white-20 b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0 white-70">Sign In</legend>
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
                            <input onClick={this.onSignIn}
                                className="white-70 b ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                                type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3 pointer">
                            <p onClick={() => onRouteChange('Register')}
                                className="white-70 f6 link dim db">Sign up</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
export default SignIn; 