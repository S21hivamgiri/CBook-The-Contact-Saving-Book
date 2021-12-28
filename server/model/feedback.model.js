var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var objectId = mongoose.Types.ObjectId;
var userSchema = new Schema({
    _id: { type: objectId, auto: true },
    feedback: { type: String, required: false },
    rating: { type: Number, required: true },

}, {
    versionKey: false
});
const feedback = mongoose.model('feedbacks', userSchema);
module.exports = feedback;