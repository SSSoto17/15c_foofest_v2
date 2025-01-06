import { useTickets } from "@/store/TicketStore";

export const fetcher = (url) => fetch(url).then((res) => res.json());

export function keyEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
}

export function getTicketQuantity() {
  const { partoutTickets, vipTickets } = useTickets();
  const totalTickets = partoutTickets + vipTickets;

  return totalTickets;
}
