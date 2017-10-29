module.exports = function longestConsecutiveLength(array) {
  let longest = 0,
    sequenceCount = 0,
    starts = {},
    ends = {},
    lengths = {}

  for (let i = 0; i < array.length; i++) {
    let value = array[i]
    let prevId = ends[value - 1],
        nextId = starts[value + 1]

    // a piece is in-between two sequences
    if (prevId && nextId) {

      delete starts[value + 1]

      lengths[prevId] += lengths[nextId] + 1
      longest = (longest < lengths[prevId]) ? lengths[prevId] : longest
      continue
    }

    // the piece is positioned right before a sequence
    if (nextId) {

      // swop starts
      delete starts[value + 1]
      starts[value] = nextId

      lengths[nextId] += 1
      longest = (longest < lengths[nextId]) ? lengths[nextId] : longest
      continue
    }

    // the piece is positioned right after a sequence
    if (prevId) {

      // swop ends
      delete ends[value - 1]
      ends[value] = prevId

      lengths[prevId] += 1
      longest = (longest < lengths[prevId]) ? lengths[prevId] : longest
      continue
    }

    // add a new sequence
    id = ++sequenceCount
    starts[value] = id
    ends[value] = id
    lengths[id] = 1
  }
  return longest
}
