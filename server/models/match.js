import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const matchSchema = mongoose.Schema({
  first_user_id: { type: String, required: true },
  second_user_id: { type: String, required: true },
  created_date: { type: String }
});

matchSchema.plugin(uniqueValidator);

const matchModel = new mongoose.model('Match', matchSchema);

export default matchModel;