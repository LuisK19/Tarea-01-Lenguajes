const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint para obtener preguntas aleatorias
app.get('/api/questions/random', async (req, res) => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'Data', 'questions.json'), 'utf-8');
    const questions = JSON.parse(data);
    const sortedQuestions = questions.sort(() => 0.5 - Math.random());
    const selectedQuestions = sortedQuestions.slice(0, 10);
    const formattedQuestions = selectedQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer
    }));
    console.log('Selected Questions:', formattedQuestions); // Debug: Verificar las preguntas seleccionadas
    res.json(formattedQuestions);
    console.log('Sent Questions:', formattedQuestions); // Debug: Verificar las preguntas enviadas
  } catch (error) {
    console.error('Error get questions random:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para comprabar respuesta
app.post('/api/questions/check', async (req, res) => {
  try {
    const { questionId, selectedOption } = req.body;
    console.log('Received questionId:', questionId, 'selectedOption:', selectedOption);

    const data = await fs.readFile(path.join(__dirname, 'Data', 'questions.json'), 'utf-8');
    const questions = JSON.parse(data);

    const question = questions.find(q => q.id === questionId);
    console.log('Found question:', question);
    if (!question) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    const isCorrect = question.correctAnswer === selectedOption;
    res.json({ isCorrect, correctAnswer: question.correctAnswer });
  } catch (error) {
    console.error('Error checking answer:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para guardar los resultados
app.post('/api/results', async (req, res) => {
  try {
    const { userName, score, win } = req.body;

    if (!userName || score === undefined || win === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newResult = {
      userName,
      score,
      win,
      date: new Date().toISOString()
    };

    const resultsFilePath = path.join(__dirname, 'Data', 'results.json');
    let results = [];

    try {
      const data = await fs.readFile(resultsFilePath, 'utf-8');
      results = JSON.parse(data);
    } catch (error) {

    }
    results.push(newResult);
    await fs.writeFile(resultsFilePath, JSON.stringify(results, null, 2));
    res.status(201).json(newResult);

  } catch (error) {
    console.error('Error guardando resultado:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Endpoint para obtener los resultados
app.get('/api/results', async (req, res) => {
    try {
        const resultsFilePath = path.join(__dirname, 'Data', 'results.json');   
        let results = [];
        try {
            const data = await fs.readFile(resultsFilePath, 'utf-8');
            results = JSON.parse(data);
        } catch (error) {
            return res.json([]);
        }
        res.json(results);

    } catch (error) {
        console.error('Error obteniendo resultados:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

});

//Endpoint para obtener resultados ordenados por usuario
app.get('/api/results/user', async (req, res) => {
    try {
        const { userName } = req.body;
        if (!userName) {
            return res.status(400).json({ error: 'Falta el nombre de usuario:' + userName });
        }
        const resultsFilePath = path.join(__dirname, 'Data', 'results.json');
        let results = [];
        try {
            const data = await fs.readFile(resultsFilePath, 'utf-8');
            results = JSON.parse(data);
        } catch (error) {
            return res.json([]);
        }
        const sortedResults = results.filter(result => result.userName === userName);
        res.json(sortedResults);
    } catch (error) {
        console.error('Error obteniendo resultados del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} y en http://localhost:${PORT}`);
});