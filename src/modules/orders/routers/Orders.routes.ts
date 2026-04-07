import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import { upload } from '../../../config/upload';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.get('/', ordersController.index);

ordersRouter.post(
  '/',
  upload.array('photos'),
  celebrate({
    [Segments.BODY]: {
      problems_id: Joi.string().required(),
      address: Joi.string(),
      number: Joi.string(),
      neighborhooduf: Joi.string(),
      latitude: Joi.number(),
      longitude: Joi.number(),
      reference: Joi.string(),
      descrition: Joi.string(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
