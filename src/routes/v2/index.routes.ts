import { Router } from 'express';
import healthRouter from './health.routes';
import sampleRouter from './sample.routes';

const v2Router = Router();

v2Router.use('/health', healthRouter);
v2Router.use('/sample', sampleRouter);

export default v2Router;
