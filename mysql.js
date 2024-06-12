const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Ipineda',
    password: 'Ipineda24@',
    database: 'store'
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos como id ' + connection.threadId);
});

// Middleware para parsear el cuerpo de la petición
app.use(bodyParser.json());

// Ruta para obtener datos de la base de datos
app.get('/datos', (req, res) => {
    connection.query('SELECT * FROM users', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    });
});

// Ruta para subir datos a la base de datos
app.post('/subir', (req, res) => {
    const { name, email, password, type } = req.body;
    const query = 'INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, email, password, type], (error, results, fields) => {
        if (error) {
            res.json({ success: false, error: error.message });
        } else {
            res.json({ success: true });
        }
    });
});

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
