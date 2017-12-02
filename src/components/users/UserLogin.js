import React, { Component } from 'react';
import UserSignUp from './UserSignUp.js'

class UserLogin extends Component{
  state = {
    email: "",
    password: "",
    signUp: false
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let params = {auth: this.state}
    this.props.onLogin(params)
    this.setState({
      email: "",
      password: ""
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.state.signUp === false ? this.setState({signUp: true}) : this.setState({signUp: false})

  }

  render(){
    let signUpForm
    if(this.state.signUp === true){
      signUpForm = <UserSignUp onSignUp={this.props.onSignUp}/>
    } else {
      signUpForm = null
    }

    return(
      <div>
        <h4>Login</h4>
        <form onSubmit={this.handleSubmit}>
          <label> Enter Email: </label>
          <p>
          <input type="text" onChange={this.handleEmail} value={this.state.email} placeholder="Email Address"/>
          </p>
          <label> Enter Password: </label>
          <p>
          <input type="password" onChange={this.handlePassword} value={this.state.password} placeholder="Password"/>
          </p>
          <p>
          <input type="submit" />
          </p>
        </form>
        <hr></hr>
        <button onClick={this.handleClick}>Sign Up</button>
        {signUpForm}
      </div>
    )
  }
}

export default UserLogin
