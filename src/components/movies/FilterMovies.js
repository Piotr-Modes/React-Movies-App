import React, { Fragment } from 'react';
import { getUrlParams } from '../../helperFunctions';
import { NavLink, withRouter } from 'react-router-dom';

class FilterMovies extends React.Component {
  state =
    {
      filterSettings:
      {
        with_genres: '',
        year: '',
        sort_by: ''
      },
      filterOptions:
      {
        genres: [
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 80,
            "name": "Crime"
          },
          {
            "id": 99,
            "name": "Documentary"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 14,
            "name": "Fantasy"
          },
          {
            "id": 36,
            "name": "History"
          },
          {
            "id": 27,
            "name": "Horror"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 9648,
            "name": "Mystery"
          },
          {
            "id": 10749,
            "name": "Romance"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          },
          {
            "id": 10770,
            "name": "TV Movie"
          },
          {
            "id": 53,
            "name": "Thriller"
          },
          {
            "id": 10752,
            "name": "War"
          },
          {
            "id": 37,
            "name": "Western"
          }
        ],
        sort_by: [
          {
            "id": "popularity.desc",
            "name": "Popularity desc"
          },
          {
            "id": "popularity.asc",
            "name": "Popularity asc"
          },
          {
            "id": "primary_release_date.desc",
            "name": "Release Date desc"
          },
          {
            "id": "primary_release_date.asc",
            "name": "Release Date asc"
          },
          {
            "id": "vote_average.desc",
            "name": "Rating desc"
          },
          {
            "id": "vote_average.asc",
            "name": "Rating asc"
          }
        ],
        years: []
      }
    }

  componentDidMount() {
    this.fillYearsOptionArray()
  }

  fillYearsOptionArray = () => {
    const yearsArray = [];
    for (var i = 0; i < 150; i++) {
      yearsArray.push(parseInt(new Date().getFullYear()) - i);
    }

    this.setState((prevState) => ({
      filterOptions: { ...prevState.filterOptions, years: yearsArray }
    }))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      this.populateFilterSettings()
    }

  }

  populateFilterSettings = () => {
    const params = getUrlParams();
    const paramsKeysArray = []

    for (var key of params.keys()) {
      paramsKeysArray.push(key)
    }

    paramsKeysArray.filter(key => this.state.filterSettings.hasOwnProperty(key)).forEach(key => {
      this.setState((prevState) => ({
        filterSettings: { ...prevState.filterSettings, [key]: params.get(key) }
      }));
    })
    Object.keys(this.state.filterSettings).filter(key => !params.has(key)).forEach(key => {
      this.setState((prevState) => ({
        filterSettings: { ...prevState.filterSettings, [key]: '' }
      }));
    })

  }

  updateUrl = () => {
    setTimeout(() => {
      const newParams = getUrlParams();
      const filterSettingsKeys = Object.keys(this.state.filterSettings)
      filterSettingsKeys.forEach(key => {
        this.state.filterSettings[key] === ''
          ?
          newParams.delete(key)
          :
          newParams.set(key, this.state.filterSettings[key])
      })
      newParams.set('page', '1')
      this.props.history.push(`/movies/filtered/?${newParams}`)
      // this.props.history.push(`/movies/filtered/?with_genres=${this.state.filterSettings.with_genres}&year=${this.state.filterSettings.year}&sort_by=${this.state.filterSettings.sort_by}`)
    }, 0)
  }

  handleFilterSettingSelected = e => {
    e.preventDefault();

    this.setState({ filterSettings: { ...this.state.filterSettings, [e.target.name]: e.target.value } })
    this.updateUrl()
  }

  render() {
    return (
      <div className="filter-settings-container">
        <select name="with_genres"
          value={this.state.filterSettings.with_genres}
          onChange={this.handleFilterSettingSelected} >

          <option value="">Genre</option>
          {this.state.filterOptions.genres.map((genre) => {
            return (<option value={genre.id}>{genre.name}</option>)
          })}

        </select>
        <select name="year"
          value={this.state.filterSettings.year}
          onChange={this.handleFilterSettingSelected} >

          <option value="">Year</option>
          {this.state.filterOptions.years.map((year) => {
            return (<option value={year}>{year}</option>)
          })}

        </select>
        <select name="sort_by"
          value={this.state.filterSettings.sort_by}
          onChange={this.handleFilterSettingSelected} >

          <option value="">Sort By</option>
          {this.state.filterOptions.sort_by.map((sort_option) => {
            return (<option value={sort_option.id}>{sort_option.name}</option>)
          })}
        </select>
      </div>
    );
  }
};

export default withRouter(FilterMovies);







