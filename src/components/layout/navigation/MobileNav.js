import React from 'react';
import Toggle from '../../utylities/RenderProps/Toggle';
import { NavLink } from 'react-router-dom';

const MobileNav = props => {
    return (
        <Toggle>
            {({ on, toggle }) => (
                <div>
                    <div className={`mobile-nav-overlay__button ${on && 'mobile-nav-overlay__button--open'}`} onClick={() => toggle()}>
                        <span className="line line--1"></span>
                        <span className="line line--2"></span>
                        <span className="line line--3"></span>
                    </div>
                    <div className={`mobile-nav-overlay ${on && 'mobile-nav-overlay--open'}`}>
                        <div className="mobile-nav-overlay__option">
                            <NavLink onClick={() => toggle()} activeClassName='is-active' to="/movies/upcoming"><i className="fas fa-sync-alt"></i> Upcoming</NavLink>
                        </div>
                        <div className="mobile-nav-overlay__option">
                            <NavLink onClick={() => toggle()} activeClassName='is-active' to="/movies/top_rated"><i className="far fa-star"></i> Top Rated</NavLink>
                        </div>
                        <div className="mobile-nav-overlay__option">
                            <NavLink onClick={() => toggle()} activeClassName='is-active' to="/movies/popular"><i className="fas fa-fire-alt"></i> Popular</NavLink>
                        </div>
                    </div>
                </div>
            )}
        </Toggle>
    );
};

export default MobileNav;