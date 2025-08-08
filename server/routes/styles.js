import express from 'express';
import { addReview, createStyle, getStyle, listStyles, seedStyles, syncDescriptions } from '../controllers/styles.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listStyles);
router.get('/seed', seedStyles);
router.get('/sync-descriptions', syncDescriptions);
router.get('/:id', getStyle);
router.post('/', createStyle); 
router.post('/:id/reviews', auth, addReview);

export default router;


