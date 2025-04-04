const cards = document.querySelectorAll(".mushroom-guide .card");

const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");

const noMatches = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

cards.forEach((card, index) => {
  card.style.viewTransitionName = `mushroom-${index + 1}`;
});

seasonalFilter.addEventListener("change", (event) => {
  updateFilter(event);
});

edibleFilter.addEventListener("change", (event) => {
  updateFilter(event);
});

function updateFilter(e) {
  const filterType = e.target.name;

  currentFilters[filterType] = e.target.value;

  if (!document.startViewTransition) {
    filterCards();
  } else {
    document.startViewTransition(() => filterCards());
  }
}

function filterCards() {
  let hasVisibleCards = false;
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;

    const matchedEdible =
      currentFilters.edible === edible || currentFilters.edible === "all";
    const macthedSeason =
      currentFilters.season === season || currentFilters.season === "all";

    if (macthedSeason && matchedEdible) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }

    console.log(card);
  });

  if (hasVisibleCards) {
    noMatches.hidden = true;
  } else {
    noMatches.hidden = false;
  }
}

function enableFiltering() {
  seasonalFilter.hidden = false;
  edibleFilter.hidden = false;
}

enableFiltering();
