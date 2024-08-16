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
        let peso = results / total;
        pesos.push(peso);
    });
    return pesos; 
}

//Función para calcular el peso por proyecto
function pesoPorProyecto(items, result){
    let totalPorProyecto = totalSumByProject(items, result);
    const pesos = [];
    for (let i = 0 ; i < totalPorProyecto.length ; i++) {
        let peso = result[i] / totalPorProyecto[i];
        pesos.push(peso);
    }
    return pesos;
}

//Función para calcular el peso por subproyecto
function pesoPorSubProyecto(items, result){
    let totalPorSubProyecto = totalSumBySubProject(items, result);
    const pesos = [];
    for (let i = 0 ; i < totalPorSubProyecto.length ; i++) {
        let peso = result[i] / totalPorSubProyecto[i];
        pesos.push(peso);
    }
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
    } else if (operation === 'pesoPorProyecto' && Array.isArray(items) && Array.isArray(result)) {
        res.json({ result: pesoPorProyecto(items, result) });
    } else if (operation === 'pesoPorSubProyecto' && Array.isArray(items) && Array.isArray(result)) {
        res.json({ result: pesoPorSubProyecto(items, result) });
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');

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
        let peso = results / total;
        pesos.push(peso);
    });
    return pesos; 
}

//Función para calcular el peso por proyecto
function pesoPorProyecto(items, result){
    let totalPorProyecto = totalSumByProject(items, result);
    const pesos = [];
    for (let i = 0 ; i < totalPorProyecto.length ; i++) {
        let peso = result[i] / totalPorProyecto[i];
        pesos.push(peso);
    }
    return pesos;
}

//Función para calcular el peso por subproyecto
function pesoPorSubProyecto(items, result){
    let totalPorSubProyecto = totalSumBySubProject(items, result);
    const pesos = [];
    for (let i = 0 ; i < totalPorSubProyecto.length ; i++) {
        let peso = result[i] / totalPorSubProyecto[i];
        pesos.push(peso);
    }
    return pesos;
}


// Función para generar las fechas
function generarFechas(fechaInicio, intervaloDias, numeroFechas) {
    const fechas = [];
    let fecha = new Date(fechaInicio);

    for (let i = 0; i < numeroFechas; i++) {
        fechas.push(fecha.toISOString().split('T')[0]); 
        fecha.setDate(fecha.getDate() + intervaloDias);
    }

    return fechas;
}

// Función para generar y escribir un archivo CSV con fechas como encabezados
async function generarCSV(fechas) {
    const csvWriter = createObjectCsvWriter({
        path: path.join(__dirname, 'output.csv'), // Ruta donde se guardará el archivo CSV
        header: fechas.map((fecha, index) => ({ id: `col${index}`, title: fecha })) // Crear el encabezado usando las fechas
    });

    // Crear registros vacíos para cada fecha (se puede ajustar según lo que necesites)
    const records = [{}];
    fechas.forEach((fecha, i) => {
        records[0][`col${i}`] = ''; // Aquí puedes agregar datos específicos si los tienes
    });

    await csvWriter.writeRecords(records);
    return 'output.csv';
}

// Ruta para manejar las solicitudes de cálculo
app.post('/calculate', async (req, res) => {
    const { horasAdmin, horasTec, operation, result, fechaInicio, intervaloDias, numeroFechas } = req.body;

    if (operation === 'add') {
        res.json({ result: add(horasAdmin, horasTec) });
    } else if (operation === 'totalSum' && Array.isArray(result)) {
        res.json({ result: totalSum(result) });
    } else if (operation === 'totalSumByProject' && Array.isArray(result)) {
        res.json({ result: totalSumByProject(items, result) });
    } else if (operation === 'totalSumBySubProject' && Array.isArray(result)) {
        res.json({ result: totalSumBySubProject(items, result) });
    } else if (operation === 'pesoGlobal' && Array.isArray(result)) {
        res.json({ result: pesoGlobal(result) });
    } else if (operation === 'pesoPorProyecto' && Array.isArray(result)) {
        res.json({ result: pesoPorProyecto(items, result) });
    } else if (operation === 'pesoPorSubProyecto' && Array.isArray(result)) {
        res.json({ result: pesoPorSubProyecto(items, result) });
    } else if (operation === 'generarFechas' && fechaInicio && intervaloDias && numeroFechas) {
        const fechas = generarFechas(fechaInicio, intervaloDias, numeroFechas);
        res.json({ result: fechas });
    } else if (operation === 'generarCSV' && fechaInicio && intervaloDias && numeroFechas) {
        try {
            const fechas = generarFechas(fechaInicio, intervaloDias, numeroFechas); // Generar las fechas
            const filePath = await generarCSV(fechas);
            res.download(filePath, (err) => {
                if (err) {
                    res.status(500).json({ error: 'Failed to download the file' });
                }
                fs.unlinkSync(filePath); // Eliminar el archivo después de enviarlo
            });
        } catch (error) {
            res.status(500).json({ error: 'Failed to generate CSV' });
        }
    } else {
        res.status(400).json({ error: 'Invalid input' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

