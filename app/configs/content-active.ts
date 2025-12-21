/**
 * Active Content Configuration
 * 
 * Change the import below to switch the entire site's marketing copy.
 * 
 * Available Content Versions:
 * - v1-original.ts - Original "Comfort & Freedom" angle (CURRENT)
 * 
 * To create a new content version:
 * 1. Copy v1-original.ts to a new file (e.g., v2-urgency.ts)
 * 2. Update all marketing copy
 * 3. Change the import below
 * 4. The entire site updates instantly!
 */

import { content } from './content/v1-original';

export const activeContent = content;
export type ActiveContent = typeof activeContent;

