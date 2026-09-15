export interface ExperimentPage {
  name: string;
  path: string;
}

export interface ExperimentLink {
  /** Card title — short, human, unique on /levels. */
  name: string;
  /** One sentence: what this experiment explores. */
  description: string;
  /** Parent lab ("Web Lab 2") or the proposed lab name for a new type. */
  lab: string;
  pages: [ExperimentPage, ...ExperimentPage[]];
}

/**
 * Experiments on `/levels`. Agents append here — do not add to `levelTypeLinks.ts`.
 * An empty array shows the Experiments empty state.
 */
export const EXPERIMENT_LINKS: ExperimentLink[] = [];
