import mongoose from 'mongoose';
import MatchModel from '../../models/match';
const supertest = require("supertest"); // supertest is a framework that allows to easily test web apis
import app from '../../app';

const request = supertest(app);
const matchData = { 
	first_user_id: "test-unit1@crush.fr",
	second_user_id: "test-unit1@crush.fr",
	created_date: new Date()
};
var savedMatch = null;

describe("testing-match-routes", () => {
  it("GET /match get all matchs", async done => {
    const resp = await request.get("/match")
		const matchs = resp.body ? resp.body.matchs : null
		expect(resp.status).toBe(200)
		expect(matchs.length).toBeDefined()
		done()
  });
  it("POST /match create a new match", async done => {
    const response = await request.post("/match")
																	.send(matchData);
		savedMatch = response.body ? response.body.match : null
		expect(response.status).toBe(201)
		expect(savedMatch._id).toBeDefined()
		expect(savedMatch.first_user_id).toBe(matchData.first_user_id)
		expect(savedMatch.second_user_id).toBe(matchData.second_user_id)
		done()
  });
	it('GET /match/:userID List All match of one user', async done => {
		const response = await request.get(`/match/${matchData.first_user_id}`)
		const matchs = response.body ? response.body.matchs : null
		expect(response.status).toBe(200)
		expect(matchs.length).toBeDefined()
		done()
	});
});

afterAll( async () => {
	try {
		await mongoose.disconnect()
	} catch (error) {
		console.error(error);
	}
})