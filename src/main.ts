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
        return html`
            <div id="tile-wrapper">
            ${this.cards.map((card) => html`
                <div class="tile" style="${styleMap(this.cardStyles(card))}">
                    ${card}
                </div>
            `)}
            </div>`;
    }

    private cardStyles(item) {
        const config = item._config;

        let width = 1;
        let height = 1;
        let pos = [0,0]

        if (config.view_layout) {
            width = config.view_layout.width || 1;
            height = config.view_layout.height || 1;
            pos = config.view_layout.position || [0,0];
        }

        const tileSize = this._config.view_layout.tile_size;
        const tileMargin = this._config.view_layout.tile_margin;
        const styles = {
            width: tileSize * width + tileMargin * (width - 1) + 'px',
            height: tileSize * height + tileMargin * (height - 1) + 'px',
            left: pos[0] * tileSize + (tileMargin * pos[0]) + 'px',
            top: pos[1] * tileSize + (tileMargin * pos[1]) + 'px',
        };
        return styles;
    }

    static get styles(): CSSResult {
        return css`
            div#tile-wrapper {
                margin: 16px;
                position: relative;
            }
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
