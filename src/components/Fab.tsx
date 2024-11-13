import { useState } from "react";
import { exampleJsonSchema } from "../data/questionSchema";

export default function Fab() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  return (
    <>
      {/*  <!-- Component: Basic side navigation menu --> */}
      {/*  <!-- Mobile trigger --> */}
      <button
        type="button"
        className="flex gap-2 p-2 text-xs rounded-lg opacity-100 bg-slate-100"
        onClick={() => setIsSideNavOpen(!isSideNavOpen)}
      >
        <span>Docs</span>
        <svg
          className="w-3 h-3 my-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
        </svg>
      </button>

      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        className={`fixed lg:m-6 top-0 bottom-0 right-0 z-40 p-4 text-xs overflow-auto flex w-full max-w-sm flex-col border bg-slate-100 rounded-xl transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0 fixed" : " -translate-x-full hidden"
        }`}
      >
        <button
          type="button"
          className="gap-2 p-2 ml-auto text-sm rounded-lg opacity-100 bg-gray-50 group"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        >
          <svg
            className="w-3 h-3 my-auto group-hover:fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(exampleJsonSchema, null, 2)}
        </pre>
      </aside>
    </>
  );
}
