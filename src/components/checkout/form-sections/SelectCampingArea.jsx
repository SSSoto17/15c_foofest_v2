"use client";

// COMPONENTS
import {
  Fieldset,
  Field,
  Legend,
  Label,
  RadioGroup,
  Radio,
} from "@headlessui/react";

// FUNCTIONS
import { useState } from "react";
import { useQuantityStore } from "@/store/GlobalStore";

export default function SelectCampingArea({ data }) {
  const tickets = useQuantityStore((state) => state.total);
  const available = data.filter(
    (area) => area.available > 0 && area.available >= tickets
  );
  return (
    <Fieldset className="grid gap-y-4 md:gap-y-6">
      <Legend className="heading-5">Camping Spot</Legend>
      <Select data={data} available={available} ticketQuantity={tickets} />
    </Fieldset>
  );
}

function Select({ data, available, ticketQuantity }) {
  const [selected, setSelected] = useState(available[0].area);
  return (
    <RadioGroup name="area" value={selected} onChange={setSelected}>
      {data.map((area, id) => (
        <Field
          key={id}
          disabled={area.available === 0 || area.available < ticketQuantity}
          className="flex items-end justify-between max-w-xl gap-6 md:gap-8 not-data-disabled:cursor-pointer"
        >
          <Radio
            value={area.area}
            className="group grid grid-cols-[auto_8rem_4rem] gap-3 items-center"
          >
            <span className="input-radio" />
            <Label className="body-copy group-data-disabled:opacity-25 group-not-data-disabled:cursor-pointer">
              {area.area}
            </Label>
            <small className="body-copy-small opacity-25 cursor-default justify-self-end">
              {area.available} / {area.spots}{" "}
            </small>
          </Radio>
        </Field>
      ))}
    </RadioGroup>
  );
}
