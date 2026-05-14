import api from "./axios";


export const summarizeNote = async (
  content
) => {
  const response = await api.post(
    "/ai/summarize",
    {
      content,
    }
  );

  return response.data;
};


export const generateTasks = async (
  content
) => {
  const response = await api.post(
    "/ai/generate-tasks",
    {
      content,
    }
  );

  return response.data;
};


export const rewriteContent = async (
  content
) => {
  const response = await api.post(
    "/ai/rewrite",
    {
      content,
    }
  );

  return response.data;
};