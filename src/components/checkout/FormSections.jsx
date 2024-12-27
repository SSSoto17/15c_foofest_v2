import { Field, Fieldset, Legend, Label, Input } from "@headlessui/react";
import {
  CheckField,
  TextInput,
  ReservationTimer,
  ErrorText,
} from "@/components/checkout/FormFields";
import buyerInfo from "../../data/buyerfields";
import { NumberSpinner } from "./form-sections/SelectTickets";
import Accordion from "../Accordion";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

export function GreenFee() {
  const data = { name: "greenFee", price: 249 };
  return (
    <Fieldset className="grid gap-y-2">
      <CheckField data={data}>Green Fee</CheckField>
    </Fieldset>
  );
}

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

export function OrderSummary({
  step,
  partoutGuests,
  vipGuests,
  tentDouble,
  tentTriple,
  greenFee,
}) {
  const green = greenFee ? 249 : 0;
  const partoutPrice = partoutGuests ? partoutGuests.length * 799 : 0;
  const vipPrice = vipGuests ? vipGuests.length * 1299 : 0;
  const totalPrice = partoutPrice + vipPrice + green + 99;

  console.log(tentDouble);

  return (
    <section
      className={`md:grid border border-border-form self-start grid-rows-subgrid row-span-full ${
        step === 3 ? "grid" : "hidden"
      }`}
    >
      <header className="border-b border-border-form grid place-items-end p-8">
        <h3 className="body-copy font-semibold w-full text-center">
          Order Summary
        </h3>
      </header>
      <article
        className={`grid grid-rows-[auto_1fr] ${
          step !== 1 && "grid-rows-[auto_auto_1fr]"
        } gap-y-2`}
      >
        <div className={step === 3 && "hidden sm:block"}>
          {step !== 1 && <ReservationTimer />}
        </div>
        {!partoutGuests && !vipGuests && (
          <small className="body-copy-small p-6 text-center italic opacity-50">
            No tickets selected.
          </small>
        )}
        <ul className="p-6">
          {partoutGuests?.length > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="body-copy flex gap-2 items-end">
                <span className="body-copy-small">
                  {partoutGuests.length} x
                </span>
                Partout {partoutGuests.length === 1 ? "Ticket" : "Tickets"}
              </p>
              <p className="body-copy">{partoutGuests.length * 799},-</p>
            </li>
          )}
          {vipGuests?.length > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="body-copy flex gap-2 items-end">
                <span className="body-copy-small">{vipGuests.length} x</span>
                VIP {vipGuests.length === 1 ? "Ticket" : "Tickets"}
              </p>
              <p className="body-copy">{vipGuests.length * 1299},-</p>
            </li>
          )}
          {tentDouble > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="body-copy flex gap-2 items-end">
                <span className="body-copy-small">{tentDouble / 2} x</span>
                Double Person {tentDouble === 2 ? "Tent" : "Tents"}
              </p>
              <p className="body-copy">{(tentDouble / 2) * 299},-</p>
            </li>
          )}
          {tentTriple > 0 && (
            <li className="flex justify-between items-end gap-2">
              <p className="body-copy flex gap-2 items-end">
                <span className="text-desk-sm">{tentTriple / 3} x</span>
                Triple Person {tentTriple === 3 ? "Tent" : "Tents"}
              </p>
              <p className="body-copy">{tentTriple * 399},-</p>
            </li>
          )}
        </ul>
        <ul className="p-6 place-content-end">
          {greenFee && (
            <li className="flex justify-between items-end gap-2">
              <p className="body-copy flex gap-2 items-end">Green Fee</p>
              <p className="body-copy">249,-</p>
            </li>
          )}
          <li className="flex justify-between items-end gap-2">
            <p className="body-copy font-bold flex gap-2 items-end">
              Fixed Booking Fee
            </p>
            <p className="body-copy font-semibold">99,-</p>
          </li>
        </ul>
      </article>
      <footer className="flex justify-between gap-4 p-6 items-center border-t border-border-global font-bold">
        <p className="body-copy font-bold uppercase tracking-wider">Total</p>
        <p className="body-copy font-semibold">{totalPrice},-</p>
      </footer>
    </section>
  );
}
