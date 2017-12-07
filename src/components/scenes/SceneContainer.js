import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { fetchUser } from '../../actions/users.js'
import { fetchScenes } from '../../actions/scenes.js'
import SceneList from './SceneList.js'
import RenderList from './RenderList.js'

class SceneContainer extends Component{
  componentDidMount(){
    console.log("SceneCompMounted", this.props.scenes)
    if(!this.props.user.id)this.props.fetchUser()
    if(this.props.user.id)this.props.fetchScenes(this.props.user.id)
  }

  render(){
    return(
      <div id="scene-list">
        {this.props.isLoading ? <p>Loading Scenes</p> : null}
        <div className="scene-list">
          <SceneList scenes={this.props.scenes}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    scenes: state.scenes,
    renders: state.renders,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUser: fetchUser,
    fetchScenes: fetchScenes
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneContainer)
