const dotenv = require('dotenv');
const app = require('./app.js');
const connectDB = require('./database/db.js');
const PORT = process.env.PORT || 5000;

dotenv.config();

// To connect to the database
connectDB();

// To start the server
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT} successfully`);
});