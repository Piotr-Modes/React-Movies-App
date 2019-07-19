import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../redux/actions';
import { Redirect } from 'react-router-dom'

class SignIn extends Component {
  state =
    {
      email: '',
      password: ''
    }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="form-container">
        <form className='form-container__form' onSubmit={this.handleSubmit}>
          <h5 className="form-container__form__title">Sign In</h5>
          <div className="form-container__form__field">
            <input className="form-container__form__field__input" type="text" id='email' onChange={this.handleChange} required />
            <label className="form-container__form__field__label" htmlFor="email">Email</label>
            <i className="far fa-envelope"></i>
          </div>
          <div className="form-container__form__field">
            <input className="form-container__form__field__input" type="password" id='password' onChange={this.handleChange} required />
            <label className="form-container__form__field__label" htmlFor="password">Password</label>
            <i className="fas fa-lock"></i>
          </div>

          {authError ? <p>Email or password incorect</p> : null}

          <div className="form-container__form__button-container">
            <button className="form-container__form__button-container__button form-container__form__button-container__button--login">Login</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps, { signIn })(SignIn)