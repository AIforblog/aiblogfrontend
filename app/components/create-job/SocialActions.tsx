import { JobFormSchema, SOCIAL_ACTION_TYPES } from "@/schemas/job";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import PlusIcon from "../../../public/assets/icons/plus-icon.svg";

const SocialActions: React.FC = () => {
  const form = useFormContext<JobFormSchema>();
  const { fields, append, remove } = useFieldArray({
    name: "socialActions",
    control: form.control,
  });
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const addSocialItem = () => {
    append({ socialLink: "", actions: [] });
  };

  const removeSocialItem = (index: number) => {
    remove(index);
  };

  // const toggleAction = (index: number, action: Action) => {
  //   let newActions = [...fields[index].actions];
  //   const actionIndex = newActions.indexOf(action);
  //   if (actionIndex > -1) {
  //     newActions = newActions.filter((a) => a !== action);
  //   } else {
  //     newActions.push(action);
  //   }

  //   form.setValue(`socialActions.${index}.actions`, newActions, { shouldTouch: true });
  //   forceRerender();
  // };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const { errors } = form.formState;

  return (
    <Card className="bg-white shadow-none border border-[#e5e5e5] p-4 rounded-2xl">
      <CardTitle className="p-0 mb-3 md:mb-6">
        <h3 className="text-base font-normal text-[#404040]">
          Input Your Socials
        </h3>
      </CardTitle>

      <CardContent className="p-0">
        {fields?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-y-4 md:gap-y-4 ${fields.length > 1 && "mb-4 md:mb-6"}`}
          >
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4">
              <div className="flex flex-1 gap-2 md:gap-x-4 items-center">
                {/* Cancel btn */}
                <button onClick={() => removeSocialItem(index)} type="button">
                  <X className="w-3.5 md:w-4 h-3.5 md:h-4 text-[#404040] hover:text-black transition-all duration-300 ease-in-out" />
                </button>

                {/* Text input */}
                <div className="w-full flex-1 ">
                  <Controller
                    name={`socialActions.${index}.socialLink`}
                    control={form.control}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Input
                        key={item.id}
                        placeholder="Enter your profile link"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        className="w-full border-[#e5e5e5] rounded-none !border-b border-0 pb-[1px] p-0 focus-within:outline-0 shadow-none text-[#262626] font-normal text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
                      />
                    )}
                  />
                  {errors.socialActions?.[index]?.socialLink ? (
                    <p className="text-sm font-medium text-destructive">
                      {errors.socialActions[index]?.socialLink?.message}
                    </p>
                  ) : null}
                </div>
              </div>

              {/* Drop down */}
              <div className="w-full md:max-w-[14rem] flex-1 relative">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex-1 rounded-xl flex items-center justify-between h-10 md:h-12"
                >
                  <p className="font-normal text-base text-[#a3a3a3]">
                    Select action
                  </p>
                  <ChevronDown className="font-normal w-5 h-5 text-[#a3a3a3]" />
                </Button>
                {errors.socialActions?.[index]?.actions ? (
                  <p className="text-sm font-medium text-destructive">
                    {errors.socialActions[index]?.actions?.message}
                  </p>
                ) : null}
                {openDropdown === index && (
                  <div className="absolute z-10 w-full md:w-[14rem] mt-2 bg-white border border-[#e5e5e5] overflow-hidden rounded-xl shadow-xl">
                    {SOCIAL_ACTION_TYPES.map((action) => (
                      <Label
                        key={action}
                        className="flex items-center gap-x-3 px-4 py-2 hover:bg-black/5 hover:cursor-pointer"
                      >
                        <Controller
                          render={({ field: { value, onChange, onBlur } }) => (
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={value.includes(action)}
                              onChange={() =>
                                onChange(
                                  value.includes(action)
                                    ? value.filter((v) => v !== action)
                                    : [...value, action],
                                )
                              }
                              onBlur={onBlur}
                              className="w-3.5 md:w-4 h-3.5 md:h-4 border border-[#737373]"
                            />
                          )}
                          name={`socialActions.${index}.actions`}
                          control={form.control}
                        />
                        <span className="font-normal text-sm md:text-base text-[#404040]">
                          {action}
                        </span>
                      </Label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Actions */}
            <div className="flex flex-wrap justify-end gap-2">
              <Controller
                render={({ field: { value: actions, onChange } }) => (
                  <>
                    {actions.map((action) => (
                      <div
                        key={action}
                        className="flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] rounded-full  cursor-default"
                      >
                        <p className="text-xs md:text-sm font-normal text-[#404040]">
                          {action}
                        </p>
                        <X
                          className="h-3 w-3 font-normal text-[#404040] inline cursor-pointer"
                          onClick={() =>
                            onChange(actions.filter((v) => v !== action))
                          }
                        />
                      </div>
                    ))}
                  </>
                )}
                name={`socialActions.${index}.actions`}
                control={form.control}
              />
            </div>
          </div>
        ))}
      </CardContent>

      <Separator className="bg-[#e5e5e5] mt-6 md:mt-12 mb-4" />

      <CardFooter className="p-0 flex justify-between items-center">
        <button
          onClick={addSocialItem}
          type="button"
          className="flex items-center border-none font-normal text-sm md:text-base text-[#262626] gap-x-2"
        >
          <Image
            src={PlusIcon}
            alt="Plus"
            width={50}
            height={50}
            className="w-[20px] md:w-[22px] h-[20px] md:h-[22px]"
          />
          {fields.length > 0 ? <span>Add more</span> : <span>Add</span>}
        </button>

        <Trash2 className="w-4 md:w-5 h-4 md:h-5 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer" />
      </CardFooter>
    </Card>
  );
};

export default SocialActions;
