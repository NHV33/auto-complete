// TODO: Autocomplete the input with AJAX calls.

const results = document.getElementById("results");

const fetchSuggestions = (searchString) => {
  const baseURL = "https://wagon-dictionary.herokuapp.com/autocomplete/";
  const urlQuery = `${baseURL}${searchString}`;
  fetch(urlQuery)
    .then(response => response.json())
    .then((data) => {
      results.textContent = "";
      let index = 0;
      data.words.forEach((word) => {
        const newListItem = document.createElement("div");
        newListItem.id = `result-${index}`;
        newListItem.classList.add("result-item");
        newListItem.innerText = word;
        results.append(newListItem);
        // if (index === 3) {
        //   newListItem.classList.add("active");
        // }
        index += 1;
      });
    });
};

function clearResults() {
  const resultItems = document.querySelectorAll("div.result-item");
  resultItems.forEach((item) => {
    item.remove();
  });
}

const searchBar = document.getElementById("search");
searchBar.focus();
searchBar.addEventListener('input', (event) => {
  if (searchBar.value.length > 0) {
    fetchSuggestions(searchBar.value);
  } else {
    clearResults();
  }
});

// let activeResult = 0;

function selectResult(increment) {
  const resultItems = document.querySelectorAll("div.result-item");
  if (resultItems.length === 0) { return; }
  const active = document.querySelector("div.result-item.active");
  let activeIndex = null;
  if (active !== null) { activeIndex = parseInt(active.id.split("-")[1], 10); }
  resultItems.forEach((item) => {
    item.classList.remove("active");
  });
  if (activeIndex !== null) {
    activeIndex += increment;
    if (activeIndex < resultItems.length && activeIndex >= 0) {
      document.getElementById(`result-${activeIndex}`).classList.add("active");
    }
  } else if (increment === -1) {
    resultItems[resultItems.length - 1].classList.add("active");
  } else if (increment === 1) {
    resultItems[0].classList.add("active");
  }
}

function onEnterPress() {
  const active = document.querySelector("div.result-item.active");
  if (active !== null) {
    searchBar.value = active.innerText;
    fetchSuggestions(active.innerText);
  } else {
    // const baseURL = "startpage.com/do/search?q=";
    // window.location.href = `startpage.com/do/search?q=${searchBar.value}`;
    window.location.replace(`https://www.startpage.com/do/search?q=${searchBar.value}`);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowDown") { selectResult(1); }
  if (event.key === "ArrowUp") { selectResult(-1); }
  if (event.key === "Enter") { onEnterPress(); }
  // console.log(event.key);
});
