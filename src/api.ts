import axios, { AxiosResponse } from "axios";

const url = import.meta.env.VITE_APP_API_ENDPOINT;
const neon_url = import.meta.env.VITE_APP_NEON_API_ENDPOINT;

interface QuestionData {
  question_text: string;
  raw_answer_text: string;
  subject: string;
  difficulty: string;
  test_type: string;
  // is_open_ended: boolean;
}

// Define a type for the response if necessary
interface ApiResponse<T> {
  data: T;
  message: string;
}

interface AnswerItem {
  id: string;
  key: string;
  answer_text: string;
}

interface QuestionContentItem {
  subject: string;
  difficulty: string;
  test_type: string;
  // is_open_ended: boolean;
  answer_options: AnswerItem;
  correct_answer: AnswerItem;
  question_text: string;
  question_title: string;
  // source_url?: string;
  skill?: string;
  explanation: string;
}

interface QuestionSchema {
  questions: QuestionContentItem[];
}

export const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

export const axiosNeonInstance = axios.create({
  baseURL: neon_url,
  timeout: 5000,
  headers: {
    Accept: "application/json",
  },
});

export const JsonParse = async (
  QuestionData: Partial<QuestionData>
): Promise<AxiosResponse<ApiResponse<QuestionData>>> => {
  return axiosInstance.post("/process", QuestionData);
};

export const InsertJsonDb = async (
  questionSchema: Partial<QuestionSchema>
): Promise<AxiosResponse<ApiResponse<QuestionSchema>>> => {
  try {
    const response = await axiosNeonInstance.post(
      "/questions/create",
      questionSchema
    );
    return response;
  } catch (error) {
    console.error("Error inserting data into DB:", error);
    throw new Error("Failed to insert data into DB");
  }
};
