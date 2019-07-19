import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import Toggle from '../../utylities/RenderProps/Toggle';

const UserNav = props => {
    const { userInitials } = props;
    return (
        <Toggle>
            {({ on, toggle }) => (
                <div>
                    <div className="user-nav-button" onClick={() => toggle()}>
                        {props.isSignIn ? (
                            <h3 className="user-nav-button__initials">{userInitials}</h3>
                        ) : (
                                <i className="fas fa-user"></i>
                            )}
                    </div>
                    <div className={`user-nav-overlay ${on && 'user-nav-overlay--open'}`}>
                        {props.isSignIn && (
                            <Fragment>
                                <NavLink onClick={() => toggle()} activeClassName='is-active' to="/my_watch_list" className="user-nav-overlay__option">My Watch List</NavLink>
                            </Fragment>
                        )}
                        {props.isSignIn ? (
                            <NavLink onClick={() => { props.signOut(); toggle() }} to="/movies/top_rated" className="user-nav-overlay__option">Log Out</NavLink>
                        ) : (
                                <Fragment>
                                    <NavLink onClick={() => toggle()} activeClassName='is-active' to="/signin" className="user-nav-overlay__option">Log In</NavLink>
                                    <NavLink onClick={() => toggle()} activeClassName='is-active' to="/signup" className="user-nav-overlay__option">Sign Up</NavLink>
                                </Fragment>
                            )}
                    </div>
                </div>
            )}
        </Toggle>
    );
};

export default UserNav;