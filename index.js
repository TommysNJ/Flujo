/*const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Función para sumar dos números
function add(horasAdmin, horasTec) {
    return horasAdmin + horasTec;
}

// Función para calcular la suma total de una lista de números
function totalSum(result) {
    return result.reduce((sum, value) => sum + value, 0);
}

// Función para calcular la suma total de una lista de números
function totalSum(result) {
    return result.reduce((sum, value) => sum + value, 0);
}

// Función para calcular la suma total por proyecto y devolver un solo número total
function totalSumByProject(items, result) {
    const projectTotals = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const projectCode = codigoCPP.substring(0, 4); // Obtener los primeros 4 dígitos
            if (!projectTotals[projectCode]) {
                projectTotals[projectCode] = 0;
            }
            projectTotals[projectCode] += result[index] || 0; // Sumar el valor correspondiente en results
        }
    });

    // Sumar todos los valores de los proyectos
    return totalSum(Object.values(projectTotals));
}

// Ruta para manejar las solicitudes de cálculo
app.post('/calculate', (req, res) => {
    const { horasAdmin, horasTec, operation, result, items } = req.body;

    if (operation === 'add') {
        res.json({ result: add(horasAdmin, horasTec) });
    } else if (operation === 'totalSum' && Array.isArray(result)) {
        res.json({ result: totalSum(result) });
    } else if (operation === 'totalSumByProject' && Array.isArray(items) && Array.isArray(result)) {
        res.json({ result: totalSumByProject(items, result) });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Función para sumar dos números
function add(horasAdmin, horasTec) {
    return horasAdmin + horasTec;
}

// Función para calcular la suma total de una lista de números
function totalSum(result) {
    return result.reduce((sum, value) => sum + value, 0);
}

// Función para calcular la suma total por proyecto
/*function totalSumByProject(items, result) {
    const projectTotals = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const projectCode = codigoCPP.substring(0, 4); // Obtener los primeros 4 dígitos
            if (!projectTotals[projectCode]) {
                projectTotals[projectCode] = 0;
            }
            projectTotals[projectCode] += result[index] || 0; // Sumar el valor correspondiente en results
        }
    });

    return projectTotals;
}*/

// Función para calcular la suma total por proyecto y devolver un array de valores
function totalSumByProject(items, result) {
    const projectTotals = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const projectCode = codigoCPP.substring(0, 4); // Obtener los primeros 4 dígitos
            if (!projectTotals[projectCode]) {
                projectTotals[projectCode] = 0;
            }
            projectTotals[projectCode] += result[index] || 0; // Sumar el valor correspondiente en result
        }
    });

    // Extraer los valores de projectTotals y devolverlos como un array
    return Object.values(projectTotals);
}

// Ruta para manejar las solicitudes de cálculo
app.post('/calculate', (req, res) => {
    const { horasAdmin, horasTec, operation, result, items} = req.body;

    if (operation === 'add') {
        res.json({ result: add(horasAdmin, horasTec) });
    } else if (operation === 'totalSum' && Array.isArray(result)) {
        res.json({ result: totalSum(result) });
    } else if (operation === 'totalSumByProject' && Array.isArray(items) && Array.isArray(result)) {
        res.json({ result: totalSumByProject(items, result) });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

