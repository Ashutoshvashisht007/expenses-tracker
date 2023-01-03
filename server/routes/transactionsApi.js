import { Router } from "express";
import * as TransactoionController from '../controller/TransactionCont.js';

const router = Router();

router.get('/', TransactoionController.index, );

// post request
router.post('/', TransactoionController.create);

router.delete('/:id', TransactoionController.deletee);

router.patch('/:id', TransactoionController.update);

export default router;