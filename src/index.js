const express = require('express');
const bcrypt = require('bcryptjs'); // Use bcryptjs if installed
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./db'); // Import the database configuration

const app = express();
app.use(express.json());

// Passport configuration for user authentication
passport.use(new LocalStrategy(
    async function(username, password, done) {
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT * FROM admins WHERE username = $1', [username]);
            client.release();

            if (result.rows.length === 0) {
                return done(null, false, { message: 'Incorrect username.' });
            }

            const admin = result.rows[0];

            bcrypt.compare(password, admin.password, function(err, res) {
                if (res) {
                    return done(null, admin);
                } else {
                    return done(null, false, { message: 'Incorrect password.' });
                }
            });
        } catch (err) {
            return done(err);
        }
    }
));

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const client = await pool.connect();
        const result = await client.query(
            'INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        client.release();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: 'Registration failed.' });
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/failure'
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});