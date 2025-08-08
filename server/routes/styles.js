import express from 'express';
import { addReview, createStyle, getStyle, listStyles, seedStyles, syncDescriptions, updateReview, deleteReview } from '../controllers/styles.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', listStyles);
router.get('/seed', seedStyles);
router.get('/sync-descriptions', syncDescriptions);
router.get('/:id', getStyle);
router.post('/', createStyle); 
router.post('/:id/reviews', auth, addReview);
router.put('/:id/reviews/:reviewId', auth, updateReview);
router.delete('/:id/reviews/:reviewId', auth, deleteReview);

export default router;


