export interface SlotMutationController {
      destroy: () => void;
}

export const createSlotMutationController = (
      el: HTMLElement,
      slotNames: string | string[],
      mutationCallback: () => void
): SlotMutationController => {
      let hostMutationObserver: MutationObserver | undefined;
      let slottedContentMutationObserver: MutationObserver | undefined;

      const slots = Array.isArray(slotNames)
            ? slotNames
            : [slotNames];

      /**
       * Observe changes to the component host.
       */
      if (typeof MutationObserver !== 'undefined') {
            hostMutationObserver = new MutationObserver(entries => {
                  entries.forEach(entry => {

                        // Added nodes
                        entry.addedNodes.forEach(node => {
                              if (
                                    node.nodeType === Node.ELEMENT_NODE &&
                                    slots.includes((node as HTMLElement).slot)
                              ) {
                                    mutationCallback();

                                    watchForSlotChange(node as HTMLElement);
                              }
                        });

                        // Removed nodes
                        if (entry.removedNodes.length > 0) {
                              mutationCallback();
                        }
                  });
            });

            hostMutationObserver.observe(el, {
                  childList: true,
                  subtree: true,
            });
      }

      /**
       * Observe changes inside slotted content.
       */
      const watchForSlotChange = (
            slottedEl: HTMLElement
      ) => {
            if (slottedContentMutationObserver) {
                  slottedContentMutationObserver.disconnect();
            }

            slottedContentMutationObserver =
                  new MutationObserver(() => {
                        mutationCallback();
                  });

            slottedContentMutationObserver.observe(
                  slottedEl,
                  {
                        childList: true,
                        subtree: true,
                  }
            );
      };

      /**
       * Cleanup observers.
       */
      const destroy = () => {
            hostMutationObserver?.disconnect();
            hostMutationObserver = undefined;

            slottedContentMutationObserver?.disconnect();
            slottedContentMutationObserver = undefined;
      };

      return {
            destroy,
      };
};