import React from "react";
import { useState } from "react";
import Dropdown from "./components/Dropdown";
import { Difficulty, Subject, TestType } from "./data/dropDown";
import LayoutEvenColumnsTwo from "./components/Layout";
import Output from "./components/Output";
import { ImageToKaTexParse } from "./api";
import Notification from "./components/Notification";

const Math = () => {
  const [difficulty, setDifficulty] = useState("");
  const [subject, setSubject] = useState("");
  const [testType, setTestType] = useState("");

  const [parsedJson, setParsedJson] = useState(""); // the parsed json value state
  const [isLoading, setIsLoading] = useState(false); // for parsing the question text into json

  const [error, setError] = useState("");

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [answerImagePreview, setAnswerImagePreview] = useState<string | null>(
    null
  );
  const [selectedAnswerFile, setSelectedAnswerFile] = useState<File | null>(
    null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnswerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedAnswerFile(file);

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAnswerImagePreview(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setSelectedAnswerFile(null);
    setParsedJson("");
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    // Validate JSON on change
    try {
      const value = inputValue;
      setParsedJson(value);
    } catch (error) {
      setError("Invalid JSON format");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // setResponseError(null); // Reset previous error

    try {
      // Prepare the FormData object
      const formData = new FormData();

      // Append the text fields
      formData.append("subject", subject);
      formData.append("difficulty", difficulty);
      formData.append("test_type", testType);

      // Append the images if they exist
      if (selectedFile) {
        formData.append("question_image", selectedFile);
      }
      if (selectedAnswerFile) {
        formData.append("answer_image", selectedAnswerFile);
      }
      console.log(formData);
      // Send the request with FormData
      const res = await ImageToKaTexParse(formData);

      // Parse the response (if it's JSON) and update the state
      const data = JSON.stringify(res?.data);
      const value = data ? JSON.stringify(JSON.parse(data), null, 2) : "";
      setParsedJson(value);
      setIsLoading(false);
    } catch (err) {
      return;
    }
  };

  return (
    <>
      {error && (
        <Notification text={error} type="ERR" title="Validation Error" />
      )}
      <LayoutEvenColumnsTwo
        leftColumn={
          <div className="p-2 bg-white border rounded-xl">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between mb-4">
                <h2 className="mb-6 font-medium ">Insert Question</h2>
                {/* <div>
                  <div className="relative flex flex-wrap items-center">
                    <input
                      className="relative w-8 h-4 transition-colors rounded-lg appearance-none cursor-pointer after:hover:bg-slate-600 checked:hover:bg-gray-300 checked:after:hover:bg-gray-600 focus:outline-none checked:focus:bg-gray-400 checked:after:focus:bg-gray-700 focus-visible:outline-none peer bg-slate-300 after:absolute after:top-0 after:left-0 after:h-4 after:w-4 after:rounded-full after:bg-slate-500 after:transition-all checked:bg-gray-200 checked:after:left-4 checked:after:bg-gray-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:after:bg-slate-300"
                      type="checkbox"
                      checked={isOpenEnded}
                      onChange={() => setIsOpenEnded(!isOpenEnded)}
                      id="id-c01"
                      disabled={isLoading}
                    />
                    <label
                      className="pl-2 text-sm cursor-pointer text-slate-400 peer-disabled:cursor-not-allowed peer-checked:text-gray-600"
                      htmlFor="id-c01"
                    >
                      open Ended Question
                    </label>
                  </div> 
                  <small className="text-[0.6rem] text-gray-400 leading-3">
                    Note: toggle if question does not have options.
                  </small>
                </div> */}
              </div>
              <div className="flex flex-wrap lg:gap-2 lg:flex-nowrap">
                <Dropdown
                  label="Subject"
                  identifier="Subject"
                  options={Subject}
                  selectedValue={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <Dropdown
                  label="Difficulty"
                  identifier="Difficulty"
                  options={Difficulty}
                  selectedValue={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <Dropdown
                  label="Test Type"
                  identifier="TestType"
                  options={TestType}
                  selectedValue={testType}
                  onChange={(e) => setTestType(e.target.value)}
                />
              </div>
              <div className="flex flex-col flex-wrap lg:gap-2 lg:flex-nowrap my-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ marginBottom: "10px" }}
                />
                {imagePreview && (
                  <div className="h-44">
                    <img
                      src={imagePreview}
                      alt="Question Preview"
                      className="w-auto h-full"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-wrap lg:gap-2 lg:flex-nowrap my-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAnswerImageChange}
                  style={{ marginBottom: "10px" }}
                />
                {answerImagePreview && (
                  <div className="h-44">
                    <img
                      src={answerImagePreview}
                      alt="Answer Preview"
                      className="w-auto h-full"
                    />
                  </div>
                )}
              </div>
              {/* )} */}
              <div className="flex justify-end w-full gap-4">
                <button
                  type={isLoading ? "button" : "submit"}
                  className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 bg-black rounded whitespace-nowrap hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                >
                  <span>{isLoading ? "•••" : "Parse"}</span>
                </button>
                <button
                  type={isLoading ? "button" : "reset"}
                  onClick={handleClear}
                  className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 bg-black rounded whitespace-nowrap hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-300 disabled:shadow-none"
                >
                  <span>{isLoading ? "•••" : "Clear All"}</span>
                </button>
              </div>
            </form>
          </div>
        }
        rightColumn={
          <Output
            onChange={handleChange}
            isDisabled={!isLoading || parsedJson === null}
            isLoading={isLoading}
            parsedJson={parsedJson}
            handleClear={handleClear}
          />
        }
      />
    </>
  );
};

export default Math;
