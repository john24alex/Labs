(function () {
  const viz = {
    render: (data, element) => {
      // Clear previous content
      element.innerHTML = "";

      // Extract first row of data
      const row = data.tables.DEFAULT[0];
      if (!row) {
        element.innerHTML = "<p>No Data Available</p>";
        return;
      }

      const portfolio = row[0];
      const amount = row[1];
      const percentage = row[2];

      // Create elements
      const title = document.createElement("h2");
      title.innerText = portfolio || "No Portfolio";
      title.style.margin = "10px 0 5px";

      const amountText = document.createElement("p");
      amountText.innerText = `$${Number(amount || 0).toLocaleString()}`;
      amountText.style.margin = "0 0 10px";

      const donutContainer = document.createElement("div");
      donutContainer.style.position = "relative";
      donutContainer.style.width = "120px";
      donutContainer.style.height = "120px";
      donutContainer.style.margin = "0 auto";

      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "120");
      svg.setAttribute("height", "120");
      svg.setAttribute("viewBox", "0 0 120 120");

      const backgroundCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      backgroundCircle.setAttribute("cx", "60");
      backgroundCircle.setAttribute("cy", "60");
      backgroundCircle.setAttribute("r", "50");
      backgroundCircle.setAttribute("fill", "none");
      backgroundCircle.setAttribute("stroke", "#eee");
      backgroundCircle.setAttribute("stroke-width", "15");

      const progressCircle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      progressCircle.setAttribute("cx", "60");
      progressCircle.setAttribute("cy", "60");
      progressCircle.setAttribute("r", "50");
      progressCircle.setAttribute("fill", "none");
      progressCircle.setAttribute("stroke", "#4caf50");
      progressCircle.setAttribute("stroke-width", "15");
      progressCircle.setAttribute("stroke-dasharray", `${2 * Math.PI * 50}`);
      progressCircle.setAttribute("stroke-dashoffset", `${2 * Math.PI * 50}`);
      progressCircle.setAttribute("transform", "rotate(-90 60 60)");
      progressCircle.style.transition = "stroke-dashoffset 1s ease";

      const percentageText = document.createElement("div");
      percentageText.innerText = `${percentage || 0}%`;
      percentageText.style.position = "absolute";
      percentageText.style.top = "50%";
      percentageText.style.left = "50%";
      percentageText.style.transform = "translate(-50%, -50%)";
      percentageText.style.fontSize = "18px";
      percentageText.style.fontWeight = "bold";

      // Calculate donut progress
      const circumference = 2 * Math.PI * 50;
      const offset = circumference * (1 - percentage / 100);
      progressCircle.style.strokeDashoffset = offset;

      // Assemble elements
      svg.appendChild(backgroundCircle);
      svg.appendChild(progressCircle);
      donutContainer.appendChild(svg);
      donutContainer.appendChild(percentageText);

      element.appendChild(title);
      element.appendChild(amountText);
      element.appendChild(donutContainer);
    },
  };

  // Register visualization
  looker.plugins.visualizations.add(viz);
})();
