const endpointReservation = process.env.NEXT_PUBLIC_FOO_FEST_API_URL;

const endpointOrders = process.env.SUPABASE_ORDERS_URL;
const orderKey = process.env.SUPABASE_ORDERS_ANON_KEY;

import useSWR from "swr";
import { fetcher } from "./utils";

export function getCampingAreas() {
  const { data, error, isLoading } = useSWR(
    `${endpointReservation}/available-spots`,
    fetcher
  );

  return {
    areas: data,
    isLoading,
    isError: error,
  };
}

export async function putReservation(reservationData) {
  const data = await fetch(`${endpointReservation}/reserve-spot`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  }).then((res) => res.json());

  return data;
}

export async function postReservation(reservationData) {
  const data = await fetch(`${endpointReservation}/fullfill-reservation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  }).then((res) => res.json());

  return data;
}

const headersList = {
  Accept: "application/json",
  "Content-Type": "application/json",
  apikey: orderKey,
  Prefer: "return=representation",
};

export async function postOrder(orderData) {
  const data = await fetch(endpointOrders, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(orderData),
  }).then((res) => res.json());

  return data;
}

export async function deleteOrder(id) {
  const data = await fetch(endpointOrders + `?reservationId=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  }).then((res) => res.json());

  return data;
}
