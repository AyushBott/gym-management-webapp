# FitClass Motion Style Guide

## Motion Philosophy
**Subtle, slow, consistent.** Every animation should feel deliberate and premium — like the smooth operation of a luxury facility.

---

## Core Principles

### 1. Duration Scale
| Type | Duration | Usage |
|------|----------|-------|
| **Micro** | 150ms | Cursor, focus states |
| **Fast** | 250ms | Hover effects, tooltips |
| **Base** | 400ms | Card interactions, buttons |
| **Section** | 600ms | Section reveals on scroll |
| **Hero** | 800-1200ms | Hero entrance, cinematic elements |

### 2. Easing Curves
| Curve | CSS | Usage |
|-------|-----|-------|
| **Enter** | `cubic-bezier(0.22, 1, 0.36, 1)` | Elements appearing, scroll reveals |
| **Exit** | `cubic-bezier(0.4, 0, 1, 1)` | Elements disappearing |
| **Interactive** | `cubic-bezier(0.4, 0, 0.2, 1)` | Hovers, button presses |
| **Smooth** | `cubic-bezier(0.25, 0.1, 0.25, 1)` | General transitions |

---

## Animation Patterns

### Pattern 1: Fade Slide In
- **Translate**: 20-30px upward
- **Opacity**: 0 → 1
- **Duration**: 600ms
- **Use**: Section content, cards appearing

### Pattern 2: Hover Lift
- **Translate Y**: -4px
- **Shadow**: Increase depth
- **Border**: Subtle color shift
- **Duration**: 250ms
- **Use**: Cards, buttons

### Pattern 3: Scale Reveal
- **Scale**: 0.98 → 1
- **Opacity**: 0 → 1
- **Duration**: 500ms
- **Use**: Images, testimonial cards

### Pattern 4: Stats Count-Up
- **Number animation**: 0 → target
- **Duration**: 1200ms
- **Easing**: easeOutCubic
- **Trigger**: Viewport intersection

---

## Component Specifications

### Hero Cinematic Arrival
```
Background:
  - Initial: scale(1.1), opacity 0.7
  - Final: scale(1), opacity 1
  - Duration: 1200ms
  - Easing: cubic-bezier(0.22, 1, 0.36, 1)

Content stagger:
  - Eyebrow: delay 0ms
  - Headline: delay 100ms
  - Subtitle: delay 200ms
  - CTA: delay 300ms
  - Each: 600ms duration, fade + slide 30px
```

### Navbar Scroll Transition
```
Trigger: scroll > 50px
Transition:
  - Background: transparent → rgba(255,255,255,0.95)
  - Backdrop-filter: none → blur(10px)
  - Duration: 300ms
```

### Card Hover
```
Transform: translateY(-4px)
Box-shadow: 0 8px 24px rgba(0,0,0,0.08) → 0 16px 40px rgba(0,0,0,0.12)
Border-color: gray-100 → secondary
Duration: 250ms
```

### Section Scroll Reveal
```
Initial: opacity 0, translateY(30px)
Final: opacity 1, translateY(0)
Duration: 600ms
Stagger: 100ms between items
Trigger: 15% viewport intersection
```

---

## Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Performance
- Use `transform` and `opacity` only (GPU accelerated)
- Avoid animating `width`, `height`, `margin`, `padding`
- Use `will-change` sparingly on hero elements

---

## CSS Custom Properties

```css
:root {
  /* Durations */
  --motion-micro: 150ms;
  --motion-fast: 250ms;
  --motion-base: 400ms;
  --motion-section: 600ms;
  --motion-hero: 800ms;

  /* Easings */
  --ease-enter: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-interactive: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## Don'ts

❌ Parallax with aggressive depth  
❌ Rotational animations  
❌ Bouncy/spring physics  
❌ Auto-playing carousels  
❌ Animations longer than 1.2s (except hero)  
❌ Motion that distracts from content
