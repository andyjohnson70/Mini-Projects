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
const { message } = req.body;
const response = await openai.chat.completions.create({
    messages: [{ role: "system", content: `${message}` }],
    model: "gpt-4o-mini-2024-07-18",
    });

    res.json({
    message: response.choices[0].message.content
    })
})

  app.listen(port, () => {
    console.log(`Mini Projects listening at http://localhost:${port}`);
  })