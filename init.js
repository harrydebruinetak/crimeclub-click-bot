let rank = "unknown";
let health = "unknown";
let carsGarage = "unknown";
let currentState = "unknown";
let cash = "unknown";
let bank = "unknown";
let bombTimeString = "unknown";
let bribeTimeString = "unknown";
let weaponTraining = "unknown";
let smuggleValue = '825';
let isPremium = false;

let minWaitDelay = 9999;
let cashBankThreshold = 7000000;
let famDonateThreshold = 40000000;

let enablePrison = false;
let enablePimp = false;
let enableGym = false;
let enableVehicles = false;
let enableCrimes = false;
let enableWeapon = false;
let enableHeal = false;
let enableCrushConvert = false;
let enableBomb = false;
let enableSmuggle = false;
let enableAutoBank = false;
let enableAutoFam = false;
let enableBribe = false;

let bombImageUrl = 'https://ibin.co/3uxNoEYABs3p.png';

let disable = false;

let possibleRanks = ["Scum", "Pee Wee", "Thug", "Gangster", "Hitman", "Assassin", "Boss", "Godfather", "Legendary Godfather", "Don", "Respectable Don", "Legendary Don"];

let needToBuyLiquor = false;
let needToBuyDrugs = false;

function initBot() {
       chrome.storage.sync.get(['smuggle'], (result) => {
              if (result.smuggle != null) {
                     needToBuyLiquor = !result.smuggle.liquor;
                     needToBuyDrugs = !result.smuggle.drugs;
              } else {
                     needToBuyLiquor = true;
                     needToBuyDrugs = true;
              }
              console.log("Need liquor: ", needToBuyLiquor);
              console.log("Need drug: ", needToBuyDrugs);
       });

       chrome.storage.sync.get(['weapon'], (result) => {
              if (result.weapon != null) {
                     weaponTraining = !result.weapon.percentage;
              } else {
                     weaponTraining = '0%';
              }
              console.log("weaponTraining: ", weaponTraining);
       });

       chrome.storage.sync.get(['key'], (result) => {
              disable = result.key.disable;
              enablePrison = result.key.prison;
              enablePimp = result.key.pimp;
              enableGym = result.key.gym;
              enableVehicles = result.key.vehicles;
              enableCrimes = result.key.crimes;
              enableHeal = result.key.heal;
              enableWeapon = result.key.weapon;
              enableCrushConvert = result.key.crushandconvert;
              enableBomb = result.key.bomb;
              enableSmuggle = result.key.smuggle;
              enableAutoBank = result.key.bank;
              enableAutoFam = result.key.fam;
              enableBribe = result.key.bribe;
       });

       chrome.storage.sync.get(['bombs'], (result) => {
              if (result.bombs == null) {
                     bombTimeString = "Nu!";
              } else {
                     bombTimeString = result.bombs.timestring;
              }
              console.log("Bomb time: ", bombTimeString);
       });

       chrome.storage.sync.get(['bribe'], (result) => {
              if (result.bribe == null) {
                     bribeTimeString = "Nu!";
              } else {
                     bribeTimeString = result.bribe.timestring;
              }
              console.log("Bribe time: ", bribeTimeString);
       });

       chrome.storage.sync.get(['cars'], (result) => {
              if (result.cars == null) {
                     let store = {
                            number: 0
                     }
                     chrome.storage.sync.set({ cars: store }, () => {
                            carsGarage = 0;
                     });
              } else {
                     carsGarage = result.cars.number;
              }
              console.log("In garage: ", carsGarage);
       });
}
