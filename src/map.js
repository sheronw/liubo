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
          .setDOMContent(popupContent(marker))
      )
      .addTo(map);
  });
};

// return html of the marker's popup content
function popupContent(marker) {
  const popupContent = document.createElement("div");
  // set up title
  const title = document.createElement("h2");
  title.innerHTML = `${marker.properties.name}`;
  popupContent.appendChild(title);
  // set up row wrapper
  const rowWrapper = document.createElement("div");
  rowWrapper.setAttribute("class", "rowWrapper");
  popupContent.appendChild(rowWrapper);
  // set up table
  const table = document.createElement("table");
  table.innerHTML =
    `<tr><td>年代</td><td>${marker.properties.time}</td></tr>` +
    `<tr><td>墓主</td><td>${marker.properties.owner}</td></tr>` +
    `<tr><td>材质</td><td>${marker.properties.material}</td></tr>` +
    `<tr><td>长宽高</td><td>${marker.properties.dimensions}</td></tr>` +
    addDescription(marker.properties) +
    `<tr><td>参考资料</td><td>${marker.properties.ref}</td></tr>`;
  rowWrapper.appendChild(table);
  // set up gallery
  const gallery = addGallery(marker.properties);
  rowWrapper.appendChild(gallery);
  return popupContent;
  /*
  return (
    `<h2>${marker.properties.name}</h2>` +
    '<div class="container">' +
    "<table>" +
    
    "</table>" +
    '<div class="gallery">' +
    addPic(marker.properties) +
    "</div>" +
    "</div>"
  );
  */
}

function addDescription(p) {
  let res = "";
  for (let i = 0; i < p.description.length; i++) {
    res += `<tr><td>${p.descriptionTag[i]}</td><td>${p.description[i]}</td></tr>`;
  }
  return res;
}

function addGallery(property) {
  const gallery = document.createElement("div");
  gallery.setAttribute("class", "gallery");
  // set up img in gallery
  if (property.pic.length) {
    // function for event handle
    function galleryHandler(direction, img) {
      return () => {
        const cur = img.getAttribute("src").slice(4);
        const index =
          direction == "prev"
            ? (property.pic.length + property.pic.indexOf(cur) - 1) %
              property.pic.length
            : (property.pic.indexOf(cur) + 1) % property.pic.length;
        const newPic = property.pic[index];
        img.setAttribute("src", `pic/${newPic}`);
      };
    }

    // img
    const img = document.createElement("img");
    img.setAttribute("src", `pic/${property.pic[0]}`);
    img.setAttribute("alt", `${property.name}`);
    img.setAttribute("class", "pic");

    // left button
    const buttonL = document.createElement("p");
    buttonL.innerHTML = "⇦";
    buttonL.addEventListener("click", galleryHandler("prev", img));

    // right button
    const buttonR = document.createElement("p");
    buttonR.innerHTML = "⇨";
    buttonR.addEventListener("click", galleryHandler("next", img));

    // assemble & return
    gallery.appendChild(buttonL);
    gallery.appendChild(img);
    gallery.appendChild(buttonR);
  }
  return gallery;
}

export { showMarkers };
