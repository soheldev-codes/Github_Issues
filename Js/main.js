

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const loadIssues = async () => {
    const res = await fetch(url)
    const data = await res.json()
    // Issues Count
    issuesCountShow(data.data)   

    // Display Data Pass
    diplayIsuues(data.data)
}

const issuesCountShow = (data) => {
    const issuesCount = document.getElementById("issuseCount")
    issuesCount.innerText = data.length;
}


const diplayIsuues = (issues) => {


    const issuesContainer = document.getElementById("issuesContainer")
    issuesContainer.innerHTML = "";

  issues.forEach(issue => {
      
    const { title, priority, description, labels, author, id, createdAt,status } = issue;
    const date = createdAt.split("T")[0];
        console.log(issue);

        const div = document.createElement("div")
        div.classList = "max-w-sm rounded-xl border border-green-500 border-t-6 bg-white shadow-md p-5 space-y-4"
        
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
            <!-- Title -->
            <h2 class="text-lg font-semibold text-gray-800">
              ${title}
            </h2>
            <!-- Description -->
            <p class="text-sm text-gray-500">
              ${description}
            </p>

            <!-- Tags -->
            <div class="flex gap-2">
               ${
    labels[0]
      ? `<span class="text-xs font-medium px-3 py-1 rounded-full bg-red-100 text-red-500">🐞 ${labels[0]}</span>`
      : ""
  }

  ${
    labels[1]
      ? `<span class="text-xs font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">⚡ ${labels[1]}</span>`
      : ""
  }
            </div>

            <!-- Footer -->
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