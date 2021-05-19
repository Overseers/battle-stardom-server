import { Router } from 'express';
import admin from 'firebase-admin';
import config from '../../util/config';

const router = Router();

router.get('/health', (request, response) => {
    console.log(request.headers);
    response.status(200).send({ status: 'ok' });
});

// router.use(async (request, response, next) => {
//     const { authorization = '' } = request.headers;

//     if ((authorization !== 'Bearer' && authorization !== 'Bearer null' && authorization?.startsWith('Bearer')) || config.nodeEnv === 'dev') {
//         const decodedToken = config.nodeEnv === 'dev' ? config.firebaseDev : await admin.auth().verifyIdToken(authorization.split('Bearer ')[1]);
//         if (request.session) {
//             request.session.user = decodedToken;
//             next();
//         } else {
//             response.status(401).send({
//                 error: {
//                     errors: [
//                         {
//                             message: 'Unauthorized',
//                         }
//                     ],
//                     data: null
//                 }
//             });
//         }
//     } else {
//         response.status(401).send({
//             error: {
//                 errors: [
//                     {
//                         message: 'Unauthorized',
//                     }
//                 ],
//                 data: null
//             }
//         });
//     }
// });

// router.use(
//     '/graphql',
// );
export default router;
