import { rand } from './random'

const make = ({
  type,
  color: [hue, saturation, lightnessMax, lightnessMin],
  ...meta,
}) => ({
  type,
  clock: 0,
  color: `hsl(${hue}deg ${saturation}% ${rand(lightnessMax, lightnessMin)}%)`,
  ...meta
})

export { make }
