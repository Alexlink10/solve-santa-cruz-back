import { Router } from 'express';
import ExportController from '../controllers/ExportController';

const exportRouter = Router();
const exportController = new ExportController();

exportRouter.get('/', exportController.export);

export default exportRouter;
