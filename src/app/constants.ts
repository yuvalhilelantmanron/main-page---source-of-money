import { InjectionToken } from '@angular/core';

export const VALUE_SCALE = {
  מיליארד: 1000000000,
  מיליון: 1000000,
  אלפי: 1000
};

export const DEFAULT_LOCALE = 'he-IL';

export const CATEGORIES_THEMES = {
  'הכנסות ישירות': 'blue',
  'הכנסות עקיפות': 'tan',
  'ארות חוב': 'violet',
  'הכנסות אחרות': 'olive',
};

export const BUBBLES = new InjectionToken('bubbles');
