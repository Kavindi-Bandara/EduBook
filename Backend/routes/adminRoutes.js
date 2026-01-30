import express from 'express';
import Admin from '../models/Admin.js';

const router = express.Router();

// POST /api/admins - Create new admin (Signup)
router.post('/', async (req, res) => {
    try {
        console.log("Received signup request:", req.body);
        
        const admin = new Admin(req.body);
        const savedAdmin = await admin.save();
        
        console.log("Admin created successfully:", savedAdmin.email);
        
        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: {
                id: savedAdmin._id,
                name: savedAdmin.name,
                email: savedAdmin.email,
                role: savedAdmin.role
            }
        });
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(400).json({
            success: false,
            message: 'Error creating admin',
            error: error.message
        });
    }
});

// POST /api/admins/login - Admin login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        // Find admin by email
        const admin = await Admin.findOne({ email });
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found. Please sign up first.'
            });
        }

     
        if (admin.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password. Please try again.'
            });
        }

        // Login successful
        res.json({
            success: true,
            message: 'Login successful',
            data: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: 'Login failed',
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find().select('-password');
        res.json({
            success: true,
            data: admins
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching admins',
            error: error.message
        });
    }
});

export default router;