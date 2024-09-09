require('dotenv').config();
const OpenAI = require('openai');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = 3080;

const openai = new OpenAI({
    organization: process.env.OPEN_AI_ORGANIZATION_ID,
    project: "",
    apiKey: process.env.OPEN_AI_API_KEY
});

  

app.post('/', async (req, res) => {
const { message, currentModel } = req.body;
const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${message}` }],
    model: `${currentModel}`,
    });

    res.json({
    message: response.choices[0].message.content
    })
})

app.get('/models', async (req, res) =>{
  const list = await openai.models.list();
  console.log(list);
  res.json({
    models: list
  });
});

  app.listen(port, () => {
    console.log(`Mini Projects listening at http://localhost:${port}`);
  })