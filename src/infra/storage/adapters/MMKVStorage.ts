import { createMMKV } from "react-native-mmkv";
import type { IStorage } from "../IStorage";

const ENCRYPTION_KEY = process.env.EXPO_PUBLIC_MMKV_KEY;

const storage = createMMKV({
  id: "user-storage",
  encryptionKey: ENCRYPTION_KEY,
});

export const MMKVStorage: IStorage = {
  getItem: async <T = any>(key: string): Promise<T | null> => {
    try {
      const item = storage.getString(key);
      if (item !== undefined) {
        return JSON.parse(item) as T;
      }
      return null;
    } catch (error) {
      console.error("Error reading from MMKV:", error);
      return null;
    }
  },

  setItem: async (key: string, value: any): Promise<void> => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to MMKV:", error);
      throw error;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      storage.remove(key);
    } catch (error) {
      console.error("Error removing from MMKV:", error);
    }
  },
};
