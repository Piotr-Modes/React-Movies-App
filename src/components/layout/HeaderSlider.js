import React from "react";
import Slider from "react-slick";
import { fetchMovies } from '../../redux/actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withLoading from '../utylities/HOC/withLoading';
import { trimedString } from '../../helperFunctions';

class HeaderSlider extends React.Component {
  componentDidMount() {
    this.props.fetchMovies('popular', 'sliderMovieList');
  }

  renderList() {
    return this.props.movies.map(movie => {
      return (
        <div key={movie.id} className="slider-item">
          <div className="slider-item__content">
            <Link key={movie.id} to={`/movies/see_details/${movie.id}`}>
              <img className="slider-item__content__poster-img" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
            </Link>
          </div>
          <h4 className="slider-item__content__movie-title">{trimedString(movie.title, 20)}</h4>
        </div>
      );
    });
  }
  render() {
    const settings =
    {
      infinite: true,
      speed: 7000,
      slidesToShow: 8,
      slidesToScroll: 4,
      arrows: false,
      autoplay: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }
      ]
    };
    return (
      <header>
        <h1 className='header__title'>UPCOMMING</h1>
        <Slider {...settings}>
          {this.renderList()}
        </Slider>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.movies.sliderMovieList.isLoading,
    movies: state.movies.sliderMovieList.list
  };
};

export default withLoading(connect(mapStateToProps, { fetchMovies })(HeaderSlider));