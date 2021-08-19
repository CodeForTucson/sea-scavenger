// game.js
// The primary game loop for the Sea Scavenger game.
//
// Code for Tucson
// 20 September 2020

/*** Development constants ***/

// Set this constant to true to select debug code.
// (Inelegant JavaScript kludge for the lack of conditional compilation.)
const DEBUG = false;

/*** Game variables ***/

// Plastics collected is an object to keep a talley of the plastic waste 
// recovered in the missions. The properties are the field names from the 
// Combined Data Set contained in the CSV or JSON data file.
var plasticsCollected = {
    Buckets: 0,
    CigaretteButts: 0,
    Crates: 0,
    Earbuds: 0,
    FishingLine: 0,
    FishingNets: 0,
    Floats: 0,
    FoamFoodContainers: 0,
    FoamPlatesOrCups: 0,
    NylonRope: 0,
    PlasticBags: 0,
    PlasticBeverageBottles: 0,
    PlasticBottleCaps: 0,
    PlasticDrinkingStraws: 0,
    PlasticFoodContainers: 0,
    PlasticLighters: 0,
    PlasticPersonalCareProducts: 0,
    PlasticPlatesOrCups: 0,
    PlasticRings: 0,
    PlasticSheet: 0,
    PlasticStraps: 0,
    WrappersOrLabels: 0
};

// Mission is an object that is populated by the generateMission function.
// It contains the type of plastic to be collected for the mission, the 
// quantity to be collected, the product that can be made from that type of
// plastic, and six randomly selected countries - some of which will satisfy
// the mission requirements and some that won't.
var mission = {
    plasticsIndex: 0,
    plasticType: '',
    numPieces: 0,
    product: '',
    countries: {
        country1: '',
        country2: '',
        country3: '',
        country4: '',
        country5: '',
        country6: ''
    },
    plasticsCount: {
        country1: 0,
        country2: 0,
        country3: 0,
        country4: 0,
        country5: 0,
        country6: 0
    }
};

// Helper function to read JSON files from data directory.
async function getData(fileName) {
    const response = await fetch(fileName);

    return response.json();
}

// Object for plastics data derived from the Integrated Ocean Plastics dataset.
var plasticsData;

// Object for plastics data derived from Top 10 Ocean Plastics dataset.
var top10plastics;

// Object for display name lookup from plastics type key.
var plasticsKeyToDisplayName;


/*** Game Logic ***/

// initGame
// Load data files and any other actions needed to initialize gameplay.
async function initGame() {
    plasticsData = await getData('data/plastics-test.json')
    console.log(plasticsData);
    console.log(plasticsData[0]);  
}

// hideSplash
// Hides the splashscreen and displays the mission screen for the first mission.
function hideSplash() {
    let splash = document.getElementById('splashscreen');
    splash.style.display = 'none';
    newMission();
}

// newMission
// Generate a new mission and display the mission screen. This is called when the
// game first starts and when a mission has been successfully completed.
function newMission() {
    generateMission();
    displayMissionScreen();
}

// getRandomInt
// A helper function to return a random integer between 0 and a max value, non-inclusive.
// For example, if max = 3, expect getRandomInt(3) to return 0, 1, or 2.
// getRandomInt(1) will return 0.
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// generateMission
// Generate a mission for the player to complete.
// The mission will consist of a plastic type to be collected, the number of
// pieces to be collected, a product to be made from the collected plastic, and
// six countries to collect the plastic from. Some of the countries will have a
// high likelihood of being able to achieve the mission and the others will have
// a low likelihood, as determined by parsing the plastics data.
function generateMission () {
    console.log('Generating mission.');
    // TODO: Logic for populating the mission object.
    mission.plasticsIndex = getRandomInt(1);
    mission.plasticType = plasticsData[mission.plasticsIndex].plasticType;
    mission.numPieces = plasticsData[mission.plasticsIndex].medianCount;
    mission.product = plasticsData[mission.plasticsIndex].products[17];
    mission.countries.country1 = plasticsData[mission.plasticsIndex].countries[0].name;
    mission.plasticsCount.country1 = plasticsData[mission.plasticsIndex].countries[0].count;
    mission.countries.country2 = plasticsData[mission.plasticsIndex].countries[1].name;
    mission.plasticsCount.country2 = plasticsData[mission.plasticsIndex].countries[1].count;
    mission.countries.country3 = plasticsData[mission.plasticsIndex].countries[2].name;
    mission.plasticsCount.country3 = plasticsData[mission.plasticsIndex].countries[2].count;
    mission.countries.country4 = plasticsData[mission.plasticsIndex].countries[10].name;
    mission.plasticsCount.country4 = plasticsData[mission.plasticsIndex].countries[10].count;
    mission.countries.country5 = plasticsData[mission.plasticsIndex].countries[11].name;
    mission.plasticsCount.country5 = plasticsData[mission.plasticsIndex].countries[11].count;
    mission.countries.country6 = plasticsData[mission.plasticsIndex].countries[19].name;
    mission.plasticsCount.country6 = plasticsData[mission.plasticsIndex].countries[19].count;
}

