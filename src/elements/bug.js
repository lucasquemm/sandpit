import { EMPTY, empty } from './empty'
import * as plant from './plant'
import * as element from '../element'
import { chance, pickRand } from '../random'

const BASE_COLOR = [277, 59, 50, 20]

const NAME = 'BUG'

const make = () =>
  element.make({
    type: NAME,
    species: pickRand(['climber', 'jumper', 'flyer']),
    climbing: false,
    direction: pickRand([1, -1]),
    color: BASE_COLOR,
  })

const update = (sandpit, cell) => {
  switch (cell.species) {
    case 'climber':
      updateClimber(sandpit, cell)
      break
    case 'jumper':
    case 'flyer':
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    if (chance(0.005) && sandpit.is(nx, ny, plant.NAME)) {
      sandpit.set(nx, ny, empty())
      break
    }
  }
}

const updateClimber = (sandpit, cell) => {
  if (cell.climbing) {
    if (chance(0.2)) {
      if (sandpit.is(0, cell.direction, EMPTY)) {
        if (sandpit.is(cell.direction, cell.direction, EMPTY)) {
          cell.climbing = false
          sandpit.move(cell.direction, cell.direction)
        } else {
          sandpit.move(0, cell.direction)
        }
      } else {
        cell.direction *= -1
      }
    }
  } else {
    updateFall(sandpit, cell)

    if (chance(0.2)) {
      if (sandpit.is(cell.direction, 0, EMPTY)) {
        sandpit.move(cell.direction, 0)
      } else if (chance(0.5) && sandpit.is(0, cell.direction, EMPTY)) {
        cell.climbing = !cell.climbing
        cell.direction = pickRand([1, -1])
      } else {
        cell.direction *= -1
      }
    }
  }
}

const updateJumper = (sandpit, cell) => {}

const updateFlyer = (sandpit, cell) => {}

const updateFall = (sandpit, cell) => {
  const below = sandpit.get(0, 1)
  const direction = pickRand([1, -1])

  switch (below.type) {
    case EMPTY:
      sandpit.move(0, 1)
      break
    case NAME:
      if (sandpit.is(direction, 1, EMPTY)) {
        sandpit.move(direction, 1)
      }
      break
  }
}

export { NAME, make, update, BASE_COLOR }
