import React from 'react';
import { motion } from 'framer-motion';
import NotFound from '@site:shared/NotFound';
import { RoutineGamifier } from "@site:shared/types/RoutineGamifier";

interface Props {
  taskList: RoutineGamifier.ITaskList,
  completeTask: (task: RoutineGamifier.Task) => void,
}

const TaskList: React.FC<Props> = ({ taskList, completeTask }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Ваши задания</h2>
    {taskList.items.length === 0 && <NotFound>Все задания выполнены!</NotFound>}
    <div className="space-y-4">
      {taskList.items.map((task) => (
        <motion.div
          key={task.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          layout
          className="bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-lg"
        >
          <div>
            <p className="text-lg font-medium">{task.text}</p>
            <span className="text-yellow-300">+{task.reward} монет</span>
          </div>
          <button
            onClick={() => completeTask(task)}
            className="inline-flex shrink-0 justify-center items-center h-10 w-10 text-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-md"
          >
            🌟
          </button>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TaskList;
