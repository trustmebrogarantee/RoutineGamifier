import NotFound from "@shared/NotFound";

const PurchaseHistory = ({ history }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">История покупок</h2>
    <div className="space-y-4">
      {history.length === 0 && <NotFound>История покупок отсутствует</NotFound>}

      {history.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-800 flex flex-wrap p-4 rounded-lg flex justify-between items-center shadow-lg"
        >
          <span>{entry.date}</span>
          <span className="font-medium">{entry.itemName}</span>
        </div>
      ))}
    </div>
  </section>
);

export default PurchaseHistory;