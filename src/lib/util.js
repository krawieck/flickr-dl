function pad (str, num = 2) {
  let out = String(str)
  while (out.length < num) {
    out = `0${out}`
  }
  return out
}

module.exports = {
  pad
}
