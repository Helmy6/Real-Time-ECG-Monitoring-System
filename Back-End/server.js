const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// CORS middleware
app.use(cors({
    origin: 'https://real-time-ecg-monitoring-system.vercel.app/login/', 
    credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route to verify server is running
app.get('/', (req, res) => {
    res.send('✅ WebSocket Server Running');
});

// API endpoint to receive ECG data
app.post('/api/ecg', (req, res) => {
    const ecgData = req.body;
    console.log('⚡ Received ECG Data:', ecgData);

    const { voltage, heart_rate, diagnosis, confidence } = ecgData;

    const formattedData = {
        ECG: voltage,
        HR: heart_rate,
        AI: diagnosis,
        Confidence: confidence
    };

    // Broadcast data to all WebSocket clients
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(formattedData));
        }
    });

    res.status(200).json({ message: 'ECG Data Received Successfully' });
});

// WebSocket connection handler
wss.on('connection', ws => {
    console.log('⚡ New WebSocket Connection');

    ws.on('message', message => {
        console.log('📩 Received message:', message);
    });

    ws.on('close', () => {
        console.log('❌ WebSocket Disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});


