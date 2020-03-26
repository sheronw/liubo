import mapboxgl from "mapbox-gl";
import { showMarkers } from "./map";
import { config } from "../config";

const mapElement = document.createElement("div");
mapElement.setAttribute("id", "map");
document.body.appendChild(mapElement);

// map initialization
mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/sheronw/ck884ry221ba41ipaxyhmlemo",
  center: { lon: 96.97117, lat: 34.95575 },
  zoom: 4,
  maxBounds: [
    [60, 20], // [west, south]
    [140, 60] // [east, north]
  ]
});
// add navigation bar
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "bottom-right");

map.on("load", function() {
  //showInformation(map);
  showMarkers(map, mapboxgl);
  //showSlider(map);
});
