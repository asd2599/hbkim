import { useEffect, useState } from 'react';

export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const ratios = {};

    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio;
          const top = Object.entries(ratios).sort(([, a], [, b]) => b - a)[0];
          if (top && top[1] > 0) setActive(top[0]);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}
