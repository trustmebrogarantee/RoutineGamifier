import { motion } from 'framer-motion';
import NotFound from '../shared/NotFound';

const TaskList = ({ tasks, completeTask }) => (
  <section className="mb-8">
    <h2 className="text-2xl font-semibold mb-4">Ваши задания</h2>
    {tasks.length === 0 && <NotFound>Все задания выполнены!</NotFound>}
    <div className="space-y-4">
      {tasks.map((task) => (
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
            <span className="text-yellow-300">+{task.reward} coins</span>
          </div>
          <button
            onClick={() => completeTask(task.id, task.text, task.reward)}
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
