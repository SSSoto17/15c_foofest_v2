import Image from "next/image";
import vipStamp from "@/assets/svg/vip.svg";

import { Fieldset, Legend } from "@headlessui/react";
import {
  TextInput,
  CheckField,
  ErrorText,
} from "@/components/checkout/FormFields";

export default function EnterGuestInfo({ partoutGuests, vipGuests, error }) {
  const TicketGuestKeys = {
    partoutGuests: { name: "partoutName", email: "partoutEmail" },
    vipGuests: { name: "vipName", email: "vipEmail" },
  };
  const singleTicket = partoutGuests.length + vipGuests.length === 1;

  return (
    <section
      className={`grid ${
        partoutGuests.length > 1 && "md:grid-cols-2"
      } gap-4 w-full`}
    >
      <header className="col-span-full grid gap-2">
        <h2 className="heading-5">Ticket Information</h2>
        <ErrorText>
          {error?.ticketGuestsName || error?.ticketGuestsEmail}
        </ErrorText>
      </header>
      {partoutGuests &&
        partoutGuests.map((guest, id) => {
          console.log(guest);
          return (
            <TicketGuestCard
              key={id}
              data={guest}
              {...TicketGuestKeys["partoutGuests"]}
              number={id + 1}
              single={singleTicket}
              error={error}
            />
          );
        })}
      {vipGuests &&
        vipGuests.map((guest, id) => {
          return (
            <TicketGuestCard
              key={id}
              data={guest}
              {...TicketGuestKeys["vipGuests"]}
              number={partoutGuests.length + id + 1}
              single={singleTicket}
              error={error}
              vip
            />
          );
        })}
    </section>
  );
}

export function TicketGuestCard({
  data,
  name,
  email,
  number,
  single,
  vip,
  error,
}) {
  const checkboxData = { name: "isBuyerGuest" };
  return (
    <>
      <Fieldset className="grid gap-y-6 max-w-md grow shrink">
        <Legend className="heading-6 font-semibold capitalize flex gap-4">
          Ticket #{number}
        </Legend>
        <div
          className={`grid gap-y-4 border p-6 md:p-8 pt-4 relative ${
            (error.ticketGuestsName && !data?.name) ||
            (error.ticketGuestsEmail && !data?.email)
              ? "border-border-global--error/35"
              : "border-border-input"
          }`}
        >
          {vip && (
            <Image
              src={vipStamp}
              alt="VIP Ticket"
              className="absolute right-6 -top-6"
            />
          )}
          <TextInput
            name={name}
            error={error?.ticketGuestsName}
            defaultValue={data?.name}
            type="text"
            variant="slim"
          >
            Name
          </TextInput>
          <TextInput
            name={email}
            error={error?.ticketGuestsEmail}
            defaultValue={data?.email}
            type="email"
            variant="slim"
          >
            Email
          </TextInput>
        </div>
        {single && (
          <CheckField data={checkboxData} minor>
            Are you buying this ticket for yourself?
          </CheckField>
        )}
      </Fieldset>
    </>
  );
}
