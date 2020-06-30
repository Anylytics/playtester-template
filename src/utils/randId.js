// Returns a reasonably unique, DOM safe ID
// DOM ID's cannot begin with a number, so
// all id's are prefixed with `id_`
export default function getRandId() {
  return `id_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}
