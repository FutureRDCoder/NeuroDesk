const OpenAI = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const summarizeNote = async (content) => {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You summarize notes clearly and professionally.",
        },

        {
          role: "user",
          content: content,
        },
      ],

      temperature: 0.7,
    });

  return response.choices[0].message.content;
};


const generateTasksFromNote = async (
  content
) => {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "Generate actionable productivity tasks from notes.",
        },

        {
          role: "user",
          content: content,
        },
      ],

      temperature: 0.7,
    });

  return response.choices[0].message.content;
};


const rewriteContent = async (content) => {
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "Rewrite content professionally and clearly.",
        },

        {
          role: "user",
          content: content,
        },
      ],

      temperature: 0.7,
    });

  return response.choices[0].message.content;
};


module.exports = {
  summarizeNote,
  generateTasksFromNote,
  rewriteContent,
};