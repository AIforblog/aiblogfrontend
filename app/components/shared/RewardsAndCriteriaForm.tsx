"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, MoveLeft } from "lucide-react";

const RewardsAndCriteriaForm: React.FC = () => {
  const [reward, setReward] = useState<string>("");
  const [maxParticipants, setMaxParticipants] = useState<number>(1);
  const [engagementLevel, setEngagementLevel] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleIncrement = () => setMaxParticipants((prev) => prev + 1);
  const handleDecrement = () =>
    setMaxParticipants((prev) => Math.max(1, prev - 1));

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleOptionClick = (value: string) => {
    setEngagementLevel(value);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4 sm:hidden">
        <MoveLeft className="text-gray-400" />
        <span className="ml-auto text-blue-500 text-sm">Drafts</span>
      </div>
      <h2 className="text-xl font-semibold mb-2">Rewards and Criteria</h2>
      <p className="text-sm text-gray-600 mb-4">
        Set rewards per task, maximum participants for task and the engagement
        level required.
      </p>
      <div className="flex mb-6 gap-4">
        <div className="h-3 flex-grow bg-gray-200 rounded-full ml-1"></div>
        <div className="h-3 flex-grow bg-yellow-400 rounded-full"></div>
        <div className="h-3 flex-grow bg-gray-200 rounded-full ml-1"></div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reward per Participant
          </label>
          <input
            type="text"
            placeholder="Enter reward amount in ETH"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Maximum Participants
          </label>
          <div className="flex items-center border border-gray-300 rounded-md bg-white">
            <input
              type="number"
              value={maxParticipants}
              onChange={(e) =>
                setMaxParticipants(parseInt(e.target.value) || 1)
              }
              className="w-full text-gray-400 p-3 "
            />
            <div className="flex flex-col">
              <button
                onClick={handleIncrement}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <ChevronUp size={16} className="text-gray-400" />
              </button>
              <button
                onClick={handleDecrement}
                className="px-2 py-1 hover:bg-gray-100 "
              >
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
        <div ref={dropdownRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Engagement Level
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="w-full p-3 bg-white text-left text-gray-400 appearance-none rounded-md border-0 border-b border-l border-r border-gray-200 shadow-[0px_1px_2px_0px_#1018280F,0px_1px_3px_0px_#1018281A] focus:outline-none"
            >
              {engagementLevel || "Set Engagement Level"}
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 text-[#404040] bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
                {["Low", "Medium", "High"].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionClick(option)}
                    className="block w-full text-[#404040] text-left px-4 py-2 border-b-2 border-gray-100 mb-3 hover:bg-gray-100 focus:outline-none"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-6">
        <button className="hidden sm:block text-gray-600 font-medium">
          Back
        </button>
        <div className="w-full sm:w-auto flex justify-center sm:justify-end space-x-4">
          <button className="px-6 py-3 border border-black rounded-full text-gray-700 font-medium">
            Save to draft
          </button>
          <button className="px-8 py-3 bg-yellow-400 rounded-full text-black font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardsAndCriteriaForm;
