/** Fonctions concernants les parametres stockes dans le storage */

function getSortType() {
    let sortType = localStorage.getItem('todoSortType');
    if (!sortType) {
        sortType = 'nameAsc';
    }
    return sortType
}

function saveSortType(sortType) {
    localStorage.setItem('todoSortType', sortType);
}