import React from "react";
import NotFound from "@site:shared/NotFound";
import { RoutineGamifier } from "@site:shared/types/RoutineGamifier";

interface Props {
  history: RoutineGamifier.History<RoutineGamifier.Task>
}

const TaskHistory: React.FC<Props> = ({ history }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold mb-4">История заданий</h2>
    {history.items.length === 0 && <NotFound>История выполненных заданий отсутствует</NotFound>}
    <div className="space-y-4">
      {history.items.map((entry, index) => (
        <div
          key={index}
          className="bg-gray-800 p-4 rounded-lg flex flex-wrap justify-between items-center shadow-lg"
        >
          <span>{entry.date}</span>
          <span className="font-medium">{entry.name}</span>
        </div>
      ))}
    </div>
  </section>
);

export default TaskHistory;
