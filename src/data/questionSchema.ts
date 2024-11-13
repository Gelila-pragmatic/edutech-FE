export const questionSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object", // Specify that each item is an object
        properties: {
          question_title: {
            type: "string",
            errorMessage: {
              type: "Question title must be a string",
            },
          },
          question_text: {
            type: "string",
            errorMessage: {
              type: "Question text must be a string",
            },
          },

          subject: {
            type: "string",
            errorMessage: {
              type: "Subject must be a 'ENGLISH, MATH, READING, WRITING'",
            },
            enum: ["ENGLISH", "MATH", "READING", "WRITING"],
          },
          difficulty: {
            type: "string",
            enum: ["EASY", "MEDIUM", "HARD"],
          },
          skill: { type: "string" },
          test_type: {
            type: "string",
            enum: ["ACT", "SAT"],
          },

          answer_options: {
            type: "array",
            errorMessage: {
              type: "answer_options must have id, key, answer_text of type string.",
            },
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                key: { type: "string" },
                answer_text: { type: "string" },
              },
              required: ["id", "answer_text", "key"], // Required fields in answer_options
            },
          },

          correct_answer: {
            type: "object",
            errorMessage: {
              type: "correct_answer must have id, key, answer_text of type string.",
            },
            properties: {
              id: {
                type: "string",
                errorMessage: {
                  type: "correct_answer must have id, key, answer_text of type string.",
                },
              },
              key: {
                type: "string",
                errorMessage: {
                  type: "correct_answer must have id, key, answer_text of type string.",
                },
              },
              answer_text: {
                type: "string",
                errorMessage: {
                  type: "correct_answer must have id, key, answer_text of type string.",
                },
              },
            },
            required: ["id", "answer_text", "key"], // Only 'id' is required for correct_answer
          },

          explanation: { type: "string" },
        },
        required: [
          "question_title",
          "question_text",
          "subject",
          "difficulty",
          "test_type",
          "answer_options",
          "correct_answer",
          "explanation",
        ],
      },
    },
  },
  required: ["questions"], // Ensure questions is also a required field in the root object
};

export const exampleJsonSchema = {
  subject: "ENGLISH",
  difficulty: "HARD",
  test_type: "SAT",

  question_title: "Choose the best option.",
  question_text:
    "In 2007, computer scientist Luis von Ahn was working on converting printed books into a digital format. He found that some words were distorted enough that digital scanners couldn’t recognize them, but most humans could easily read them. Based on that finding, von Ahn invented a simple security test to keep automated “bots” out of websites. The first version of the reCAPTCHA test asked users to type one known word and one of the many words scanners couldn’t recognize. Correct answers proved the users were humans and added data to the book-digitizing project. Which choice best states the main purpose of the text?",

  answer_options: [
    {
      id: "1",
      key: "A",
      answer_text: "option 1.",
    },
    {
      id: "2",
      key: "B",
      answer_text: "option 2.",
    },
  ],
  correct_answer: { id: "2", key: "B", answer_text: "option 2." },
  explanation:
    "The correct answer is B because it provides a specific example that supports the statement about 'predominantly positive'.",
};
