const getGitHubUsers = (search) => {

    const configFetch = {
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    }
    fetch(`https://api.github.com/search/users?q=${search}`, configFetch)
    .then(res => res.json())
    .then(data => {
        const userList = document.getElementById("user-list");
        for (const user of data.items)
        {
            const userLi = document.createElement("li");
            const userImg = document.createElement("img");
            const userH2 = document.createElement("h2");
            const userH3 = document.createElement("h3");

            userImg.src = user.avatar_url;
            userH2.innerText = user.login;


            userLi.append(userImg);
            userLi.append(userH2);

            userList.append(userLi);

            userH2.addEventListener("click", (e) => {
                fetch(`https://api.github.com/users/${e.target.innerText}/repos`)
                .then(res => res.json())
                .then(data => {   
                    const repoList = document.getElementById("repos-list");
                    repoList.innerHTML = "";
                    
                    for (const repo of data)
                    {
                        const repoLi = document.createElement("li");
                        const repoA = document.createElement("a");
                        const repoH2 = document.createElement("h2");

                        repoH2.innerText = repo.html_url;
                        repoA.href = repo.html_url;

                        repoA.append(repoH2);
                        repoLi.append(repoA);
                        repoList.append(repoLi);
                    }
                })
                .catch(error => console.log(error));
            })
        }
    })
    .catch(error => console.log(error));
}

document.addEventListener('DOMContentLoaded', (e) => {
    const searhBar = document.getElementById('github-form');
    searhBar.addEventListener("submit", (e) => {
        e.preventDefault();
        getGitHubUsers(e.target.search.value);
    })
});