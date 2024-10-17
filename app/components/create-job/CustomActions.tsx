import React, { useState } from "react";
import {
  X,
  ChevronDown,
  CirclePlus,
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
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

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
  const [socialItems, setSocialItems] = useState<SocialItem[]>([
    { url: "", actions: [] },
  ]);
  const [customItems, setCustomItems] = useState<CustomActionItem[]>([
    { question: "", type: "Select Option", options: [""] },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const addSocialItem = () => {
    setSocialItems([...socialItems, { url: "", actions: [] }]);
  };

  const removeSocialItem = (index: number) => {
    const newItems = socialItems.filter((_, i) => i !== index);
    setSocialItems(newItems);
    if (newItems.length === 0 && customItems.length === 0) onEmpty();
  };

  const updateSocialUrl = (index: number, url: string) => {
    const newItems = [...socialItems];
    newItems[index].url = url;
    setSocialItems(newItems);
  };

  const toggleSocialAction = (index: number, action: Action) => {
    const newItems = [...socialItems];
    const actionIndex = newItems[index].actions.indexOf(action);
    if (actionIndex > -1) {
      newItems[index].actions = newItems[index].actions.filter(
        (a) => a !== action
      );
    } else {
      newItems[index].actions.push(action);
    }
    setSocialItems(newItems);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const removeCustomItem = (index: number) => {
    const newItems = customItems.filter((_, i) => i !== index);
    setCustomItems(newItems);
    if (newItems.length === 0 && socialItems.length === 0) onEmpty();
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
        return <SquareDashedMousePointer className="h-4 w-4 mr-2" />;
      case "Checkboxes":
        return <SquareCheck className="h-4 w-4 mr-2" />;
      case "Text Answer":
        return <FileText className="h-4 w-4 mr-2" />;
      case "Media Upload":
        return <Upload className="h-4 w-4 mr-2" />;
      case "Link Submission":
        return <LinkIcon className="h-4 w-4 mr-2" />;
    }
  };

  const renderCustomInput = (item: CustomActionItem, index: number) => {
    switch (item.type) {
      case "Select Option":
        return <p>Please select an option type</p>;
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

  return (
    <>
      <div className="space-y-6">
        <Card className="bg-white rounded-xl">
          <CardContent>
            <div className="space-y-4 p-5">
              {socialItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => removeSocialItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Enter your profile link"
                      value={item.url}
                      onChange={(e) => updateSocialUrl(index, e.target.value)}
                      className="flex-grow w-full border-b-2 border-t-0 border-x-0 focus:ring-0"
                    />
                    <div className="relative">
                      <Button
                        variant="outline"
                        onClick={() => toggleDropdown(index)}
                        className="rounded-xl flex items-center justify-between"
                      >
                        Select action
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      {openDropdown === index && (
                        <div className="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
                          {(
                            ["Follow", "Like", "Comment", "Share"] as Action[]
                          ).map((action) => (
                            <Label
                              key={action}
                              className="flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                              <Checkbox
                                checked={item.actions.includes(action)}
                                onCheckedChange={() =>
                                  toggleSocialAction(index, action)
                                }
                              />
                              <span className="ml-2 ">{action}</span>
                            </Label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end flex-wrap gap-2">
                    {item.actions.map((action) => (
                      <span
                        key={action}
                        className="px-2 py-1 bg-[#F5F5F5] rounded-full text-xs flex cursor-pointer justify-end items-center"
                      >
                        {action}
                        <X
                          className="h-3 w-3 ml-1 cursor-pointer"
                          onClick={() => toggleSocialAction(index, action)}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <Button
                onClick={addSocialItem}
                variant="outline"
                className=" outline-none bg-transparent border-none justify-start"
              >
                <CirclePlus className="mr-2 h-4 w-4" /> Add more
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl">
          <CardContent>
            <div className="space-y-6 p-6">
              {customItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      onClick={() => removeCustomItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Input
                      placeholder="Add Question"
                      value={item.question}
                      onChange={(e) =>
                        updateCustomQuestion(index, e.target.value)
                      }
                      className="flex-grow border-b-2 border-t-0 border-x-0 focus:ring-0 mb-4"
                    />
                    <div className="relative">
                      <Button
                        variant="outline"
                        onClick={() =>
                          toggleDropdown(index + socialItems.length)
                        }
                        className="rounded-xl flex items-center justify-between"
                      >
                        {renderActionIcon(item.type)}
                        {item.type}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      {openDropdown === index + socialItems.length && (
                        <div className="absolute z-10 w-48 py-2 mt-2 bg-white rounded-md shadow-xl">
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
                              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
                              onClick={() => updateCustomType(index, type)}
                            >
                              {renderActionIcon(type)}
                              {type}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  {renderCustomInput(item, index)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex bg-gray-200 justify-end gap-1">
          <Button variant="ghost">
            <Type className="h-4 w-4 gray-400" />
          </Button>
          <Button variant="ghost">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomActions;
