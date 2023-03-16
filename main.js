async function getPeople(endpoint) {
    let data = await fetch(endpoint);
    let json = await data.json();
    return json;
}

class Character {
    constructor(name, gender, height, mass, hair_color, skinColor, eyeColor, films, pictureUrl, vehicles, starships, homeworld) {
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hair_color = hair_color;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.films = films;
        this.pictureUrl = pictureUrl;
        this.homeworld = {};
        this.vehicles = vehicles;
        this.starships = starships;
    };

    
    getSameFilms(characterOne, characterTwo) {
        let sameMovies = [];
        let sameMoviesTitle = [];
        if (characterOne.films && characterTwo.films) {
            for(let i = 0; i < characterOne.films.length; i++) {
                for(let j = 0; j < characterTwo.films.length; j++) {
                    if(characterOne.films[i].title === characterTwo.films[j].title) {
                        sameMovies.push(characterOne.films[i]);
                    }
                }
            }
        }

        sameMovies.forEach(movie => sameMoviesTitle.push(movie.title));
        return sameMoviesTitle;
    };
    
      
      
      


    getfirstMovie(character) {
        return character.movies[0].release_date 
    };

    getHomePlanet(characterOne, characterTwo) {
        if(characterOne.homeworld.name === characterTwo.homeworld.name) {
            return`${characterOne.name} and ${characterTwo.name} share the same homeplanet: ${characterOne.homeworld.name}`
        } else {
            return`${characterOne.name}´s homeplanet is ${characterOne.homeworld.name} and ${characterTwo.name}´s homeplanet is ${characterTwo.homeworld.name}`
        }
    };


    getExpensiveVehicle(character) {
        let expensiveVehicle = null;
        for(let i = 0; i < character.vehicles.length; i++) {
            if(!expensiveVehicle || Number(character.vehicles[i].cost_in_credits) > Number(expensiveVehicle.cost_in_credits)) {
                expensiveVehicle = character.vehicles[i];
            }
        }
        for(let i = 0; i < character.starships.length; i++) {
            if(!expensiveVehicle || Number(character.starships[i].cost_in_credits) > Number(expensiveVehicle.cost_in_credits)) {
                expensiveVehicle = character.starships[i];
            }
        }
        return expensiveVehicle.name;
    };
}
let contentWrapper = document.querySelector('#contentWrapper');
let characterBtn = document.querySelector('#characterBtn');
let selectOne= document.querySelector('#selectOne');
let selectTwo= document.querySelector('#selectTwo');

    let leiaPic= "./bilder/leia.organa.jpeg";
    let lukePic= "./bilder/luke.skywalker.jpeg";
    let r2d2Pic= "./bilder/r2.d2.jpeg";
    let c3poPic= "./bilder/c3.po.jpeg";
    let obiwanPic= "./bilder/obi.wan.kenobi.jpeg";
    let darthPic= "./bilder/darth.vader.jpeg";


