// foods
export function ingredientApi(ingredient) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

export function nameApi(nome) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

// Carregamento aleatório Foods "Surprise Me"
export function randomMealsApi() {
  return fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

export function firstLetterApi(primeiraLetra) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

export function detailApi(idReceita) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idReceita}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => console.log(error.message));
}

export function nationApi(nation) {
  return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`)
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

// Retorna os botões de filtro Categoria
export function filterFoodButtons() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

// Retorna lista de ingredientes
export function filterApiIngredFood() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}

// Retorna lista de nacionalidades
export function filterApiNation() {
  return fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((response) => response.json())
    .then((data) => data.meals)
    .catch((error) => error);
}
