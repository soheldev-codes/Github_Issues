

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const loadIssues = async () => {
    const res = await fetch(url)
    const data = await res.json()
    issuesCountShow(data.data)   
}

const issuesCountShow = (data) => {
    const issuesCount = document.getElementById("issuseCount")
    issuesCount.innerText = data.length;
}











// Call Function
loadIssues()