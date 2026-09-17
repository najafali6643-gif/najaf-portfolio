import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";

export default function PageTransition() {
  const location = useLocation();
  const containerRef = useRef(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".page-transition-panel");

      const tl = gsap.timeline();

      // Start hidden
      tl.set(panels, {
        transformOrigin: "bottom",
        scaleY: 0,
      });

      // Cover the new page
      tl.to(panels, {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.035,
        ease: "power4.inOut",
      });

      // Brief hold
      tl.to(panels, {
        duration: 0.1,
      });

      // Reveal the new page
      tl.to(panels, {
        transformOrigin: "top",
        scaleY: 0,
        duration: 0.4,
        stagger: 0.035,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] flex"
      aria-hidden="true"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="page-transition-panel h-full flex-1 bg-white"
        />
      ))}
    </div>
  );
}