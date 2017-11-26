import React, { Component } from 'react';

class UserLogin extends Component{
  state = {
    input: ""
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let input = this.state.input

    this.props.onSubmit(input)
    this.setState({
      input: ""
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label> Enter Name or Email </label>
          <p>
          <input type="text" onChange={this.handleChange} value={this.state.input}/>
          </p>
          <p>
          <input type="submit" />
          </p>
        </form>
        <hr></hr>
      </div>
    )
  }
}

export default UserLogin
