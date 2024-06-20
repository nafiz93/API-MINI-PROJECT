


document.getElementById('SearchButton').addEventListener('click', function () {
    let search = document.querySelector('#searchInput');
    let input = search.value;
    console.log(input);
    let url = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`)
            .then(response => response.json())
            .then(data => displayFish(data))
    }
    url();
})




let displayFish = (data) => {
    let fishes = data.meals;
    let parent = document.querySelector('#parent');
    fishes.forEach(fish => {
        let newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'newdiv');
        newDiv.innerHTML = `<div class="card" style="width: 18rem;">

        <img style="width: 250px; height: 250px;" class="card-img-top" src="${fish.strMealThumb}" alt="">
        <div class="card-body">
          <h5 class="card-title">toggle</h5>
          <p class='peragraph'>${fish.strInstructions.slice(0, 150)}</p>
          <a href="${fish.strYoutube}"  class="btn btn-secondary">Food Video</a>
          <button onclick="details('${fish.idMeal}')"  class="btn btn-secondary">Details</button>
          <button onclick="details2(this,'${fish.idMeal}')" class="btn btn-secondary">Details2</button>

        </div>
      </div>`;
        parent.appendChild(newDiv);
    });
}

let details = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {

            let detailOfTheFood = data.meals[0];
            let parentone = document.querySelector('#parent1');
            let existingChild = document.querySelector('.child');

            if (existingChild) {// this condition means if the existingChild exist in the parent1
                parentone.removeChild(existingChild);
            }
            let dynamicChild = document.createElement('div');
            dynamicChild.setAttribute('class', 'child');

            dynamicChild.innerHTML =
                `
            <p>
            Category: ${detailOfTheFood.strCategory}, Trending Area: ${detailOfTheFood.strArea}
            </p>
            `;

            // Clear previous content

            // Append new content
            parentone.appendChild(dynamicChild);

        });
}


let details2 = (button, id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => {
            let detailOfTheFood = data.meals[0];
            let parent = document.querySelector('.newdiv');

            // Check if the parent exists
            if (parent) {
                let paragraph = parent.querySelector('.peragraph');

                // Check if paragraph exists
                if (paragraph) {
                    // Toggle between the two paragraphs
                    if (paragraph.textContent === detailOfTheFood.strInstructions.slice(0, 150)) {
                        paragraph.textContent = `Category: ${detailOfTheFood.strCategory}, Trending Area: ${detailOfTheFood.strArea}`;
                    } else {
                        paragraph.textContent = detailOfTheFood.strInstructions.slice(0, 150);
                    }
                }
            }
        });
}
