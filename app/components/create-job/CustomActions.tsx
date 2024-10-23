import React, { useState } from "react";
import {
  X,
  ChevronDown,
  Trash2,
  FileText,
  Upload,
  Copy,
  Type,
  Link as LinkIcon,
  SquareCheck,
  SquareDashedMousePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import SocialActions from "./SocialActions";
import { Separator } from "@/components/ui/separator";

type Action = "Follow" | "Like" | "Comment" | "Share";
type CustomActionType =
  | "Select Option"
  | "Checkboxes"
  | "Text Answer"
  | "Media Upload"
  | "Link Submission";

interface SocialItem {
  url: string;
  actions: Action[];
}

interface CustomActionItem {
  question: string;
  type: CustomActionType;
  options?: string[];
}

interface CustomActionsProps {
  onEmpty: () => void;
}

const CustomActions: React.FC<CustomActionsProps> = ({ onEmpty }) => {
  const [socialItems, setSocialItems] = useState<SocialItem[]>([]); //url: "", actions: []
  const [customItems, setCustomItems] = useState<CustomActionItem[]>([
    { question: "", type: "Select Option", options: [""] },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  // const addSocialItem = () => {
  //   setSocialItems([...socialItems, { url: "", actions: [] }]);
  // };

  // const removeSocialItem = (index: number) => {
  //   const newItems = socialItems.filter((_, i) => i !== index);
  //   setSocialItems(newItems);
  //   if (newItems.length === 0 && customItems.length === 0) onEmpty();
  // };

  // const updateSocialUrl = (index: number, url: string) => {
  //   const newItems = [...socialItems];
  //   newItems[index].url = url;
  //   setSocialItems(newItems);
  // };

  // const toggleSocialAction = (index: number, action: Action) => {
  //   const newItems = [...socialItems];
  //   const actionIndex = newItems[index].actions.indexOf(action);
  //   if (actionIndex > -1) {
  //     newItems[index].actions = newItems[index].actions.filter(
  //       (a) => a !== action
  //     );
  //   } else {
  //     newItems[index].actions.push(action);
  //   }
  //   setSocialItems(newItems);
  // };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const removeCustomItem = (index: number) => {
    const newItems = customItems.filter((_, i) => i !== index);
    setCustomItems(newItems);
    if (newItems.length === 0 && socialItems?.length === 0) onEmpty();
  };

  const updateCustomQuestion = (index: number, question: string) => {
    const newItems = [...customItems];
    newItems[index].question = question;
    setCustomItems(newItems);
  };

  const updateCustomType = (index: number, type: CustomActionType) => {
    const newItems = [...customItems];
    newItems[index].type = type;
    if (type === "Checkboxes" && !newItems[index].options) {
      newItems[index].options = [""];
    }
    setCustomItems(newItems);
  };

  const addCheckboxOption = (index: number) => {
    const newItems = [...customItems];
    if (!newItems[index].options) {
      newItems[index].options = [];
    }
    newItems[index].options?.push("");
    setCustomItems(newItems);
  };

  const updateCheckboxOption = (
    itemIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newItems = [...customItems];
    if (newItems[itemIndex].options) {
      newItems[itemIndex].options[optionIndex] = value;
    }
    setCustomItems(newItems);
  };

  const removeCheckboxOption = (itemIndex: number, optionIndex: number) => {
    const newItems = [...customItems];
    if (newItems[itemIndex].options && newItems[itemIndex].options.length > 1) {
      newItems[itemIndex].options.splice(optionIndex, 1);
      setCustomItems(newItems);
    }
  };

  const renderActionIcon = (type: CustomActionType) => {
    switch (type) {
      case "Select Option":
        return (
          <SquareDashedMousePointer className="h-4 w-4 font-normal text-[#303030]" />
        );
      case "Checkboxes":
        return <SquareCheck className="h-4 w-4 font-normal text-[#303030]" />;
      case "Text Answer":
        return <FileText className="h-4 w-4 font-normal text-[#303030]" />;
      case "Media Upload":
        return <Upload className="h-4 w-4 font-normal text-[#303030]" />;
      case "Link Submission":
        return <LinkIcon className="h-4 w-4 font-normal text-[#303030]" />;
    }
  };

  const renderCustomInput = (item: CustomActionItem, index: number) => {
    switch (item.type) {
      case "Select Option":
        return (
          <p className="text-sm font-normal text-[#737373]">
            Please select an option type
          </p>
        );
      case "Checkboxes":
        return (
          <div className="space-y-2">
            {item.options?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox id={`checkbox-${index}-${optionIndex}`} />
                <Input
                  value={option}
                  onChange={(e) =>
                    updateCheckboxOption(index, optionIndex, e.target.value)
                  }
                  placeholder="Enter option"
                  className="flex-grow border-b-2 border-t-0 border-x-0 focus:ring-0 mb-4"
                />
                <Button
                  variant="ghost"
                  onClick={() => removeCheckboxOption(index, optionIndex)}
                  disabled={item.options?.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex align-items gap-2">
              <a
                href="#"
                className="text-blue-500"
                onClick={() => addCheckboxOption(index)}
              >
                Add option
              </a>
            </div>
          </div>
        );
      case "Text Answer":
        return <Textarea placeholder="Enter your answer here" />;
      case "Media Upload":
        return (
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  SVG, PNG, JPG or GIF (MAX. 800x400px, 10Mb)
                </p>
              </div>
              <Input id="dropzone-file" type="file" className="hidden" />
            </Label>
          </div>
        );
      case "Link Submission":
        return (
          <div className="flex items-center">
            <LinkIcon className="h-4 w-4 mr-2" />
            <Input
              type="url"
              placeholder="https://example.com"
              className="flex-grow border-b-2 border-t-0 border-x-0 focus:ring-0 mb-4"
            />
          </div>
        );
    }
  };

  const handleCopy = () => {
    console.log("copied!");
  };

  const handleDelete = () => {
    console.log("Deleted!");
    setSocialItems([]);
  };

  return (
    <div className="flex flex-col gap-y-6">
      <SocialActions />

      {/* Custom Actions Section */}
      <Card className="bg-white shadow-none border border-[#e5e5e5] p-4 rounded-2xl">
        {/* Card content */}
        <CardContent className="p-0">
          {customItems?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-y-4 md:gap-y-4 ${
                customItems.length > 1 && "mb-4 md:mb-6"
              }`}
            >
              <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4">
                <div className="flex flex-1 gap-2 md:gap-x-4 items-center">
                  {/* Cancel btn */}
                  <button onClick={() => removeCustomItem(index)}>
                    <X className="w-3.5 md:w-4 h-3.5 md:h-4 text-[#404040] hover:text-black transition-all duration-300 ease-in-out" />
                  </button>

                  {/* Text input */}
                  <div className="w-full flex-1 border-b border-[#e5e5e5]">
                    <Input
                      placeholder="Add question"
                      value={item.question}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateCustomQuestion(index, e.target.value)
                      }
                      className="w-full mb-[1px] p-0 border-none focus-within:outline-0 shadow-none text-[#262626] font-normal text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
                    />
                  </div>
                </div>

                {/* Drop down */}
                <div className="w-full md:max-w-[14rem] flex-1 relative">
                  <Button
                    variant="outline"
                    onClick={() => toggleDropdown(index + socialItems.length)}
                    className="w-full flex-1 rounded-xl flex items-center justify-between h-10 md:h-12"
                  >
                    <div className="flex gap-1.5 items-center">
                      {renderActionIcon(item.type)}
                      <span className="text-[#303030] font-normal text-sm md:text-base leading-none">
                        {item.type}
                      </span>
                    </div>
                    <ChevronDown className="font-normal w-5 h-5 text-[#a3a3a3]" />
                  </Button>
                  {openDropdown === index + socialItems.length && (
                    <div className="absolute z-10 w-full md:w-[14rem] mt-2 bg-white border border-[#e5e5e5] overflow-hidden rounded-xl shadow-xl">
                      {(
                        [
                          "Checkboxes",
                          "Text Answer",
                          "Media Upload",
                          "Link Submission",
                        ] as CustomActionType[]
                      ).map((type) => (
                        <button
                          key={type}
                          className="w-full flex items-center gap-x-3 px-4 py-2 hover:bg-[#E0F2FF] hover:cursor-pointer"
                          onClick={() => updateCustomType(index, type)}
                        >
                          <div className="flex gap-3 items-center">
                            {renderActionIcon(type)}
                            <span className="text-[#404040] font-normal text-sm md:text-base leading-none">
                              {type}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {renderCustomInput(item, index)}
            </div>
          ))}
        </CardContent>

        <Separator className="bg-[#e5e5e5] mt-4 md:mt-8 mb-4" />

        {/* Card footer */}
        <CardFooter className="p-0 flex justify-end items-center gap-x-7">
          <Type className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer" />
          <Copy
            onClick={handleCopy}
            className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer"
          />
          <Trash2
            onClick={handleDelete}
            className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomActions;
