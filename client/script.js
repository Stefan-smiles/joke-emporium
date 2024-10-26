const jokeForm = document.getElementById("jokeForm");
const jokeTable = document.getElementById("jokeTable");

async function getJokes() {
  const response = await fetch("http://localhost:8080/jokes");
  const jokes = await response.json();
  console.log(jokes);
  for (let i = 0; i < jokes.length; i++) {
    const name = jokes[i].name;
    const joke = jokes[i].joke;
    const punchline = jokes[i].punchline;
    const humorcategory = jokes[i].humorcategory;
    const likes = jokes[i].likes;
    const p = document.createElement("p");

    p.textContent = `posted by ${name},
        ${joke} 
         answer: ${punchline} in the category ${humorcategory}.
         Any good? drop a like! >>>`;

    jokeTable.appendChild(p);
  }
}

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(jokeForm);
  const body = Object.fromEntries(formData);
  const res = await fetch("http://localhost:8080/jokes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  console.log("yeehaw");
}
jokeForm.addEventListener("submit", handleSubmit);

getJokes();
