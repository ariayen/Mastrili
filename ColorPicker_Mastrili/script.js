function changeTextColor(color) {
  document.getElementById('text-color').style.color = color;
}

document.querySelectorAll('.color-option').forEach(item => {
  item.addEventListener('click', event => {
    const color = event.target.style.backgroundColor;
    document.body.style.backgroundColor = color;
    document.getElementById('output-text').style.color = invertColor(color);
  });
});

function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  return '#' + (65536 * r + 256 * g + b).toString(16).padStart(6, '0');
}