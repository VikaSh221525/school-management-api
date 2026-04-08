const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const schoolRoutes = require('./src/routes/school.route');
app.use('/', schoolRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'School Management API is running!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});