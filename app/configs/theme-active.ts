/**
 * Active Theme Configuration
 * 
 * Change the import below to switch the entire site's color palette.
 * 
 * Available Themes:
 * - v1-peach.ts - Warm peach/coral with muted browns (CURRENT)
 * 
 * To create a new theme:
 * 1. Copy v1-peach.ts to a new file (e.g., v2-blue.ts)
 * 2. Update all color values
 * 3. Change the import below
 * 4. The entire site updates instantly!
 */

import { theme } from './theme/v1-peach';

export const activeTheme = theme;
export type ActiveTheme = typeof activeTheme;

