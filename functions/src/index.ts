import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const createRoom = functions.https.onRequest((request, response) => {
   const roomName = request.query.roomName;
   if (!roomName) {
     response.status(400);
     response.json({
       success: false,
       message: "'roomName' query param not provided"
     })
   }
   return admin.firestore().collection('rooms').add({name: roomName, messages : [{alias : 'avisi-chat', message: 'This is a new room!'}]}).then(writeResult => {
      response.json({
        success: true,
        message: 'Created room!'
      })
   });


});
