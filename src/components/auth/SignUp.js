import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../redux/actions';

class SignUp extends Component {
  state =
    {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />
    return (
      <div className="form-container">
        <form className='form-container__form' onSubmit={this.handleSubmit}>
          <h5 className="form-container__form__title">Sign Up</h5>
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
          <div className="form-container__form__field">
            <input className="form-container__form__field__input" type="text" id='firstName' onChange={this.handleChange} required />
            <label className="form-container__form__field__label" htmlFor="firstName">First Name</label>
            <i className="fas fa-user"></i>
          </div>
          <div className="form-container__form__field">
            <input className="form-container__form__field__input" type="text" id='lastName' onChange={this.handleChange} required />
            <label className="form-container__form__field__label" htmlFor="lastName">Last Name</label>
            <i className="fas fa-user"></i>
          </div>

          {authError ? <p>{authError}</p> : null}

          <div className="form-container__form__button-container">
            <button className="form-container__form__button-container__button form-container__form__button-container__button--login">Sign Up</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

export default connect(mapStateToProps, { signUp })(SignUp)