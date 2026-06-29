// CSS custom properties and filter utilities for dynamic effects

export const cssVariables = {
  // Glow effects
  glowColor: "--glow-color",
  glowIntensity: "--glow-intensity",
  glowRadius: "--glow-radius",

  // Gradient effects
  gradientAngle: "--gradient-angle",
  gradientColor1: "--gradient-color-1",
  gradientColor2: "--gradient-color-2",

  // Filter effects
  filterBlur: "--filter-blur",
  filterBrightness: "--filter-brightness",
  filterContrast: "--filter-contrast",
  filterHueRotate: "--filter-hue-rotate",
  filterSaturation: "--filter-saturation",

  // Animation values
  duration: "--duration",
  delay: "--delay",
  ease: "--ease",

  // Particle effects
  particleSize: "--particle-size",
  particleOpacity: "--particle-opacity",
  particleSpeed: "--particle-speed",
};

export const createGlowStyle = (
  color: string = "#08cb00",
  intensity: number = 0.5,
  radius: number = 20
) => ({
  "--glow-color": color,
  "--glow-intensity": intensity,
  "--glow-radius": `${radius}px`,
  boxShadow: `0 0 ${radius * 2}px ${color}${Math.round(intensity * 255)
    .toString(16)
    .padStart(2, "0")}`,
} as React.CSSProperties);

export const createFilterStyle = (filters: {
  blur?: number;
  brightness?: number;
  contrast?: number;
  hueRotate?: number;
  saturate?: number;
}) => {
  const filterArray: string[] = [];

  if (filters.blur) filterArray.push(`blur(${filters.blur}px)`);
  if (filters.brightness) filterArray.push(`brightness(${filters.brightness}%)`);
  if (filters.contrast) filterArray.push(`contrast(${filters.contrast}%)`);
  if (filters.hueRotate) filterArray.push(`hue-rotate(${filters.hueRotate}deg)`);
  if (filters.saturate) filterArray.push(`saturate(${filters.saturate}%)`);

  return {
    filter: filterArray.join(" "),
  } as React.CSSProperties;
};

export const createGradientStyle = (
  angle: number = 45,
  color1: string = "#08cb00",
  color2: string = "#000000"
) => ({
  "--gradient-angle": `${angle}deg`,
  "--gradient-color-1": color1,
  "--gradient-color-2": color2,
  background: `linear-gradient(var(--gradient-angle), var(--gradient-color-1), var(--gradient-color-2))`,
} as React.CSSProperties);

export const createAnimationStyle = (
  duration: number = 1,
  delay: number = 0,
  ease: string = "cubic-bezier(0.16, 1, 0.3, 1)"
) => ({
  "--duration": `${duration}s`,
  "--delay": `${delay}s`,
  "--ease": ease,
  transition: `all var(--duration) var(--ease) var(--delay)`,
} as React.CSSProperties);

// Lens flare effect
export const createLensFlareStyle = () => ({
  position: "relative",
  overflow: "hidden",
} as React.CSSProperties);

// Animated text gradient
export const createAnimatedTextGradient = (
  colors: string[] = ["#08cb00", "#00ff88", "#08cb00"]
) => ({
  background: `linear-gradient(90deg, ${colors.join(", ")})`,
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  animation: "gradient 3s linear infinite",
} as React.CSSProperties);
