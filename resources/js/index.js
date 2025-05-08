  const magazines = [
  "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
]

const carousels = ["carousel1Items", "carousel2Items", "carousel3Items"];

    magazines.forEach((url, index) => {
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${url}`)
        .then((response) => response.json())
        .then((data) => {
          const items = data.items;
          const carousel = document.getElementById(carousels[index]);

          items.forEach((item, i) => {
            const div = document.createElement("div");
            div.className = `carousel-item ${i === 0 ? "active" : ""}`;
            div.innerHTML = `
              <div class="card" onclick="window.open('${item.link}', '_blank')">
                <img src="${item.enclosure?.link || 'https://via.placeholder.com/150'}" class="card-img-top" alt="News Image">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <p class="card-text">${item.description}</p>
                </div>
              </div>
            `;
            carousel.appendChild(div);
          });
        });
    });
//close the first accordian when another button is clicked
document.querySelectorAll("button[data-bs-toggle='collapse']").forEach(button=>{
  button.addEventListener("click",(event)=>{
    const targetId= button.getAttribute("data-bs-target");
    const targetAccordion = document.getElementById(targetId);
    const firstAccordion = document.getElementById("accordion1");
    if(firstAccordion && firstAccordion !==targetAccordion && firstAccordion.classList.contains("show")){
      const firstAccordion = bootstrap.Collapse.getInstance(firstAccordion) || new bootstrap.Collapse(firstAccordion, { toggle: false });
     firstAccordion.hide();
    }
  });
});