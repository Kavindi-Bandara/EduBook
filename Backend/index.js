// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();

// CORS configuration - allow frontend to connect
app.use(cors({
    origin: 'http://localhost:3000', // Your React app URL
    credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/admins', adminRoutes);

// Test route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: '🚀 EduBook Backend API is running!',
        database: 'EduBook',
        collection: 'Admin',
        timestamp: new Date().toISOString()
    });
});

// Database status route
app.get('/api/database-status', (req, res) => {
    res.json({
        success: true,
        database: {
            name: 'EduBook',
            state: mongoose.connection.readyState,
            stateDescription: getDBState(mongoose.connection.readyState),
            host: mongoose.connection.host,
            collection: 'Admin'
        }
    });
});

function getDBState(state) {
    const states = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting'
    };
    return states[state] || 'unknown';
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

const PORT = process.env.PORT || 5001;
const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/EduBook';

async function start() {
    try {
        await mongoose.connect(MONGO, {});
        
        console.log('✅ MongoDB Connected Successfully!');
        console.log(`📍 Host: ${mongoose.connection.host}`);
        console.log(`🗄️ Database: ${mongoose.connection.name}`);
        
        app.listen(PORT, () => {
            console.log(`\n🎯 Server Details:`);
            console.log(`   Server running on port ${PORT}`);
            console.log(`   Database: EduBook`);
            console.log(`   Collection: Admin`);
            console.log(`   API URL: http://localhost:${PORT}`);
            console.log(`   Frontend URL: http://localhost:3000`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

start();