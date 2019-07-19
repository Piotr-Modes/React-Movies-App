const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification, userId) => 
{
  return admin.firestore().collection('users').doc(userId).collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

exports.movieAddedToWatchList = functions.firestore
  .document('users/{userId}/myWatchList/{movieId}')
  .onCreate(doc => {

    const movie = doc.data().movie;
    const userId = doc.data().userId;
    const notification = {
      content: `Added "${movie.title}" to watch list`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification, userId);

});

exports.movieDeletedFromWatchList = functions.firestore
  .document('users/{userId}/myWatchList/{movieId}')
  .onDelete(doc => {

    const movie = doc.data().movie;
    const userId = doc.data().userId;
    const notification = {
      content: `Removed "${movie.title}" from watch list`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification, userId);

});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined React Movies',
          time: admin.firestore.FieldValue.serverTimestamp()
        };

        return createNotification(notification);

      });
});
