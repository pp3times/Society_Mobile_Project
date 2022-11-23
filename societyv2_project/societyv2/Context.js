import { createContext, useState } from "react";

const BarsCards = createContext();

const BarContext = ({ children }) => {
  const [seats, setSeats] = useState([]);

  const [occupied, setOccupied] = useState([]);

  const [ticket, setTicket] = useState(null);
  return (
    <BarsCards.Provider
      value={{ seats, setSeats, occupied, setOccupied, ticket, setTicket }}
    >
      {children}
    </BarsCards.Provider>
  );
};

export { BarsCards, BarContext };
