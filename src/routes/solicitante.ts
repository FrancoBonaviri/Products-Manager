import { Router } from 'express'
import solicitanteController from '../controllers/solicitante';

const solicitanteRouter = Router();

solicitanteRouter.post('/', [], solicitanteController.create );

solicitanteRouter.put('/:code', [], solicitanteController.update );
export default solicitanteRouter;