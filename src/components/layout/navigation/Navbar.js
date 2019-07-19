import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MobileNav from './MobileNav';
import MainNav from './MainNav';
import UserNav from './UserNav';
import { signOut } from '../../../redux/actions';

const Navbar = (props) => {
  const { auth } = props;
  const { profile } = props;
  return (
    <nav>
      <MobileNav isSignIn={auth.uid} />
      <MainNav isSignIn={auth.uid} />
      <UserNav isSignIn={auth.uid}
        signOut={props.signOut}
        userInitials={profile.initials} />
    </nav>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default withRouter(connect(mapStateToProps, { signOut })(Navbar))