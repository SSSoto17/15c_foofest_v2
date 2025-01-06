"use client";

import EnterGuestInfo from "./form-sections/GuestInfo";
import { TentSetup } from "./FormSections";

export default function BookingStepTwo() {
  return (
    <Form
      action={submit}
      onKeyDown={keyEnter}
      className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12"
    >
      {/* <EnterGuestInfo /> */}
      {/* <TentSetup /> */}

      <FormFooter />
    </Form>
  );
}
