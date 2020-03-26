// add language dependence
// English: "name-en"
map.getStyle().layers.forEach(thisLayer => {
  console.log(thisLayer);
  if (thisLayer.id.indexOf("-label") > 0) {
    map.setLayoutProperty(thisLayer.id, "text-field", ["get", "name_zh-Hans"]);
  }
});
