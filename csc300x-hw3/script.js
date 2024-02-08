document.querySelectorAll('.dish').forEach(item => {
    item.addEventListener('mouseenter', event => {
        item.querySelector('.dish-name').classList.add('active');
        item.querySelector('.dish-price').classList.add('active');
        item.querySelector('.dish-description').classList.add('active');
    });

    item.addEventListener('mouseleave', event =>{
        item.querySelector('.dish-name').classList.remove('active');
        item.querySelector('.dish-price').classList.add.remove('active');
        item.querySelector('.dish-description').classList.add.remove('active');
    });
});

//Data for recommendations
const recommendations=[
    {
    restaurant:"New York Pizza",
    dishes:[
        {name:"Buffalo Chicken Pizza", price: 25},
        {name:"Calzone", price: 13.49},
        {name:"Spaghetti Marinara", price: 17.99}
    ]
    },
    {
        restaurant:"Sushi Republic",
        dishes:[
            {name:"NC Roll", price: 6.75 },
            {name:"Greensboro", price: 12},
            {name:"Califorina", price: 6.50}
        ]
    },
    {
        restaurant:"East Coast Wings",
        dishes:[
            {name:"10 Bone In Wings", price: 13.99},
            {name:"Bacon Cheddar Burger", price: 11.99},
            {name:"10 BoneLess Wings", price: 12.99}


        ]
    }

];
// Function to display recommendations
function displayRecommendations() {
    const recommendationsList = document.getElementById("recommendations-list");
    recommendations.forEach(place => {
        const placeDiv = document.createElement("div");
        placeDiv.innerHTML = `<h3>${place.restaurant}</h3>`;
        const dishesList = document.createElement("ul");
        place.dishes.forEach(dish => {
            const dishItem = document.createElement("li");
            dishItem.innerHTML = `${dish.name} - $${dish.price} <button onclick="addToMealPlan('${place.restaurant}', '${dish.name}', ${dish.price})">Add</button>`;
            dishesList.appendChild(dishItem);
        });
        placeDiv.appendChild(dishesList);
        recommendationsList.appendChild(placeDiv);
    });
}

// Function to add dish 
function addToMealPlan(restaurant, name, price) {
    const mealPlanList = document.getElementById("meal-plan-list");
    const totalCostElement = document.getElementById("total-cost");
    
    const dishItem = document.createElement("li");
    dishItem.innerHTML = `${name} - $${price} <button onclick="removeFromMealPlan(this)">Remove</button> <button onclick="addToMealPlan('${restaurant}', '${name}', ${price})">Add Another</button>`;
    mealPlanList.appendChild(dishItem);

    let totalCost = parseFloat(totalCostElement.textContent.substring(1));
    totalCost += price;
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
}

// Function to remove dish 
function removeFromMealPlan(item) {
    const mealPlanList = document.getElementById("meal-plan-list");
    const totalCostElement = document.getElementById("total-cost");

    const dishPrice = parseFloat(item.parentNode.textContent.split(' - ')[1].split(' ')[0].substring(1));
    let totalCost = parseFloat(totalCostElement.textContent.substring(1));
    totalCost -= dishPrice;
    totalCostElement.textContent = `$${totalCost.toFixed(2)}`;

    mealPlanList.removeChild(item.parentNode);
}

// Display recommendations when the page loads
window.onload = function() {
    displayRecommendations();
};