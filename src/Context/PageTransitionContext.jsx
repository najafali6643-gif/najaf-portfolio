import { createContext, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const isTransitioning = useRef(false);

  const transitionTo = (path) => {
  if (path === location.pathname) return;

  if (isTransitioning.current) return;

    isTransitioning.current = true;

    const panels = gsap.utils.toArray(
      ".page-transition-panel",
      containerRef.current
    );

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioning.current = false;
      },
    });

    // 1. Start with panels hidden
    tl.set(panels, {
      scaleY: 0,
      transformOrigin: "bottom",
    });

    // 2. Cover the current page
    tl.to(panels, {
      scaleY: 1,
      duration: 0.8,
      stagger: 0.035,
      ease: "power4.inOut",
    });

    // 3. Once the page is completely covered, change route
    tl.add(() => {
      navigate(path);
    });

    // 4. Small delay to allow the new page to render
    tl.to({}, {
      duration: 0.04,
    });

    // 5. Reveal the new page
    tl.to(panels, {
      scaleY: 0,
      transformOrigin: "top",
      duration: 0.8,
      stagger: 0.035,
      ease: "power4.inOut",
    });
  };

  return (
    <PageTransitionContext.Provider value={{ transitionTo }}>
      {children}

      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-[9999] flex"
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="page-transition-panel h-full flex-1 bg-white scale-y-0"
          />
        ))}
      </div>
    </PageTransitionContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePageTransition() {
  return useContext(PageTransitionContext);
}