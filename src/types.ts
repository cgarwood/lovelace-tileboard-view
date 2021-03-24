export interface CardConfig {
    type: string;
    view_layout?: {
      show?:
        | "always"
        | "never"
        | {
            mediaquery: string;
          };
      column?: number;
    };
  }

export interface ViewConfig {
    title?: string;
    type?: string;
    cards?: Array<CardConfig>;
    layout?: {};
    view_layout?: {
        tile_size: number;
        tile_margin: number;
    };
  }