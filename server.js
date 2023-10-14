const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use(express.json());

// POST-Route zum Speichern von Daten in einer Datei
app.post('/datenSpeichern', async (req, res) => {
  try {
    const data = req.body;
    await fs.writeFile('daten.json', JSON.stringify(data));
    res.status(201).json({ message: 'Daten erfolgreich gespeichert.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Es ist ein Fehler aufgetreten.' });
  }
});

// GET-Route zum Lesen von gespeicherten Daten aus der Datei
app.get('/datenLesen', async (req, res) => {
  try {
    const data = await fs.readFile('daten.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Es ist ein Fehler aufgetreten.' });
  }
});

app.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
