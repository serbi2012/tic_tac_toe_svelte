import { writable } from 'svelte/store';
import type { GameSettings } from '../models/settings';
import { createDefaultSettings } from '../models/settings';

const STORAGE_KEY = 'tic-tac-toe-settings';

/**
 * 설정 스토어
 */
function createSettingsStore() {
  // 로컬 스토리지에서 불러오기
  const loadSettings = (): GameSettings => {
    if (typeof localStorage === 'undefined') {
      return createDefaultSettings();
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return createDefaultSettings();
      }
    }
    return createDefaultSettings();
  };

  const { subscribe, set, update } = writable<GameSettings>(loadSettings());

  // 설정 변경 시 로컬 스토리지에 저장
  const saveSettings = (settings: GameSettings) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  };

  return {
    subscribe,

    // 개별 설정 업데이트
    updateSetting: <K extends keyof GameSettings>(
      key: K,
      value: GameSettings[K]
    ) => {
      update((settings) => {
        const new_settings = { ...settings, [key]: value };
        saveSettings(new_settings);
        return new_settings;
      });
    },

    // 전체 설정 업데이트
    setSettings: (settings: GameSettings) => {
      saveSettings(settings);
      set(settings);
    },

    // 기본값으로 리셋
    reset: () => {
      const default_settings = createDefaultSettings();
      saveSettings(default_settings);
      set(default_settings);
    }
  };
}

export const settings_store = createSettingsStore();

