
// let title = document.querySelector(".title");
let description = document.getElementsByTagName("p");
// let navProfileImage = document.querySelector(".icon-drop-nav > ul > li:last-child > img");
// console.log(navProfileImage)

fetch("https://api.github.com/graphql", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer 6afcb1ef98adb3da30e5c9db538127afbdbe8f97`,
  },

  body: JSON.stringify({
    query: `{
        viewer{
            login
            repositories(orderBy: {field: PUSHED_AT, direction: DESC}, first: 20) {
            nodes {
                forkCount
                name
                url
                repositoryTopics(first: 20) {
                nodes {
                    topic {
                    name
                    }
                    url
                }
                }
                parent {
                forkCount
                nameWithOwner
                url
                }
                stargazerCount
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                nodes {
                    color
                    name
                }
                }
                licenseInfo {
                name
                }
                description
                pushedAt
                isPrivate
            }
            totalCount
            }
            bio
            avatarUrl
            email
            followers {
            totalCount
            }
            following {
            totalCount
            }
            name
            twitterUsername
            status {
            emojiHTML
            message
            }
            location
            starredRepositories {
            totalCount
            }
            login
        }
    }`,
  }),
})
.then((res) => res.json())
.then((data) => {
  document.querySelector(".icon-drop-nav > ul > li:last-child > img").src = `${data.data.viewer.avatarUrl}`

  // For all Sidebar data
  document.querySelector(".userimage").src = `${data.data.viewer.avatarUrl}`;
  document.querySelector(".bio").innerText = data.data.viewer.bio;
  document.querySelector(".name").innerText = data.data.viewer.name;
  document.querySelector(".username").innerText = data.data.viewer.login;
  document.querySelector(".follow-link-1 span").innerText =
    data.data.viewer.followers.totalCount;
  document.querySelector(".follow-link-2 span").innerText =
    data.data.viewer.following.totalCount;
  document.querySelector(".follow-link-3 span").innerText =
    data.data.viewer.starredRepositories.totalCount;
  document.querySelector(
    ".location-details > li:first-child > span"
  ).innerText = data.data.viewer.location;
  document.querySelector(".location-details > li:last-child > a").innerText =
    data.data.viewer.twitterUsername;

    // For all data in the main layout

  let repoArray = data.data.viewer.repositories.nodes;
  for(let i = 0; i < repoArray.length; i++){
    let repositories = document.querySelector(".repositories")

    let repoWrapper = document.createElement('div')
    repoWrapper.classList.add("repo-wrapper")
    repositories.appendChild(repoWrapper)

    let repo = document.createElement('div')
    repo.classList.add('repo')
    repoWrapper.appendChild(repo)
    let title = document.createElement('h3')
    title.classList.add('title')
    title.innerText = repoArray[i].name
    repo.appendChild(title)

    let repoDescription = document.createElement('p')
    repoDescription.classList.add('repo-description')
    repoDescription.innerText = repoArray[i].description
    repo.appendChild(repoDescription)


    let stats = document.createElement('ul')
    stats.classList.add('stats')
    repo.appendChild(stats)


    // color and languages

    let firstList = document.createElement('li')
    firstList.classList.add('stats-list')
    let spanColor = document.createElement('span')
    spanColor.classList.add('language-color')
    let spanText = document.createElement('span')
    

    let langArray = repoArray[i].languages.nodes
    for(let i = 0; i < langArray.length; i++){
      spanColor.style.backgroundColor = `${langArray[i].color}`
      firstList.appendChild(spanColor)
      spanText.innerText = langArray[i].name
      firstList.appendChild(spanText)

    }


    // Repo forked 
    let secondList = document.createElement('li')
    secondList.classList.add('stats-list')
    let forkText = document.createElement('span')
    let forkIcon = document.createElement('span')
    forkIcon.classList.add('iconify')
    forkIcon.setAttribute("data-icon", "octicon:repo-forked-16")
    if(repoArray[i].parent === null){
      forkText.innerText = 0
    }else{
      secondList.appendChild(forkIcon)
      forkText.innerText = repoArray[i].parent.forkCount
    }
    secondList.appendChild(forkText)






    let thirdList = document.createElement('li')
    thirdList.classList.add('stats-list')
    let licenceText = document.createElement('span')
    let licenceIcon = document.createElement('span')
    licenceIcon.classList.add('iconify')
    licenceIcon.setAttribute("data-icon", "octicon:law-16")
    if(repoArray[i].licenseInfo === null){
      licenceText.innerText = ''
    }else{
      thirdList.appendChild(licenceIcon)
      licenceText.innerText = repoArray[i].licenseInfo.name
    }
    thirdList.appendChild(licenceText)



    // let fourthList = document.createElement('li')
    // fourthList.classList.add('stats-list')
    // let updateText = document.createElement('span')
    // fourthList.appendChild(updateText)
    // updateText.innerText = repoArray[i].updatedAt



    stats.appendChild(firstList)
    stats.appendChild(secondList)
    stats.appendChild(thirdList)
    // stats.appendChild(fourthList)

  }
 


});
