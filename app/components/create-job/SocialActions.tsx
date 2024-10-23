import React, { useState, useEffect } from "react";
import { X, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import PlusIcon from "../../../public/assets/icons/plus-icon.svg";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

type Action = "Follow" | "Like" | "Comment" | "Share";

interface SocialItem {
  url: string;
  actions: Action[];
}

interface SocialActionsProps {
  onEmpty?: () => void;
}

const SocialActions: React.FC<SocialActionsProps> = ({ onEmpty }) => {
  const [socialItems, setSocialItems] = useState<SocialItem[]>([
    { url: "", actions: [] },
  ]);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (socialItems.length === 0 && onEmpty) {
      onEmpty();
    }
  }, [socialItems, onEmpty]);

  const addSocialItem = () => {
    setSocialItems([...socialItems, { url: "", actions: [] }]);
  };

  const removeSocialItem = (index: number) => {
    const newItems = socialItems.filter((_, i) => i !== index);
    setSocialItems(newItems);
  };

  const updateUrl = (index: number, url: string) => {
    const newItems = [...socialItems];
    newItems[index].url = url;
    setSocialItems(newItems);
  };

  const toggleAction = (index: number, action: Action) => {
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

  return (
    <Card className="bg-white shadow-none border border-[#e5e5e5] p-4 rounded-2xl">
      <CardTitle className="p-0 mb-3 md:mb-6">
        <h3 className="text-base font-normal text-[#404040]">
          Input your socials
        </h3>
      </CardTitle>

      <CardContent className="p-0">
        {socialItems?.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-y-4 md:gap-y-4 ${
              socialItems.length > 1 && "mb-4 md:mb-6"
            }`}
          >
            <div className="w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4">
              <div className="flex flex-1 gap-2 md:gap-x-4 items-center">
                {/* Cancel btn */}
                <button onClick={() => removeSocialItem(index)}>
                  <X className="w-3.5 md:w-4 h-3.5 md:h-4 text-[#404040] hover:text-black transition-all duration-300 ease-in-out" />
                </button>

                {/* Text input */}
                <div className="w-full flex-1 border-b border-[#e5e5e5]">
                  <Input
                    placeholder="Enter your profile link"
                    value={item.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      updateUrl(index, e.target.value)
                    }
                    className="w-full mb-[1px] p-0 border-none focus-within:outline-0 shadow-none text-[#262626] font-normal text-sm md:text-base placeholder:font-normal placeholder:text-sm md:placeholder:text-base placeholder:text-[#a3a3a3]"
                  />
                </div>
              </div>

              {/* Drop down */}
              <div className="w-full md:max-w-[14rem] flex-1 relative">
                <Button
                  variant="outline"
                  onClick={() => toggleDropdown(index)}
                  className="w-full flex-1 rounded-xl flex items-center justify-between h-10 md:h-12"
                >
                  <p className="font-normal text-base text-[#a3a3a3]">
                    Select action
                  </p>
                  <ChevronDown className="font-normal w-5 h-5 text-[#a3a3a3]" />
                </Button>
                {openDropdown === index && (
                  <div className="absolute z-10 w-full md:w-[14rem] mt-2 bg-white border border-[#e5e5e5] overflow-hidden rounded-xl shadow-xl">
                    {(["Follow", "Likes", "Comments", "Share"] as Action[]).map(
                      (action) => (
                        <Label
                          key={action}
                          className="flex items-center gap-x-3 px-4 py-2 hover:bg-black/5 hover:cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={item.actions.includes(action)}
                            onChange={() => toggleAction(index, action)}
                            className="w-3.5 md:w-4 h-3.5 md:h-4 border border-[#737373]"
                          />
                          <span className="font-normal text-sm md:text-base text-[#404040]">
                            {action}
                          </span>
                        </Label>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Actions */}
            <div className="flex flex-wrap justify-end gap-2">
              {item.actions.map((action) => (
                <div
                  key={action}
                  className="flex items-center gap-1 px-2 py-1 bg-[#F5F5F5] rounded-full  cursor-default"
                >
                  <p className="text-xs md:text-sm font-normal text-[#404040]">
                    {action}
                  </p>
                  <X
                    className="h-3 w-3 font-normal text-[#404040] inline cursor-pointer"
                    onClick={() => toggleAction(index, action)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>

      <Separator className="bg-[#e5e5e5] mt-6 md:mt-12 mb-4" />

      <CardFooter className="p-0 flex justify-between items-center">
        <button
          onClick={addSocialItem}
          className="flex items-center border-none font-normal text-sm md:text-base text-[#262626] gap-x-2"
        >
          <Image
            src={PlusIcon}
            alt="Plus"
            width={50}
            height={50}
            className="w-[20px] md:w-[22px] h-[20px] md:h-[22px]"
          />
          <span>Add more</span>
        </button>

        <Trash2 className="w-4 md:w-5 h-4 md:h-5 font-normal text-[#737373] hover:text-black/30 transition-all duration-300 ease-in-out cursor-pointer" />
      </CardFooter>
    </Card>
  );
};

export default SocialActions;
