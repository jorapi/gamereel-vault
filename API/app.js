const express = require('express');
const bodyParser = require('body-parser');

// Import routes
const gamesRoutes = require('./routes/games');
const francisesRoutes = require('./routes/franchises');
const hardDrivesRoutes = require('./routes/hardDrives');
const videoFilesRoutes = require('./routes/videoFiles');
// Other routes can be imported similarly

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
// Enable All CORS Requests for development
app.use(cors());

// Use routes
app.use('/api/games', gamesRoutes);
app.use('/api/franchises', francisesRoutes);
app.use('/api/hardDrives', hardDrivesRoutes);
app.use('/api/videoFiles', videoFilesRoutes);
// Other routes can be used similarly

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
