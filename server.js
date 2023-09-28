const express = require("express")
const app = express()
const port = 3001
const cors = require("cors")

const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";
const OPENAI_API_KEY = "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"; // Replace with your actual API key

app.use(express.json()); // Middleware to parse JSON
app.use(cors())

app.post('/ask-gpt', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await fetch(OPENAI_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 150
            })
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        res.status(500).send('Error communicating with OpenAI.');
    }
});

app.listen(port, ()=>{
    console.log("Hello, I am listening");
})