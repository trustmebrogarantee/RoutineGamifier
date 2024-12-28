export namespace RoutineGamifier {
  /* Common */
  export type Id = string
  export type HistoryItem<T> = { date: string, operation: string, id: Id, name: string, entity: T }
  export type History<T> = {
    add: (operation: string, name: string, entity: T) => void,
    items: HistoryItem<T>[]
  }
  export type Coins = number

  /* Account */
  export interface IBalance {
    balance: Coins,
    topUp: (amount: Coins) => void,
    spend: (amount: Coins) => void,
    hasFunds: (amount: Coins) => boolean
  }

  /* Shop */
  export type ShopItem = { id: Id, name: string, image: string, price: Coins }
  export interface IShop {
    items: ShopItem[],
    remove: (id: Id) => void,
  }
  
  /* TaskList */
  export type Task = { text: string, reward: number, id: Id }
  export interface ITaskList {
    items: Task[],
    remove: (id: Id) => void,
  }
}