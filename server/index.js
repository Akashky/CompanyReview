const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Company = require('./models/Company');

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'https://companyreview-fe.onrender.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://companyreview-fe.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'https://companyreview-fe.onrender.com');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.sendStatus(200);
  });
  

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected to Atlas'))
    .catch(err => console.log(err));

const verifyCompanyData = (req, res, next) => {
    const { name, location, foundedOn, city, logo, description } = req.body;
    if (!name || !location || !foundedOn || !city || !logo || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    next();
};

const verifyReviewData = (req, res, next) => {
    const { fullName, subject, reviewText, rating } = req.body;
    if (!fullName || !subject || !reviewText || rating === undefined || rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'All review fields are required and rating must be between 1 and 5' });
    }
    next();
};

// Routes

// Add a company
app.post('/api/companies', verifyCompanyData, async (req, res) => {
    try {
        const { name, location, foundedOn, city, logo, description } = req.body;
        const newCompany = new Company({ name, location, foundedOn, city, logo, description });
        await newCompany.save();
        res.status(201).json({ message: 'Company profile created successfully', company: newCompany });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get the list of companies
app.get('/api/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get detailed company information including reviews and average rating
app.get('/api/companies/:id', async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Calculate average rating
        const totalReviews = company.reviews.length;
        const averageRating = totalReviews > 0 ? company.reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews : 0;

        res.status(200).json({ company, averageRating });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Add a review to a company
app.post('/api/companies/:id/reviews', verifyReviewData, async (req, res) => {
    try {
        const { fullName, subject, reviewText, rating } = req.body;
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const newReview = { fullName, subject, reviewText, rating };
        company.reviews.push(newReview);
        await company.save();
        res.status(201).json({ message: 'Review added successfully', review: newReview });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Interact with a review (like or share)
app.post('/api/companies/:companyId/reviews/:reviewId/like', async (req, res) => {
    try {
        const { companyId, reviewId } = req.params;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const review = company.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        review.likes += 1;
        await company.save();
        res.status(200).json({ message: 'Review liked successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.post('/api/companies/:companyId/reviews/:reviewId/share', async (req, res) => {
    try {
        const { companyId, reviewId } = req.params;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const review = company.reviews.id(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        review.shares += 1;
        await company.save();
        res.status(200).json({ message: 'Review shared successfully', review });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
