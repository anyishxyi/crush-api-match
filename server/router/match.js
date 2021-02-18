import express from 'express';
import addMatch from '../routes/match/addMatch';
import getAll from '../routes/match/getAll';
import getMatch from '../routes/match/getMatch';

const router = express.Router();

router.post('/', addMatch.addMatch);
router.get('/', getAll.getAll);
// router.get('/:id', getMatch.getMatch);

module.exports = router;