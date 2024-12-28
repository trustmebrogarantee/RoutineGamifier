import 'tailwindcss/tailwind.css';
import type { RoutineGamifier } from '@shared/types/RoutineGamifier';

import Shop from '@widgets/Shop';
import Header from '@widgets/Header';
import TaskList from '@widgets/TaskList';
import TaskHistory from '@widgets/TaskHistory';
import PurchaseHistory from '@widgets/PurchaseHistory';

import { useBalance } from '@features/useBalance';
import { useHistory } from '@features/useHistory';
import { useShop } from '@features/useShop';
import { useTaskList } from '@features/useTaskList';

const DATE_KEY = (new Date()).toLocaleDateString('RU-ru')

const STORAGE_KEYS = { 
  CURRENT_TASKS: DATE_KEY + '_currentTasks_', 
  CURRENT_SHOP_ITEMS: DATE_KEY + '_shopItems_',
  TASK_HISTORY: '_taskHistory_', 
  PURCHASE_HISTORY: '_purchaseHistory_',
  BALANCE: '_balance_',
};


const Dashboard = () => {
  const balance = useBalance({ storageKey: STORAGE_KEYS.BALANCE })
  const completedTasksHistory = useHistory<RoutineGamifier.Task>({ storageKey: STORAGE_KEYS.TASK_HISTORY })
  const purchaseHistory = useHistory<RoutineGamifier.ShopItem>({ storageKey: STORAGE_KEYS.PURCHASE_HISTORY })
  const shop = useShop({ storageKey: STORAGE_KEYS.CURRENT_SHOP_ITEMS })
  const taskList = useTaskList({ storageKey: STORAGE_KEYS.CURRENT_TASKS })

  const completeTask = (task: RoutineGamifier.Task) => {
    balance.topUp(task.reward)
    completedTasksHistory.add('COMPLETE', task.text, task)
    taskList.remove(task.id)
  }

  const purchaseItem = (item: RoutineGamifier.ShopItem) => {
    if (balance.hasFunds(item.price)) {
      balance.spend(item.price)
      purchaseHistory.add('PURCHASE', item.name, item)
      shop.remove(item.id)
    }
  }

  return (
    <div className="font-mono min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 flex flex-col items-center">
      <Header coins={balance.balance} />
      <main className="w-full max-w-4xl">
        <TaskList taskList={taskList} completeTask={completeTask} />
        <Shop coins={balance.balance} shopItems={shop.items} purchaseItem={purchaseItem} />
        <PurchaseHistory history={purchaseHistory} />
        <TaskHistory history={completedTasksHistory} />
      </main>
    </div>
  );
};

export default Dashboard;