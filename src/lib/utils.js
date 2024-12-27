export function keyEnter(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    e.target.blur();
  }
}
