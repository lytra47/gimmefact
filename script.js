const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// SELECTING ELEMENTS
const formBtn = document.querySelector(".btn-open");
const factForm = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// rest htlm content -  to remove
factsList.innerHTML = "";

// LOAD FROM SUPABASE

loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://wdwbkshflemffdbevipb.supabase.co/rest/v1/facts",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkd2Jrc2hmbGVtZmZkYmV2aXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NjkyODQsImV4cCI6MjAyMTA0NTI4NH0.qsZH7NdUtxgluNMw7-UcKoXZwmAJyXnUMiUmoFUAFhg",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indkd2Jrc2hmbGVtZmZkYmV2aXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NjkyODQsImV4cCI6MjAyMTA0NTI4NH0.qsZH7NdUtxgluNMw7-UcKoXZwmAJyXnUMiUmoFUAFhg",
      },
    }
  );
  const data = await res.json();
  // const filteredData = data.filter((fact) => fact.category === "technology");
  // console.log(filteredData);
  createFactsList(data); //Display the lists
}

//
function createFactsList(dataArray) {
  // looping facts
  const htmlArr = dataArray.map(
    (fact) => `
  <li class="fact">
              <p>
                ${fact.text}
                <a
                  class="source"
                  href="${fact.source}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >[Source]</a
                >
              </p>
              <span class="tag" style="background-color: ${
                CATEGORIES.find((cat) => cat.name === fact.category).color
              }"
                >${fact.category}
              </span>
              <div class="vote-buttons">
                <button>👍${fact.votesInteresting}</button>
                <button>🤯${fact.votesMindblowing}</button>
                <button>❌${fact.votesFalse}</button>
              </div>
            </li>

  `
  );
  const html = htmlArr.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}

// Open close share fact form
formBtn.addEventListener("click", function () {
  if (factForm.classList.contains("hidden")) {
    factForm.classList.remove("hidden");
    formBtn.textContent = "Close";
  } else {
    formBtn.textContent = "Share a fact";
    factForm.classList.add("hidden");
  }
});
