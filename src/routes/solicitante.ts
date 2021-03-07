import { Router } from 'express'
import solicitanteController from '../controllers/solicitante';

const solicitanteRouter = Router();

solicitanteRouter.post('/', [], solicitanteController.create );

solicitanteRouter.put('/:code', [], solicitanteController.update );

solicitanteRouter.get('/', [], solicitanteController.getAll );

solicitanteRouter.get('/:code', solicitanteController.getByCodigo );


export default solicitanteRouter;