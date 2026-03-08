/**
 * Smooth scroll to an element with a noticeable, eased animation.
 * Duration ~1s so the scroll is clearly visible.
 */
export function scrollToSection(elementId: string, duration = 1000) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + start;
  const distance = target - start;
  const startTime = performance.now();

  function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
