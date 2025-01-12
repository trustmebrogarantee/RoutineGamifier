import * as dat from 'dat.gui';

// Экземпляр dat.GUI, который используется для конфигурации
export const guiInstance = new dat.GUI({ width: 300, closed: true })

/**
 * Декоратор для настройки отображения свойств в dat.GUI.
 * @param config Объект конфигурации, где ключи - свойства класса, а значения - функции настройки GUI.
 */
export function Configurable(config: {
  [key: string]: (property: any, datInstance: dat.GUI) => void;
}) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        // Применяем конфигурацию к свойствам
        for (const [propertyKey, setupFn] of Object.entries(config)) {
          if (this.hasOwnProperty(propertyKey)) {
            setupFn(this[propertyKey], guiInstance);
          } else {
            console.warn(
              `Property "${propertyKey}" not found in class "${constructor.name}".`
            );
          }
        }
      }
    };
  };
}