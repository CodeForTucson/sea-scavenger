// game.js
// The primary game loop for the Sea Scavenger game.
//
// Code for Tucson
// 20 September 2020

// Game variables.
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
    Other_Plastic_Bottle: 0,
    OtherFoamPlasticDebris: 0,
    OtherHardPlastic: 0,
    OtherPlasticDebris: 0,
    OtherPlasticFishingDebris: 0,
    OtherSoftPlastic: 0,
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

window.onload = function() {
//    alert("The game loop is running!");
}