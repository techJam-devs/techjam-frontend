/**
 * @description Ignore ts warning for type aos
 */

declare module "aos" {
  interface AOSOptions {
    offset?: number; // offset (in px) from the original trigger point
    delay?: number; // values from 0 to 3000, with step 50ms
    duration?: number; // values from 0 to 3000, with step 50ms
    easing?: string; // easing animation, e.g., 'ease', 'ease-in-out'
    once?: boolean; // whether animation should happen only once
    mirror?: boolean; // whether elements should animate out while scrolling past them
    anchorPlacement?: string; // defines which position of the element regarding to window should trigger animation
  }

  interface AOS {
    init(options?: AOSOptions): void;
    refresh(): void;
    refreshHard(): void;
  }

  const AOS: AOS;
  export default AOS;
}
