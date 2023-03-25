const EMPTY = 'EMPTY'
const empty_ = {
  type: EMPTY,
  clock: 0,
  valueOf() {
    return EMPTY
  },
}
const empty = () => empty_
const make = empty

export { EMPTY, empty, make }
