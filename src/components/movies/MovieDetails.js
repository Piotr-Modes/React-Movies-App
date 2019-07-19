import React, { Component } from 'react';
import withLoading from '../utylities/HOC/withLoading';
import dafaultPhoto from '../../assets/img/default_profile.png';
import ScrollToTop from '../layout/ScrollToTop'
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import { fetchMovieDetails, resetCurrentMovie, addToWatchList } from '../../redux/actions';
import { scrollToTarget, generateUUID } from '../../helperFunctions'

class MovieDetails extends Component {
    constructor(props) {
        super(props);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        console.log('mount')
        this.fetchMovieDetails();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('update')
        console.log(prevProps.match.params.movieId)
        console.log(this.props.match.params.movieId)
        if (prevProps.match.params.movieId !== this.props.match.params.movieId) {
            this.fetchMovieDetails();
        } else {
            // this.fetchMovieDetails(this.props.match.params.movieId); 
        }
    }

    componentWillUnmount() {
        console.log('unmount')
        this.props.resetCurrentMovie();
    }

    addNotification = () => {
        this.notificationDOMRef.current.addNotification({
            // title: "Awesomeness",
            message: 'Added "God Father" to Watch List',
            type: "info",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    fetchMovieDetails = () => {
        const { movieId } = this.props.match.params;
        this.props.fetchMovieDetails(movieId);
    }

    render() {
        return (
            <ScrollToTop>
                <div className="asd" style={{ paddingBottom: '14rem' }}>
                    <section className="movie-details-container">
                        <div className="movie-details-container__background-overlay" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${this.props.currentMovie.backdrop_path})` }}>
                        </div>
                        <div className="movie-details-container__color-overlay">
                        </div>
                        <div className="movie-details-container__inner">
                            <img className="movie-details-container__inner__poster" src={this.props.currentMovie.backdrop_path || this.props.currentMovie.poster_path ? `https://image.tmdb.org/t/p/w500/${this.props.currentMovie.poster_path}` : 'https://media.comicbook.com/files/img/default-movie.png'} />

                            <div className="movie-details-container__inner__content">
                                <h2 className="movie-details-container__inner__content__title">
                                    {this.props.currentMovie.title}
                                </h2>
                                <div className="movie-details-container__inner__content__actions">
                                    <i data-tip={this.props.auth.uid ? "Add to my watch list" : "Need to be logged in to add movies to your Watchlist"}
                                        onClick={() => this.props.addToWatchList(this.props.currentMovie)}
                                        className="far fa-bookmark">
                                    </i>
                                    <i data-tip="Cast" onClick={() => scrollToTarget('cast')} className="fas fa-user-friends"></i>
                                    <i data-tip="Video" onClick={() => scrollToTarget('video')} className="fab fa-youtube"></i>
                                </div>
                                <div className="movie-details-container__inner__content__overview">
                                    <h2 className="movie-details-container__inner__content__overview__title">
                                        Overview
                                </h2>
                                    <p>
                                        {this.props.currentMovie.overview}
                                    </p>
                                </div>
                                <div className="movie-details-container__inner__content__director">
                                    <h2 className="movie-details-container__inner__content__director__title">
                                        Director
                                </h2>
                                    <p>
                                        {this.props.currentMovie.credits && this.props.currentMovie.credits.crew.length > 0 && this.props.currentMovie.credits.crew[0].name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="cast" className="cast-container">
                        <div className="cast-container__inner">
                            <h2 className="cast-container__inner__title">
                                Top Billed Cast
                            </h2>
                            <div className="cast-container__inner__list">
                                {this.props.currentMovie.credits && this.props.currentMovie.credits.cast.map((actor, index) => index < 5 ? (
                                    <div key={generateUUID()} className="actor-card">
                                        {actor.profile_path ?
                                            <img className="actor-card__photo" src={`https://image.tmdb.org/t/p/w138_and_h175_face/${actor.profile_path}`} />
                                            :
                                            <img className="actor-card__photo" src={dafaultPhoto} />
                                        }
                                        <div className="actor-card__text-box">
                                            <p className="actor-card__text-box__name">{actor.name}</p>
                                            <p className="actor-card__text-box__character">{actor.character}</p>
                                        </div>
                                    </div>
                                ) : null)}
                            </div>
                        </div>
                    </section>
                    <section id="video" className="trailer-container">
                        <div className="trailer-container__inner">
                            <h2 className="trailer-container__inner__title">
                                Video
                            </h2>
                            {this.props.currentMovie.id
                                &&
                                (this.props.currentMovie.videos.results[0])
                                &&
                                <iframe
                                    key={this.props.currentMovie.id}
                                    src={`https://www.youtube.com/embed/${this.props.currentMovie.videos.results[0].key}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                                ||
                                <p>Sorry, no trailer available...</p>
                            }
                        </div>
                    </section>
                </div>
                <ReactTooltip />
            </ScrollToTop>
        );
    }
};

const mapStateToProps = state => {
    return {
        currentMovie: state.currentMovie,
        auth: state.firebase.auth,
    };
};

export default withLoading(connect(mapStateToProps, { fetchMovieDetails, resetCurrentMovie, addToWatchList })(MovieDetails));

