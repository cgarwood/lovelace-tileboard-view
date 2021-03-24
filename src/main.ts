import {
    css,
    CSSResult,
    html,
    internalProperty,
    LitElement,
    property,
    TemplateResult,
} from "lit-element";
import { styleMap } from 'lit-html/directives/style-map';
import type {
    HomeAssistant,
    LovelaceCard, LovelaceViewConfig
} from "custom-card-helpers";
import { ViewConfig } from "./types";

class TileboardView extends LitElement {
    @property({ attribute: false }) public hass: HomeAssistant;
    @property({ attribute: false }) public lovelace?: any;
    @property({ attribute: false }) public cards: Array<
        LovelaceCard
    > = [];
    @internalProperty() private _config?: ViewConfig;

    public setConfig(config: ViewConfig): void {
        this._config = { ...config };
    }

    protected render(): TemplateResult {
        if (!this.cards) {
            return html``;
        }
        return html`${this.cards.map((card) => html`
            <div class="tile" style="${styleMap(this.cardStyles(card))}">
                ${card}
            </div>
        `)}`;
    }

    private cardStyles(item) {
        console.log(item._config.view_layout);
        const width = item._config.view_layout.width || 1;
        const height = item._config.view_layout.height || 1;
        const pos = item._config.view_layout.position || [0,0];
        const tileSize = this._config.view_layout.tile_size;
        const tileMargin = this._config.view_layout.tile_margin;
        console.log(width, height, pos, tileSize, tileMargin, this._config.view_layout);
        const styles = {
            width: tileSize * width + tileMargin * (width - 1) + 'px',
            height: tileSize * height + tileMargin * (height - 1) + 'px',
            left: pos[0] * tileSize + (tileMargin * pos[0]) + 'px',
            top: pos[1] * tileSize + (tileMargin * pos[1]) + 'px',
        };
        console.log(styles);
        return styles;
    }

    static get styles(): CSSResult {
        return css`
            div.tile {
                position: absolute;
            }
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
      "tileboard-view": TileboardView;
    }
  }

customElements.define("tileboard-view", TileboardView);
