import React, { Component } from 'react';
import {Route, Link} from 'react-router-dom'

class UserLogin extends Component{
  state = {
    email: "colesayerstudio@gmail.com",
    password: "password"
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
      email: "colesayerstudio@gmail.com",
      password: "password"
    })
  }

  render(){
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
        <Link to={"/signup"}>Sign Up</Link>
      </div>
    )
  }
}

export default UserLogin
