"use client";

// COMPONENTS
import { Field, Label, Input, Checkbox } from "@headlessui/react";
import { MdOutlineCheck, MdOutlineError } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa";

// FUNCTIONS
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function CheckField({ data, minor, children }) {
  const [checked, setChecked] = useState(false);

  return (
    <Field className="flex items-center gap-2 md:gap-3 max-w-xl group hover:cursor-pointer">
      <Checkbox
        name={data?.name}
        checked={checked}
        onChange={setChecked}
        className="border-2 border-aztec-600 rounded-sm data-checked:border-forest-600 data-checked:bg-forest-600 data-focus:outline-none"
      >
        <MdOutlineCheck className={`opacity-0 ${checked && "opacity-100"}`} />
      </Checkbox>
      <Label
        className={`body-copy text-res-sm md:text-res-base flex justify-between group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer ${
          minor && "body-copy-small text-aztec-300"
        }`}
      >
        {children}{" "}
        {data?.price && (
          <span className=" opacity-50 place-self-end mx-8">
            {data?.price} DKK
          </span>
        )}
      </Label>
    </Field>
  );
}

export function TextInput({
  name,
  type,
  placeholder,
  defaultValue,
  error,
  children,
  variant,
}) {
  const variants = {
    fullSpan: "col-span-3",
    twoSpan: "col-span-2",
  };
  return (
    <Field
      className={`grid gap-y-2 ${variant ? variants[variant] : "max-w-sm"}`}
    >
      <Label
        className={`body-copy capitalize ${variant === "slim" && "opacity-65"}`}
      >
        {children}
      </Label>
      <div
        className={`grid ${
          variant !== "twoSpan" && "grid-cols-[1fr_auto]"
        } gap-y-4 relative`}
      >
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`input-field input-field-text--focus body-copy placeholder:text-res-sm ${
            variant === "slim" && "py-1"
          } ${
            error &&
            !defaultValue &&
            "not-data-focus:border-border-global--error bg-surface-input--focus"
          }`}
        />
        {variant !== "twoSpan" && (
          <div className="w-6 hidden md:block">
            {error && !defaultValue && variant !== "slim" && (
              <MdOutlineError
                aria-label="Attention!"
                className="mr-4place-self-center text-text-global--error"
                size="24"
              />
            )}
          </div>
        )}
      </div>
      {(variant != "slim" || variant != "twoSpan") && (
        <ErrorText>{!error?.includes("ticket") && error}</ErrorText>
      )}
    </Field>
  );
}

export function ReservationTimer() {
  return (
    <div className="flex justify-between gap-2 items-center bg-surface-action py-2 px-4">
      <small className="body-copy-small leading-tight">
        Time to complete reservation
      </small>
      <CountDown seconds={60 * 5} />
    </div>
  );
}

export function CountDown({ seconds }) {
  const [countdown, setCountdown] = useState(seconds);
  const timerID = useRef();

  useEffect(() => {
    timerID.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (countdown <= 1) {
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

export function ErrorText({ retainHeight, children }) {
  return (
    <small
      className={`body-copy-small text-text-global--action italic ${
        retainHeight && "h-6"
      }`}
    >
      {children}
    </small>
  );
}
