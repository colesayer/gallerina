import React, { Component } from 'react';

class UserSignUp extends Component{

  state = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  }

  handleSubmit = (e) => {
    e.preventDefault()

    let params = {user: this.state}
    this.props.onSignUp(params)

    this.setState({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    })
    console.log(this.state)
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render(){
    return(
      <div>
        <h4> Sign Up </h4>
        <form onSubmit={this.handleSubmit} onChange={this.hangleChange}>
          <p>
          <label>Name: </label>
          </p>
          <input type="text" placeholder="Name" name="name"/>
          <p>
          <label>Email:</label>
          </p>
          <input type="text" placeholder="Email" name="email"/>
          <p>
          <label>Password: </label>
          </p>
          <input type="password" placeholder="Password" name="password"/>
          <p>
          <label>Confirm Password:</label>
          </p>
          <input type="password" placeholder="Confirm Password" name="password_confirmation"/>
          <p>
          <input type="submit"/>
          </p>
        </form>
      </div>

    )
  }
}

export default UserSignUp
