const search_bar = document.querySelector('.search-input');
const search_button = document.querySelector('.search-button');
const view_recipe = document.querySelector('.item-button');
const pop_up_recipe = document.querySelector('.pop-up-recipe');
const close_button  =document.querySelector('.close-button');

search_button.addEventListener('click', ()=> {
    if(search_bar.value === '') {
        alert("Enter an ingredient!!!");
    } else {
        show_meals();
    }
})

const get_meal_by_ingredient = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search_bar.value}`);
    const finalResult = await response.json();
    return finalResult;
}

const show_meals = async () => {
    const allResults = await get_meal_by_ingredient();
    let newElement = '';
    allResults.meals.forEach(meal => {
        newElement += `<div class="item" id = "${meal.idMeal}">
                        <div class="img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <h2 class="item-name">${meal.strMeal}</h2>
                        <button class="item-button" onClick ="show_recipe(this)" >View recipe</button>
                    </div>`
    });
    document.getElementById('items-container').innerHTML = newElement;
}


const show_recipe = async(e)=>{
    let id = e.parentNode.id;
    console.log(`My id is ${id}`);
    const recipe = await get_recipe_by_meal_id(id);

    show_recipe_from_array(recipe.meals);

    pop_up_recipe.classList.add('show-pop-up-recipe');
}

function show_recipe_from_array(meal) {
    console.log(meal[0]);
    meal = meal[0];
    let newElement = '';
    newElement = `<div class="close-button" onClick = "close_pop_up()">
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 341.751 341.751" style="enable-background:new 0 0 341.751 341.751;" xml:space="preserve">
<g>
<g>

<rect x="-49.415" y="149.542" transform="matrix(0.7072 -0.707 0.707 0.7072 -70.7868 170.8326)" width="440.528" height="42.667"/>
</g>
</g>
<g>
<g>

<rect x="149.569" y="-49.388" transform="matrix(0.707 -0.7072 0.7072 0.707 -70.7712 170.919)" width="42.667" height="440.528"/>
</g>
</g>
</svg>
</div>
<h2 class="title">${meal.strMeal}</h2>
<h4 class="category">${meal.strCategory}</h4>
<h2 class="instructions-title">Instructions:</h2>
<p class="instructions">
    ${meal.strInstructions}
</p>
<a href="${meal.strYoutube}" class="watch-video" target="_blank">Watch video</a>`
document.getElementById('pop-up-recipe').innerHTML = newElement
}

const get_recipe_by_meal_id = async (id) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}
    `);
    const finalResult = await response.json();
    return finalResult;
}

function close_pop_up () {
    pop_up_recipe.classList.remove('show-pop-up-recipe');
}