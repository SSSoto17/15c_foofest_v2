"use client";

// COMPONENTS
import { Fieldset, Legend } from "@headlessui/react";
import { FormFooter } from "@/app/session/reservation/flow/checkout/page";
import {
  QuantitySelector,
  RadioSelector,
  CheckField,
  ErrorText,
} from "./FormFields";
import Form from "next/form";

// FUNCTIONS
import { useActionState, useEffect } from "react";
import { getCampingAreas } from "@/lib/order";
import { keyEnter } from "@/lib/utils";
import useTicketListing from "@/hooks/useTicketListing";
import useAvailableArea from "@/hooks/useAvailableArea";
import { submitTickets } from "@/app/session/reservation/flow/checkout/actions";
import { useSession } from "@/store/SessionStore";

// export default function BookingStepOne({ ticketData, error, areaData }) {
//   return (
//     <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
//       <SelectTickets {...ticketData} error={error} />
//       <SelectCampingArea data={areaData} />
//       <GreenFee />
//     </div>
//   );
// }

export default function BookingStepOne({
  activeStep,
  setActiveStep,
  ticketData,
  error,
}) {
  // const initState = { activeStep: 1, success: false, errors: {} };
  const { setReservationId } = useSession();
  const [state, submit, isPending] = useActionState(submitTickets);
  const { areas, isLoading } = getCampingAreas();

  useEffect(() => {
    if (state?.success) {
      setReservationId(state?.orderData?.reservationId);
    }
  }, [state]);

  if (isLoading) return;

  return (
    <Form
      action={submit}
      onKeyDown={keyEnter}
      className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12"
    >
      <SelectTickets {...ticketData} error={state?.errors} />
      <SelectCampingArea data={areas} />
      <GreenFee />
      <FormFooter activeStep={activeStep} isPending={isPending} />
    </Form>
    // <FormTemplate action={submitStepOne} {...state?.orderData}>
    // </FormTemplate>
  );
}

function SelectTickets({ partoutGuests, vipGuests, error }) {
  const ticketListing = useTicketListing(error);

  return (
    <Fieldset className="grid gap-y-4 max-w-xl">
      <Legend className="heading-5">Tickets</Legend>
      <ErrorText>{error?.tooFewTickets || error?.tooManyTickets}</ErrorText>
      {ticketListing.map((ticket, id) => {
        return (
          <QuantitySelector key={id} data={ticket}>
            {ticket.label}
          </QuantitySelector>
        );
      })}
    </Fieldset>
  );
}

function SelectCampingArea({ data }) {
  const [selected, setSelected, areaData] = useAvailableArea(data);

  return (
    <Fieldset className="grid gap-y-4 md:gap-y-6">
      <Legend className="heading-5">Camping Spot</Legend>
      <RadioSelector
        data={areaData}
        selected={selected}
        setSelected={setSelected}
      />
    </Fieldset>
  );
}

function GreenFee() {
  const data = { name: "greenFee", price: 249 };
  return (
    <Fieldset className="grid gap-y-2">
      <CheckField data={data}>Green Fee</CheckField>
    </Fieldset>
  );
}
