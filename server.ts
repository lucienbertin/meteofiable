// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
require('dotenv').load();
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';
const DIST = process.env.DIST || 'dist';
const DIST_FOLDER = join(process.cwd(), DIST);
const SPA_FOLDER_NAME = 'home';

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
	bootstrap: AppServerModuleNgFactory,
	providers: [
		provideModuleMap(LAZY_MODULE_MAP)
	]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, SPA_FOLDER_NAME));

// TODO: implement data requests securely
app.get('/api/*', (req, res) => {
	res.status(404).send('data requests are not supported');
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, SPA_FOLDER_NAME)));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
	res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, HOST, () => {
	console.log(`Node server listening on http://localhost:${PORT}`);
});
