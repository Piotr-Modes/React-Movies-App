import React from 'react';
import SearchBar from './SearchBar';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../redux/actions';


const MainNav = props => {
    return (
        <div className="main-movie-nav">
            <div className="main-movie-nav__inner">
                <div className="main-movie-nav__inner__left">
                    <NavLink activeClassName='is-active' to="/movies/upcoming" className="main-movie-nav__inner__left__item"><i className="fas fa-sync-alt"></i> Upcoming</NavLink>
                    <NavLink activeClassName='is-active' to="/movies/top_rated" className="main-movie-nav__inner__left__item"><i className="far fa-star"></i> Top Rated</NavLink>
                    <NavLink activeClassName='is-active' to="/movies/popular" className="main-movie-nav__inner__left__item"><i className="fas fa-fire-alt"></i> Popular</NavLink>
                </div>
                <div className="main-movie-nav__inner__right">
                    <SearchBar />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        profile: state.firebase.profile
    }
}

export default withRouter(connect(mapStateToProps, { signOut })(MainNav));