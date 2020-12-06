// game.js
// The primary game loop for the Sea Scavenger game.
//
// Code for Tucson
// 20 September 2020

// *** Game variables. ***
let missionsCompleted = 0;

// Plastics collected is an object to keep a talley of the plastic waste 
// recovered in the missions. The properties are the field names from the 
// Combined Data Set contained in the CSV or JSON data file.
let plasticsCollected = {
    BucketOrCrate: 0,
    BuoysAndFloats: 0,
    CigaretteButts: 0,
    FishingGlowSticks: 0,
    FishingLineLureRope: 0,
    FishingNet: 0,
    LollipopStickOrEarBud: 0,
    Plastic_Beverage_Bottle: 0,
    Plastic_FoamFoodContainer: 0,
    PlasticBag: 0,
    PlasticBottleCapOrLid: 0,
    PlasticDrinkingStraw: 0,
    PlasticLighter: 0,
    PlasticOrFoamPlatesCupsSilverware: 0,
    PlasticPersonalCareProduct: 0,
    PlasticSheet: 0,
    PlasticStraps: 0,
    StringRingRibbon: 0,
    WrapperOrLabel: 0
};

// Mission is an object that is populated by the generateMission function.
// It contains the type of plastic to be collected for the mission, the 
// quantity to be collected, the product that can be made from that type of
// plastic, and six randomly selected countries - some of which will satisfy
// the mission requirements and some that won't.
let mission = {
    plasticType: "",
    numPieces: 0,
    product: "",
    countries: {
        country1: "",
        country2: "",
        country3: "",
        country4: "",
        country5: "",
        country6: ""
    }
};

// hideSplash
// Hides the splashscreen and displays the mission screen for the first mission.
function hideSplash() {
    let splash = document.getElementById("splashscreen");
    splash.style.display = "none";
    generateMission();
    displayMissionScreen();
}

// generateMission
// Generate a mission for the player to complete.
// The mission will consist of a plastic type to be collected, the number of
// pieces to be collected, a product to be made from the collected plastic, and
// six countries to collect the plastic from. Some of the countries will have a
// high likelihood of being able to achieve the mission and the others will have
// a low likelihood, as determined by parsing the plastics data.
function generateMission () {
    console.log("Generating mission.");
    // TODO: Logic for populating the mission object.
    mission.plasticType = "PLASTIC";
    mission.numPieces = 999999;
    mission.product = "SUNGLASSES",
    mission.countries = {
        country1: "US",
        country2: "Canada",
        country3: "Mexico",
        country4: "China",
        country5: "Japan",
        country6: "Thailand"
    };
}

let missionScreen = document.getElementById("missionscreen");

// displayMissionScreen
// Display a mission to the player. The player can choose
// whether or not to accept the mission via the mission button event listeners. 
function displayMissionScreen() {
    missionScreen.style.display = "grid";
}

// hideMissionScreen
// Hide the mission screen.
function hideMissionScreen() {
    missionScreen.style.display = "none";
}

// highlightGameboard
// Highlight the six countries in the mission and display the highlighted map
// for ten seconds.
function highlightGameboard() {
//    window.setTimeout(displayCountryScreen, 10000);
    window.setTimeout(displayCountryScreen, 500);
}

let countryScreen = document.getElementById("countryscreen");

// displayCountryScreen
// Display the country selection screen. The player selects a country via the
// country button event listeners.
function displayCountryScreen() {
    countryScreen.style.display = "grid";
}

// hideCountryScreen
// Hide the country selection screen. 
function hideCountryScreen() {
    countryScreen.style.display = "none";
}

// sleep
// A helper function to add delays to data displays. Any function that
// uses this function has to be declared an async function.
// (This seemed a little cleaner than using a bunch of setTimeout 
// functions with void functions for the callback.)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let executionScreen = document.getElementById("missionexecutionscreen");

// executeMission
// Display the mission execution screen and execute the mission for the country
// selected by the player.
async function executeMission(missionString) {
    console.log(missionString);
    executionScreen.style.display = "grid";
    await sleep(5000);
    executionScreen.style.display = "none";
    displayStatisticsScreen();
}

let confirmationScreen = document.getElementById("confirmationscreen");

// displayConfirmationScreen
// Display the player decision confirmation screen if the player declines a
// mission. The player can confirm or not confirm the decision using the
// confirmation button event listeners.
function displayConfirmationScreen() {
    confirmationScreen.style.display = "grid";
}

