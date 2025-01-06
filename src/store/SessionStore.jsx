import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

// CURRENT RESERVATION IN SESSION
const useSessionStore = create((set) => ({
  reservationId: "",
  setReservationId: (id) => set(() => ({ reservationId: id })),
}));

export const useSession = () =>
  useSessionStore(
    useShallow((state) => ({
      reservationId: state.reservationId,
      setReservationId: state.setReservationId,
    }))
  );
