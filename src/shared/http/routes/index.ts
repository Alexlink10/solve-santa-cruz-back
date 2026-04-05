import { Router } from 'express';
import ordersRouter from '@modules/orders/routers/Orders.routes';
import problemsRouter from '@modules/problems/routers/Problems.router';
import exportRouter from '@modules/orders/routers/ExportOrder.routes';

const routes = Router();

routes.use('/orders', ordersRouter);
routes.use('/problems', problemsRouter);
routes.use('/exportOrder', exportRouter);
export default routes;
