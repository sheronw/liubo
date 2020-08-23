import { findspot } from "../data/findspot";

const showMarkers = function (map, mapboxgl) {
  findspot.features.forEach(function (marker) {
    // create a DOM element for the marker
    var el = document.createElement("div");
    el.setAttribute("class", "marker");
    el.setAttribute("year", marker.properties.year);
    //el.style.backgroundImage = 'url("pic/' + marker.properties.name + '.png")';
    el.style.width = "25px";
    el.style.height = "25px";

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
    "<table>" +
    `<tr><td>年代</td><td>${marker.properties.time}</td></tr>` +
    `<tr><td>墓主</td><td>${marker.properties.owner}</td></tr>` +
    `<tr><td>材质</td><td>${marker.properties.material}</td></tr>` +
    `<tr><td>长宽高</td><td>${marker.properties.dimensions}</td></tr>` +
    "</table>" +
    `<p>${marker.properties.description}</p>`
  );
}

export { showMarkers };
