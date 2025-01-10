"use client";

import { useRef, useState, useEffect } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link } from "lucide-react";

type JobTextEditorProps = {
  onChange: () => void; // Define the correct type for the prop
};

export default function JobTextEditor({ onChange }: JobTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const formatText = (command: string, value?: string) => {
    if (editorRef.current) {
      document.execCommand(command, false, value ?? undefined);
    }
    onChange(); // Call the onChange function passed from parent when formatting is applied
  };

  const handleInput = () => {
    const editorContent = editorRef.current?.innerText || "";
    setIsEmpty(editorContent.trim() === ""); // Check if the content is empty
    onChange();
  };

  useEffect(() => {
    const editorContent = editorRef.current?.innerText || "";
    setIsEmpty(editorContent.trim() === "");
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="rounded-xl">
        <div className="border-b border-gray-300 rounded-md relative">
          <div
            ref={editorRef}
            contentEditable
            className="w-full min-h-[60px] text-gray-700 border-0 focus:ring-0 focus:outline-none resize-none relative"
            onInput={handleInput}
            suppressContentEditableWarning={true}
          >
            {isEmpty && (
              <span className="absolute top-0 left-0 pointer-events-none text-neutral-500">
                Enter your response...
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end space-x-2 px-2 py-1 border-t border-[#E5E5E5]">
          {[
            { icon: Bold, label: "Bold", command: "bold" },
            { icon: Italic, label: "Italic", command: "italic" },
            { icon: Underline, label: "Underline", command: "underline" },
            {
              icon: List,
              label: "Bullet List",
              command: "insertUnorderedList",
            },
            {
              icon: ListOrdered,
              label: "Numbered List",
              command: "insertOrderedList",
            },
            { icon: Link, label: "Insert Link", command: "createLink" },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.command === "createLink") {
                  const url = prompt("Enter the URL");
                  if (url) {
                    formatText(item.command, url);
                  }
                } else {
                  formatText(item.command);
                }
              }}
              className="p-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <item.icon className="h-4 w-4" />
              <span className="sr-only">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
