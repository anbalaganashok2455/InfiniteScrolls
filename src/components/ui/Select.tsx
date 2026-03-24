"use client";
import { useState, useRef, useEffect } from "react";

type Props = {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select...",
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleSelect = (item: string) => {
    onChange(value === item ? "" : item);
  };

  const removeTag = () => {
    onChange("");
  };

  return (
    <>
      <style>{`
        .container {  position: relative; font-family: Arial; }
        .input-box { border: 1px solid #ccc; padding: 8px; cursor: pointer; min-height: 40px; border-radius: .3rem; min-width: 200px; }
        .tags { display: flex; flex-wrap: wrap; gap: 4px;padding: 1px 10px; }
        .tag { background:  #f7f6fc; color: #0e0c0cdd; padding: 6px 10px; font-size: 12px; display: flex; gap: 4px; border-radius: 10rem; }
        .remove { cursor: pointer; }
        .dropdown {
          position: absolute;
          width: 100%;
          border: 1px solid #ccc;
          background: white;
          max-height: 200px;
          overflow-y: auto;
          margin-top: 4px;
          opacity: 0;
          transform: scaleY(0.95);
          transform-origin: top;
          transition: all 0.2s ease;
          border-radius: 4px;   
        }
        .dropdown.open { opacity: 1; transform: scaleY(1);z-index: 1; }
        .search { width: 100%; padding: 6px; border: 1px solid #ccc; }
        .item { padding: 6px; cursor: pointer; }
        .item:hover { background:  #4f46e5; color: white; }
        .selected { background:  #4f46e5; color: white; }

      `}</style>

      <div className="container" ref={ref}>
        <div className="input-box" onClick={() => setOpen(!open)}>
          <div className="tags">
            {value === "" ? (
              placeholder
            ) : (
              <span className="tag">
                {value}
                <span className="remove" onClick={(e) => { e.stopPropagation(); removeTag(); }}>X</span>
              </span>
            )}
          </div>
        </div>

        <div className={`dropdown ${open ? "open" : ""}`}>
          {open && options.map((item) => (
            <div
              key={item}
              className={`item ${value === item ? "selected" : ""}`}
              onClick={() => toggleSelect(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}