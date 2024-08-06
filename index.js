/*const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
    const { horasAdmin, horasTec } = req.body;

    // Ejecuta el archivo Java y pasa los parámetros
    exec(`java Calculator ${horasAdmin} ${horasTec}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ error: 'Error en el cálculo' });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).json({ error: 'Error en el cálculo' });
        }
        // Envía la respuesta al cliente
        res.json({ result: stdout.trim() });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});*/
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/calculate', (req, res) => {
  const { a, b } = req.body;
  if (typeof a === 'number' && typeof b === 'number') {
    res.json({ result: a + b });
  } else {
    res.status(400).json({ error: 'Invalid input' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});