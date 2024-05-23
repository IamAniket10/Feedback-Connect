// const express = require('express');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('User');

// const router = express.Router();

// router.post('/signup', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = new User({ username, email, password: hashedPassword });
//         await user.save();
//         res.status(200).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });



// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ error: 'Invalid Credentials' });
//         }
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ error: 'Invalid Credentials' });
//         }
//         const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error logging in:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// module.exports = router;
