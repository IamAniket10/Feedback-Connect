import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './form.css';
import { useNavigate } from 'react-router-dom';


axios.defaults.withCredentials = true;

const FeedbackForm = () => {
  // State variables to store user input
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [feedback, setFeedback] = useState('');
  // const [rating, setRating] = useState(0);

  const [satisfaction, setSatisfaction] = useState('');
  const [usabilityRating, setUsabilityRating] = useState('');
  const [valuableFeatures, setValuableFeatures] = useState('');
  const [improvementSuggestions, setImprovementSuggestions] = useState('');
  const [likelihoodToRecommend, setLikelihoodToRecommend] = useState('');
  const [submitted, setSubmitted] = useState(false); 

  const navigate = useNavigate();


  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      // name,
      // email,
      // feedback,
      // rating: parseInt(rating), // Convert rating to integer
      satisfaction,
      usabilityRating,
      valuableFeatures,
      improvementSuggestions,
      likelihoodToRecommend
    };

    try {
      // Send data to backend
      const response = await axios.post('https://feedback-connect-backend.vercel.app/feedback', formData);

      console.log('Feedback submitted:', response.data);
      setSubmitted(true);

      // Clear form after successful submission
      // setName('');
      // setEmail('');
      // setFeedback('');
      // setRating(0);
      setSatisfaction('');
      setUsabilityRating('');
      setValuableFeatures('');
      setImprovementSuggestions('');
      setLikelihoodToRecommend('');

    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };


  useEffect(() => {
    axios.get('https://feedback-connect-backend.vercel.app/form', { withCredentials: true })
      .then(result => {
        console.log(result)
        if (result.data !== "Success") {
          navigate('/login');
        }
      })
      .catch(err => {
        console.error('Error Fetching form data:', err);
        navigate('/login');
      })
  }, [navigate]);


  return (
    <div>
      {submitted ? (
        <div className='confirmation-message'>
          <h2>Thank you for your feedback!</h2>
          <p>We appreciate your time and input.</p>
        </div>
      ) : (
        <form className="form" onSubmit={handleSubmit}>
          <h2>Share Your Feedback with Us</h2>
          <div className='undertheline'></div>
          {/* <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder='Name'
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Email'
      />
      <label htmlFor="feedback">Feedback:</label>
      <textarea
        id="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        required
        placeholder='Feedback'
      />
      <label htmlFor="rating">Rating (1-5):</label>
      <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="0">-- Select Rating --</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select> */}
          <label htmlFor="satisfaction">How satisfied are you with our service?</label>
          <select id="satisfaction" value={satisfaction} onChange={(e) => setSatisfaction(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Very satisfied">Very satisfied</option>
            <option value="Satisfied">Satisfied</option>
            <option value="Neutral">Neutral</option>
            <option value="Dissatisfied">Dissatisfied</option>
            <option value="Very dissatisfied">Very dissatisfied</option>
          </select>
          <label htmlFor="usabilityRating">How would you rate the usability of our service?</label>
          <select id="usabilityRating" value={usabilityRating} onChange={(e) => setUsabilityRating(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
            <option value="Very Poor">Very Poor</option>
          </select>
          <label htmlFor="valuableFeatures">Which features of our service do you find most valuable?</label>
          <textarea
            id="valuableFeatures"
            value={valuableFeatures}
            onChange={(e) => setValuableFeatures(e.target.value)}
            placeholder='Valuable Features'
          />
          <label htmlFor="improvementSuggestions">What improvements would you suggest for our service?</label>
          <textarea
            id="improvementSuggestions"
            value={improvementSuggestions}
            onChange={(e) => setImprovementSuggestions(e.target.value)}
            placeholder='Improvement Suggestions'
          />
          <label htmlFor="likelihoodToRecommend">How likely are you to recommend our service to a friend or colleague?</label>
          <select id="likelihoodToRecommend" value={likelihoodToRecommend} onChange={(e) => setLikelihoodToRecommend(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Very likely">Very likely</option>
            <option value="Likely">Likely</option>
            <option value="Neutral">Neutral</option>
            <option value="Unlikely">Unlikely</option>
            <option value="Very unlikely">Very unlikely</option>
          </select>
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};


export default FeedbackForm;
