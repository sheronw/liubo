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
  style: "mapbox://styles/mapbox/streets-v9",
  center: { lon: 96.97117, lat: 34.95575 },
  zoom: 4,
  interactive: false
});

map.on("load", function() {
  // do something after load
  showInformation();
  showMarkers();
  showSlider();
});

function showInformation() {
  // show necessary information
}

function showMarkers() {
  //
}

function showSlider() {
  //
}
