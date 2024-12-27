import BookingForm from "@/components/checkout/Form";
import { getCampingSpots } from "@/lib/order";

export default async function Page() {
  const data = await getCampingSpots();

  return (
    <main>
      <section className="grid gap-x-4 grid-rows-[auto_auto_auto] md:grid-cols-4">
        <BookingForm areaData={data} />
      </section>
    </main>
  );
}
