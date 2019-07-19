import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getUrlParams } from '../../helperFunctions';
import {
    fetchMovies,
    handleSearchValueSubmit,
    fetchSearchedMovies,
    fetchFilteredMovies,
    setCurrentPageNumber,
    addToWatchList,
    resetMainMovieList
} from '../../redux/actions';
import ReactTooltip from 'react-tooltip';
import Pagination from '../layout/Pagination';
import ScrollToTop from '../layout/ScrollToTop';
import MovieCard from './MovieCard';
import withLoading from '../utylities/HOC/withLoading';
import FilterMovies from './FilterMovies';
import Toggle from '../utylities/RenderProps/Toggle';

const MovieCardWithLoading = withLoading(MovieCard);

class MovieList extends React.Component {
    componentDidMount() {
        this.fetchManager();
        const params = new URLSearchParams(this.props.location.search);

        this.props.setCurrentPageNumber(params.get('page') || 1)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.location !== prevProps.location) {
            this.fetchManager()
        }
        const params = getUrlParams();

        this.props.setCurrentPageNumber(params.get('page') || 1)
    }

    componentWillUnmount() {
        this.props.resetMainMovieList();
    }

    fetchManager = () => {
        const { listType } = this.props.match.params;

        switch (listType) {
            case 'search':
                this.props.fetchSearchedMovies()
                break;
            case 'filtered':
                this.props.fetchFilteredMovies()
                break;
            case 'upcoming':
            case 'top_rated':
            case 'popular':
                this.props.fetchMovies(listType);
                break;
            default:
                this.props.history.push('/movies/top_rated');
        }
    }

    renderList = () => {
        return this.props.movies.map(movie => {
            return (
                <MovieCardWithLoading
                    isSignIn={this.props.auth.uid}
                    isLoading={this.props.isLoading}
                    key={movie.id}
                    movie={movie}
                    addToWatchList={this.props.addToWatchList}
                />
            );
        });
    }

    render() {
        return (
            <ScrollToTop>
                <div id="list-top" className="main-content">
                    <Toggle>
                        {({ on, toggle }) => (
                            <div>
                                <div onClick={() => toggle()} className="show-filters-button" align="right">
                                    <i data-tip="Filters" className="fas fa-filter"></i>
                                </div>
                                {on && <FilterMovies />}
                            </div>
                        )}
                    </Toggle>
                    <Fragment>
                        <div className="row">
                            {this.props.movies.length === 0 && (
                                <h2>No results</h2>
                            )}
                            {this.renderList()}
                        </div>
                        {!this.props.isLoading && (
                            <Pagination
                                currentPage={this.props.currentPageNumber}
                                totalPages={this.props.totalPages}
                            />
                        )}
                    </Fragment>
                </div>
                <ReactTooltip />
            </ScrollToTop>
        );

    }
};

const mapStateToProps = state => {
    return {
        isLoading: state.movies.mainMovieList.isLoading,
        isError: state.movies.mainMovieList.isError,
        movies: state.movies.mainMovieList.list,
        totalPages: state.movies.mainMovieList.totalPages,
        currentPageNumber: state.movies.mainMovieList.currentPageNumber,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps, {
    fetchMovies,
    handleSearchValueSubmit,
    fetchSearchedMovies,
    fetchFilteredMovies,
    setCurrentPageNumber,
    addToWatchList,
    resetMainMovieList
})(MovieList);