import { useEffect, useRef } from 'react'

function CustomCursor({
  dotColor = '#ffffff',
  ringColor = 'rgba(255, 255, 255, 0.6)',
  ringColorHover = '#ffffff',
  ringSize = 26,
  ringSizeHover = 16,
  dotSize = 0,
  follow = 0.3,
  hideOnTouch = true,
  hoverBlendMode = 'difference',
  expandedElements = [
    'a',
    'button',
    'input',
    'textarea',
    'select',
    '[data-cursor]',
  ],
}) {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const cursorRef = useRef(null)

  const selector = Array.isArray(expandedElements)
    ? expandedElements.join(',')
    : expandedElements

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const cursor = cursorRef.current

    if (!dot || !ring || !cursor) return

    const isFinePointer =
      window.matchMedia &&
      window.matchMedia('(pointer: fine)').matches

    if (hideOnTouch && !isFinePointer) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return undefined
    }

    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }

    let raf

    function onPointerMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY

      dot.style.left = `${mouse.x}px`
      dot.style.top = `${mouse.y}px`

      if (!raf) {
        raf = requestAnimationFrame(animate)
      }
    }

    function onPointerOver(e) {
      const projectImage = e.target.closest?.('[data-project-cursor]')

      /*
       * Project image:
       * Hide the normal cursor elements.
       * Work.jsx will display its own project cursor.
       */
      if (projectImage) {
        cursor.style.opacity = '0'
        return
      }

      cursor.style.opacity = '1'

      if (e.target.closest?.(selector)) {
        ring.style.width = `${ringSizeHover}px`
        ring.style.height = `${ringSizeHover}px`
        ring.style.borderColor = ringColorHover
        ring.style.background = ringColorHover

        cursor.style.mixBlendMode = hoverBlendMode || 'normal'
      } else {
        ring.style.width = `${ringSize}px`
        ring.style.height = `${ringSize}px`
        ring.style.borderColor = ringColor
        ring.style.background = 'transparent'

        cursor.style.mixBlendMode = 'normal'
      }
    }

    function animate() {
      ringPos.x += (mouse.x - ringPos.x) * follow
      ringPos.y += (mouse.y - ringPos.y) * follow

      ring.style.left = `${ringPos.x}px`
      ring.style.top = `${ringPos.y}px`

      raf = requestAnimationFrame(animate)
    }

    const moveTarget = window.PointerEvent ? window : document

    moveTarget.addEventListener(
      'pointermove',
      onPointerMove,
      { passive: true }
    )

    moveTarget.addEventListener(
      'pointerover',
      onPointerOver,
      { passive: true }
    )

    return () => {
      moveTarget.removeEventListener('pointermove', onPointerMove)
      moveTarget.removeEventListener('pointerover', onPointerOver)

      cursor.style.opacity = '1'
      cursor.style.mixBlendMode = 'normal'

      cancelAnimationFrame(raf)
    }
  }, [
    ringColor,
    ringColorHover,
    ringSize,
    ringSizeHover,
    dotSize,
    follow,
    hideOnTouch,
    hoverBlendMode,
    selector,
  ])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        cursor: 'none',
      }}
      aria-hidden="true"
    >
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          border: `1px solid ${ringColor}`,
          borderRadius: '50%',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
          transition:
            'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background 0.2s ease',
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          borderRadius: '50%',
          left: 0,
          top: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}

export default CustomCursor