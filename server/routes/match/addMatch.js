import Match from '../../models/match';

/**
  * Get add a new match
 */
exports.addMatch = async (req, res, next) => {
	try {
		if(!req.body.first_user_id || !req.body.second_user_id) return res.status(422).json({ msg: 'Missing required argument' });

		const match = new Match({ first_user_id: req.body.first_user_id, second_user_id: req.body.second_user_id, created_date: new Date() });
		const savedMatch = await match.save();

		if(!savedMatch) res.status(500).json({ error: error });

		res.status(201).json({ match: savedMatch });
	} catch (error) {
		res.status(500).json({ msg: error });
	}
}