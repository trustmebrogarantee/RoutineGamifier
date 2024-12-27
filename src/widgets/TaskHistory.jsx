import NotFound from "@shared/NotFound";

const TaskHistory = ({ history }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">История заданий</h2>
    {history.length === 0 && <NotFound>История выполненных заданий отсутствует</NotFound>}
    <div className="space-y-4">
      {history.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-lg"
        >
          <span>{entry.date}</span>
          <span className="font-medium">{entry.taskName}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TaskHistory;
