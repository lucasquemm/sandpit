const rand = (max, min = 0) => Math.random() * (max - min) + min

const make = ({
  type,
  color: [hue, saturation, lightnessMax, lightnessMin],
}) => ({
  type,
  color: `hsl(${hue}deg ${saturation}% ${rand(lightnessMax, lightnessMin)}%)`,
})

export { make }
