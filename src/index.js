module.exports = function longestConsecutiveLength(array) {
  let topSequenceLength = 0,
    sequenceCount = 0,
    leftBoundValues = {}, // number -> sequenceId dict
    rightBoundValues = {}, // number -> sequenceId dict
    sequenceLengthList = { // sequenceId -> length dict
      top: 0,
      update: function (id, value) {
        this[id] += value
        this.top = (this.top < this[id]) ? this[id] : this.top
      }
    } 

  for (let i = 0; i < array.length; i++) {
    let value = array[i]
    let leftSequenceId = rightBoundValues[value - 1],
      rightSequenceId = leftBoundValues[value + 1]

      // a piece is in-between two sequences
      if (leftSequenceId && rightSequenceId) {
        delete leftBoundValues[value + 1] // remove swallowed bounds
        delete rightBoundValues[value - 1]
        rightBoundValues[value + sequenceLengthList[rightSequenceId]] = leftSequenceId // extend right bound of the left sequence to the right bound of the right sequence
        
        sequenceLengthList.update(leftSequenceId, sequenceLengthList[rightSequenceId] + 1)
        continue
      }

      // the piece is positioned right before a sequence
      if (rightSequenceId) {
        // swop leftBoundValues
        delete leftBoundValues[value + 1]
        leftBoundValues[value] = rightSequenceId

        sequenceLengthList.update(rightSequenceId, 1)        
        continue
      }

      // the piece is positioned right after a sequence
      if (leftSequenceId) {
        // swop rightBoundValues
        delete rightBoundValues[value - 1]
        rightBoundValues[value] = leftSequenceId

        sequenceLengthList.update(leftSequenceId, 1)                
        continue
      }

    // add a new sequence
    let id = ++sequenceCount
    leftBoundValues[value] = id
    rightBoundValues[value] = id
    sequenceLengthList[id] = 1
  }
  return sequenceLengthList.top
}