var missionScreen = document.getElementById('missionscreen');

// displayMissionScreen
// Display a mission to the player. The player can choose
// whether or not to accept the mission via the mission button event listeners. 
function displayMissionScreen() {
    missionScreen.style.display = 'grid';
    document.getElementById('mission-num-pieces').textContent = mission.numPieces;
    document.getElementById('mission-plastic-type').textContent = mission.plasticType;
    document.getElementById('plastic-product').textContent = mission.product;
    document.getElementById('plastic-image').src = 'images/plastics/plastic-beverage-bottle.png';
    document.getElementById('product-image').src = 'images/products/toothbrushes.png';
}

// hideMissionScreen
// Hide the mission screen.
function hideMissionScreen() {
    missionScreen.style.display = 'none';
}

// highlightGameboard
// Highlight the six countries in the mission and display the highlighted map
// for ten seconds.
function highlightGameboard() {
    if (DEBUG === true) {
        // Shorter display period for country map while debugging.
        window.setTimeout(displayCountryScreen, 500);
    } else {
        window.setTimeout(displayCountryScreen, 10000);
    }
}

var countryScreen = document.getElementById('countryscreen');

// displayCountryScreen
// Display the country selection screen. The player selects a country via the
// country button event listeners.
function displayCountryScreen() {
    countryScreen.style.display = 'grid';
    document.getElementById('country-num-pieces').textContent = mission.numPieces;
    document.getElementById('country-plastic-type').textContent = mission.plasticType;
    document.getElementById('country-button-1').textContent = mission.countries.country1;
    document.getElementById('country-button-2').textContent = mission.countries.country2;
    document.getElementById('country-button-3').textContent = mission.countries.country3;
    document.getElementById('country-button-4').textContent = mission.countries.country4;
    document.getElementById('country-button-5').textContent = mission.countries.country5;
    document.getElementById('country-button-6').textContent = mission.countries.country6
}

// hideCountryScreen
// Hide the country selection screen. 
function hideCountryScreen() {
    countryScreen.style.display = 'none';
}

// sleep
// A helper function to add delays to data displays. Any function that
// uses this function has to be declared an async function.
// (This seemed a little cleaner than using a bunch of setTimeout 
// functions with void functions for the callback.)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var executionScreen = document.getElementById('missionexecutionscreen');

// executeMission
// Display the mission execution screen and execute the mission for the country
// selected by the player.
async function executeMission(missionString) {
    console.log(missionString);
    executionScreen.style.display = 'grid';
    let retrievedCount = mission.plasticsCount[missionString];
    document.getElementById('execution-num-pieces').textContent = mission.numPieces;
    document.getElementById('execution-plastic-type').textContent = mission.plasticType;
    document.getElementById('execution-piece-count').textContent = retrievedCount;
    // TODO: Need a lookup table from mission.plasticType to keys in plasticsCollected.
    plasticsCollected.PlasticBeverageBottles += retrievedCount;
    await sleep(5000);
    executionScreen.style.display = 'none';
    if (retrievedCount < mission.numPieces) {
        displayStatisticsScreen();
    } else {
        newMission();
    }
    
}

var confirmationScreen = document.getElementById('confirmationscreen');

// displayConfirmationScreen
// Display the player decision confirmation screen if the player declines a
// mission. The player can confirm or not confirm the decision using the
// confirmation button event listeners.
function displayConfirmationScreen() {
    confirmationScreen.style.display = 'grid';
}

// hideConfirmationScreen
// Hide the confirmation screen.
function hideConfirmationScreen() {
    confirmationScreen.style.display = 'none';
}

var statisticsScreen = document.getElementById('statisticsscreen');

