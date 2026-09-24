import { useEffect, useMemo, useRef } from 'react'

function hexToRgba(hex, alpha) {
  const h = hex.replace('#', '').trim()

  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h

  const r = parseInt(full.slice(0, 2), 16)
  const g = parseInt(full.slice(2, 4), 16)
  const b = parseInt(full.slice(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function resolveColor(cssVar) {
  const temp = getComputedStyle(
    document.documentElement,
  ).getPropertyValue(
    cssVar.replace('var(', '').replace(')', '').trim(),
  )

  return (temp && temp.trim()) || '#3b82f6'
}

function ParticleBackground({
  color = 'var(--color-accent, #3b82f6)',
  glowColor = 'var(--color-accent, #3b82f6)',
  fixed = false,
  className = '',
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const resolvedGlow = useMemo(
    () => resolveColor(glowColor),
    [glowColor],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current

    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')

    let width = 0
    let height = 0
    let particles = []
    let raf

    /*
     * ==========================================
     * CURSOR STATE
     * ==========================================
     */

    const mouse = {
      x: 0,
      y: 0,

      targetX: 0,
      targetY: 0,

      previousX: 0,
      previousY: 0,

      velocityX: 0,
      velocityY: 0,

      speed: 0,

      active: false,
    }

    /*
     * ==========================================
     * CURSOR LIGHT SETTINGS
     * ==========================================
     */

    // Maximum size of the light bloom.
    const lightRadius = 190

    // Maximum length of the moving light trail.
    const maxTrailLength = 260

    // How smoothly the light follows the cursor.
    const cursorFollow = 0.08

    const particleCss = resolveColor(color)
    const glowCss = resolvedGlow

    let lastTime = performance.now()

    /*
     * ==========================================
     * RESIZE
     * ==========================================
     */

    function resize() {
      const rect = container.getBoundingClientRect()

      width = canvas.width = Math.floor(rect.width)
      height = canvas.height = Math.floor(rect.height)

      init()
    }

    /*
     * ==========================================
     * PARTICLE
     * ==========================================
     */

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height

        /*
         * Particle movement
         */
        this.vx = (Math.random() - 0.7) * 1
        this.vy = (Math.random() - 0.8) * 1

        /*
         * Normal particle size
         *
         * 0.4px → 1.2px
         */
        this.baseRadius =
          Math.random() * 0.8 + 0.4

        /*
         * Maximum individual glow size
         */
        this.maxRadius =
          this.baseRadius *
          (1.5 + Math.random() * 1.5)

        this.radius = this.baseRadius

        /*
         * Normal opacity
         */
        this.baseAlpha = 0.20

        /*
         * Maximum opacity
         */
        this.maxAlpha =
          0.1 + Math.random() * 0.15

        this.alpha = this.baseAlpha

        /*
         * Individual particle glow
         */
        this.glowing = false
        this.glowProgress = 0

        /*
         * Different glow speed
         */
        this.glowSpeed =
          Math.random() * 0.15 + 0.15

        /*
         * Random first glow
         */
        this.glowDelay =
          Math.random() * 2
      }

      /*
       * ========================================
       * INDIVIDUAL PARTICLE GLOW
       * ========================================
       */

      updateGlow(dt) {
        if (!this.glowing) {
          this.glowDelay -= dt

          if (this.glowDelay <= 0) {
            this.glowing = true
            this.glowProgress = 0
          }

          return
        }

        this.glowProgress +=
          this.glowSpeed * dt

        if (this.glowProgress >= 1) {
          this.glowProgress = 0
          this.glowing = false

          /*
           * Random wait before next glow
           */
          this.glowDelay =
            Math.random() * 8 + 2

          this.radius = this.baseRadius
          this.alpha = this.baseAlpha

          return
        }

        /*
         * Smooth:
         *
         * 0 → 1 → 0
         */
        const t = Math.sin(
          this.glowProgress * Math.PI,
        )

        /*
         * Grow
         */
        this.radius =
          this.baseRadius +
          (this.maxRadius - this.baseRadius) * t

        /*
         * Brighten
         */
        this.alpha =
          this.baseAlpha +
          (this.maxAlpha - this.baseAlpha) * t
      }

      /*
       * ========================================
       * UPDATE
       * ========================================
       */

      update(dt) {
        this.updateGlow(dt)

        /*
         * Particle movement
         */
        this.x += this.vx
        this.y += this.vy

        /*
         * Reset when particle leaves canvas
         */
        if (
          this.x < 0 ||
          this.x > width ||
          this.y < 0 ||
          this.y > height
        ) {
          this.reset()
        }
      }

      /*
       * ========================================
       * DRAW
       * ========================================
       */

      draw() {
        /*
         * Individual particle glow
         */
        const glowT = this.glowing
          ? Math.sin(
              this.glowProgress * Math.PI,
            )
          : 0

        /*
         * --------------------------------------
         * INDIVIDUAL PARTICLE HALO
         * --------------------------------------
         */

        if (glowT > 0) {
          const glowRadius =
            this.radius *
            (3 + glowT * 4)

          const gradient =
            ctx.createRadialGradient(
              this.x,
              this.y,
              0,
              this.x,
              this.y,
              glowRadius,
            )

          gradient.addColorStop(
            0,
            hexToRgba(
              glowCss,
              0.22 * glowT,
            ),
          )

          gradient.addColorStop(
            0.25,
            hexToRgba(
              glowCss,
              0.12 * glowT,
            ),
          )

          gradient.addColorStop(
            0.55,
            hexToRgba(
              glowCss,
              0.045 * glowT,
            ),
          )

          gradient.addColorStop(
            1,
            hexToRgba(
              glowCss,
              0,
            ),
          )

          ctx.beginPath()

          ctx.arc(
            this.x,
            this.y,
            glowRadius,
            0,
            Math.PI * 2,
          )

          ctx.fillStyle = gradient
          ctx.fill()
        }

        /*
         * --------------------------------------
         * PARTICLE CORE
         * --------------------------------------
         */

        ctx.beginPath()

        ctx.arc(
          this.x,
          this.y,
          this.radius,
          0,
          Math.PI * 2,
        )

        ctx.fillStyle = hexToRgba(
          particleCss,
          this.alpha,
        )

        ctx.fill()
      }
    }

    /*
     * ==========================================
     * PARTICLE INITIALIZATION
     * ==========================================
     */

    function init() {
      particles = []

      /*
       * Existing particle density
       */
      const particleCount = Math.floor(
        (width * height) / 12000,
      )

      for (
        let i = 0;
        i < particleCount;
        i++
      ) {
        particles.push(
          new Particle(),
        )
      }
    }

    /*
     * ==========================================
     * CURSOR LIGHT
     * ==========================================
     *
     * This creates the light shown in your
     * reference:
     *
     *        bright core
     *             ●
     *          ░░░░░
     *       ░░░░░░░░░
     *    ░░░░░░░░░░░░░
     *
     * The trail extends opposite the
     * cursor movement direction.
     */

    function drawCursorLight() {
      if (!mouse.active) return

      /*
       * --------------------------------------
       * Calculate cursor speed
       * --------------------------------------
       */

      const rawSpeed = Math.sqrt(
        mouse.velocityX *
          mouse.velocityX +
          mouse.velocityY *
            mouse.velocityY,
      )

      /*
       * Smooth speed
       */
      mouse.speed +=
        (rawSpeed - mouse.speed) * 0.15

      /*
       * Normalize speed.
       *
       * 0 = stopped
       * 1 = fast
       */
      const speed =
        Math.min(
          mouse.speed / 18,
          1,
        )

      /*
       * --------------------------------------
       * Direction
       * --------------------------------------
       */

      let directionX = 0
      let directionY = 0

      if (mouse.speed > 0.01) {
        directionX =
          mouse.velocityX /
          mouse.speed

        directionY =
          mouse.velocityY /
          mouse.speed
      }

      /*
       * --------------------------------------
       * Trail length
       * --------------------------------------
       *
       * The faster the cursor moves,
       * the longer the light becomes.
       */

      const trailLength =
        35 +
        maxTrailLength * speed

      /*
       * --------------------------------------
       * TRAILING BLOOM
       * --------------------------------------
       *
       * Draw several overlapping soft
       * elliptical lights behind the cursor.
       */

      ctx.save()

      /*
       * Draw from farthest point toward
       * cursor.
       */
      const trailSteps = 10

      for (
        let i = trailSteps;
        i >= 0;
        i--
      ) {
        const progress =
          i / trailSteps

        /*
         * Position behind cursor.
         */
        const trailX =
          mouse.x -
          directionX *
            trailLength *
            progress

        const trailY =
          mouse.y -
          directionY *
            trailLength *
            progress

        /*
         * Trail becomes smaller and
         * weaker toward the back.
         */
        const trailScale =
          1 -
          progress * 0.75

        const trailAlpha =
          (1 - progress) *
          (0.035 + speed * 0.055)

        /*
         * Long horizontal/vertical
         * elliptical gradient.
         */
        const trailWidth =
          lightRadius *
          (0.65 +
            speed * 0.9) *
          trailScale

        const trailHeight =
          lightRadius *
          0.48 *
          trailScale

        /*
         * Radial gradient.
         */
        const gradient =
          ctx.createRadialGradient(
            trailX,
            trailY,
            0,
            trailX,
            trailY,
            lightRadius *
              trailScale,
          )

        gradient.addColorStop(
          0,
          hexToRgba(
            glowCss,
            trailAlpha,
          ),
        )

        gradient.addColorStop(
          0.35,
          hexToRgba(
            glowCss,
            trailAlpha * 0.45,
          ),
        )

        gradient.addColorStop(
          0.7,
          hexToRgba(
            glowCss,
            trailAlpha * 0.12,
          ),
        )

        gradient.addColorStop(
          1,
          hexToRgba(
            glowCss,
            0,
          ),
        )

        /*
         * Stretch gradient in the direction
         * of cursor movement.
         */
        ctx.translate(
          trailX,
          trailY,
        )

        ctx.rotate(
          Math.atan2(
            directionY,
            directionX,
          ),
        )

        ctx.scale(
          trailWidth /
            lightRadius,
          trailHeight /
            lightRadius,
        )

        ctx.beginPath()

        ctx.arc(
          0,
          0,
          lightRadius,
          0,
          Math.PI * 2,
        )

        ctx.fillStyle = gradient
        ctx.fill()

        ctx.setTransform(
          1,
          0,
          0,
          1,
          0,
          0,
        )
      }

      ctx.restore()

      /*
       * --------------------------------------
       * MAIN SOFT BLOOM
       * --------------------------------------
       *
       * This is the large diffuse light
       * around the cursor itself.
       */

      const mainRadius =
        lightRadius *
        (0.75 + speed * 0.35)

      const mainGradient =
        ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mainRadius,
        )

      /*
       * Bright center
       */
      mainGradient.addColorStop(
        0,
        hexToRgba(
          glowCss,
          0.22,
        ),
      )

      /*
       * Soft blue/colored bloom
       */
      mainGradient.addColorStop(
        0.12,
        hexToRgba(
          glowCss,
          0.14,
        ),
      )

      mainGradient.addColorStop(
        0.3,
        hexToRgba(
          glowCss,
          0.07,
        ),
      )

      mainGradient.addColorStop(
        0.55,
        hexToRgba(
          glowCss,
          0.025,
        ),
      )

      mainGradient.addColorStop(
        0.8,
        hexToRgba(
          glowCss,
          0.006,
        ),
      )

      mainGradient.addColorStop(
        1,
        hexToRgba(
          glowCss,
          0,
        ),
      )

      ctx.beginPath()

      ctx.arc(
        mouse.x,
        mouse.y,
        mainRadius,
        0,
        Math.PI * 2,
      )

      ctx.fillStyle = mainGradient
      ctx.fill()

      /*
       * --------------------------------------
       * BRIGHT CORE
       * --------------------------------------
       *
       * Very soft white-ish center.
       *
       * Kept subtle so it doesn't look
       * like a cursor circle.
       */

      const coreRadius =
        28 + speed * 12

      const coreGradient =
        ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          coreRadius,
        )

      coreGradient.addColorStop(
        0,
        'rgba(255, 255, 255, 0.20)',
      )

      coreGradient.addColorStop(
        0.2,
        hexToRgba(
          glowCss,
          0.16,
        ),
      )

      coreGradient.addColorStop(
        0.55,
        hexToRgba(
          glowCss,
          0.055,
        ),
      )

      coreGradient.addColorStop(
        1,
        hexToRgba(
          glowCss,
          0,
        ),
      )

      ctx.beginPath()

      ctx.arc(
        mouse.x,
        mouse.y,
        coreRadius,
        0,
        Math.PI * 2,
      )

      ctx.fillStyle =
        coreGradient

      ctx.fill()
    }

    /*
     * ==========================================
     * MAIN ANIMATION
     * ==========================================
     */

    function animate(now) {
      if (document.hidden) return

      const dt = Math.min(
        (now - lastTime) / 1000,
        0.1,
      )

      lastTime = now

      /*
       * --------------------------------------
       * Smooth cursor following
       * --------------------------------------
       */

      const oldX = mouse.x
      const oldY = mouse.y

      mouse.x +=
        (mouse.targetX - mouse.x) *
        cursorFollow

      mouse.y +=
        (mouse.targetY - mouse.y) *
        cursorFollow

      /*
       * Calculate cursor velocity
       */
      mouse.velocityX =
        mouse.x - oldX

      mouse.velocityY =
        mouse.y - oldY

      /*
       * --------------------------------------
       * Clear canvas
       * --------------------------------------
       */

      ctx.clearRect(
        0,
        0,
        width,
        height,
      )

      /*
       * --------------------------------------
       * Cursor light
       *
       * Draw BEFORE particles so particles
       * remain visible over the light.
       * --------------------------------------
       */

      drawCursorLight()

      /*
       * --------------------------------------
       * Particles
       * --------------------------------------
       */

      particles.forEach(
        (particle) => {
          particle.update(dt)
          particle.draw()
        },
      )

      /*
       * Next frame
       */
      raf =
        requestAnimationFrame(
          animate,
        )
    }

    /*
     * ==========================================
     * MOUSE MOVE
     * ==========================================
     */

    function onMouseMove(event) {
      const rect =
        container.getBoundingClientRect()

      mouse.targetX =
        event.clientX - rect.left

      mouse.targetY =
        event.clientY - rect.top

      mouse.active = true
    }

    /*
     * ==========================================
     * MOUSE LEAVE
     * ==========================================
     */

    function onMouseLeave() {
      mouse.active = false
    }

    /*
     * ==========================================
     * EVENTS
     * ==========================================
     */

    window.addEventListener(
      'mousemove',
      onMouseMove,
    )

    window.addEventListener(
      'mouseleave',
      onMouseLeave,
    )

    window.addEventListener(
      'resize',
      resize,
    )

    function onVisibilityChange() {
      cancelAnimationFrame(raf)
      raf = null

      if (!document.hidden) {
        lastTime = performance.now()
        raf = requestAnimationFrame(animate)
      }
    }

    document.addEventListener(
      'visibilitychange',
      onVisibilityChange,
    )

    /*
     * ==========================================
     * INITIALIZE
     * ==========================================
     */

    resize()

    mouse.x =
      mouse.targetX =
        width / 2

    mouse.y =
      mouse.targetY =
        height / 2

    /*
     * Start
     */
    animate(performance.now())

    /*
     * ==========================================
     * CLEANUP
     * ==========================================
     */

    return () => {
      window.removeEventListener(
        'mousemove',
        onMouseMove,
      )

      window.removeEventListener(
        'mouseleave',
        onMouseLeave,
      )

      window.removeEventListener(
        'resize',
        resize,
      )

      document.removeEventListener(
        'visibilitychange',
        onVisibilityChange,
      )

      cancelAnimationFrame(raf)
    }
  }, [color, resolvedGlow])

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none ${
        fixed
          ? 'fixed'
          : 'absolute'
      } inset-0 z-0 ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="
          absolute
          inset-0
          h-full
          w-full
        "
      />
    </div>
  )
}

export default ParticleBackground
