const canvas = document.getElementById("stGraph");
const ctx = canvas.getContext("2d");

async function loadCSVAndDrawGraph() {
  const response = await fetch("telemetrys.csv");
  const csvText = await response.text();

  const lines = csvText.trim().split("\n");
  const dataLines = lines.slice(1);

  const time = [];
  const speed = [];

  for (let i = 0; i < dataLines.length; i++) {
    const values = dataLines[i].split(",");

    time.push(Number(values[0]));
    speed.push(Number(values[1]));
  }

  drawGraph(time, speed);
}

function drawGraph(time, speed) {
  const padding = 50;
  const maxSpeed = Math.max(...speed);
  const maxTime = Math.max(...time);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, canvas.height - padding);
  ctx.lineTo(canvas.width - padding, canvas.height - padding);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.beginPath();
  for (let i = 0; i < time.length; i++) {
    let x = padding + (time[i] / maxTime) * (canvas.width - 2 * padding);
    let y = canvas.height - padding - (speed[i] / maxSpeed) * (canvas.height - 2 * padding);

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();
}

loadCSVAndDrawGraph();
