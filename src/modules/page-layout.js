import { css } from "../utils.js"

export function generatePageLayout() {
  return css`
    /* Sources:
    * https://layout-breakouts-builder.vercel.app/
    * https://www.youtube.com/watch?v=c13gpBrnGEw
    */

    /* BASELINE: available since 7/2024 */
    /* The calc actually works even without this property declaration. */
    /* @property --popout-multiplier { */
    /*   syntax: "<number>"; */
    /*   inherits: false; */
    /*   initial-value: 4; */
    /* } */

    :is(.p-page-layout, .p-full-bg) {
      --minimum-content-padding: var(--grid-gutter);
      --popout-multiplier: 4;

      /** TRACK WIDTHS **/
      /* 1fr takes as much space as available. Specific values may be used for
       * narrower page layout. */
      --full-max-width: 1fr;
      /* --grid-max-width comes from Utopia grid and is calculated in a way to make
       * something like 12 columns grid possible and aligned with other values in
       * this system. */
      --content-max-width: var(--grid-max-width);
      --popout-max-width: calc(
        var(--grid-max-width) + var(--popout-multiplier) * var(--grid-gutter)
      );
      --inset-max-width: calc(
        var(--grid-max-width) - var(--popout-multiplier) * var(--grid-gutter)
      );

      /** TRACK SIZES **/
      /* Track sizes represent a fraction, that is subtracted from the available space. */

      /* Makes sure the content always have a minimum padding. */
      --full: minmax(var(--minimum-content-padding), var(--full-max-width));
      /* Since the fraction is subtracted twice from the available space the formula
       * uses 0.5 times. */
      --popout: minmax(
        0,
        calc((var(--popout-max-width) - var(--content-max-width)) * 0.5)
      );
      /* The grid-gutter is subtracted as well from the available space in order to
       * align with a definition of a grid in Utopia design. The container is padded
       * with grid-gutter on each side.
       * Source: https://utopia.fyi/grid/
       */
      --content: minmax(
        0,
        calc(
          (var(--content-max-width) - var(--inset-max-width)) *
            0.5 - var(--grid-gutter)
        )
      );
      /* A track that is representing the middle area. This track does not count
       * twice so the formula is different than the others. It makes sure the
       * content has a maximum width. */
      --inset: min(
        var(--inset-max-width),
        100% - var(--minimum-content-padding) * 2
      );

      display: grid;
      grid-template-columns:
        [full-start] var(--full)
        [popout-start] var(--popout)
        [content-start] var(--content)
        [inset-start] var(--inset) [inset-end]
        var(--content) [content-end]
        var(--popout) [popout-end]
        var(--full) [full-end];

      /* Prevents a situation where there is not enough content to fill the vertical
       * space and rows try to stretch. */
      grid-auto-rows: max-content;
    }

    /* If not specified with other classes otherwise, the elements inside the layout
     * will span the middle content area. */
    :is(.p-page-layout, .p-full-bg) > * {
      grid-column: content;
    }

    /** CLASSES **/

    .p-inset {
      grid-column: inset;
    }
    .p-inset-start {
      grid-column-start: inset-start;
    }
    .p-inset-end {
      grid-column-end: inset-end;
    }
    .p-inset-padded {
      grid-column: inset;
      padding-inline: calc(2 * var(--minimum-content-padding));
    }

    .p-content {
      grid-column: content;
    }
    .p-content-start {
      grid-column-start: content-start;
    }
    .p-content-end {
      grid-column-end: content-end;
    }
    .p-content-padded {
      grid-column: content;
      padding-inline: calc(2 * var(--minimum-content-padding));
    }

    @media (--sm-n-below) {
      .p-content-padded {
        grid-column: full;
        border-radius: 0;
        padding-inline: var(--minimum-content-padding);
      }
    }

    .p-popout {
      grid-column: popout;
    }
    .p-popout-start {
      grid-column-start: popout-start;
    }
    .p-popout-end {
      grid-column-end: popout-end;
    }
    .p-popout-padded {
      grid-column: popout;
      padding-inline: calc(2 * var(--minimum-content-padding));
    }

    .p-full {
      grid-column: full;
      border-radius: 0;
    }
    .p-full-start {
      grid-column-start: full-start;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    .p-full-end {
      grid-column-end: full-end;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    /* Applies the page layout onto itself.
     *
     * Background spans the full width, while the content remains in the middle
     * content track. */
    .p-full-bg {
      grid-column: full;
    }

    /* Spans the full width, content is padded a little on both sides. */
    .p-full-padded {
      grid-column: full;
      padding-inline: var(--minimum-content-padding);
    }

    /**
      * Wraps layout of whole page and pushes a footer to the bottom.
      * 
      * Example:
      * 
      * <div class="p-layout-wrapper">
      *   <header>...</header>
      *   <main>...</main>
      *   <footer>...</footer>
      * </div>
     */
    .p-layout-wrapper {
      display: grid;
      grid-template-rows: auto 1fr auto;
      grid-template-columns: 100%;
      /* BASELINE: Dynamic vieport units available since 12/2022. */
      min-height: 100svh;
    }
  `
}
