require('dotenv').config();
import mongoose from 'mongoose';
import MatchModel from '../../models/match';
const matchData = { 
	first_user_id: "test-unit1@crush.fr",
	second_user_id: "test-unit1@crush.fr",
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
	// it('get all users', async () => {
	// 	const users = await MatchModel.find();
	// 	expect(users.length).toBeDefined();	
	// });
	// it('get user info', async () => {
	// 	const userFound = await MatchModel.findOne({_id: savedMatch._id});
	// 	expect(userFound._id.toString()).toBe(savedMatch._id.toString());
	// 	expect(userFound.email).toBe(savedMatch.email);
	// 	expect(userFound.firstName).toBe(savedMatch.firstName);
	// 	expect(userFound.lastName).toBe(savedMatch.lastName);
	// });
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