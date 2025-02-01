document.getElementById("search-button").addEventListener("click", () => {
	event.preventDefault();
	const searchValue = document
		.getElementById("search-input")
		.value.trim()
		.toLowerCase();

	console.log(searchValue);

	if (!searchValue) {
		document.getElementById("food-container").innerHTML = "";
		return;
	}

	const dynamicLink = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

	fetch(dynamicLink)
		.then((response) => response.json())
		.then((data) => {
			// console.log(data);
			console.log(data.meals);
			const allMeal = data.meals;

			if (!allMeal) {
				document.getElementById("food-container").innerHTML =
					'<p class="no-meals-found" >No Meals Found. </p>';
				return;
			} else {
				displayMeals(allMeal);
			}
		});
});

// displaying meals
const displayMeals = (meals) => {
	const container = document.getElementById("food-container");
	container.innerHTML = "";

	meals.forEach((meal) => {
		const singleMeal = document.createElement("div");
		singleMeal.classList.add("col");

		singleMeal.innerHTML = `
        <div class="col">
            <div class="card">
                    <img src="${
						meal.strMealThumb
					}" class=" card-image" alt="Image of ${meal.strMealThumb}">
                    
                    <div class="card-body">
                        <h5 class="card-title ">${meal.strMeal}</h5>
                        <p class="card-text">Category: ${meal.strCategory}</p>
                        <p class="instruction">
                            Instruction: ${meal.strInstructions.slice(0, 15)}
                        </p>

                        
                    </div>
            </div>
        </div>

        
        `;

        singleMeal.addEventListener("click", () => showMealDetails(meal));

		container.appendChild(singleMeal);
	});
};

// Show meal details when clicked on any meal
const showMealDetails = (meal) => {
	const mealCard = document.createElement("div");
	mealCard.classList.add("meal-card");

	const showMealContainer = document.getElementById("show-meal-details-parent");


	showMealContainer.innerHTML = "";

	mealCard.innerHTML = `
        <div class="card">
			<img src="${meal.strMealThumb}" class="card-image single-meal-image" alt="Image of ${meal.strMeal}">
			<div class="card-body">
				<h5 class="card-title">${meal.strMeal}</h5>

                <p class="card-text">Ingredients:</p>
				<ul>
					${generateIngredientList(meal)}
				</ul>
				
			</div>
		</div>
    `;


	showMealContainer.appendChild(mealCard);
};


const generateIngredientList = (meal) => {
	let ingredients = [];
	for (let i = 1; i <= 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		if (ingredient) {
			ingredients.push(`<li>${ingredient}</li>`);
		} else {
			break;
		}
	}
	return ingredients.join("");
};





// const loadAllMeal = () => {
// 	fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=a")
// 		.then((response) => response.json())
// 		.then((data) => {
// 			console.log(data.meals);
// 			let allMeal = data.meals;
//             displayMeals(allMeal);
// 		});

// };

// loadAllMeal();
