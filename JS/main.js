let input = document.querySelector(".get-repos input"),
  button = document.querySelector(".get-repos .get-button"),
  reposData = document.querySelector(".show-data")

button.onclick = function () {
  getRepos(input.value)
}

input.onkeyup = function (e) {
  if (e.key == "Enter") {
    getRepos(input.value)
  }
}

async function getRepos(inputValue) {
  if (input.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    try {
      let responseData = await fetch(`https://api.github.com/users/${inputValue}/repos`),
        data = await responseData.json(),
        dataLength = data.length;
      reposData.innerHTML = ""
      for (let i = 0; i < dataLength; i++) {
        // main div
        let maindiv = document.createElement("div");
        maindiv.innerHTML = `${i + 1}- ${data[i].name}`;
        // div contain all url
        let divUrl = document.createElement("div");
        // first link
        let urlfiles = document.createElement("a");
        urlfiles.appendChild(document.createTextNode("Visit Files"));
        urlfiles.href = `https://github.com/${inputValue}/${data[i].name}`;
        urlfiles.target = "_blank"
        // second link
        let urlpage = document.createElement("a");
        urlpage.appendChild(document.createTextNode("Visit Page"));
        urlpage.href = `https://htmlpreview.github.io/?https://github.com/${inputValue}/${data[i].name}/main/index.html`;
        urlpage.target = "_blank"
        // append link to div url
        divUrl.append(urlfiles)
        divUrl.append(urlpage)
        // append div url to main div
        maindiv.append(divUrl)
        // append main div to repos data div
        reposData.append(maindiv)
      }
    } catch (reason) {
      console.log(reason)
    }
  }
} 