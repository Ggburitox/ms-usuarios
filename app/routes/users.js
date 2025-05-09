const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema, updateSchema } = require('../schemas/user');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/users');

router.post('/register', async (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const { token, user } = await loginUser(req.body.email, req.body.password);
        res.json({ message: 'Login exitoso', token, user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const user = await getUser(Number(req.params.userId));
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

router.put('/:userId', async (req, res) => {
    const { error } = updateSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    try {
        const updatedUser = await updateUser(Number(req.params.userId), req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        await deleteUser(Number(req.params.userId));
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
