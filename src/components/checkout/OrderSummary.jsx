"use client";

import ReservationTimer from "./ReservationTimer";

export default function OrderSummary({
  step,
  partoutGuests,
  vipGuests,
  tentDouble,
  tentTriple,
  greenFee,
}) {
  const green = greenFee ? 249 : 0;
  const partoutPrice = partoutGuests ? partoutGuests.length * 799 : 0;
  const vipPrice = vipGuests ? vipGuests.length * 1299 : 0;
  const totalPrice = partoutPrice + vipPrice + green + 99;

  const styles = `md:grid border border-border-form self-start grid-rows-subgrid row-span-full ${
    step === 3 ? "grid" : "hidden"
  }`;

  return (
    <section className={styles}>
      <OrderHeader />
      <OrderOverview
        step={step}
        partoutGuests={partoutGuests}
        vipGuests={vipGuests}
      >
        <ItemBasket
          partoutGuests={partoutGuests}
          vipGuests={vipGuests}
          tentDouble={tentDouble}
          tentTriple={tentTriple}
        />
        <FeesBasket greenFee={greenFee} />
      </OrderOverview>
      <OrderTotal totalPrice={totalPrice} />
    </section>
  );
}

function OrderHeader() {
  return (
    <header className="border-b border-border-form grid place-items-end p-8">
      <h3 className="body-copy font-semibold w-full text-center">
        Order Summary
      </h3>
    </header>
  );
}

function OrderOverview({ step, partoutGuests, vipGuests, children }) {
  return (
    <article
      className={`grid grid-rows-[auto_1fr] ${
        step !== 1 && "grid-rows-[auto_auto_1fr]"
      } gap-y-2`}
    >
      <div className={step === 3 && "hidden sm:block"}>
        {step !== 1 && <ReservationTimer />}
      </div>
      {!partoutGuests && !vipGuests && (
        <small className="body-copy-small p-6 text-center italic opacity-50">
          No tickets selected.
        </small>
      )}
      {children}
    </article>
  );
}

function OrderTotal({ totalPrice }) {
  return (
    <footer className="flex justify-between gap-4 p-6 items-center border-t border-border-global font-bold">
      <p className="body-copy font-bold uppercase tracking-wider">Total</p>
      <p className="body-copy font-semibold">{totalPrice},-</p>
    </footer>
  );
}

function ItemBasket({ partoutGuests, vipGuests, tentDouble, tentTriple }) {
  return (
    <ul className="p-6">
      {partoutGuests?.length > 0 && (
        <TicketItem quantity={partoutGuests?.length} price={799}>
          Partout
        </TicketItem>
      )}
      {vipGuests?.length > 0 && (
        <TicketItem quantity={vipGuests?.length} price={1299}>
          VIP
        </TicketItem>
      )}
      {tentDouble > 0 && (
        <TentItem quantity={tentDouble / 2} price={299}>
          Double Person
        </TentItem>
      )}
      {tentTriple > 0 && (
        <TentItem quantity={tentTriple / 3} price={399}>
          Triple Person
        </TentItem>
      )}
    </ul>
  );
}

function TicketItem({ quantity, price, children }) {
  return (
    <li className="flex justify-between items-end gap-2">
      <p className="body-copy flex gap-2 items-end">
        <span className="body-copy-small">{quantity} x</span>
        {children + quantity === 1 ? "Ticket" : "Tickets"}
      </p>
      <p className="body-copy">{quantity * price},-</p>
    </li>
  );
}

function TentItem({ quantity, price, children }) {
  return (
    <li className="flex justify-between items-end gap-2">
      <p className="body-copy flex gap-2 items-end">
        <span className="body-copy-small">{quantity} x</span>
        {children + quantity === 1 ? "Tent" : "Tents"}
      </p>
      <p className="body-copy">{quantity * price},-</p>
    </li>
  );
}

function FeesBasket({ greenFee }) {
  return (
    <ul className="p-6 place-content-end">
      {greenFee && <FeeItem price={249}>Green Fee</FeeItem>}
      <FeeItem price={99}>Fixed Booking Fee</FeeItem>
    </ul>
  );
}

function FeeItem({ price, children }) {
  return (
    <li className="flex justify-between items-end gap-2">
      <p className="body-copy font-bold flex gap-2 items-end">{children}</p>
      <p className="body-copy font-semibold">{price},-</p>
    </li>
  );
}
