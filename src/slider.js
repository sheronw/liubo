import { dynasty } from "../data/dynasty";

const showSlider = function (map) {
  // create slider
  const slider = document.createElement("div");
  slider.setAttribute("id", "slider");
  // create feedback element
  const feedback = document.createElement("h4");
  feedback.setAttribute("id", "feedback");
  feedback.innerHTML = "鼠标拖动下方滑块以调整年代";
  slider.appendChild(feedback);
  // create timeline element
  const timeline = document.createElement("div");
  timeline.setAttribute("id", "timeline");
  timeline.innerHTML = drawDynasties();
  slider.appendChild(timeline);
  // create input element
  const input = document.createElement("input");
  input.setAttribute("id", "control");
  input.setAttribute("min", dynasty[0].starts);
  input.setAttribute("max", dynasty[dynasty.length - 1].ends);
  input.setAttribute("type", "range");
  input.value = dynasty[0].starts;
  const updateMarker = function (e) {
    const curYear = e.target.value;
    const curDynasty = dynasty.filter(
      (d) => d.starts <= curYear && d.ends >= curYear
    )[0].name;
    feedback.innerHTML = `${curDynasty} - ${
      curYear >= 0 ? "公元" : "公元前"
    }${Math.abs(curYear)}年`;
    const markers = document.querySelectorAll(".marker");
    markers.forEach((marker) => {
      if (parseInt(marker.getAttribute("year")) <= curYear) {
        marker.style.display = "block";
      } else marker.style.display = "none";
    });
  };
  input.addEventListener("input", updateMarker);
  input.addEventListener("change", updateMarker);
  slider.appendChild(input);
  // append to document
  document.body.appendChild(slider);
};

function drawDynasties() {
  const years = dynasty[dynasty.length - 1].ends - dynasty[0].starts;
  let html = "";
  for (let d of dynasty) {
    if (dynasty.indexOf(d) == dynasty.length - 1) {
      html += `<span class="timeline-element" style="background:${d.color};flex:1">${d.name}</span>`;
    } else {
      const percentage = (d.ends - d.starts) / years;
      html += `<span class="timeline-element" style="background:${
        d.color
      };width:${percentage * 100}%">${d.name}</span>`;
    }
  }
  return html;
}

export { showSlider };
