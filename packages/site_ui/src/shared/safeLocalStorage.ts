export const safeLocalStorage = {
  set(key: string, value: unknown) {
    try {
      const serializedValue = JSON.stringify({ value });
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Failed to set localStorage item:', error);
    }
  },

  get(key: string, defaultValue: unknown = null) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue)?.value : defaultValue;
    } catch (error) {
      console.error('Failed to get localStorage item:', error);
      return defaultValue;
    }
  },

  remove(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove localStorage item:', error);
    }
  }
};