import { writable } from 'svelte/store';
import type { Theme } from '../models/settings';

const THEME_STORAGE_KEY = 'tic-tac-toe-theme';

/**
 * 테마 스토어
 */
function createThemeStore() {
  const load_theme = (): Theme => {
    if (typeof localStorage === 'undefined') {
      return 'dark';
    }

    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved as Theme) || 'dark';
  };

  const { subscribe, set } = writable<Theme>(load_theme());

  return {
    subscribe,

    set: (theme: Theme) => {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      }
      set(theme);
    },

    toggle: () => {
      const current = load_theme();
      const new_theme = current === 'light' ? 'dark' : 'light';
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, new_theme);
      }
      set(new_theme);
    }
  };
}

export const theme_store = createThemeStore();

