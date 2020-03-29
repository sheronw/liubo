import { findspot } from "../data/findspot";

const showMarkers = function(map, mapboxgl) {
  findspot.features.forEach(function(marker) {
    // create a DOM element for the marker
    var el = document.createElement("div");
    el.setAttribute("class", "fade-in fade-out");
    el.className = "marker";
    el.style.backgroundImage =
      "url(https://placekitten.com/g/" +
      marker.properties.iconSize.join("/") +
      "/)";
    el.style.width = marker.properties.iconSize[0] + "px";
    el.style.height = marker.properties.iconSize[1] + "px";

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
          className: "fade-in"
        }) // add popups
          .setHTML(popupContent(marker))
      )
      .addTo(map);
  });
};

// return html of the marker's popup content
function popupContent(marker) {
  return `<h2>${marker.properties.name}</h2><h3>年代 - ${marker.properties.time}</h3><p>${marker.properties.description}</p>`;
}

export { showMarkers };
