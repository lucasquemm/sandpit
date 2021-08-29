const EMPTY = 'EMPTY'
const NAME = EMPTY
const empty_ = { type: EMPTY, clock: 0 }
const empty = () => empty_
const make = empty

export { EMPTY, empty, make, NAME }
