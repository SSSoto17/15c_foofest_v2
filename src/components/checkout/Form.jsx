"use client";

import Form from "next/form";
import Button from "../Button";

import { BookingStepOne, BookingStepTwo, BookingStepThree } from "./FormSteps";
import { OrderSummary } from "./FormSections";
import { ReservationTimer } from "./FormFields";

import formSteps from "../../data/formsteps";
import { useActionState } from "react";
import { submitTicketReservation } from "@/app/session/reservation/flow/checkout/actions";
import { keyEnter } from "@/lib/utils";

export default function BookingForm({ areaData }) {
  const initState = { activeStep: 1, success: false, errors: {} };
  const [state, submitReservation, isPending] = useActionState(
    submitTicketReservation,
    initState
  );

  console.log(state?.orderDetails);

  return (
    <>
      <Form
        onKeyDown={keyEnter}
        action={submitReservation}
        className="grid md:grid-rows-subgrid md:col-span-3 md:row-span-full border border-border-form"
      >
        <FormHeader {...state} />
        {state?.activeStep === 2 ? (
          <BookingStepTwo
            orderData={state?.orderDetails}
            error={state?.errors}
          />
        ) : state?.activeStep === 3 ? (
          <BookingStepThree
            orderData={state?.orderDetails}
            error={state?.errors}
          />
        ) : (
          <BookingStepOne
            areaData={areaData}
            ticketData={state?.orderDetails}
            error={state?.errors}
          />
        )}
        <FormFooter
          activeStep={state?.activeStep}
          nextStep={submitReservation}
          isPending={isPending}
        />
      </Form>
      <OrderSummary step={state?.activeStep} {...state?.orderDetails} />
    </>
  );
}

function FormHeader({ activeStep }) {
  return (
    <>
      <header
        className={`border-b border-border-form py-8 px-12 ${
          activeStep === 3 ? "hidden md:block" : "block"
        }`}
      >
        <ol className="sm:flex justify-center sm:justify-between items-center gap-4 font-semibold cursor-default">
          {formSteps.map((step, id) => (
            <FormStepIndicator activeStep={activeStep} {...step} key={id} />
          ))}
        </ol>
      </header>

      <div className={activeStep === 1 ? "hidden" : "block sm:hidden"}>
        {activeStep !== 1 && <ReservationTimer />}
      </div>
    </>
  );
}

function FormStepIndicator({ activeStep, step, title }) {
  return (
    <>
      <li
        key={crypto.randomUUID()}
        className="hidden first-of-type:hidden sm:block w-10 h-0.5 bg-aztec-800"
      />
      <li
        {...(activeStep >= step && {
          "data-active": true,
        })}
        className={`group body-copy font-semibold flex items-center gap-4 place-content-center sm:justify-between ${
          activeStep === step
            ? "text-text-global"
            : "text-text-global--disabled hidden sm:flex"
        }`}
      >
        <span className="body-copy-small grid place-content-center w-6 sm:w-8 rounded-full aspect-square text-text-global bg-surface-action--disabled group-data-active:bg-surface-action">
          {step}
        </span>{" "}
        {title}
      </li>
    </>
  );
}

function FormFooter({ activeStep, nextStep, isPending }) {
  return (
    <footer className="flex justify-center sm:justify-end gap-4 items-end p-10 sm:p-12 pt-0">
      <Button
        variant="primary"
        size="base"
        formAction={nextStep}
        isDisabled={isPending}
      >
        {activeStep === 3 ? "Purchase" : "Next"}
      </Button>
    </footer>
  );
}
