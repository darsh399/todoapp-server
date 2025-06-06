const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./configue/db');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
