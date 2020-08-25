import mapboxgl from "mapbox-gl";
import { showMarkers } from "./map";
import { showSlider } from "./slider";
import { config } from "../config";

const mapElement = document.createElement("div");
mapElement.setAttribute("id", "map");
document.body.appendChild(mapElement);

// map initialization
mapboxgl.accessToken = config.accessToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/sheronw/ck884ry221ba41ipaxyhmlemo",
  center: { lon: 100, lat: 25 },
  zoom: 4,
  maxBounds: [
    [75, 20], // [west, south]
    [130, 45], // [east, north]
  ],
});
// add navigation bar
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, "top-right");

map.on("load", function () {
  showInformation(map);
  showMarkers(map, mapboxgl);
  showSlider(map);
});

function showInformation(map) {
  // create info
  const info = document.createElement("div");
  info.setAttribute("id", "info");
  // create title
  const title = document.createElement("h1");
  title.setAttribute("id", "title");
  title.innerHTML = "六博出土位置考";
  info.appendChild(title);
  // create author
  const author = document.createElement("p");
  //usage.setAttribute("id", "usage");
  author.innerHTML = "Copyright © 2020 Sheron W & Jessie Y. Built with Mapbox.";
  info.appendChild(author);
  document.body.appendChild(info);
}
