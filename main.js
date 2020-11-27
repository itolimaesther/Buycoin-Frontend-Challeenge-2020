let title = document.querySelectorAll(".title");
let description = document.getElementsByTagName("p");
let stat = document.querySelectorAll(".stats > li > .language");
let languageColor = document.querySelectorAll(".language-color");

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
  // let repoArray = data.data.viewer.avatarUrl
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

  let repoArray = data.data.viewer.repositories.nodes;
  repoArray.map((repo) => {
    title.forEach((head) => {
      head.innerText = repo.name;
    });




    let langArray = repo.languages.nodes;
    langArray.map((lang) => {
      stat.forEach((l) => {
        l.innerText = lang.name;
      });



      languageColor.forEach((bg) => {
        bg.style.backgroundColor = `${lang.color}`;
      });
    });
  });
});
