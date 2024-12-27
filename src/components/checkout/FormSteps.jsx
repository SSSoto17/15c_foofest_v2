import {
  GreenFee,
  TentSetup,
  EnterBuyerInfo,
  EnterPaymentInfo,
} from "./FormSections";
import SelectTickets from "./form-sections/SelectTickets";
import SelectCampingArea from "./form-sections/SelectCampingArea";
import EnterGuestInfo from "./form-sections/GuestInfo";

export function BookingStepOne({ ticketData, error, areaData }) {
  return (
    <div className="grid gap-y-10 sm:gap-y-16 p-8 sm:p-12">
      <SelectTickets {...ticketData} error={error} />
      <SelectCampingArea data={areaData} />
      <GreenFee />
    </div>
  );
}

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
