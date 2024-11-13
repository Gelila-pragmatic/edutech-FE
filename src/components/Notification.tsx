import React, { useState } from "react";

interface NotiProps {
  text: string;
  type: string;
  title: string;
}

const Notification: React.FC<NotiProps> = ({ text, type, title }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      {/*<!-- Component: Basic title & text dark themed notification with close button --> */}
      {!toggle && (
        <div
          className="absolute z-50 flex flex-col max-w-full px-4 py-3 overflow-hidden text-sm bg-white border shadow-lg md:top-4 md:right-4 w-80 shadow-slate-500/20 rounded-xl"
          role="status"
        >
          {/*  <!-- Heading & close button --> */}
          <div className="flex items-center gap-4 mb-2">
            {/*    <!-- Headline --> */}
            <h3
              className={`flex-1 font-semibold ${
                type === "ERR" ? "text-red-400" : ""
              }`}
            >
              {title}
            </h3>
            {/*    <!-- Close button --> */}
            <button
              aria-label="Close"
              onClick={() => setToggle(!toggle)}
              className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide transition duration-300 rounded-full justify-self-center whitespace-nowrap bg-slate-200 hover:text-red-400 disabled:cursor-not-allowed disabled:text-slate-600 disabled:shadow-none disabled:hover:bg-transparent"
            >
              <span className="relative only:-mx-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  role="graphics-symbol"
                  aria-labelledby="title-30 desc-30"
                >
                  <title id="title-30">Icon title</title>
                  <desc id="desc-30">
                    A more detailed description of the icon
                  </desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </button>
          </div>
          {/*  <!-- Body --> */}
          <div>
            <p>{text}</p>
          </div>
        </div>
      )}
      {/*<!-- End Basic title & text dark themed notification with close button --> */}
    </>
  );
};

export default Notification;
