async function fetchData() {

    try {
        const info = document.getElementById("country-info");

        const border = document.getElementById("brd");

        const countryName = document.getElementById("Country").value.toLowerCase();

        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

        if (!response.ok) {
            throw new Error("Couldn't find country");
        }

        else {
            const data = await response.json();
            const Flag = data[0].flags.png;
            //const imgElement = document.getElementById("CountryFlag");

            info.innerHTML = `
            <ul>
                <li>Capital: ${data[0].capital[0]}</li>
                <li>Population: ${data[0].population}</li>
                <li>Region: ${data[0].region}</li>
                <li>Flag: </li>
                <img src="${Flag}" id="CountryFlag"">
            </ul>
            `;

            //imgElement.src = Flag; 
            //imgElement.style.display = "block"

            let gate = data[0].borders;
            gate.forEach(element => {
                getNeighbour(element);
            });

            async function getNeighbour(code) {
                let url = `https://restcountries.com/v3.1/alpha/${code}`;
                try {
                    const bord = await fetch(url);

                    if (!response.ok) {
                        throw new Error("Couldn't find country");
                    }
                    else {
                        const json = await  bord.json();
                        neighbourDisplay(json);
                        console.log(json);
                    }
                } catch(error) {
                    console.error(error);
                }
            }

            function neighbourDisplay(json) {
                let li = document.createElement("li");

                li.innerHTML = `
                ${json[0].name.common}
                </br>
                <img src="${json[0].flags.png}">                 
                `
                border.appendChild(li);             
            }



        }
    }

    catch(error) {
        console.error(error);
    }

}