// hideConfirmationScreen
// Hide the confirmation screen.
function hideConfirmationScreen() {
    confirmationScreen.style.display = "none";
}

let statisticsScreen = document.getElementById("statisticsscreen");

// displayStatisticsScreen
// Display the game statistics to the player at the end of the game.
async function displayStatisticsScreen() {
    statisticsScreen.style.display = "grid";
    await sleep(5000);
    statisticsScreen.style.display = "none";
    displayPlayAgainScreen();
}

let playAgainScreen = document.getElementById("playagainscreen");

// displayPlayAgainScreen
// Display a prompt to the player to play the game again or not.
// The player makes a choice using the 'yes' or 'no' button event listeners.
function displayPlayAgainScreen() {
    playAgainScreen.style.display = "grid";
}

// hidePlayAgainScreen
// Hides the play again screen.
function hidePlayAgainScreen() {
    playAgainScreen.style.display = "none";
}

// clearGameStats
// Clear all game variables to enable a new game to be played.
function clearGameStats() {
    missionsCompleted = 0;
    for (plastic in plasticsCollected) {
        plastic = 0;
    }
}

let creditScreen = document.getElementById("creditscreen");

// displayCreditScreen
// Displays the credit screen.
function displayCreditScreen() {
    creditScreen.style.display = "grid";
}


// *** Event listeners to enable gameplay and control flow. ***

// Event listener that executes when the page has loaded to start the game.
// This event listener displays the splash screen for the set timeout period.
window.addEventListener("load" , event => {
//    window.setTimeout(hideSplash, 30000);
    window.setTimeout(hideSplash, 500);
});

// Event listener for the accept mission yes button. 
// If clicked, the gameboard will be displayed with the six countries available
// to select.
let missionYesButton = document.getElementById("mission-yes-button");
missionYesButton.addEventListener("click", event => {
    hideMissionScreen();
    highlightGameboard();
});

// Event listener for the accept mission no button. 
// If clicked, the confirmation screen will be displayed to verify the player
// doesn't want to accept the mission (ending the game).
let missionNoButton = document.getElementById("mission-no-button");
missionNoButton.addEventListener("click", event => {
    hideMissionScreen();
    displayConfirmationScreen();
});

// Event listener for country selection button 1. 
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country1Button = document.getElementById("country-button-1");
country1Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country1");
});

// Event listener for country selection button 2. 
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country2Button = document.getElementById("country-button-2");
country2Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country2");
});

// Event listener for country selection button 3.
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country3Button = document.getElementById("country-button-3");
country3Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country3");
});

// Event listener for country selection button 4.
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country4Button = document.getElementById("country-button-4");
country4Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country4");
});

// Event listener for country selection button 5.
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country5Button = document.getElementById("country-button-5");
country5Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country5");
});

// Event listener for country selection button 6.
// If clicked, the mission execution screen will be displayed for the selected
// country.
let country6Button = document.getElementById("country-button-6");
country6Button.addEventListener("click", event => {
    hideCountryScreen();
    executeMission("country6");
});

// Event listener for the confirmation screen 'yes' button.
// If clicked, the game statistics screen will be displayed.
let confirmYesButton = document.getElementById("confirm-yes-button");
confirmYesButton.addEventListener("click", event => {
    hideConfirmationScreen();
    displayStatisticsScreen();
});

// Event listener for the confirmation screen 'no' button. 
// If clicked, the mission screen will be displayed without generating a new
// mission. (The mission the player rejected will be displayed again, in order
// to prevent gaming the logic by rejecting a mission and generating a new one.)
let confirmNoButton = document.getElementById("confirm-no-button");
confirmNoButton.addEventListener("click", event => {
    hideConfirmationScreen();
    displayMissionScreen();
});

// Event listener for the play again screen 'yes' button.
// If clicked, a new game will be started, bypassing the spash screen.
let playAgainYesButton = document.getElementById("play-again-yes-button");
playAgainYesButton.addEventListener("click", event => {
    hidePlayAgainScreen();
    clearGameStats();
    generateMission();
    displayMissionScreen();
});

// Event listener for the play again screen 'no' button.
// If clicked. the credit screen will be displayed.
let playAgainNoButton = document.getElementById("play-again-no-button");
playAgainNoButton.addEventListener("click", event => {
    hidePlayAgainScreen();
    displayCreditScreen();
});