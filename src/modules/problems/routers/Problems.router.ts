import { Router } from 'express';
import ProblemsController from '@modules/problems/contollers/ProblemsController';
import { celebrate, Joi, Segments } from 'celebrate';

const problemsRouter = Router();
const problemsController = new ProblemsController();

problemsRouter.get('/', problemsController.index);

problemsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
    },
  }),
  problemsController.create,
);

problemsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  problemsController.delete,
);

export default problemsRouter;
