

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const loader = document.getElementById("loader");

let allIssues = [];

const loadIssues = async () => {

  loader.style.display = "flex";
  
    const res = await fetch(url)
  const data = await res.json()
  
  loader.style.display = "none"; 
    
     allIssues = data.data; 

  issuesCountShow(allIssues);
  diplayIsuues(allIssues);
}


const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    
    tabBtns.forEach(b => b.classList.remove("btn-primary"));
   
    this.classList.add("btn-primary");
    const status = this.dataset.status;

    if (status === "all") {
      diplayIsuues(allIssues);
      issuesCountShow(allIssues);
    } else {
      const filtered = allIssues.filter(issue => issue.status === status);

      diplayIsuues(filtered);
      issuesCountShow(filtered);
    }
  });
});

// Search Enter Btn
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    searchBtn.click();
  }
});

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", async () => {
  const searchText = document.getElementById("searchInput").value;
//  No search Input value
  if (searchText === "") {
    diplayIsuues(allIssues);
    issuesCountShow(allIssues);
    return;
  }

  loader.style.display = "flex";
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`
  );
  const data = await res.json();
  loader.style.display = "none";

  diplayIsuues(data.data);
  issuesCountShow(data.data);

});


const openModal = (issue) => {

  const date = issue.createdAt.split("T")[0];

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalDate").innerText = date;
  document.getElementById("modalDescription").innerText = issue.description;
  document.getElementById("modalAssignee").innerText = issue.author;
  document.getElementById("modalPriority").innerText = issue.priority;

  // labels 
  const labelsContainer = document.getElementById("modalLabels");
  labelsContainer.innerHTML = "";
  issue.labels.forEach(label => {
    const span = document.createElement("span");
    span.className =
      "px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600 font-medium";

    span.innerText = label;
    labelsContainer.appendChild(span);
  });

  document.getElementById("issueModal").showModal();
};

// Issues Count
const issuesCountShow = (data) => {
    const issuesCount = document.getElementById("issuseCount")
    issuesCount.innerText = data.length;
}

// Display all issues
const diplayIsuues = (issues) => {

    const issuesContainer = document.getElementById("issuesContainer")
  issuesContainer.innerHTML = "";

  issues.forEach(issue => {
      
    const { title, priority, description, labels, author, id, createdAt,status } = issue;
    const date = createdAt.split("T")[0];

    const div = document.createElement("div")
    
    // Modal Open
      div.addEventListener("click", () => {
      openModal(issue);
      });

        div.classList = `hover:shadow-lg cursor-pointer transition max-w-sm rounded-xl border ${status === "open"
  ? "border-t-4 border-green-500"
  : "border-t-4 border-purple-500"} bg-white shadow-md p-5 space-y-4`
        
        div.innerHTML = `
        <div class="flex items-center justify-between">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600"
              >
              ${status=== "open" ? `<i class="fa-solid fa-arrows-spin"></i>` :  `<i class="fa-regular fa-circle-check"></i>` }
              </div>
              <span
                class="text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-500"
              >
                ${priority}
              </span>
            </div>
            <h2 class="text-lg font-semibold text-gray-800">
              ${title}
            </h2>
            <p class="text-sm text-gray-500">
              ${description}
            </p>

            <div class="flex gap-2">
               ${
    labels[0]
      ? `<span class="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-500">${labels[0]}</span>`
      : ""
  }

  ${
    labels[1]
      ? `<span class="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">${labels[1]}</span>`
      : ""
  }
            </div>
            <div class="border-t pt-3 text-xs text-gray-400 space-y-1">
              <p>#${id} by ${author}</p>
              <p>${date}</p>
            </div>
          </div>
        `

         issuesContainer.appendChild(div)
    });

}








// Call Function
loadIssues()