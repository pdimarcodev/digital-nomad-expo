import { createMMKV } from "react-native-mmkv";

const ENCRYPTION_KEY = process.env.EXPO_PUBLIC_MMKV_KEY;

const storage = createMMKV({
  id: "supabase-storage",
  encryptionKey: ENCRYPTION_KEY,
});

export const SupabaseMMKVStorage = {
  getItem: async (key: string): Promise<string | null> => {
    try {
      const value = storage.getString(key);
      return value ?? null;
    } catch (error) {
      console.error("Error reading from MMKV:", error);
      return null;
    }
  },

  setItem: async (key: string, value: string): Promise<void> => {
    try {
      storage.set(key, value);
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
      throw error;
    }
  },
};
