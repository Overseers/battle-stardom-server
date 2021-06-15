import express, { Router, Express as e } from 'express';
import fs from 'fs';
import path from 'path';
import config from '../../util/config';

const router = Router();

const fillTags = (tags: any) => {
    const { title, metaDesc, ogTitle, ogDesc, ogImage, ogUrl, ogType } = tags;

    const filePath = path.resolve(config.rootDir, 'dist', './build', 'index.html');

    // read in the index.html file
    let data = '<html><body>hello</body></html>';

    data = data.replace(/\&TITLE/g, title);
    data = data.replace(/\&META_DESCRIPTION/g, metaDesc);
    data = data.replace(/\&OG_TITLE/g, ogTitle);
    data = data.replace(/\&OG_DESCRIPTION/g, ogDesc);
    data = data.replace(/\&OG_IMAGE/g, ogImage);
    data = data.replace(/\&OG_URL/g, ogUrl);
    data = data.replace(/\&OG_TYPE/g, ogType);

    return data;
};

const useStaticGen = (tags: {
    title: string;
    metaDesc: string;
    ogTitle: string;
    ogDesc: string;
    ogImage: string;
    ogUrl: string;
    ogType: string;
}) => {
    return function (request: express.Request, response: express.Response) {
        console.log('hello');
        response.header('Content-Type', 'text/html');

        response.send(fillTags(tags));
    };
};

router.get('/', (request, response) => {
    console.log('hello');
    response.send({ hello: 'world' });
});

// router.get('/index.html', (_, response) => response.redirect('/'));

// router.use(express.static(path.resolve(config.rootDir, 'dist', 'build')));

export default router;
