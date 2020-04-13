import { findspot } from "../data/findspot";

const showMarkers = function (map, mapboxgl) {
  findspot.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement("div");
    el.setAttribute("class", "marker");
    el.setAttribute("year", marker.properties.year);
    el.style.backgroundImage = 'url("pic/' + marker.properties.name + '.png")';
    el.style.width = "50px";
    el.style.height = "50px";

    /*
    el.addEventListener("click", function() {
      window.alert(marker.properties.message);
    });
    */

    // add marker & popup to map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({
          offset: 50,
          maxWidth: "400px",
          className: "fade-in",
        }) // add popups
          .setHTML(popupContent(marker))
      )
      .addTo(map);
  });
};

// return html of the marker's popup content
function popupContent(marker) {
  return (
    `<h2>${marker.properties.name}</h2>` +
    `<h3>年代 - ${marker.properties.time}</h3>` +
    (marker.properties.owner != ""
      ? `<h3>墓主 - ${marker.properties.owner}</h3>`
      : "") +
    (marker.properties.material != ""
      ? `<h3>材质 - ${marker.properties.material}</h3>`
      : "") +
    (marker.properties.dimensions != ""
      ? `<h3>长宽高 - ${marker.properties.dimensions}</h3>`
      : "") +
    `<p>${marker.properties.description}</p>`
  );
}

export { showMarkers };
