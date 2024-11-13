import { FC, ChangeEvent } from "react";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  className?: string;
  identifier?: string;
}

const Textarea: FC<TextAreaProps> = ({
  value,
  onChange,
  identifier,
  label,
}) => {
  return (
    <div className="relative mb-4">
      <textarea
        id={identifier}
        className="relative w-full p-4 placeholder-transparent transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        name={identifier}
        rows={7}
        onChange={onChange}
        value={value}
        required
      ></textarea>
      <label
        htmlFor={identifier}
        className="cursor-text peer-focus:cursor-default absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all  before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-required:after:content-['\00a0*'] peer-required:after:text-pink-500 peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
