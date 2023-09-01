import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Input from './components/Input/Input';
import LoadingInput from './components/Input/LoadingInput';
import Output from './components/Output/Output';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import axios from 'axios';

class App extends Component{
  constructor(){
    super();
    this.state = {
      user_input: "", 
      model_output_label: "", 
      model_output_accuracy: "",
      error: false, 
      isSignedIn: false, 
      route: "signIn", 
      loadingInput: false, 
      stored_user_input: ""
    }
    this.submitUserInput = this.submitUserInput.bind(this);
  }

  //Set user input to what the user types
  userInputChange = (event) => {
    this.setState({user_input: event.target.value})
  }


  //Change routes (signIn, home, signOut)
  onChangeRoute = (route) =>{
    if(route === "signOut"){
      this.setState({isSignedIn: false, route: "signIn", model_output_label: ""});
    }else if(route === "home"){
      this.setState({isSignedIn: true , route: "home"});
    }else{
    this.setState({route: route})}
  }

  //Send user's text input to the model in the backend
  submitUserInput = async(event) => {
    this.setState({
      loadingInput: true, 
      model_output_label: ""
    })

    let formData = new FormData();
    formData.append('user_input', this.state.user_input)
    document.getElementsByClassName("userInput")[0].value = "";

    await axios.post("api/submit/", formData).then(response => {
      this.setState({
        model_output_accuracy: response.data.accuracy, 
        model_output_label: response.data.label, 
        stored_user_input: response.data.userInput,
        loadingInput: false
      })
    }).catch(error => this.setState({error:true}))
  }


  render(){
    return(
      <div>
        <Navigation onChangeRoute = {this.onChangeRoute} isSignedIn = {this.state.isSignedIn}/>
        {this.state.route === "home" ?
        <div>
            <Input userInputChange = {this.userInputChange} submitUserInput = {this.submitUserInput}/>
              {this.state.loadingInput === true &&
                <LoadingInput />
              }
              {this.state.model_output_label !== "" && this.state.model_output_accuracy !== "" &&
            <Output userInput = {this.state.stored_user_input} model_output_label={this.state.model_output_label} model_output_accuracy={this.state.model_output_accuracy}/>}
        </div>:
        (this.state.route === "signIn"? <SignIn getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} /> : <SignUp getUser = {this.getUser} onChangeRoute = {this.onChangeRoute} />)}    
      </div>
    )
  }
}

export default App;
