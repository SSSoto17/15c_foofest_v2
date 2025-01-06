import { TentSetup, EnterBuyerInfo, EnterPaymentInfo } from "./FormSections";

import EnterGuestInfo from "./form-sections/GuestInfo";

export function BookingStepTwo({ orderData, error }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <EnterGuestInfo {...orderData} error={error} />
      <TentSetup {...orderData} error={error} />
    </div>
  );
}

export function BookingStepThree({ orderData, error }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <EnterBuyerInfo {...orderData} error={error} />
      <EnterPaymentInfo {...orderData} error={error.payment} />
    </div>
  );
}
