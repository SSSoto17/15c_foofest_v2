"use client";

import { useState } from "react";
import BookingStepOne from "./StepOne";
import BookingStepTwo from "./StepTwo";
import { FormHeader } from "@/app/session/reservation/flow/checkout/page";

export default function BookingWindow() {
  const [activeStep, setActiveStep] = useState(1);
  return (
    <section className="grid md:grid-rows-subgrid md:col-span-3 md:row-span-full border border-border-form">
      <FormHeader activeStep={activeStep} />
      {activeStep === 2 ? (
        <BookingStepTwo />
      ) : (
        <BookingStepOne activeStep={activeStep} setActiveStep={setActiveStep} />
      )}
    </section>
  );
}
