let inputField = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-repos .get-button"),
  displayData = document.querySelector(".show-data");

getButton.addEventListener("click", getData);

function getData() {
  if (inputField.value === "") {
    checkEmpty();
  } else {
    let userName = inputField.value.trim(),
      repoUrl = `https://api.github.com/users/${userName}/repos`;

    fetch(repoUrl)
      .then((response) => response.json())
      .then((repos) => {
        if (repos.length > 0) {
          deleteDefaultMsg();
          repos.forEach((repo) => {
            extractData(repo);
          });
        } else {
          checkEmpty();
        }
      });
  }
}

function checkEmpty() {
  let msgAlertContainer = document.createElement("span");
  let msgAlert = document.createTextNode("Please Write Github Username.");
  msgAlertContainer.className = "no-data";
  msgAlertContainer.appendChild(msgAlert);

  deleteDefaultMsg();
  displayData.appendChild(msgAlertContainer);
}

function deleteDefaultMsg() {
  let noDataMsg = displayData.querySelector(".no-data");
  noDataMsg.remove();
}

function extractData(repo) {
  let mainDataBox = document.createElement("span");
  mainDataBox.className = "main-data-box";

  let repoNameContainer = document.createElement("span");
  let repoName = document.createTextNode(`Repo Name: ${repo.name}`);
  repoNameContainer.appendChild(repoName);

  let repoStarsCpntainer = document.createElement("span");
  let repoStars = document.createTextNode(`Stars: ${repo.stargazers_count}`);
  repoStarsCpntainer.appendChild(repoStars);

  let repoForkContainer = document.createElement("span");
  let repoFork = document.createTextNode(`Fork: ${repo.forks_count}`);
  repoForkContainer.appendChild(repoFork);

  let repoUrlContainer = document.createElement("a");
  let repoUrl = `https://api.github.com/users/${inputField.value}/${repo.name}`;
  repoUrlContainer.href = repoUrl;
  repoUrlContainer.className = "repo-link";
  let repoUrlText = document.createTextNode(`URL: ${repoUrl}`);

  repoUrlContainer.appendChild(repoUrlText);

  mainDataBox.appendChild(repoNameContainer);
  mainDataBox.appendChild(repoStarsCpntainer);
  mainDataBox.appendChild(repoForkContainer);
  mainDataBox.appendChild(repoUrlContainer);

  displayData.appendChild(mainDataBox);

  console.log(repoName);
}
