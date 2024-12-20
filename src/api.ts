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

interface ImageQuestionData {
  question_image: File | null;
  answer_image: File | null;
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
  timeout: 100000,
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
  return axiosInstance.post("/parse-text", QuestionData);
};

// export const ImageToKaTexParse = async (
//   ImageQuestionData: Partial<ImageQuestionData>
// ): Promise<AxiosResponse<ApiResponse<ImageQuestionData>>> => {
//   return axiosInstance.post("/math-question", ImageQuestionData);
// };

// Assuming ApiResponse and ImageQuestionData types are defined elsewhere in your project
export const ImageToKaTexParse = async (
  formData: FormData
): Promise<AxiosResponse<ApiResponse<ImageQuestionData>>> => {
  try {
    const response = await axiosInstance.post("/math-question", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensures the server knows this is a form data request
      },
    });
    return response;
  } catch (error) {
    // Handle any errors if necessary
    console.error("Error in submitting form data:", error);
    throw error;
  }
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
