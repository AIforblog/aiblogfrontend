import { CUSTOM_ACTION_TYPES, JobFormSchema } from "@/schemas/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  Copy,
  FileText,
  Link as LinkIcon,
  PlusCircleIcon,
  SquareCheck,
  SquareDashedMousePointer,
  Trash2,
  Type,
  Upload,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";

type CustomActionItem = JobFormSchema["customActions"][number];
type CustomActionType = JobFormSchema["customActions"][number]["actionType"];

const CustomActions: React.FC = () => {
  const { control, getValues } = useFormContext<JobFormSchema>();
  const {
    fields: customActions,
    append,
    remove,
    update,
  } = useFieldArray({ control, name: "customActions" });
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const addCustomAction = () => {
    append({ actionType: "text", questionText: "", answer: "" });
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const updateCustomType = (index: number, type: CustomActionType) => {
    const customAction = getValues("customActions")[index]; //
    if (type === customAction.actionType) return;

    switch (type) {
      case "checkbox":
        update(index, {
          ...customAction,
          actionType: type,
          checkboxChoices: [""],
        });
        return;
      case "link":
        update(index, { ...customAction, actionType: type, link: "" });
        return;
      case "text":
        update(index, { ...customAction, actionType: type, answer: "" });
        return;
      default:
        update(index, { ...customAction, actionType: type });
        return;
    }
  };

  const addCheckboxOption = (index: number) => {
    const customAction = customActions[index];
    if (customAction.actionType !== "checkbox") return;

    update(index, {
      ...customAction,
      checkboxChoices: [...customAction.checkboxChoices, ""],
    });
  };

  const removeCheckboxOption = (itemIndex: number, optionIndex: number) => {
    const customAction = customActions[itemIndex];
    if (customAction.actionType !== "checkbox") return;

    update(itemIndex, {
      ...customAction,
      checkboxChoices: customAction.checkboxChoices.toSpliced(optionIndex, 1),
    });
  };

  const renderActionIcon = (type: CustomActionType) => {
    switch (type) {
      case "checkbox":
        return <SquareCheck className="h-4 w-4 font-normal text-[#303030]" />;
      case "text":
        return <FileText className="h-4 w-4 font-normal text-[#303030]" />;
      case "media":
        return <Upload className="h-4 w-4 font-normal text-[#303030]" />;
      case "link":
        return <LinkIcon className="h-4 w-4 font-normal text-[#303030]" />;
      default:
        return (
          <SquareDashedMousePointer className="h-4 w-4 font-normal text-[#303030]" />
        );
    }
  };

  const renderCustomInput = (item: CustomActionItem, index: number) => {
    switch (item.actionType) {
      case "checkbox":
        return (
          <div className="space-y-2">
            {item.checkboxChoices?.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-2">
                <Checkbox id={`checkbox-${index}-${optionIndex}`} />
                <Controller
                  render={({ field: { value, onChange, onBlur } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Enter option"
                      // {...register(`customActions.${index}.checkboxChoices.${optionIndex}`)}
                      className="flex-grow border-b-2 border-t-0 border-x-0 focus:ring-0 mb-4 rounded-none"
                    />
                  )}
                  control={control}
                  name={`customActions.${index}.checkboxChoices.${optionIndex}`}
                />
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => removeCheckboxOption(index, optionIndex)}
                  disabled={item.checkboxChoices?.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex align-items gap-2">
              <Button
                variant={"ghost"}
                type="button"
                onClick={() => addCheckboxOption(index)}
              >
                Add option
              </Button>
            </div>
          </div>
        );
      case "text":
        return (
          <Controller
            render={({ field }) => (
              <Textarea placeholder="Enter your answer here" {...field} />
            )}
            control={control}
            name={`customActions.${index}.answer`}
          />
        );
      case "media":
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
      case "link":
        return (
          <div className="flex items-center">
            <LinkIcon className="h-4 w-4 mr-2" />
            <Controller
              render={({ field }) => (
                <Input
                  type="url"
                  placeholder="https://example.com"
                  className="flex-grow border-b-2 border-t-0 border-x-0 focus:ring-0 mb-4"
                  {...field}
                />
              )}
              control={control}
              name={`customActions.${index}.link`}
            />
          </div>
        );
      default:
        return (
          <p className="text-sm font-normal text-[#737373]">
            Please select an option type
          </p>
        );
    }
  };

  const handleCopy = () => {
    console.log("copied!");
  };

  return (
    <div className="flex flex-col gap-y-6">
      {/* Custom Actions Section */}
      <Card className="bg-white shadow-none border border-[#e5e5e5] p-4 rounded-2xl">
        {/* Card content */}
        <CardContent className="p-0">
          {customActions?.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col gap-y-4 md:gap-y-4 ${
                customActions.length > 1 && "mb-4 md:mb-6"
              }`}
            >
              <div className="w-full flex flex-col items-center md:flex-row gap-y-4 md:gap-x-4">
                {/* title */}
                <div className="flex gap-2 items-center">
                  <Button
                    variant={"ghost"}
                    onClick={() => remove(index)}
                    type="button"
                    className="shrink-0 p-1 h-auto rounded-full -ml-1"
                  >
                    <X className="w-3.5 md:w-4 h-3.5 md:h-4 text-[#404040] hover:text-black transition-all duration-300 ease-in-out" />
                  </Button>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Add Question"
                        className="border-b border-t-0 border-x-0 rounded-none px-0 grow"
                      />
                    )}
                    name={`customActions.${index}.questionText`}
                    control={control}
                  />
                </div>

                {/* Drop down */}
                <div className="w-full md:max-w-[14rem] flex-1 relative">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => toggleDropdown(index)}
                    className="w-full flex-1 rounded-xl flex items-center justify-between h-10 md:h-12"
                  >
                    <div className="flex gap-1.5 items-center">
                      {renderActionIcon(item.actionType)}
                      <span className="text-[#303030] font-normal text-sm md:text-base leading-none">
                        {FORMAT_CUSTOM_ACTION_TYPE[item.actionType]}
                      </span>
                    </div>
                    <ChevronDown className="font-normal w-5 h-5 text-[#a3a3a3]" />
                  </Button>
                  {openDropdown === index && (
                    <div className="absolute z-10 w-full md:w-[14rem] mt-2 bg-white border border-[#e5e5e5] overflow-hidden rounded-xl shadow-xl">
                      {CUSTOM_ACTION_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className="w-full flex items-center gap-x-3 px-4 py-2 hover:bg-[#E0F2FF] hover:cursor-pointer"
                          onClick={() => updateCustomType(index, type)}
                        >
                          <div className="flex gap-3 items-center">
                            {renderActionIcon(type)}
                            <span className="text-[#404040] font-normal text-sm md:text-base leading-none">
                              {FORMAT_CUSTOM_ACTION_TYPE[type]}
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
          <Button
            onClick={addCustomAction}
            type="button"
            variant={"ghost"}
            className="mr-auto flex items-center border-none justify-between font-normal text-sm md:text-base text-[#262626] gap-x-2"
          >
            <PlusCircleIcon size={22} className="text-foreground" />
            {customActions.length > 0 ? (
              <span>Add more</span>
            ) : (
              <span>Add</span>
            )}
          </Button>
          <Type className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer" />
          <Copy
            onClick={handleCopy}
            className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer"
          />
          <Trash2
            // onClick={handleDelete}
            className="w-4 h-4 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer"
          />
        </CardFooter>
      </Card>
    </div>
  );
};

const FORMAT_CUSTOM_ACTION_TYPE = {
  checkbox: "Checkboxes",
  text: "Text Answer",
  media: "Media Upload",
  link: "Link Submission",
} satisfies Record<CustomActionType, string>;

export default CustomActions;
