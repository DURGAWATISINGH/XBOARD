  const magazines = [
  "https://flipboard.com/@thenewsdesk/the-latest-on-coronavirus-covid-19-t82no8kmz.rss",
  "https://flipboard.com/@dfletcher/india-tech-b2meqpd6z.rss",
  "https://flipboard.com/@thehindu/sportstarlive-rj3ttinvz.rss"
]
const topics = [
  {
    name: "Politics",
    url: "https://flipboard.com/topic/politics.rss",
    carouselId: "carousel1"
  },
  {
    name: "Space",
    url: "https://flipboard.com/topic/space.rss",
    carouselId: "carousel2"
  },
  {
    name: "Sports",
    url: "https://flipboard.com/topic/indiansports.rss",
    carouselId: "carousel3"
  }
];

// Fetch RSS → JSON
async function fetchNews(topic) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${topic.url}`;
  const res = await fetch(api);
  const data = await res.json();
  createCarousel(topic.carouselId, data.items);
}

// Create carousel
function createCarousel(id, items) {
  const carousel = document.getElementById(id);

  let content = `
    <div class="carousel-inner">
  `;

  items.forEach((item, index) => {
    content += `
      <div class="carousel-item ${index === 0 ? "active" : ""}">
        <div class="card" onclick="openLink('${item.link}')">
        <img src="${item.enclosure?.link || item.thumbnail || 'https://via.placeholder.com/300'}" class="d-block w-100">
          <div class="card-body">
            <h5>${item.title}</h5>
            <!-- Author + Date -->
        <p class="text-muted">
          <strong>${item.author || "Unknown"}</strong> .
          ${new Date(item.pubDate).toDateString()}
        </p>

        <!-- Description -->
        <p class="card-text">${item.description}</p>
          </div>
        </div>
      </div>
    `;
  });


  content += `
    </div>

    <button class="carousel-control-prev" data-bs-target="#${id}" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>

    <button class="carousel-control-next" data-bs-target="#${id}" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  `;

  carousel.innerHTML = content;
}

// Open article
function openLink(link) {
  window.open(link, "_blank");
}

// Load all topics
topics.forEach(fetchNews);

