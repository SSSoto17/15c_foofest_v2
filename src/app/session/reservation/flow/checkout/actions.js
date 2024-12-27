"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { putReservation, postReservation, postOrder } from "@/lib/order";

export async function submitTicketReservation(prev, formData) {
  const errors = {};
  const orderDetails = {};

  //  BOOKING FLOW || STEP ONE
  if (prev.activeStep === 1) {
    // COLLECT RESERVATION
    const data = {};
    data.area = formData.get("area");
    data.amount =
      Number(formData.get("Partout Ticket")) +
      Number(formData.get("VIP Ticket"));

    // COLLECT ORDER
    orderDetails.partoutGuests = Array(
      Number(formData.get("Partout Ticket"))
    ).fill("partoutGuests");
    orderDetails.vipGuests = Array(Number(formData.get("VIP Ticket"))).fill(
      "vipGuests"
    );
    orderDetails.campingArea = data.area;
    orderDetails.greenFee = Boolean(formData.get("greenFee"));

    // FORM VALIDATION
    if (!data.amount || data.amount < 1) {
      errors.tickets = "Please select your tickets.";
    }

    if (
      Number(formData.get("Partout Ticket")) > 10 ||
      Number(formData.get("VIP Ticket")) > 10
    ) {
      errors.tickets = "Please limit your selection to 10 tickets.";
    }
    if (errors.tickets) {
      return { activeStep: prev.activeStep, success: false, errors };
    }

    // PUT RESERVATION
    const response = await putReservation(data);
    if (response) {
      orderDetails.reservationId = response.id;
      revalidatePath("/");
      return { activeStep: 2, success: true, errors: {}, orderDetails };
    } else {
      return { activeStep: prev.activeStep, success: false, errors: {} };
    }
  }

  // BOOKING FLOW || STEP TWO
  if (prev.activeStep === 2) {
    // REASSIGN VALUES FROM PREVIOUS STEP TO ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);

    // COLLECT PARTOUT GUESTS INFORMATION
    orderDetails.partoutGuests = formData
      .getAll("partoutName")
      .map((str) => ({ name: str }));

    orderDetails.partoutGuests.forEach(function (guest, id) {
      const emails = formData.getAll("partoutEmail");
      guest.email = emails[id];
    });

    // COLLECT VIP GUESTS INFORMATION
    orderDetails.vipGuests = formData
      .getAll("vipName")
      .map((str) => ({ name: str }));

    orderDetails.vipGuests.forEach(function (guest, id) {
      const emails = formData.getAll("vipEmail");
      guest.email = emails[id];
    });

    // IS BUYER GOING?
    if (formData.get("isBuyerGuest")) {
      if (!orderDetails.vipGuests.length) {
        orderDetails.customerName = orderDetails.partoutGuests[0].name;
        orderDetails.customerEmail = orderDetails.partoutGuests[0].email;
      }
      if (!orderDetails.partoutGuests.length) {
        orderDetails.customerName = orderDetails.vipGuests[0].name;
        orderDetails.customerEmail = orderDetails.vipGuests[0].email;
      }
    }

    // FORM VALIDATION
    orderDetails.partoutGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name and email of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the name and email of each ticket holder.";
      }
    });

    orderDetails.vipGuests.map((guest) => {
      if (!guest.name || guest.name.length <= 1) {
        errors.ticketGuestsName =
          "Please provide the name of each ticket holder.";
      }
      if (!guest.email || !guest.email.includes(".")) {
        errors.ticketGuestsEmail =
          "Please provide the email of each ticket holder.";
      }
    });

    // COLLECT TENT ORDER
    orderDetails.tentDouble = Number(formData.get("Double Person Tent")) * 2;
    orderDetails.tentTriple = Number(formData.get("Triple Person Tent")) * 3;

    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length === 1 &&
      orderDetails.tentDouble > 2
    ) {
      errors.tentSetup = "Please fill up all available tent space.";
    }

    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length > 1 &&
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length <
        orderDetails.tentDouble + orderDetails.tentTriple
    ) {
      errors.tentSetup = "Please fill up all available tent space.";
    }
    if (
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length > 1 &&
      orderDetails.partoutGuests.length + orderDetails.vipGuests.length >
        orderDetails.tentDouble + orderDetails.tentTriple
    ) {
      errors.tentSetup = "Please ensure room for all guests.";
    }

    if (
      errors.ticketGuestsName ||
      errors.ticketGuestsEmail ||
      errors.tentSetup
    ) {
      return {
        activeStep: prev.activeStep,
        success: false,
        errors,
        orderDetails,
      };
    }

    return { activeStep: 3, success: true, errors: {}, orderDetails };
  }

  // BOOKING FLOW || STEP THREE
  if (prev.activeStep === 3) {
    // REASSIGN VALUES FROM PREVIOUS STEP TO ORDER DETAILS
    Object.assign(orderDetails, prev.orderDetails);

    // COLLECT CUSTOMER INFORMATION
    orderDetails.customerName = formData.get("name");
    orderDetails.customerEmail = formData.get("email");

    // COLLECT FAKE PAYMENT DATA
    const fakeCreditCard = {};
    if (formData.get("cardNumber")) {
      fakeCreditCard.cardNumber = "1234123412341234";
    }
    if (formData.get("cardExp")) {
      fakeCreditCard.cardExp = "12/25";
    }
    if (formData.get("cardSecurityCode")) {
      fakeCreditCard.cardSecurityCode = "123";
    }
    if (formData.get("cardHolder")) {
      fakeCreditCard.cardHolder = "John Doe";
    }

    // FORM VALIDATION
    if (!orderDetails.customerName || orderDetails.customerName.length <= 1) {
      errors.customerName = "Please provide your name.";
    }
    if (
      !orderDetails.customerEmail ||
      !orderDetails.customerEmail.includes(".")
    ) {
      errors.customerEmail = "Please provide a valid email address.";
    }
    // if (
    //   !formData.get("cardNumber") ||
    //   formData.get("cardNumber").length != 16 ||
    //   !formData.get("cardExp") ||
    //   formData.get("cardExp").length > 5 ||
    //   !formData.get("cardSecurityCode") ||
    //   !formData.get("cardSecurityCode").length !== 3 ||
    //   !formData.get("cardHolder") ||
    //   !formData.get("cardHolder").length > 2
    // ) {
    //   errors.payment = "Please check your card details.";
    // }

    if (errors.customerName || errors.customerEmail) {
      return {
        activeStep: prev.activeStep,
        success: false,
        errors,
        orderDetails,
      };
    }

    // UPDATE TENT QUANTITY
    orderDetails.tentDouble = prev.orderDetails.tentDouble / 2;
    orderDetails.tentTriple = prev.orderDetails.tentTriple / 3;

    // PRICE SUMUP
    const pricePartout = orderDetails.partoutGuests.length * 799;
    const priceVip = orderDetails.vipGuests.length * 1299;
    const priceTentsDouble = orderDetails.tentDouble * 299;
    const priceTentsTriple = orderDetails.tentTriple * 399;
    orderDetails.priceTotal =
      pricePartout +
      priceVip +
      (orderDetails.tentDouble && priceTentsDouble) +
      (orderDetails.tentTriple && priceTentsTriple) +
      (orderDetails.greenFee && 249) +
      99;

    // FULLFIL RESERVATION
    const data = {};
    data.id = orderDetails.reservationId;

    // POST RESERVATION
    const response = await postReservation(data);
    if (response) {
      delete orderDetails.reservationId;
      await postOrder(orderDetails);
      revalidatePath("/");
      redirect("/session/reservation/order-complete");
    }
  }
}
