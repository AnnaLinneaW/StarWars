
async function getPeople(endpoint) {
    let data = await fetch(endpoint);
    let json = await data.json();
    return json;
}

class Character {
    constructor(name, gender, height, mass, hair_color, skinColor, eyeColor, movies, pictureUrl) {
        this.name = name;
        this.gender = gender;
        this.height = height;
        this.mass = mass;
        this.hair_color = hair_color;
        this.skinColor = skinColor;
        this.eyeColor = eyeColor;
        this.movies = [];
        this.pictureUrl = pictureUrl;
    }
};

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
        
        //skapa objekt av klassen Character

        let characterOne = new Character(
            characterOneInfo.name,
            characterOneInfo.gender,
            characterOneInfo.height,
            characterOneInfo.mass,
            characterOneInfo.hair_color,
            characterOneInfo.skinColor,
            characterOneInfo.eyeColor,
            characterOneInfo.pictureUrl,
            );
            let characterTwo = new Character(
                characterTwoInfo.name,
                characterTwoInfo.gender,
                characterTwoInfo.height,
                characterTwoInfo.mass,
                characterTwoInfo.hair_color,
                characterTwoInfo.skinColor,
                characterTwoInfo.eyeColor,
                characterTwoInfo.pictureUrl,
                );
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
<ol id="movieOne">Films:</ol>
</div>`


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
<ol id="movieTwo">Films:</ol>
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
        });
    });
    };



    const loadPage = async () => {
        let data = await getPeople('https://swapi.dev/api/');
        getCharacters(data);
      };
      
      loadPage();