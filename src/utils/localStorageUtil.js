export const useLocalStorageUtil = () => {
  const getItem = (key, type = 'Object') => {
    let defaultValue = null;
    switch (type) {
      case 'Object':
        defaultValue = {};
        break;
      case 'String':
        defaultValue = '';
        break;
      case 'Number':
        defaultValue = 0;
        break;
      case 'Array':
        defaultValue = [];
        break;
      case 'Boolean':
        defaultValue = false;
        break;
      default:
        defaultValue = null;
    }
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };
  
  const setItem = async (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
    }
  };

  const removeItem = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  const clear = () => {
    try {
      // localStorage.clear();
      if (typeof window === 'undefined') return;
      const keys = Object.keys(localStorage);
      for (const k of keys) {
        if (!k.startsWith("isRemember")) localStorage.removeItem(k);
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return { getItem, setItem, removeItem, clear };
};
