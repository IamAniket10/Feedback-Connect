const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Feedback = require('./feedback');
const UserModel = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');



const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://feedback-connect-frontend.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());


app.options('*', cors());


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, client-security-token');
  next();
});


//signup
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name, email, password: hash })
        .then(User => res.json(User))
        .catch(err => res.json(err))
    }).catch(err => console.log(err.message))


})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token){
    return res.json("The token was not available")
  } else{
    jwt.verify(token, "jwt-secret-key", (err,decoded) => {
      if(err){
        return res.json("Token is wrong");
      } else {
        next();
      }
    })
  }
}


app.get('/form', verifyUser, (req, res) => {
  return res.json("Success")
  
} )


//login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({email: user.email}, "jwt-secret-key", {expiresIn: "1d"});
            res.cookie("token", token);
            res.json("Success");
          } else{
            res.json("the password is incorrect");
          }
        });
      } else {
        res.json("No record exists");
      }
    })
    .catch(err => res.json(err));
})





// app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);



// app.post('/signup', async (req, res) => {
//   try {
//       const { name, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new UserModel({ name, email, password: hashedPassword });
//       await user.save();
//       res.status(200).json({ message: 'User created successfully' });
//   } catch (error) {
//       console.error('Error creating user:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });




app.post('/feedback', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  try {
    // Create a new Feedback document
    const newfeedback = new Feedback(formData);

    // Save the document to the database
    await newfeedback.save();

    // Send a response back to the cient
    res.status(200).json({ message: 'Data received and saved successfully' });
  } catch (error) {
    console.error('Error saving feedback', error);
    res.status(500).json({ error: 'An error occured while saving feedback' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


mongoose.connect("mongodb+srv://aniketkadam10:SupercoolAK@feedbacksystem.udxo3iy.mongodb.net/?retryWrites=true&w=majority&appName=FeedbackSystem")

  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
