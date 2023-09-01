import React, {Component} from 'react';
import SignInError from './SignInError';
import axios from 'axios';
import "./SignIn.css"

class SignIn extends Component{
  constructor(props){
    super(props);
    this.state = {
        username: '',
        password: '', 
        signInError: false
    }
  }


    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }


    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }
    

    //Send username and password information to the backend for user authentication
    onSignInSubmit = async(event) => {
        this.setState({signInError: false});

        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);

        document.getElementsByClassName("inputField")[0].value="";
        document.getElementsByClassName("inputField")[1].value="";

        await axios.post("/api/signIn/", formData)
            .then(response => {
            if(response['data'] === "Success"){
                this.props.onChangeRoute("home");
            }
            else{
                this.setState({signInError: true})
            }
        }).catch(error => console.log(error))
    }

    
    render() {
    return(
        <div>
            <article className="br3 ba b--black-10 mt7 mb1 w-100 w-50-m w-50-l mw6 shadow-5 center bg-near-white">
                <main className="pa5">
                    <div className="center">
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Login</legend>
                                <div className="mt3">
                                    <div className="flex border-box: border-box bb 1px">
                                        <ion-icon size="large" name="person"></ion-icon>
                                        <input placeholder="Username" className="inputField bn outline-0 pa2 input-reset bg-transparent w-100" type="text" name="username"  id="username" onChange={this.onUsernameChange}/>
                                    </div>
                                </div>
                            <div className="mv3">
                                <div className="flex border-box: border-box bb 1px">
                                    <ion-icon size="large" name="lock-closed"></ion-icon>
                                    <input placeholder="Password" className="inputField bn outline-0 pa2 input-reset bg-transparent w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                                </div>
                            </div>
                        </fieldset>
                        <div>
                            <input class="loginButton b ph3 pv2 input-reset ba grow pointer f6 dib w-100 br-pill" type="submit" value="LOGIN" onClick={this.onSignInSubmit}/>
                        </div>
                        <div class="lh-copy mt3">
                            <span className='f6 gray'>
                                Don't have an account?
                            </span>
                            <a href="#0" class="f6 link black db grow center w-20" onClick={() => this.props.onChangeRoute("signUp")}>SIGN UP</a>
                        </div>
                    </div>
                </main>
            </article>
                {this.state.signInError === true &&
                <SignInError/>}
                
        </div>
    );
    }}

export default SignIn;
