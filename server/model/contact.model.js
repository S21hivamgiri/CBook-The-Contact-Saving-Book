var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var textSearch = require('mongoose-partial-full-search');

var objectId = mongoose.Types.ObjectId;
var professionalSchema = new Schema({
    _id: { type: objectId, auto: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    country: { type: String, required: true },
    emergency: { type: String, required: true },
    code: { type: String, required: true }
}, {
    versionKey: false
});
professionalSchema.plugin(textSearch);
professionalSchema.index({ name: "text" });
const contacts = mongoose.model('contacts', professionalSchema);
module.exports = contacts;