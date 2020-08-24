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
          maxWidth: "80%",
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
    addDescription(marker.properties) +
    `<tr><td>参考资料</td><td>${marker.properties.ref}</td></tr>` +
    "</table>"
  );
}

function addDescription(p) {
  let res = "";
  for (let i = 0; i < p.description.length; i++) {
    res += `<tr><td>${p.descriptionTag[i]}</td><td>${p.description[i]}</td></tr>`;
  }
  return res;
}

export { showMarkers };
