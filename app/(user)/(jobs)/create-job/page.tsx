"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/app/components/create-job/ProgresBar";
import Image from "next/image";
import { CalendarDays, CirclePlus, CircleMinus } from "lucide-react";
import InstructionField from "@/app/components/create-job/InstructionField";
import SocialActions from "@/app/components/create-job/SocialActions";
import Button from "@/components/shared/button";
import CustomActions from "@/app/components/create-job/CustomActions";

export default function CreateJob() {
  const [activeForm, setActiveForm] = useState<"social" | "custom" | null>(
    null
  );
  const [socialActions, setSocialActions] = useState<boolean>(false);
  const [customActions, setCustomActions] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleForm = (formType: "social" | "custom") => {
    setActiveForm(activeForm === formType ? null : formType);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row mx-0 md:mx-10 my-10">
        {currentStep === 1 && (
          <Card className="bg-white h-full mx-5">
            <CardContent className="mx-5">
              <form>
                <div className="my-5">
                  <h2 className="text-2xl font-bold">Jobs Creation</h2>
                  <p className="text-lg">
                    Define job details and set a date for the job.
                  </p>
                </div>
              </form>
              <ProgressBar currentStep={1} totalSteps={3} />

              <Card className="bg-[#FAFAFA] my-5">
                <CardContent>
                  <div className="my-5">
                    <h4>Job title</h4>
                    <input
                      type="text"
                      className="border-2 border-black-700 w-4/6 p-2"
                      placeholder="Enter the job title you’re hiring for..."
                    />
                  </div>

                  <div className="flex justify-between my-5">
                    <div className="pe-5">
                      <p>Start Date</p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full md:w-80 p-2 pr-10"
                          placeholder="Choose a start date"
                        />
                        <CalendarDays className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
                      </div>
                    </div>

                    <div>
                      <p>End Date</p>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full md:w-80 p-2 pr-10"
                          placeholder="Choose an end date"
                        />
                        <CalendarDays className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <p>Description</p>
                    <textarea
                      name=""
                      id=""
                      cols={0}
                      rows={6}
                      placeholder="Describe the job"
                      className="w-full px-5 border-2 border-black-700"
                    ></textarea>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <div>
                  <Button
                    size="large"
                    color="primary"
                    className="mr-2"
                    variant="outline"
                  >
                    Save to draft
                  </Button>
                  <Button size="large" color="secondary" onClick={nextStep}>
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="bg-white h-full mx-5">
            <CardContent className="mx-5">
              <form>
                <div className="my-5">
                  <h2 className="text-2xl font-bold">Rewards and Criteria</h2>
                  <p className="text-lg">
                    Set rewards per task, maximum participants for task and the
                    engagement level required.
                  </p>
                </div>
              </form>
              <ProgressBar currentStep={2} totalSteps={3} />

              <Card className="bg-[#FAFAFA] my-5">
                <CardContent>
                  <div className="my-5">
                    <h4>Reward per Participants</h4>
                    <input
                      type="text"
                      className="w-full p-2"
                      placeholder="Enter reward amount in ETH"
                    />
                  </div>

                  <div className="my-5">
                    <p>Maximum Participants</p>
                    <input type="number" className="p-2 w-full" />
                  </div>

                  <div>
                    <p>Engagement Level</p>
                    <select name="" id="" className="p-2 w-full">
                      <option value="">Set engagement level</option>
                      <option value="">Low</option>
                      <option value="">Medium</option>
                      <option value="">High</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <div>
                  <p onClick={previousStep} className="cursor-pointer">
                    Back
                  </p>
                </div>

                <div>
                  <Button size="large" color="primary" variant="outline">
                    Save to draft
                  </Button>
                  <Button
                    size="large"
                    color="secondary"
                    onClick={nextStep}
                    className="ml-2"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="bg-white h-full mx-5">
            <CardContent className="mx-5">
              <form>
                <div className="my-5">
                  <h2 className="text-2xl font-bold">Enter Job details</h2>
                  <p className="text-lg">
                    Create auto/custom tasks with flexible options.
                  </p>
                </div>
              </form>
              <ProgressBar currentStep={3} totalSteps={3} />

              <div className="my-5">
                <InstructionField />
              </div>

              <Card className="bg-[#FAFAFA] rounded-xl p-5 my-5">
                <CardContent>
                  <div>
                    {activeForm === "social" && (
                      <SocialActions onEmpty={() => setSocialActions(false)} />
                    )}

                    {activeForm === "custom" && (
                      <CustomActions onEmpty={() => setCustomActions(false)} />
                    )}
                  </div>

                  <div className="flex justify-center my-5">
                    <div className="border-2 mt-2 w-52 h-0"></div>
                    <div className="mx-5">
                      <p>Select your action here</p>
                    </div>
                    <div className="border-2 w-52 mt-2 h-0"></div>
                  </div>

                  {!socialActions && !customActions && (
                    <>
                      <div className="flex justify-center space-x-6">
                        <Button
                          onClick={() => toggleForm("social")}
                          disabled={activeForm === "custom"}
                          className={`bg-[#FFFFFF] text-black w-2/5 p-3 shadow-md shadow-gray-400 ${
                            activeForm === "custom"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <div className="flex space-x-3">
                            {activeForm === "social" ? (
                              <CircleMinus />
                            ) : (
                              <CirclePlus />
                            )}
                            <p>Social Actions</p>
                          </div>
                        </Button>

                        <Button
                          onClick={() => toggleForm("custom")}
                          disabled={activeForm === "social"}
                          className={`bg-[#FFFFFF] text-black w-2/5 p-3 shadow-md shadow-gray-400 ${
                            activeForm === "social"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <div className="flex space-x-3">
                            {activeForm === "custom" ? (
                              <CircleMinus />
                            ) : (
                              <CirclePlus />
                            )}
                            <p>Custom Action</p>
                          </div>
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="flex w-3/5 justify-start my-10">
                <p className="">
                  By creating your job posting, you agree to our{" "}
                  <strong>Terms of Service</strong> and{" "}
                  <strong>Privacy Policy</strong> which outlines the practices
                  of the job postings.{" "}
                  <span className="text-[#FDC316]">Learn more</span>
                </p>
              </div>

              <div className="flex cursor-pointer justify-between">
                <div>
                  <p onClick={previousStep}>Back</p>
                </div>

                <div className="flex gap-2">
                  <Button size="large" color="primary" variant="outline">
                    Save to draft
                  </Button>
                  <Button size="large" color="secondary" onClick={nextStep}>
                    Publish Job
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <div className="bg-white h-full mx-20">
          <Card className="rounded-xl w-96">
            <div className="bg-[#FDF9D9] rounded-xl p-5">
              <h2 className="font-bold text-lg">Drafts</h2>
              <p className="text-sm">
                Every description will be saved as drafts for recovery
              </p>
            </div>
            <CardContent>
              <div className="flex justify-center mt-20">
                <Image
                  src="/images/draft.png"
                  width={120}
                  height={94}
                  alt="draft"
                />
              </div>
              <div>
                <p className="text-center mb-20">
                  You don’t have any saved drafts yet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
