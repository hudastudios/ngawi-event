import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";
import eventRoutes from './modules/events/events.routes';
import submissionRoutes from './modules/submissions/submissions.routes';
import settingsRoutes from './modules/settings/settings.routes';

const app = express();

import path from 'path';

app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(morgan('dev'));
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.all("/api/auth/*path", toNodeHandler(auth));
app.use('/api/events', eventRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Ngawi Event Calendar API' });
});

export default app;
