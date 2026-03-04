// This is a simple chatbot function that provides responses based on the user's message.//
// You can expand this function with more complex logic or integrate it with a real chatbot API for better responses.
// For now, it checks for keywords like "job" and "apply" to give relevant answers.
export function getChatbotResponse(message: string): string {
  const lower = message.toLowerCase();

  if (lower.includes("job")) {
    return "You can browse jobs on the Jobs page.";
  }

  if (lower.includes("apply")) {
    return "Click a job listing and use the Apply button.";
  }

  return "I'm not sure about that. Try asking about jobs or applications.";
}