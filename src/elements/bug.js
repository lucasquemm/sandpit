import { EMPTY, empty } from './empty'
import * as element from '../element'
import { chance, pickRand } from '../random'
import { PLANT } from './plant'
import { WATER } from './water'
import { FIRE } from './fire'

const color = 0x9134cb

const BUG = 'BUG'

const movementRate = 0.02

const make = () => {
  const [species, speciesColor] = pickRand([
    ['climber', color],
    ['jumper', 0xb573de],
    ['flyer', 0x633e7a],
  ])

  return element.make({
    type: BUG,
    species,
    flammability: 0.7,
    jumpDirection: 0,
    climbing: false,
    direction: pickRand([1, -1]),
    color: speciesColor,
    alphaMode: 'solid',
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
    if (chance(0.005) && sandpit.is(nx, ny, PLANT)) {
      sandpit.set(nx, ny, empty())
      break
    }
  }

  if (chance(0.02) && sandpit.is(0, -1, WATER)) {
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
      case FIRE:
        sandpit.swap(0, 1)
        break
      case BUG:
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
      case FIRE:
        sandpit.swap(0, 1)
        break
      case BUG:
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

export { BUG, make, update, color }
