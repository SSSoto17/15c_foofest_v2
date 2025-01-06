import { Fieldset, Legend } from "@headlessui/react";
import { TextInput, ErrorText } from "@/components/checkout/FormFields";
import buyerInfo from "../../data/buyerfields";
import { NumberSpinner } from "./form-sections/SelectTickets";
import Accordion from "../Accordion";

export function TentSetup({ partoutGuests, vipGuests, error }) {
  const tentListing = [
    { label: "Double Person Tent", price: "299" },
    { label: "Triple Person Tent", price: "399" },
  ];

  return (
    <Accordion label="Tent Setup" variant="secondary">
      <Fieldset className="grid gap-y-3 ml-12">
        <ErrorText>{error?.tentSetup}</ErrorText>
        {tentListing.map((tent, id) => {
          return (
            <NumberSpinner
              key={id}
              {...tent}
              error={error}
              single={partoutGuests.length + vipGuests.length === 1}
            >
              {tent.label}
            </NumberSpinner>
          );
        })}
      </Fieldset>
    </Accordion>
  );
}

export function EnterBuyerInfo({ customerName, customerEmail, error }) {
  return (
    <Fieldset className="grid gap-y-4">
      <Legend className="heading-5">Your Information</Legend>
      {buyerInfo.map((field, id) => {
        return (
          <TextInput
            key={id}
            {...field}
            defaultValue={field.name === "name" ? customerName : customerEmail}
            error={
              field.name === "name" ? error.customerName : error.customerEmail
            }
          >
            {field.name}
          </TextInput>
        );
      })}
    </Fieldset>
  );
}

export function EnterPaymentInfo() {
  return (
    <Fieldset className="grid gap-y-6">
      <Legend className="heading-5">Payment</Legend>
      <div className="grid grid-cols-3 gap-x-4 max-w-lg">
        <TextInput
          name="cardNumber"
          type="tel"
          placeholder="Card number"
          variant="fullSpan"
        />
        <TextInput
          name="cardExp"
          type="text"
          placeholder="Expiration date ( MM / YY )"
          variant="twoSpan"
        />
        <TextInput
          name="cardSecurityCode"
          type="number"
          placeholder="Security code"
        />
        <TextInput
          name="cardHolder"
          type="text"
          placeholder="Name on card"
          variant="fullSpan"
        />
      </div>
    </Fieldset>
  );
}
