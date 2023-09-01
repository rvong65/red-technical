import React, {Component} from 'react';
import SignUpError from './SignUpError';
import "../SignIn/SignIn.css"
import axios from 'axios';


class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            signUpError: false
        }
    }


    onUsernameChange = (event) => {
        this.setState({username: event.target.value})
    }


    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    
    //Send username and password information to the backend to create a new user
    onSignUpSubmit = async(event) => {
        this.setState({signUpError: false});

        let formData = new FormData();
        formData.append('username', "");
        formData.append('password', "");
        formData.set('username', this.state.username);
        formData.set('password', this.state.password);

        document.getElementsByClassName("inputField")[0].value="";
        document.getElementsByClassName("inputField")[1].value="";

        await axios.post("/api/signUp/", formData)
            .then(response => {
              if(response['data'] === "Success"){
                this.props.onChangeRoute("home");
              }
              else{
                this.setState({signUpError: true});
              }
          }).catch(error => console.log(error))
      }


    render() {
    return(
        <div>
            <article className ="br3 ba b--black-10 mt7 mb1 w-100 w-50-m w-50-l mw6 shadow-5 center bg-near-white">
                <main className ="pa5">
                    <div className ="center">
                        <fieldset className ="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                            <div className="mt3">
                                <div className="flex border-box: border-box bb 1px" >
                                    <ion-icon size="large" name="person"></ion-icon>
                                    <input placeholder="Username" className="inputField bn outline-0 pa2 input-reset bg-transparent w-100" type="text" name="username"  id="username" onChange={this.onUsernameChange}/>
                                </div>
                            </div>
                            <div class="mv3">
                                <div className="flex border-box: border-box bb 1px" >
                                    <ion-icon size="large" name="lock-closed"></ion-icon>
                                    <input placeholder= "Password" className="inputField bn outline-0 pa2 input-reset bg-transparent w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
                                </div>
                            </div>
                        </fieldset>
                        <div>
                            <input class="loginButton b ph3 pv2 input-reset ba grow pointer f6 dib w-100 br-pill" type="submit" value="CREATE AN ACCOUNT" onClick={this.onSignUpSubmit}/>
                            <div class="lh-copy mt3">
                                <span className='f6 gray'>
                                    Already have an account?
                                </span>
                                <a href="#0" class="f6 link black db grow center w-20" onClick={() => this.props.onChangeRoute("signIn")}>LOGIN</a>
                            </div>
                        </div>
                    </div>
                </main>
            </article>
            {this.state.signUpError === true &&
                <SignUpError/>
            }

        </div>
    );
}}

export default SignUp;