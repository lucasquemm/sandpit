import { EMPTY, empty } from './empty'
import * as plant from './plant'
import * as water from './water'
import * as element from '../element'
import { chance, pickRand } from '../random'

const BASE_COLOR = [277, 59, 50, 20]

const NAME = 'BUG'

const movementRate = 0.02

const make = () => {
  const [species, color] = pickRand([
    ['climber', BASE_COLOR],
    ['jumper', [277, 62, 66, 60]],
    ['flyer', [277, 33, 36, 30]],
  ])

  return element.make({
    type: NAME,
    species,
    flammable: true,
    jumpDirection: 0,
    climbing: false,
    direction: pickRand([1, -1]),
    color: color,
    hexColor: 0x9134cb,
  })
}

const update = (sandpit, cell) => {
  switch (cell.species) {
    case 'climber':
      updateClimber(sandpit, cell)
      break
    case 'jumper':
      updateJumper(sandpit, cell)
      break
    case 'flyer':
      updateFlyer(sandpit, cell)
      break
  }

  for (let [nx, ny] of sandpit.neighbors1) {
    if (chance(0.005) && sandpit.is(nx, ny, plant.NAME)) {
      sandpit.set(nx, ny, empty())
      break
    }
  }

  if (chance(0.02) && sandpit.is(0, -1, water.NAME)) {
    if (chance(0.05)) {
      sandpit.set(0, 0, empty())
    } else {
      sandpit.swap(0, -1)
    }
  }
}

const updateClimber = (sandpit, cell) => {
  if (cell.climbing) {
    if (chance(movementRate) && sandpit.is(0, cell.direction, EMPTY)) {
      if (sandpit.is(cell.direction, cell.direction, EMPTY)) {
        cell.climbing = false
        sandpit.move(cell.direction, cell.direction)
      } else {
        sandpit.move(0, cell.direction)
      }
    } else {
      cell.direction *= -1
    }
  } else {
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

    if (chance(movementRate)) {
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

const updateJumper = (sandpit, cell) => {
  if (cell.jumping) {
    if (sandpit.is(cell.jumpDirection, -1, EMPTY)) {
      sandpit.move(cell.jumpDirection, -1)
    } else {
      cell.jumping = false
      cell.jumpDirection = pickRand([1, -1])
    }

    if (chance(0.1)) {
      cell.jumping = false
    }
  } else {
    const below = sandpit.get(cell.jumpDirection, 1)
    const direction = pickRand([1, -1])

    switch (below.type) {
      case EMPTY:
        sandpit.move(cell.jumpDirection, 1)
        break
      case NAME:
        if (sandpit.is(direction, 1, EMPTY)) {
          sandpit.move(direction, 1)
        }
        break
      default:
        cell.jumpDirection = 0

        if (chance(0.05)) {
          cell.jumping = true
          cell.jumpDirection = pickRand([1, 0, -1])
        }
        break
    }

    if (chance(movementRate)) {
      if (sandpit.is(cell.direction, 0, EMPTY)) {
        sandpit.move(cell.direction, 0)
      } else {
        cell.direction *= -1
      }
    }
  }
}

const updateFlyer = (sandpit, cell) => {
  if (!cell.flyingDirection || chance(0.05)) {
    const x = pickRand([1, 0, -1])
    const y = pickRand(x === 0 ? [1, -1] : [1, 0, -1])

    cell.flyingDirection = [x, y]
    return
  }

  const [fx, fy] = cell.flyingDirection

  if (sandpit.is(fx, fy, EMPTY)) {
    sandpit.move(fx, fy)
  } else if (chance(0.005)) {
    cell.flyingDirection[pickRand([0, 1])] *= -1
  }
}

export { NAME, make, update, BASE_COLOR }
