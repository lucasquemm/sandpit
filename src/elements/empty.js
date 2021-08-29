const EMPTY = 'EMPTY'
const NAME = EMPTY
const empty = () => ({ type: EMPTY, clock: 0 })
const make = empty

export { EMPTY, empty, make, NAME }
