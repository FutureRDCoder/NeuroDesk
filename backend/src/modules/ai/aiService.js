const OpenAI = require("openai");

const AIMemory = require("./aiMemoryModel");

const Task = require("../tasks/taskModel");
const Note = require("../notes/notesModel");

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


const chatWithAssistant = async (
  userId,
  message
) => {

  // Fetch Recent Memory
const memory = await AIMemory.find({
  user: userId,
})
.sort({ createdAt: -1 })
.limit(10);


// Format Memory
const memoryMessages = memory
  .reverse()
  .map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

// Fetch User Data
const tasks = await Task.find({
  user: userId,
});

const notes = await Note.find({
  user: userId,
});


// Build Context
const tasksContext = tasks
.map(
  (task) =>
    `
    Task:
    Title: ${task.title}
    Status: ${task.status}
    Priority: ${task.priority}
    `
).join("\n");


  const notesContext = notes
    .map(
      (note) =>
        `
      Note:
      Title: ${note.title}
      Content: ${note.content}
      `
    )
    .join("\n");
  
    const fullContext = `
    USER TASKS:
    ${tasksContext}
    
    USER NOTES:
    ${notesContext}
    `;


  // AI Request
  const response =
    await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content: `
          You are NeuroDesk AI,
          an intelligent productivity assistant.
          
          You remember previous conversations,
          understand user productivity patterns,
          and provide personalized guidance.
          
          Use workspace context and memory
          to give intelligent answers.
          `,
        },
        
        {
          role: "system",
          content: fullContext,
        },
        
        ...memoryMessages,

        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
    });

    // Save User Message
    await AIMemory.create({
      user: userId,
      role: "user",
      content: message,
    });


    // Save AI Response
    await AIMemory.create({
      user: userId,
      role: "assistant",
      content:
        response.choices[0].message.content,
    });

  return response.choices[0].message.content;
};


module.exports = {
  summarizeNote,
  generateTasksFromNote,
  rewriteContent,
  chatWithAssistant,
};