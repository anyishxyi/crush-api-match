require('dotenv').config();
import mongoose from 'mongoose';
import MatchModel from '../../models/match';
const matchData = { 
	first_user_id: "602d37bfa848253792d9e6a3",
	second_user_id: "602aee340026fab6a71df1e3",
	created_date: new Date()
};

var savedMatch = null;

beforeAll(() => {
	mongoose.connect(process.env.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true })
					.then(() => { /*console.log('\nSuccessully connected to MongoDB Atlas !\n')*/} )
					.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));
});
describe('Math Model Unit Test', () => {
	it('create & save a match successfully', async () => {
		const match = new MatchModel(matchData);
		savedMatch = await match.save();

		expect(savedMatch._id).toBeDefined();
		expect(savedMatch.first_user_id).toBe(matchData.first_user_id);
		expect(savedMatch.second_user_id).toBe(matchData.second_user_id);
	});
	it('get all matches', async () => {
		const matches = await MatchModel.find();
		expect(matches.length).toBeDefined();	
	});
	it('List All match of one user', async () => {
		const matches = await MatchModel.find({first_user_id: matchData.first_user_id, second_user_id: matchData.first_user_id});
		expect(matches.length).toBeDefined();	
	});
})

afterAll( async () => {
	try {
		await MatchModel.findOneAndDelete({_id: savedMatch._id});
		await mongoose.disconnect()
		// console.log('\nSuccessully disconnected to MongoDB Atlas !\n')
	} catch (error) {
		console.error(error);
	}
})