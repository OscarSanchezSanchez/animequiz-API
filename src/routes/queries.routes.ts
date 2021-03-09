import { Router } from 'express'
const router = Router();

import { getQueryBySerieId, saveQuery} from '../controllers/query.controller'
import multer from '../libs/multer';

router.route("/:id")
    .get(getQueryBySerieId)
    .post(multer.single('image'), saveQuery);
export default router;