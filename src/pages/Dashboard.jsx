import { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

import Shop from '@widgets/Shop';
import Header from '@widgets/Header';
import TaskList from '@widgets/TaskList';
import TaskHistory from '@widgets/TaskHistory';
import PurchaseHistory from '@widgets/PurchaseHistory';

import { times } from '@shared/times';
import { generateTask } from '@features/generateTasks';
import { safeLocalStorage } from '@shared/safeLocalStorage';
import { useStoredState } from '@shared/useStoredState';

const DATE_KEY = (new Date()).toLocaleDateString('RU-ru')

const STORAGE_KEYS = { 
  CURRENT_TASKS: DATE_KEY + '_currentTasks_', 
  TASK_HISTORY: '_taskHistory_', 
  PURCHASE_HISTORY: '_purchaseHistory_',
  COINS: '_coins_',
};


const Dashboard = () => {
  /* Shop logic */
  /* TODO: extract into separate service */
  const [coins, setCoins] = useStoredState(STORAGE_KEYS.COINS, 0);

  const [shopItems] = useState([
    { id: 1, name: 'Поесть в ресторане', price: 120, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Поиграть 2 часа', price: 80, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Посмотреть аниме', price: 40, image: 'https://via.placeholder.com/100' },
  ]);
  const [purchaseHistory, setPurchaseHistory] = useStoredState(STORAGE_KEYS.PURCHASE_HISTORY, []);

  const [notification, setNotification] = useState('');
  const buyItem = (price, itemName) => {
    if (coins >= price) {
      setCoins(coins - price);
      setPurchaseHistory([...purchaseHistory, { date: (new Date()).toLocaleString('RU-ru'), itemName }]);
      setNotification('');
    } else {
      setNotification('Not enough coins to purchase this item!');
    }
  };
  
  /* Task logic */
  /* TODO: extract into separate service */
  const [tasks, setTasks] = useStoredState(STORAGE_KEYS.CURRENT_TASKS, []);
  const [taskHistory, setTaskHistory] = useStoredState(STORAGE_KEYS.TASK_HISTORY, []);
  const completeTask = (id, text, reward) => {
    setCoins(coins + reward);
    setTasks(tasks.filter(task => task.id !== id));
    setTaskHistory([...taskHistory, { date: new Date().toLocaleString('RU-ru'), taskName: text }]);
  };
  useEffect(() => {
    const GENERATED_TASKS_NUMBER = 4
    const tasks = safeLocalStorage.get(STORAGE_KEYS.CURRENT_TASKS)
    if (!tasks) setTasks(times(GENERATED_TASKS_NUMBER, generateTask));
    else setTasks(tasks);
  }, [])

  return (
    <div className="font-mono min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex flex-col items-center">
      <Header coins={coins} />
      <main className="w-full max-w-4xl">
        <TaskList tasks={tasks} completeTask={completeTask} />
        <Shop coins={coins} shopItems={shopItems} buyItem={buyItem} notification={notification} />
        <PurchaseHistory history={purchaseHistory} />
        <TaskHistory history={taskHistory} />
      </main>
    </div>
  );
};

export default Dashboard;
