import { rand } from './random'

const make = ({
  type,
  color: [hue, saturation, lightnessMax, lightnessMin],
  ...meta,
}) => ({
  type,
  color: `hsl(${hue}deg ${saturation}% ${rand(lightnessMax, lightnessMin)}%)`,
  ...meta
})

export { make }
