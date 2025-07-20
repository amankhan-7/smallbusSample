export const safeLocalStorage = {
  getItem: (key, defaultValue = null) => {
    if (typeof window !== "undefined") {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  },
  setItem: (key, value) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          key,
          typeof value === "string" ? value : JSON.stringify(value)
        );
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  },
  removeItem: (key) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing localStorage key "${key}":`, error);
      }
    }
  },
};
