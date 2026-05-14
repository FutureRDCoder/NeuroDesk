const {
  summarizeNote,
  generateTasksFromNote,
  rewriteContent,
} = require("./aiService");


const summarize = async (req, res) => {
  try {
    const { content } = req.body;

    const summary =
      await summarizeNote(content);

    res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const generateTasks = async (
  req,
  res
) => {
  try {
    const { content } = req.body;

    const tasks =
      await generateTasksFromNote(content);

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const rewrite = async (req, res) => {
  try {
    const { content } = req.body;

    const rewritten =
      await rewriteContent(content);

    res.status(200).json({
      success: true,
      rewritten,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  summarize,
  generateTasks,
  rewrite,
};