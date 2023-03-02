export function addIdToLocalSto(obj, localStoKey) {
  const arrID = localStorage.getItem(localStoKey);
  const idsFavorites = arrID ? [...JSON.parse(arrID), obj] : [obj];
  return localStorage.setItem(localStoKey, JSON.stringify(idsFavorites));
}

export function addInProgressRecipes(id, ingredList) {
  const progress = localStorage.getItem(ingredList);
  return localStorage.setItem(JSON.stringify(progress));
}

export function deleteIdFromLocalSto(id, localStoKey) {
  const arrID = localStorage.getItem(localStoKey);
  const idsFavorites = arrID
    ? [...JSON.parse(arrID)].filter((deleteMeal) => deleteMeal.id !== id) : [];

  return localStorage.setItem(localStoKey, JSON.stringify(idsFavorites));
}

export function getLocalStorageInfo(localStoKey) {
  const idArr = localStorage.getItem(localStoKey);
  if (idArr) {
    return JSON.parse(idArr);
  }

  // return localStoKey === 'inProgressRecipes' ? { cocktails: [], meals: [] } : [];
}
