import React from "react";
import NotFound from "@site:shared/NotFound";
import { RoutineGamifier } from "@site:shared/types/RoutineGamifier";

interface Props {
  history: RoutineGamifier.History<RoutineGamifier.ShopItem>
}

const PurchaseHistory: React.FC<Props> = ({ history }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">История покупок</h2>
    <div className="space-y-4">
      {history.items.length === 0 && <NotFound>История покупок отсутствует</NotFound>}

      {history.items.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-800 flex flex-wrap p-4 rounded-lg flex justify-between items-center shadow-lg"
        >
          <span>{entry.date}</span>
          <span className="font-medium">{entry.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default PurchaseHistory;