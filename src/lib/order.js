const endpointReservation = process.env.FOO_FEST_API_URL;

const endpointOrders = process.env.SUPABASE_ORDERS_URL;
const orderKey = process.env.SUPABASE_ORDERS_ANON_KEY;

export async function getCampingSpots() {
  const data = await fetch(`${endpointReservation}/available-spots`).then(
    (res) => res.json()
  );

  return data;
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

export async function postOrder(orderData) {
  const data = await fetch(endpointOrders, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apikey: orderKey,
      Prefer: "return=representation",
    },
    body: JSON.stringify(orderData),
  }).then((res) => res.json());

  return data;
}
