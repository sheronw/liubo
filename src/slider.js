import { dynasty } from "../data/dynasty";

const showSlider = function(map) {
  // create slider
  const slider = document.createElement("div");
  slider.setAttribute("id", "slider");
  // create feedback element
  const feedback = document.createElement("h4");
  feedback.setAttribute("id", "feedback");
  feedback.innerHTML = "南北朝 - BC2023";
  slider.appendChild(feedback);
  // create timeline element
  const timeline = document.createElement("div");
  timeline.setAttribute("id", "timeline");
  timeline.innerHTML = drawDynasties();
  slider.appendChild(timeline);
  // create input element
  const input = document.createElement("input");
  input.setAttribute("id", "control");
  input.setAttribute("type", "range");
  input.value = 0;
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
