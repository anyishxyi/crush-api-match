import Match from '../../models/match';

/**
  * List All match of one user
 */
exports.getUserMatch = async (req, res, next) => {
  try {
		if(!req.params.userID) return res.status(422).json({ msg: 'Missing required argument' });
		const _userID = req.params.userID
    const matchs = await Match.find({first_user_id: _userID, second_user_id: _userID}).catch((error) => { res.status(500).json({ error: error }); });

    if (!matchs) {
      return res.status(404).json({ error: new Error('matchs not found!') });
    }
    res.status(200).json({matchs: matchs});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}