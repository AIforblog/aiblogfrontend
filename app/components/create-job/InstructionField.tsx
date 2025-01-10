"use client";

import { RefAttributes, ForwardRefExoticComponent } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  LucideProps,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface IconProps {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  command: string;
}

const Icons: IconProps[] = [
  { Icon: Bold, label: "Bold", command: "bold" },
  { Icon: Italic, label: "Italic", command: "italic" },
  { Icon: Underline, label: "Underline", command: "underline" },
  { Icon: List, label: "Bullet List", command: "bullet" },
  { Icon: ListOrdered, label: "Numbered List", command: "number" },
  { Icon: Link, label: "Insert Link", command: "link" },
];

interface InstructionFieldProps {
  text: string;
  onChange: (value: string) => void;
}
export default function InstructionField({
  text,
  onChange,
}: InstructionFieldProps) {
  const formatText = (command: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = text.substring(start, end);

    if (!selectedText) return; // Make sure something is selected

    let formattedText = "";
    switch (command) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `__${selectedText}__`;
        break;
      case "bullet":
        formattedText = `\n- ${selectedText}`;
        break;
      case "number":
        formattedText = `\n1. ${selectedText}`;
        break;
      case "link":
        formattedText = `[${selectedText}](url)`;
        break;
      default:
        formattedText = selectedText;
    }

    const newText =
      text.substring(0, start) + formattedText + text.substring(end);
    onChange(newText);

    // Update the cursor position after text is formatted
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + formattedText.length,
        start + formattedText.length,
      );
    }, 0);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    adjustHeight(e.target);
  };

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Card className="bg-white shadow-none border border-[#e5e5e5] p-4 md:py-3 md:px-4 rounded-2xl">
      <CardTitle className="p-0 mb-3 md:mb-6 text-base font-normal text-[#404040]">
        Instruction Field
      </CardTitle>

      <CardContent className="p-0">
        <textarea
          value={text}
          placeholder="Explain the task..."
          onChange={handleTextChange}
          className="w-full max-h-[40vh] h-6 md:h-8 focus:ring-0 focus:outline-none placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3] resize-none"
        />
      </CardContent>

      <Separator className="bg-[#e5e5e5]" />

      <CardFooter className="p-0 mt-2 md:mt-3">
        <div className="flex-1 flex items-center justify-end gap-x-2 md:gap-x-4">
          {Icons.map(({ Icon, label, command }, index) => (
            <button
              key={index}
              type="button"
              onClick={() => formatText(command)}
              className="focus:outline-none rounded-full p-1 md:p-1.5 hover:bg-black/5 transition-all duration-300 ease-in-out"
            >
              <Icon className="h-3.5 md:h-4 w-3.5 md:w-4 text-[#737373] font-normal" />
              <span className="sr-only">{label}</span>
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
