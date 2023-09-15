import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', submitSuccess: false, errorMessage: ''}

  getUserName = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    this.setState({submitSuccess: true})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = data => {
    this.setState({
      submitSuccess: false,
      errorMessage: data.error_msg,
      username: '',
      password: '',
    })
  }

  loginSubmitBtn = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data)
    }
  }

  renderUserName = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label htmlFor="userNameInput" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          id="userNameInput"
          className="input"
          placeholder="UserName"
          onChange={this.getUserName}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label htmlFor="passwordInput" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          id="passwordInput"
          className="input"
          placeholder="Password"
          onChange={this.getPassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {errorMessage, submitSuccess} = this.state

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg-container">
        <div className="login-cart-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="jobby-image-logo"
          />
          <form onSubmit={this.loginSubmitBtn}>
            {this.renderUserName()}
            {this.renderPassword()}
            <button type="submit" className="login-button">
              Login
            </button>
            {submitSuccess ? null : <p className="error-msg">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
