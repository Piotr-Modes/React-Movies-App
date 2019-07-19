import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchValue, handleSearchValueSubmit } from '../../../redux/actions';
import { withRouter } from 'react-router-dom';
import Toggle from '../../utylities/RenderProps/Toggle';

class SearchBar extends Component {

    handleInputChange = e => {
        this.props.updateSearchValue(e.target.value)
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.history.push(`/movies/search/?term=${this.props.searchValue}`)
    }

    handleClick = () => {
        this.nameInput.focus();
    }

    render() {
        return (
            <Toggle>
                {({ on, toggle }) => (
                    <form className="search-bar" onSubmit={this.handleFormSubmit} onBlur={() => setTimeout(toggle, 100)}>
                        <input
                            ref={(input) => { this.nameInput = input; }}
                            className={`${!on && 'hidden'}`} type="text"
                            value={this.props.searchValue}
                            onChange={this.handleInputChange}

                        />
                        <i onClick={this.handleFormSubmit} className="fas fa-search"></i>
                        {!on && <i onClick={() => { toggle(); this.handleClick() }} className="fas fa-search"></i>}
                    </form>
                )}
            </Toggle>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        searchValue: state.searchValue
    };
};

export default withRouter(connect(mapStateToProps, { updateSearchValue, handleSearchValueSubmit })(SearchBar));