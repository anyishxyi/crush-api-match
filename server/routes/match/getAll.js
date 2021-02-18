import Match from '../../models/match';

/**
  * Get all matchs
 */
exports.getAll = async (req, res, next) => {
  try {
    console.log('route get all')
    const matchs = await Match.find().catch((error) => { res.status(500).json({ error: error }); });
    if (!matchs) {
      return res.status(404).json({ error: new Error('matchs not found!') });
    }
    res.status(200).json({matchs: matchs});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}