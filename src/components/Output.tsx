import React, { ChangeEvent, useState } from "react";
import { InsertJsonDb } from "../api";
import Ajv from "ajv";
import { questionSchema } from "../data/questionSchema";
import Notification from "./Notification";
import Fab from "./Fab";

interface TextareaProps {
  isLoading: boolean;
  isDisabled: boolean;
  parsedJson: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleClear: () => void;
}

const Output: React.FC<TextareaProps> = ({
  onChange,
  isLoading,
  parsedJson,
  handleClear,
}) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isDbLoading, setIsDbLoading] = useState(false); // for requesting parsed json to be created in table

  const handleOutputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const ajv = new Ajv({ strict: false });
    const validater = ajv.compile(questionSchema);
    let jsonData;

    try {
      setIsDbLoading(true);
      jsonData = JSON.parse(parsedJson); // Parse the input text as JSON
    } catch {
      setError("Invalid JSON format");
      setIsDbLoading(false);
      return;
    }

    const is_valid = validater(jsonData);

    if (!is_valid) {
      setError(
        "Validation error: " +
          JSON.stringify(
            validater.errors?.map((error) => error.message).join("\n")
          )
      );
      setIsDbLoading(false);
      return;
    }

    try {
      setError("");
      setIsDbLoading(true);
      const res = await InsertJsonDb(jsonData);
      const data = JSON.stringify(res?.data);
      if (data) {
        setSuccess("Question Inserted successfully.");
        setIsDbLoading(false);
        handleClear();
      } else {
        setError("Something went wrong try again.");
        setIsDbLoading(false);
      }
    } catch (e) {
      setError("Something went wrong try again.");
      setIsDbLoading(false);
      return;
    }
  };

  return (
    <>
      <div className="flex justify-end w-full gap-2 mb-2">
        <Fab />
      </div>
      {error && (
        <Notification text={error} type="ERR" title="Validation Error" />
      )}
      {success && (
        <Notification text={success} type="SUCCESS" title="Success" />
      )}

      <form className="flex flex-col h-full" onSubmit={handleOutputSubmit}>
        <div className="relative w-full h-full mb-4">
          {/* Loading spinner overlay */}
          {(isLoading || isDbLoading) && (
            <div className="absolute inset-0 flex items-center justify-center h-full bg-opacity-75 bg-zinc-50 rounded-xl">
              <div className="w-8 h-8 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              {isDbLoading && (
                <small className="block mt-4 text-sm text-gray-400">
                  Inserting question...
                </small>
              )}
            </div>
          )}
          {!parsedJson && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center h-full bg-opacity-75 bg-zinc-50 rounded-xl">
              <h2 className="font-medium text-gray-500">
                Waiting for Question to parse
              </h2>
            </div>
          )}

          {/* Textarea for JSON output */}
          <textarea
            className="w-full h-full p-2 text-sm outline-none resize-none rounded-xl text-emerald-500 min-h-52 md:min-h-0"
            value={parsedJson}
            onChange={onChange}
            disabled={(!parsedJson && !isLoading) || isLoading || isDbLoading}
            required
          />
        </div>
        <button
          type={isDbLoading ? "button" : "submit"}
          disabled={(!parsedJson && !isLoading) || isLoading}
          className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 bg-black rounded whitespace-nowrap hover:bg-gray-600 focus:bg-gray-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-400 disabled:shadow-none"
        >
          <span>{isDbLoading ? "•••" : "Submit"}</span>
        </button>
      </form>
    </>
  );
};

export default Output;
