const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db');

const saltRounds = 10;
const SECRET_KEY = 'secret@@@112233'

const registerUser = async ({ username, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

const loginUser = async (email, password) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) throw new Error('Credenciales inválidas');

    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        SECRET_KEY,
        { expiresIn: '2h' }
    );
    return { token, user: { id: user.id, username: user.username, email: user.email } };
};

const getUser = async (userId) => {
    const result = await db.query('SELECT id, username, email FROM users WHERE id = $1', [userId]);
    return result.rows[0] || null;
};

const updateUser = async (userId, { username, email }) => {
    const result = await db.query(
        'UPDATE users SET username = $1, email = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, username, email',
        [username, email, userId]
    );
    if (result.rows.length === 0) throw new Error('Usuario no encontrado');
    return result.rows[0];
};

const deleteUser = async (userId) => {
    await db.query('DELETE FROM users WHERE id = $1', [userId]);
};

module.exports = { registerUser, loginUser, getUser, updateUser, deleteUser };
