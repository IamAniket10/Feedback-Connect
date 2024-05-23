const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  satisfaction: String,
  usabilityRating: String,
  valuableFeatures: String,
  improvementSuggestions: String,
  likelihoodToRecommend: String
});

module.exports = mongoose.model('feedback', feedbackSchema);