// displayStatisticsScreen
// Display the game statistics to the player at the end of the game.
async function displayStatisticsScreen() {
    statisticsScreen.style.display = 'grid';
    // TODO: Logic to display Top 10 recovered plastic types and counts. 
    // TODO: Reverse lookup from plasticsCollected keys to plasticType names.
    document.getElementById('summary-plastic-type1').textContent = mission.plasticType;
    document.getElementById('summary-plastic-count1').textContent = plasticsCollected.PlasticBeverageBottles;
    await sleep(5000);
    statisticsScreen.style.display = 'none';
    displayPlayAgainScreen();
}

var playAgainScreen = document.getElementById('playagainscreen');

// displayPlayAgainScreen
// Display a prompt to the player to play the game again or not.
// The player makes a choice using the 'yes' or 'no' button event listeners.
function displayPlayAgainScreen() {
    playAgainScreen.style.display = 'grid';
}

// hidePlayAgainScreen
// Hides the play again screen.
function hidePlayAgainScreen() {
    playAgainScreen.style.display = 'none';
}

// clearGameStats
// Clear all game variables to enable a new game to be played.
function clearGameStats() {
    // TODO: Fix function to clear plasticsCollected totals.
    for (const plastic in plasticsCollected) {
        plasticsCollected[plastic] = 0;
    }
}

var creditScreen = document.getElementById('creditscreen');

// displayCreditScreen
// Displays the credit screen.
function displayCreditScreen() {
    creditScreen.style.display = 'grid';
}


/*** Event listeners to enable gameplay and control flow ***/

// Event listener that executes when the page has loaded to start the game.
// This event listener displays the splash screen for the set timeout period.
window.addEventListener('load' , event => {
    initGame();
    if (DEBUG === true) {
        // Shorter splash page timer to avoid waiting while debugging.
        window.setTimeout(hideSplash, 500);
    } else {
        window.setTimeout(hideSplash, 30000);
    }
});

// Event listener for the accept mission yes button. 
// If clicked, the gameboard will be displayed with the six countries available
// to select.
var missionYesButton = document.getElementById('mission-yes-button');
missionYesButton.addEventListener('click', event => {
    hideMissionScreen();
    highlightGameboard();
});

// Event listener for the accept mission no button. 
// If clicked, the confirmation screen will be displayed to verify the player
// doesn't want to accept the mission (ending the game).
var missionNoButton = document.getElementById('mission-no-button');
missionNoButton.addEventListener('click', event => {
    hideMissionScreen();
    displayConfirmationScreen();
});

// Event listener for country selection button 1. 
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country1Button = document.getElementById('country-button-1');
country1Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country1');
});

// Event listener for country selection button 2. 
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country2Button = document.getElementById('country-button-2');
country2Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country2');
});

// Event listener for country selection button 3.
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country3Button = document.getElementById('country-button-3');
country3Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country3');
});

// Event listener for country selection button 4.
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country4Button = document.getElementById('country-button-4');
country4Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country4');
});

// Event listener for country selection button 5.
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country5Button = document.getElementById('country-button-5');
country5Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country5');
});

// Event listener for country selection button 6.
// If clicked, the mission execution screen will be displayed for the selected
// country.
var country6Button = document.getElementById('country-button-6');
country6Button.addEventListener('click', event => {
    hideCountryScreen();
    executeMission('country6');
});

// Event listener for the confirmation screen 'yes' button.
// If clicked, the game statistics screen will be displayed.
var confirmYesButton = document.getElementById('confirm-yes-button');
confirmYesButton.addEventListener('click', event => {
    hideConfirmationScreen();
    displayStatisticsScreen();
});

// Event listener for the confirmation screen 'no' button. 
// If clicked, the mission screen will be displayed without generating a new
// mission. (The mission the player rejected will be displayed again, in order
// to prevent gaming the logic by rejecting a mission and generating a new one.)
var confirmNoButton = document.getElementById('confirm-no-button');
confirmNoButton.addEventListener('click', event => {
    hideConfirmationScreen();
    displayMissionScreen();
});

// Event listener for the play again screen 'yes' button.
// If clicked, a new game will be started, bypassing the spash screen.
var playAgainYesButton = document.getElementById('play-again-yes-button');
playAgainYesButton.addEventListener('click', event => {
    hidePlayAgainScreen();
    clearGameStats();
    generateMission();
    displayMissionScreen();
});

// Event listener for the play again screen 'no' button.
// If clicked. the credit screen will be displayed.
var playAgainNoButton = document.getElementById('play-again-no-button');
playAgainNoButton.addEventListener('click', event => {
    hidePlayAgainScreen();
    displayCreditScreen();
});