function getAllCharacters(done) {
    const allCharacters = []; // Array para almacenar todos los personajes

    // Función que obtiene personajes de una página
    function getCharactersPage(page) {
        fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
            .then(response => response.json())
            .then(data => {
                // Añadir los personajes obtenidos a la lista
                allCharacters.push(...data.results);

                // Si hay más páginas, continuar obteniendo personajes
                if (data.info.next) {
                    getCharactersPage(page + 1);
                } else {
                    // Cuando ya no hay más páginas, llamar a done con todos los personajes
                    done(allCharacters);
                }
            });
    }

    // Comenzar desde la primera página
    getCharactersPage(1);
}

getAllCharacters(data => {
    data.forEach(personaje => {
        
        const article = document.createRange().createContextualFragment(/*html*/`
        <article>
            <div class="image_container">
                <img src="${personaje.image}" alt="Personaje">
            </div>
            <h2>${personaje.name}</h2>
            <span class="label">Estado:</span> <span class="value">${personaje.status}</span><br>
            <span class="label">Raza:</span> <span class="value">${personaje.species}</span><br>
            <span class="label">Tipo:</span> <span class="value">${personaje.type || "No disponible"}</span><br>
            <span class="label">Genero:</span> <span class="value">${personaje.gender}</span><br>
        </article>
        `);

        const main = document.querySelector("main");
        main.append(article);
    });
});
