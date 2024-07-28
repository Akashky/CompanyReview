const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    subject: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    shares: { type: Number, default: 0 }
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    foundedOn: { type: Date, required: true },
    city: { type: String, required: true },
    logo: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema]
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
