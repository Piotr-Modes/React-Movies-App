import React, { Component } from 'react';
import { Redirect, Router, Route, Switch, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieList from './movies/MovieList';
import MovieDetails from './movies/MovieDetails';
import MyWatchList from './user/MyWatchList';
import history from '../history';
import HeaderSlider from './layout/HeaderSlider';
import Navbar from './layout/navigation/Navbar';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    componentDidMount() {
        if (!this.props.auth.uid) {
            this.addNotification(
                "Create an account to add movies to your Watchlist :)",
                "Welcome to React Movies!",
                0
            )
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.notificationId !== this.props.notificationId) {
            this.addNotification(this.props.notificationMessage)
        }
    }

    addNotification = (message, title = "", duration = 5000) => {
        this.notificationDOMRef.current.addNotification({
            title: title,
            message: message,
            type: "info",
            insert: "top",
            container: "bottom-left",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: duration },
            dismissable: { click: true }
        });
    }

    render() {
        return (
            <div className="">
                <Router history={history}>
                    <div>
                        <Route path="/movies/top_rated" exact component={HeaderSlider} />
                        <Navbar />
                        <Switch>
                            <Route path="/movies/:listType" exact component={MovieList} />
                            <Route path="/movies/see_details/:movieId" exact component={MovieDetails} />
                            <Route path="/my_watch_list" exact component={MyWatchList} />
                            <Route path="/signin" exact component={SignIn} />
                            <Route path="/signup" exact component={SignUp} />
                            <Redirect to="/movies/top_rated" />
                        </Switch>
                    </div>
                </Router>
                <ReactNotification ref={this.notificationDOMRef} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        notificationMessage: state.notification.message,
        notificationId: state.notification.id,
        auth: state.firebase.auth,
    };
};

export default connect(mapStateToProps, {})(App);