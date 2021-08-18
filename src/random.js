const rand = (max, min = 0) => Math.random() * (max - min) + min
const randInt = (...args) => Math.round(rand(...args))
const pickRand = (values) => values[randInt(values.length - 1, 0)]
const chance = (threshold) => Math.random() < threshold

export { rand, randInt, pickRand, chance }
