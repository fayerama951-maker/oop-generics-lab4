// Exercice A — Écrire une fonction générique
//Implémentez cette fonction last. Elle doit renvoyer le dernier élément ou une undefinedvaleur nulle pour un tableau vide.
function last<T>(items: readonly T[]): T | undefined {
  // Your code here
}
Copie
Testez-le :
last([1, 2, 3]);             // 3
last(["Awa", "Moussa"]);     // "Moussa"

const emptyCourses: Course[] = [];
last(emptyCourses);          // undefined
Copie
//Réfléchissez : pourquoi a-t-on lastbesoin d'un paramètre de type ?
//24. Exercice B — Transformer une liste
//Implement mapItems without using .map()

function mapItems<T,U>(

    items:readonly T[],
    transform: (item:T)=> U,
):U[]{
    //Create a result array, transform each item and return it.
}
