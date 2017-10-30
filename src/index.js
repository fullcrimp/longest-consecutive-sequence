module.exports = function longestConsecutiveLength(array) {
  let leftBoundValues = {}, // number -> sequenceId dict
    rightBoundValues = {}, // number -> sequenceId dict
    sequenceLengthList = { // sequenceId -> length dict
      top: 0,
      count: 0,
      update: function (id, value) {
        this[id] = (typeof this[id] === 'undefined') ? value : this[id] + value
        this.top = (this.top < this[id]) ? this[id] : this.top
      },
      getId: function() {
        return ++this.count
      }
    }

  for (let i = 0; i < array.length; i++) {
    let value = array[i]
      leftSequenceId = rightBoundValues[value - 1],
      rightSequenceId = leftBoundValues[value + 1]

    // the value is in-between two sequences
    if (leftSequenceId && rightSequenceId) {
      // remove swallowed bounds
      delete leftBoundValues[value + 1]
      delete rightBoundValues[value - 1]
      rightBoundValues[value + sequenceLengthList[rightSequenceId]] = leftSequenceId // extend right bound of the left sequence to the right bound of the right sequence

      sequenceLengthList.update(leftSequenceId, sequenceLengthList[rightSequenceId] + 1)
      continue
    }

    // the value is positioned right before a sequence
    if (rightSequenceId) {
      // shift left bound value
      delete leftBoundValues[value + 1]
      leftBoundValues[value] = rightSequenceId

      sequenceLengthList.update(rightSequenceId, 1)
      continue
    }

    // the value is positioned right after a sequence
    if (leftSequenceId) {
      // shift right bound value
      delete rightBoundValues[value - 1]
      rightBoundValues[value] = leftSequenceId

      sequenceLengthList.update(leftSequenceId, 1)
      continue
    }

    // add a new sequence
    let id = sequenceLengthList.getId()
    leftBoundValues[value] = id
    rightBoundValues[value] = id
    sequenceLengthList.update(id, 1)
  }
  return (sequenceLengthList.top > 1) ? sequenceLengthList.top : 0
}
