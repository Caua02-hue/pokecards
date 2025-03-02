document.getElementById("Carregar").addEventListener("click", function () {
    const characterLimit = document.getElementById("character").value;
    const API = `https://pokeapi.co/api/v2/pokemon?limit=${characterLimit}`;
    console.log("A URL da API é:", API); 

    fetch(API)
        .then(response => {
            console.log("Status da resposta da API:", response.status); 
            if (!response.ok) {
                throw new Error("Erro na requisição à API: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("Dados recebidos da API:", data); 

            
            const Cards = document.getElementById("Cards");
            Cards.innerHTML = ""; 
            
            if (data && data.results) {
                console.log("Pokémons encontrados:", data.results);

                
                data.results.forEach(item => {
                    const NewCard = document.createElement("div");
                    NewCard.classList.add("NewCard");

                    
                    const Nome = document.createElement("h3");
                    Nome.textContent = item.name;  
                    NewCard.appendChild(Nome);

                    
                    fetch(item.url)
                        .then(response => {
                            console.log("Status da resposta ao buscar detalhes do Pokémon:", response.status); 
                            return response.json();
                        })
                        .then(pokemonData => {
                            console.log("Detalhes do Pokémon:", pokemonData); 
                            const imagem = document.createElement("img");
                            imagem.src = pokemonData.sprites.front_default;  
                            NewCard.appendChild(imagem);
                        })
                        .catch(error => {
                            console.error("Erro ao carregar imagem do Pokémon:", error);
                        });

                    Cards.appendChild(NewCard);
                });
            } else {
                console.error("Dados não encontrados ou mal formatados:", data);
                alert("Erro ao carregar dados da API!");
            }
        })
        .catch(error => {
            console.error("Erro ao carregar os dados:", error);
            alert("Erro ao carregar dados da API! Veja o console para mais detalhes.");
        });
});
