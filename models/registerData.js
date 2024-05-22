const RegisterData = require('./models/RegisterData');


router.post('/register', async (req, res) => {
  try {

    const { username, email, password } = req.body;

    const newData = new RegisterData({ username, email, password });


    await newData.save();

    res.status(201).json({ message: 'Data added successfully' });
  } catch (error) {
    console.error('Error adding data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


