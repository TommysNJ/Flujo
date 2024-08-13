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


// Función para calcular la suma total por proyecto y devolver un array de valores
function totalSumByProject(items, result) {
    const projectTotals = {};
    const projectCounts = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const projectCode = codigoCPP.substring(0, 4); // Obtener los primeros 4 dígitos
            if (!projectTotals[projectCode]) {
                projectTotals[projectCode] = 0;
                projectCounts[projectCode] = 0;
            }
            projectTotals[projectCode] += result[index] || 0; // Sumar el valor correspondiente en result
            projectCounts[projectCode]++; // Aumentar el contador para este código de proyecto
        }
    });

    // Crear un array para almacenar los resultados expandidos
    const expandedResults = [];

    // Llenar el array con tantas entradas como indique el contador
    for (const projectCode in projectTotals) {
        const total = projectTotals[projectCode];
        const count = projectCounts[projectCode];
        for (let i = 0; i < count; i++) {
            expandedResults.push(total);
        }
    }

    return expandedResults;
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

// Función para calcular la suma total por proyecto y devolver un array de valores
function totalSumByProject(items, result) {
    const projectTotals = {};
    const projectCounts = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const projectCode = codigoCPP.substring(0, 4); // Obtener los primeros 4 dígitos
            if (!projectTotals[projectCode]) {
                projectTotals[projectCode] = 0;
                projectCounts[projectCode] = 0;
            }
            projectTotals[projectCode] += result[index] || 0; // Sumar el valor correspondiente en result
            projectCounts[projectCode]++; // Aumentar el contador para este código de proyecto
        }
    });

    // Crear un array para almacenar los resultados expandidos
    const expandedResults = [];

    // Llenar el array con tantas entradas como indique el contador
    for (const projectCode in projectTotals) {
        const total = projectTotals[projectCode];
        const count = projectCounts[projectCode];
        for (let i = 0; i < count; i++) {
            expandedResults.push(total);
        }
    }

    return expandedResults;
}

// Nueva función para calcular la suma total por subproyecto y devolver un array de valores
function totalSumBySubProject(items, result) {
    const subProjectTotals = {};
    const subProjectCounts = {};

    items.forEach((item, index) => {
        const codigoCPP = item.codigoCPP;
        if (codigoCPP && typeof codigoCPP === 'string') { // Verificar si codigoCPP está definido y es una cadena
            const subProjectCode = codigoCPP.substring(5, 9); // Obtener los dígitos 5, 6, 7 y 8
            if (!subProjectTotals[subProjectCode]) {
                subProjectTotals[subProjectCode] = 0;
                subProjectCounts[subProjectCode] = 0;
            }
            subProjectTotals[subProjectCode] += result[index] || 0; // Sumar el valor correspondiente en result
            subProjectCounts[subProjectCode]++; // Aumentar el contador para este código de subproyecto
        }
    });

    // Crear un array para almacenar los resultados expandidos
    const expandedResults = [];

    // Llenar el array con tantas entradas como indique el contador
    for (const subProjectCode in subProjectTotals) {
        const total = subProjectTotals[subProjectCode];
        const count = subProjectCounts[subProjectCode];
        for (let i = 0; i < count; i++) {
            expandedResults.push(total);
        }
    }

    return expandedResults;
}

//Función para calcular el peso global 
function pesoGlobal(result){
    let total = totalSum(result);
    const pesos = [];
    result.forEach((results) => {
        let suma = results / total;
        pesos.push(suma);
    });
    return pesos; 
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
    } else if (operation === 'totalSumBySubProject' && Array.isArray(items) && Array.isArray(result)) {
        res.json({ result: totalSumBySubProject(items, result) });
    } else if (operation === 'pesoGlobal' && Array.isArray(result)) {
        res.json({ result: pesoGlobal(result) });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

