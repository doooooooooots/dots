export default function openFullscreen() {
  var elem = document && document.documentElement;
  if (elem && elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem && elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem && elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
