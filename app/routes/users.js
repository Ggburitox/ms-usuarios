const express = require('express');
const router = express.Router();
const { registerSchema, loginSchema, updateSchema } = require('../schemas/user');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/users');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - dni
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               dni:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos o duplicados
 */
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

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Credenciales incorrectas
 */
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

/**
 * @swagger
 * /usuarios/{userId}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:userId', async (req, res) => {
    try {
        const user = await getUser(Number(req.params.userId));
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(user);
    } catch {
        res.status(500).json({ error: 'Error del servidor' });
    }
});

/**
 * @swagger
 * /usuarios/{userId}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       400:
 *         description: Error en validación
 *       404:
 *         description: Usuario no encontrado
 */
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

/**
 * @swagger
 * /usuarios/{userId}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuario eliminado
 *       400:
 *         description: Error al eliminar usuario
 */
router.delete('/:userId', async (req, res) => {
    try {
        await deleteUser(Number(req.params.userId));
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
