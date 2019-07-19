import React from 'react';
import ReactTooltip from 'react-tooltip'
import { Link } from 'react-router-dom';
import { trimedString, getColor } from '../../helperFunctions';

const MovieCard = props => {
    return (
        <div className="example-2 card">
            <div className="date" data-tip="Raiting" style={{ background: getColor(1 - (props.movie.vote_average * 0.1)) }}>
                <span>{props.movie.vote_average !== 10 ? props.movie.vote_average.toFixed(1) : props.movie.vote_average}</span>
            </div>
            {props.addToWatchList && (
                <div className="add-to-watchlist">
                    <i onClick={() => props.isSignIn ? props.addToWatchList(props.movie) : null}
                        data-tip={props.isSignIn ? "Add to my watch list" : "Need to be logged in to add movies to your Watchlist"}
                        className="fa fa-bookmark add-to-watchlist">
                    </i>
                </div>
            )}
            <div className="wrapper">
                <img src={props.movie.backdrop_path || props.movie.poster_path ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}` : 'https://media.comicbook.com/files/img/default-movie.png'} />
                <div className="header">
                    <ul className="menu-content">
                        {false && (<li>
                            <span>{props.movie.release_date.split('-')[0]}</span>
                        </li>)}
                        {props.removeFromWatchList && (<li>
                            <i onClick={() => props.removeFromWatchList(props.docId, props.movie.title)}
                                data-tip="Remove from Watchlist"
                                className="fa fa-times-circle remove-from-watchlist">
                            </i>
                        </li>)}
                    </ul>
                </div>
                <div className="data">
                    <div className="content">
                        <span className="author"></span>
                        <h1 className="title">
                            <a href="#">{trimedString(props.movie.title, 25)}</a>
                        </h1>
                        <p className="text">{trimedString(props.movie.overview, 150)}</p>
                        <Link to={`/movies/see_details/${props.movie.id}`} className="button">See more</Link>
                    </div>
                </div>
            </div>
            <ReactTooltip />
        </div>
    )
}

export default MovieCard;

