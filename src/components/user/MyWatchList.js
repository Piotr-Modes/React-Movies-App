import React, {Component} from 'react';
import { addToWatchList, removeFromWatchList } from '../../redux/actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import MovieCard from '../movies/MovieCard';
import ScrollToTop from '../layout/ScrollToTop';

class MyWatchList extends Component
{
    renderList()
    {
        return this.props.myWatchList.map(movie => 
            {
            return (
               <MovieCard 
                    isSignIn={true}
                    key={movie.movie.id} 
                    movie={movie.movie}  
                    docId={movie.id} 
                    removeFromWatchList={this.props.removeFromWatchList}/>
            );
        });
    }

    render()
    {
        const { auth, myWatchList} = this.props;
        if(!auth.uid) return <Redirect to='/signin' />
        return(
            <ScrollToTop>
                <div id="list-top" className="main-content">
                    <div className="ewd row">
                        {myWatchList && myWatchList.length === 0 && (
                            <h2>Your Watchlist is empty</h2>
                        )}
                        {myWatchList && this.renderList()}
                    </div>
                </div>
            </ScrollToTop>
        )
    }
}

const mapStateToProps = (state) => 
{
    return {
        myWatchList: state.firestore.ordered.myWatchList,
        auth: state.firebase.auth
    };
};

export default compose( 
    connect(mapStateToProps,{ addToWatchList, removeFromWatchList }),
    firestoreConnect(props => [
        { collection: 'users',
           doc: props.auth.uid,
           subcollections: [
             { collection: 'myWatchList' }
           ],
           storeAs: 'myWatchList'
        }
    ])
)(MyWatchList)
