"use client";

// FUNCTIONS
import { redirect } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSession } from "@/store/SessionStore";

// RESERVATION COUNTDOWN
export default function ReservationTimer() {
  return (
    <div className="flex justify-between gap-2 items-center bg-surface-action py-2 px-4">
      <small className="body-copy-small leading-tight">
        Time to complete reservation
      </small>
      <CountDown seconds={60 * 5} />
    </div>
  );
}

async function deleteReservation(id) {
  const data = await fetch(
    `https://iozsjcgncadtminziwkq.supabase.co/rest/v1/reservations?reservationId=eq.${id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvenNqY2duY2FkdG1pbnppd2txIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMDI2NzQsImV4cCI6MjA0OTg3ODY3NH0.fAOsU-bNbtRROxqdAAbGYL4Lva-N1JJ7aSIsq7Dt2p4",
        Prefer: "return=representation",
      },
    }
  ).then((res) => res.json());

  return data;
}

function CountDown({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerID = useRef();
  const { reservationId } = useSession();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (countdown <= 1) {
      deleteReservation(reservationId);
      clearInterval(timerID);
      redirect("/session/timeout");
    }
  }, [countdown]);
  // COUNTDOWN FUNCTION CREDIT: https://youtu.be/4_9yJXO4F2Y

  const formattedTimer =
    new Date(countdown * 1000).getUTCMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      useGrouping: false,
    }) +
    ":" +
    new Date(countdown * 1000).getSeconds().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      maximumFractionDigits: 0,
      useGrouping: false,
    });
  // TIME FORMAT CREDIT: https://www.geeksforgeeks.org/how-to-convert-seconds-to-time-string-format-hhmmss-using-javascript/

  return <p className="body-copy font-semibold">{formattedTimer}</p>;
}