const getCharacters = () => {

    characterBtn.addEventListener('click', async () => {
      contentWrapper.innerHTML = '';
      let characterOneInfo = await getPeople(`https://swapi.dev/api/people/${selectOne.value}`);
      let characterTwoInfo = await getPeople(`https://swapi.dev/api/people/${selectTwo.value}`);
      
      //funktionalitet för att hämta filmer
        let characterOneMovies = [];
        let characterTwoMovies = [];
        //pusha in filmerna i tomma arrayer
        for (let i = 0; i < characterOneInfo.films.length; i++) {
            let movie = await getPeople(characterOneInfo.films[i]);
            characterOneMovies.push(movie);
        }
        for (let i = 0; i < characterTwoInfo.films.length; i++) {
            let movie = await getPeople(characterTwoInfo.films[i]);
            characterTwoMovies.push(movie);
        };
        //lägg till filmerna i objektet
        characterOneInfo.films = characterOneMovies;
        characterTwoInfo.films = characterTwoMovies;
        //funktionalitet för att hämta fordon
        let characterOneVehicles = [];
        let characterTwoVehicles = [];
        //pusha in fordonen i tomma arrayer
        for (let i = 0; i < characterOneInfo.vehicles.length; i++) {
            let vehicle = await getPeople(characterOneInfo.vehicles[i]);
            characterOneVehicles.push(vehicle);
        }
        for (let i = 0; i < characterTwoInfo.vehicles.length; i++) {
            let vehicle = await getPeople(characterTwoInfo.vehicles[i]);
            characterTwoVehicles.push(vehicle);
        };
        //funktionalitet för att hämta starships
        let characterOneStarships = [];
        let characterTwoStarships = [];
        //pusha in starshipsen i tomma arrayer

        for (let i = 0; i < characterOneInfo.starships.length; i++) {
            let starship = await getPeople(characterOneInfo.starships[i]);
            characterOneStarships.push(starship);
        }
        for (let i = 0; i < characterTwoInfo.starships.length; i++) {
            let starship = await getPeople(characterTwoInfo.starships[i]);
            characterTwoStarships.push(starship);
        };
        //funktionalitet för att hämta homeworld
        let characterOneHomeworld = await getPeople(characterOneInfo.homeworld);
        let characterTwoHomeworld = await getPeople(characterTwoInfo.homeworld);
        //lägg till homeworld i objektet
        characterOneInfo.homeworld.name = characterOneHomeworld.name;
        characterTwoInfo.homeworld.name = characterTwoHomeworld.name;



        //skapa objekt av klassen Character

        let characterOne = new Character(
            characterOneInfo.name,
            characterOneInfo.gender,
            characterOneInfo.height,
            characterOneInfo.mass,
            characterOneInfo.hair_color,
            characterOneInfo.skinColor,
            characterOneInfo.eyeColor,
            characterOneMovies, 
            characterOneInfo.pictureUrl,
            characterOneInfo.vehicles=characterOneVehicles,
            characterOneInfo.starships=characterOneStarships,
            characterOneInfo.homeworld=characterOneHomeworld,
        );
        let characterTwo = new Character(
            characterTwoInfo.name,
            characterTwoInfo.gender,
            characterTwoInfo.height,
            characterTwoInfo.mass,
            characterTwoInfo.hair_color,
            characterTwoInfo.skinColor,
            characterTwoInfo.eyeColor,
            characterTwoMovies,
            characterTwoInfo.pictureUrl,
            characterTwoInfo.vehicles=characterTwoVehicles,
            characterTwoInfo.starships= characterTwoStarships,
            characterTwoInfo.homeworld=characterTwoHomeworld,
        );
        


                characterOne.getSameFilms(characterOneInfo, characterTwoInfo);
                


//funktion för att tilldela bilder
        if (characterOne.name === "Leia Organa") {
            characterOne.pictureUrl = leiaPic;
        } else if (characterOne.name === "Luke Skywalker") {
            characterOne.pictureUrl = lukePic;
        } else if (characterOne.name === "R2-D2") {
            characterOne.pictureUrl = r2d2Pic;
        } else if (characterOne.name === "C-3PO") {
            characterOne.pictureUrl = c3poPic;
        } else if (characterOne.name === "Obi-Wan Kenobi") {
            characterOne.pictureUrl = obiwanPic;
        } else if (characterOne.name === "Darth Vader") {
            characterOne.pictureUrl = darthPic;
        };
        if(characterTwo.name === "Leia Organa") {
            characterTwo.pictureUrl = leiaPic;
        } else if (characterTwo.name === "Luke Skywalker") {
            characterTwo.pictureUrl = lukePic;
        } else if (characterTwo.name === "R2-D2") {
            characterTwo.pictureUrl = r2d2Pic;
        } else if (characterTwo.name === "C-3PO") {
            characterTwo.pictureUrl = c3poPic;
        } else if (characterTwo.name === "Obi-Wan Kenobi") {
            characterTwo.pictureUrl = obiwanPic;
        } else if (characterTwo.name === "Darth Vader") {
            characterTwo.pictureUrl = darthPic;
        };

// skapa div för att lägga in bilder och info
                
      let characterDiv = document.createElement('div');
      characterDiv.classList.add('character-div');
      characterDiv.innerHTML = `<div class=character-one><p>${characterOne.name}</p>
        <img src="${characterOne.pictureUrl}" alt="characterOne">
      <div id="characterOneInfo"></div>
      </div>
      <button id="compareBtn">Compare</button>
      <div class= character-two>
      <p>${characterTwo.name}</p>
        <img src="${characterTwo.pictureUrl}" alt="characterTwo">
      <div id="characterTwoInfo"></div>
      </div>

     `;
// lägg in div i contentWrapper
      contentWrapper.append(characterDiv);
// hämta från html
        let compareBtn = document.querySelector('#compareBtn');
        let compareInfoOne = document.querySelector('#characterOneInfo');
        let compareInfoTwo = document.querySelector("#characterTwoInfo");

        // eventlistener för compareBtn
        compareBtn.addEventListener('click', () => {
            //skapa div för första karaktären
            compareInfoOne.innerHTML = '';
            compareInfoTwo.innerHTML = '';
let characterOneInfoDiv= document.createElement('div');
characterOneInfoDiv.innerHTML = `
<div>
<li>Gender: <div id=genderOne>${characterOneInfo.gender}</div></li>
<li>Height: <div id=heightOne> ${characterOneInfo.height} centimeter</div></li>
<li>Mass: <div id=weightOne> ${characterOneInfo.mass}</div></li>
<li>Haircolor: <div id=hairColorOne> ${characterOneInfo.hair_color}</div></li>
<li>Skincolor: <div id=skinColorOne> ${characterOneInfo.skin_color}</div></li>
<li>Eyecolor: <div id=eyeColorOne> ${characterOneInfo.eye_color} </div></li>
<div class="movieDiv" id="movieOne">
<ol >Films:</ol></div>
</div>
<div><button id= moreInfoOne>More info</button></div>
<div id="moreInfoOneBtns"></div>
`


//skapa div för andra karaktären
let characterTwoInfoDiv= document.createElement('div');
characterTwoInfoDiv.innerHTML =
`<div>
<li>Gender: <div id=genderTwo> ${characterTwoInfo.gender}</div></li>
<li>Height: <div id=heightTwo> ${characterTwoInfo.height} centimeter</div></li>
<li>Mass: <div id=weightTwo> ${characterTwoInfo.mass}</div></li>
<li>Haircolor: <div id=hairColorTwo> ${characterTwoInfo.hair_color}</div></li>
<li>Skincolor: <div id=skinColorTwo> ${characterTwoInfo.skin_color}</div></li>
<li>Eyecolor: <div id=eyeColorTwo> ${characterTwoInfo.eye_color} </div></li>
<div class="movieDiv" id="movieTwo">
<ol>Films:</ol>
</div>
</div>
<div><button id= moreInfoTwo>More info</button></div>
<div id="moreInfoTwoBtns"></div>
`;
compareInfoOne.append(characterOneInfoDiv);
compareInfoTwo.append(characterTwoInfoDiv);
// jämnför kön
if (characterOneInfo.gender === characterTwoInfo.gender) {
let sameGender1= document.querySelector('#genderOne');
let sameGender2= document.querySelector('#genderTwo');
sameGender1.classList.add('same-gender');
sameGender2.classList.add('same-gender');
} ;
// jämnför längd
if(Number(characterOneInfo.height) > Number(characterTwoInfo.height)) {
let taller= document.querySelector('#heightOne');
taller.classList.add('taller');
} else if(Number(characterOneInfo.height) < Number(characterTwoInfo.height)) {
let taller= document.querySelector('#heightTwo');
taller.classList.add('taller');
} ;
// jämnför vikt
if (Number(characterOneInfo.mass) > Number(characterTwoInfo.mass)) {
let heavier= document.querySelector('#weightOne');
heavier.classList.add('heavier');
} else if (Number(characterOneInfo.mass) < Number(characterTwoInfo.mass)) {
let heavier= document.querySelector('#weightTwo');
heavier.classList.add('heavier');}
// jämnför hårfärg
if (characterOneInfo.hair_color === characterTwoInfo.hair_color) {
let sameHairColorOne= document.querySelector('#hairColorOne');
let sameHairColorTwo= document.querySelector('#hairColorTwo');
sameHairColorOne.classList.add('same-haircolor');
sameHairColorTwo.classList.add('same-haircolor');
} ;
// jämnför hudfärg
if (characterOneInfo.skin_color === characterTwoInfo.skin_color) {
let sameSkinColorOne= document.querySelector('#skinColorOne');
let sameSkinColorTwo= document.querySelector('#skinColorTwo');
sameSkinColorOne.classList.add("same-skincolor")
sameSkinColorTwo.classList.add("same-skincolor")};

// jämnför ögonfärg
if (characterOneInfo.eye_color === characterTwoInfo.eye_color) {
let sameEyeColorOne= document.querySelector('#eyeColorOne');
let sameEyeColorTwo= document.querySelector('#eyeColorTwo');
sameEyeColorOne.classList.add('same-eyecolor');
sameEyeColorTwo.classList.add('same-eyecolor');
} ;
// jämnför antal filmer
if (characterOneInfo.films.length > characterTwoInfo.films.length) {
let moreMovies= document.querySelector('#movieOne');
moreMovies.classList.add('more-movies');
} else if (characterOneInfo.films.length < characterTwoInfo.films.length) {
let moreMovies= document.querySelector('#movieTwo');
moreMovies.classList.add('more-movies');
} ;

        characterOneMovies.forEach(movie => {
            let movieListWrapperOne = document.querySelector("#movieOne");
            let movieListOne = document.createElement("li");
            movieListOne.innerHTML = `${movie.title}`;
          movieListWrapperOne.append(movieListOne);
        });
        
        characterTwoMovies.forEach(movie => {
            let movieListWrapperTwo = document.querySelector("#movieTwo");
            let movieListTwo = document.createElement("li");
            movieListTwo.innerHTML = `${movie.title}`;
            movieListWrapperTwo.append(movieListTwo);
        });
        //lägg till mer info
        let moreInfoOne = document.querySelector('#moreInfoOne');
        let moreInfoTwo = document.querySelector('#moreInfoTwo');
        let moreInfoOneBtns = document.querySelector('#moreInfoOneBtns');
        let moreInfoTwoBtns = document.querySelector('#moreInfoTwoBtns');
        moreInfoOne.addEventListener('click', () => {
            let oneFirstMovieBtn = document.createElement('Button');
            oneFirstMovieBtn.innerHTML = 'First movie';
            let oneExpensiveVehicelBtn = document.createElement('Button');
            oneExpensiveVehicelBtn.innerHTML = 'Expensive vehicle';
            let homePlanetBtn = document.createElement('Button');
            homePlanetBtn.innerHTML = 'Home planet';
            let sameMoviesBtn = document.createElement('Button');
            sameMoviesBtn.innerHTML = 'Same movies';
            moreInfoOneBtns.append(sameMoviesBtn);
            moreInfoOneBtns.append(oneFirstMovieBtn);
            moreInfoOneBtns.append(oneExpensiveVehicelBtn);
            moreInfoOneBtns.append(homePlanetBtn);
            oneFirstMovieBtn.addEventListener('click', () => {
                characterOneInfoDiv.innerHTML = '';
                let moreInfoOneDiv = document.createElement('div');
                moreInfoOneDiv.innerHTML = `
                ${characterOne.name} first appeared in a movie ${characterOne.getfirstMovie(characterOneInfo)}
                `;
                characterOneInfoDiv.append(moreInfoOneDiv);
            });
            oneExpensiveVehicelBtn.addEventListener('click', () => {
                characterOneInfoDiv.innerHTML = '';
                let moreInfoOneDiv = document.createElement('div');
                moreInfoOneDiv.innerHTML = `
                ${characterOne.name} most expensive vehicle is ${characterOne.getExpensiveVehicle(characterOneInfo)}
                `;
                characterOneInfoDiv.append(moreInfoOneDiv);
            }  );
            homePlanetBtn.addEventListener('click', () => {
                characterOneInfoDiv.innerHTML = '';
                let moreInfoOneDiv = document.createElement('div');
                moreInfoOneDiv.innerHTML = `
               ${characterOne.getHomePlanet(characterOneInfo, characterTwoInfo)}
                `;
                characterOneInfoDiv.append(moreInfoOneDiv);
            });
            sameMoviesBtn.addEventListener('click', () => {
                characterOneInfoDiv.innerHTML = '';
                let moreInfoOneDiv = document.createElement('div');
                moreInfoOneDiv.innerHTML = `
                ${characterOne.name} and ${characterTwo.name} have been in these movies together:  ${characterOne.getSameFilms(characterOneInfo, characterTwoInfo)}
                `;
                characterOneInfoDiv.append(moreInfoOneDiv);
            });
        
        });
        moreInfoTwo.addEventListener('click', () => {
            let twoFirstMovieBtn = document.createElement('Button');
            twoFirstMovieBtn.innerHTML = 'First movie';
            let twoExpensiveVehicelBtn = document.createElement('Button');
            twoExpensiveVehicelBtn.innerHTML = 'Expensive vehicle';
            let homePlanetBtn = document.createElement('Button');
            homePlanetBtn.innerHTML = 'Home planet';
            let sameMoviesBtn = document.createElement('Button');
            sameMoviesBtn.innerHTML = 'Same movies';
            moreInfoTwoBtns.append(sameMoviesBtn);
            moreInfoTwoBtns.append(twoFirstMovieBtn);
            moreInfoTwoBtns.append(twoExpensiveVehicelBtn);
            moreInfoTwoBtns.append(homePlanetBtn);
            twoFirstMovieBtn.addEventListener('click', () => {
                characterTwoInfoDiv.innerHTML = '';
                let moreInfoTwoDiv = document.createElement('div');
                moreInfoTwoDiv.innerHTML = `
                ${characterTwo.name} first appeared in a movie ${characterTwo.getfirstMovie(characterTwoInfo)}
                `;
                characterTwoInfoDiv.append(moreInfoTwoDiv);
            });
            twoExpensiveVehicelBtn.addEventListener('click', () => {
                characterTwoInfoDiv.innerHTML = '';
                let moreInfoTwoDiv = document.createElement('div');
                moreInfoTwoDiv.innerHTML = `
                ${characterTwo.name} most expensive vehicle is ${characterTwo.getExpensiveVehicle(characterTwoInfo)}
                `;
                characterTwoInfoDiv.append(moreInfoTwoDiv);
        }); 
            homePlanetBtn.addEventListener('click', () => {
                characterTwoInfoDiv.innerHTML = '';
                let moreInfoTwoDiv = document.createElement('div');
                moreInfoTwoDiv.innerHTML = `
               ${characterTwo.getHomePlanet(characterTwoInfo, characterOneInfo)}
                `;
                characterTwoInfoDiv.append(moreInfoTwoDiv);
        
        });
            sameMoviesBtn.addEventListener('click', () => {
                characterTwoInfoDiv.innerHTML = '';
                let moreInfoTwoDiv = document.createElement('div');
                moreInfoTwoDiv.innerHTML = `
                ${characterOne.name} and ${characterTwo.name} have been in these movies together: ${characterTwo.getSameFilms(characterTwoInfo, characterOneInfo)}
                `;
                characterTwoInfoDiv.append(moreInfoTwoDiv);
            });
        
        });
    });
});
};

    const loadPage = async () => {
        let data = await getPeople('https://swapi.dev/api/');
        getCharacters(data);
      };
      
      loadPage();