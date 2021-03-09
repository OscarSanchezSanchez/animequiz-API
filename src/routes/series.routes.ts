import { Router } from 'express'
const router = Router();

import {saveSerie, getSeries, getSerie, deleteSerie, updateSerie} from '../controllers/series.controller';
import multer from '../libs/multer';

router.route("/")
    .get(getSeries)
    .post(multer.single('image'), saveSerie);
    
router.route("/:id")
    .get(getSerie)
    .delete(deleteSerie)
    .put(updateSerie);

export default router;