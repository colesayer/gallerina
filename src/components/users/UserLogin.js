import React, { Component } from 'react';
import UserSignUp from './UserSignUp.js'

class UserLogin extends Component{
  state = {
    email: "demo@demo.com",
    password: "demodemo",
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
      email: "demo@demo.com",
      password: "demodemo"
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    this.state.signUp === false ? this.setState({signUp: true}) : this.setState({signUp: false})
  }

  handleSignUp = (params) => {
    this.setState({signUp: true})
    this.props.onSignUp(params)
  }


  render(){
    console.log(this.state)
    let signUpForm
    let loginHeight = "300px"
    let herokuMessage
    if(this.state.signUp === true || this.props.message.signup){
      signUpForm = <UserSignUp onSignUp={this.handleSignUp} message={this.props.message}/>
      loginHeight = "750px"
      herokuMessage = null
    } else {
      signUpForm = null
      loginHeight = "300px"
      herokuMessage = <div className="heroku-disclaimer"><span>*This site runs on the free tier of Heroku. After hitting the login button, please allow a minute for the Heroku server to spin up.</span></div>

    }


    let error
    if(this.props.message.login){
      error = this.props.message.login
    } else {
      error = null
    }




    return(
      <div className="user-login" style={{"height": `${loginHeight}`}}>
        <h4>Login</h4>
        <div className="errors"> <h4>{error} </h4></div>
        <form onSubmit={this.handleSubmit}>
          <label> Enter Email: </label>
          <p>
          <input type="text" onChange={this.handleEmail} value={this.state.email} placeholder="Email Address"/>
          </p>
          <label> Enter Password: </label>
          <p>
          <input type="password" onChange={this.handlePassword} value={this.state.password} placeholder="Password"/>
          </p>

          <input type="submit" value="login" className="select-button" style={{"marginTop": "10px"}}/>
          <p>
          <button onClick={this.handleClick} className="link-button" style={{"color": "blue", "fontSize": "small", "paddingLeft": "10px"}}>sign up</button>
          </p>
        </form>
          {herokuMessage}

        {signUpForm}
      </div>
    )
  }
}

export default UserLogin
