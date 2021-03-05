import admin from 'firebase-admin';
import config from '../util/config';

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(config.firebaseConfig))
});
