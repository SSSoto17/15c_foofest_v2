// COMPONENTS
import { Fieldset, Legend } from "@headlessui/react";
import { SelectQuantity } from "../../checkout/FormFields";

// FUNCTIONS
import { useTickets, useTicketActions } from "@/store/TicketStore";
import { ErrorText } from "../../checkout/FormFields";

export default function SelectTickets({ partoutGuests, vipGuests, error }) {
  // const ticketQuantity = partoutGuests?.length + vipGuests?.length;
  const { partoutTickets, vipTickets } = useTickets();
  const { setPartout, setVip } = useTicketActions();

  const ticketListing = [
    {
      label: "Partout Ticket",
      price: "799",
      error: error?.tickets,
      currentTotal: partoutTickets,
      setTotal: setPartout,
    },
    {
      label: "VIP Ticket",
      price: "1299",
      error: error?.tickets,
      currentTotal: vipTickets,
      setTotal: setVip,
    },
  ];
  return (
    <Fieldset className="grid gap-y-4 max-w-xl">
      <Legend className="heading-5">Tickets</Legend>
      <ErrorText>{error?.tickets}</ErrorText>
      {ticketListing.map((ticket, id) => {
        return (
          <SelectQuantity key={id} data={ticket}>
            {ticket.label}
          </SelectQuantity>
        );
      })}
    </Fieldset>
  );
}
