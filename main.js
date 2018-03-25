initBot();
$(document).ready(() => {

       if (disable) {
              return;
       }
       readStats();

       let time = new Date().getHours();
       if (time >= 1 && time <= 6) {
              reloadPageWithDelay(3600000);
              return;
       }
       setTimeout(() => {
              window.location.href = 'https://www.cclub.nl/gevangenis.php';
       }, 120000)

       setTimeout(() => {

              let jailSleepytime = randomNumber(3000, 7000);
              if ($("#cdgevang").length) {
                     if (enablePrison) {
                            reloadPageWithDelay(randomNumber(2000, 3000));
                     } else {
                            reloadPageWithDelay(jailSleepytime);
                     }
                     return;
              }
              if ($("#cdreis").length) {
                     let travelDelay = ($("#cdreis")[0].innerHTML * 1000) + 2000;
                     reloadPageWithDelay(travelDelay);
                     return;
              }
              setTimeout(() => {
                     let hasSet = setRoute();
                     console.log("HASSET: ", hasSet);
                     if (!hasSet) {
                            let didAction = checkActionToExecuteBasedOnUrl();
                            console.log("didAction: ", hasSet);

                            if (!didAction) {
                                   reloadPageWithDelay(minWaitDelay);
                            }
                     }

              }, randomNumber(0, 150));
       }, 150);

});

function reloadPageWithDelay(delay) {
       console.log("REloading page in: ", delay)
       let possibilities = ["https://www.cclub.nl/famlist.php",
              "https://www.cclub.nl/status.php",
              "https://www.cclub.nl/leden.php",
              "https://www.cclub.nl/markt.php",
              "https://www.cclub.nl/ranksscore.php",
              "https://www.cclub.nl/missies.php",
              "https://www.cclub.nl/inbox.php",
              "https://www.cclub.nl/bezittingenbeheer.php"]
       setTimeout(() => {
              let index = randomNumber(0, possibilities.length - 1);
              window.location.href = possibilities[index];
       }, delay)
}

function readStats() {
       setDonateStatus();
       setLeven();
       setRank();
       setMinWaitTime();
       setState();
       setCash();
       setBank();
       setPremiumVariables();
}

function setPremiumVariables() {
       if (isPremium) {
              let smuggleValue = '1100';
       }
}

function setDonateStatus() {
       if (document.querySelectorAll(".menu").length > 0) {
              if (document.querySelectorAll(".menu")[37].children[0].children[0].children[0].style.color === 'rgb(152, 85, 212)') {
                     isPremium = true;
              }
              console.log("PREMIUM: ", isPremium);
       }
}

function setMinWaitTime() {
       minWaitDelay = (getMinWaitingTime() * 1000) + 2000;
}

function setLeven() {
       if (document.querySelectorAll(".menu").length > 0) {
              let levenMenuItem = document.querySelectorAll(".menu")[44].innerText;
              var res = levenMenuItem.split("Leven:");
              health = res[1];
              health = health.replace(/(\r\n\t|\n|\r\t)/gm, "");
              console.log("LEVEN: ", health);
       }
}

function setRank() {
       if (document.querySelectorAll(".menu").length > 0) {
              let menuItem = document.querySelectorAll(".menu")[40].innerText
              var res = menuItem.split("Rank: ");
              rank = res[1];
              console.log("RANK: ", rank)
       }

}

function setState() {
       if (document.querySelectorAll(".menu").length > 0) {
              let menuItem = document.querySelectorAll(".menu")[39].innerText
              var res = menuItem.split("Staat: ");
              currentState = res[1];
              console.log("State: ", currentState)
       }
}

function setCash() {
       if (document.querySelectorAll(".menu").length > 0) {
              let menuItem = document.querySelectorAll(".menu")[41].innerText
              var res = menuItem.split("Contant: $");
              cash = parseInt(res[1].replace(/,/g, ""));
              console.log("cash:", cash)
       }
}

function setBank() {
       if (document.querySelectorAll(".menu").length > 0) {
              let menuItem = document.querySelectorAll(".menu")[42].innerText
              var res = menuItem.split("Bank: $");
              bank = parseInt(res[1].replace(/,/g, ""));
              console.log("Bank: ", bank);
       }
}


function canPimp() {
       return rank !== "Scum" && rank !== "Pee Wee" && rank !== "Thug";
}

function canHeavyCrime() {
       return canPimp() && rank !== "Gangster" && rank !== "Hitman";
}

function checkActionToExecuteBasedOnUrl() {
       let executed = false;
       executed = executed || handleLiquor();
       executed = executed || handleDrugs();
       executed = executed || travel();
       executed = executed || stealVehicle();
       executed = executed || doCrime();
       executed = executed || pimpHooker();
       executed = executed || doBribe();
       executed = executed || doHeal();
       executed = executed || prison();
       executed = executed || trainWeapon();
       executed = executed || trainGym();
       executed = executed || doCrushAndConvert();
       executed = executed || setBombTimer();
       executed = executed || bombsAway();
       executed = executed || autoBank();
       executed = executed || autoFamDonate();
       executed = executed || doLogin();
       return executed;
}

function doLogin() {
       if (window.location.href === "https://www.cclub.nl/login.php") {
              console.log("JE MOEDER: ", document.querySelectorAll('input[value][type="submit"]')[0]);
              document.querySelectorAll('input[value][type="submit"]')[0].click();

              // setTimeout(() => {
              // }, 1000);
              return true;
       }
       return false;
}

function autoBank() {
       if (!enableAutoBank) {
              return false;
       }
       if (window.location.href === 'https://www.cclub.nl/bank.php') {
              if (cash > cashBankThreshold) {
                     $("#bedrg")[0].value = 2500000;
                     document.querySelectorAll('input[value][type="submit"]')[0].click();
                     return true;
              }
       }
       return false;
}

function autoFamDonate() {
       if (!enableAutoFam) {
              return false;
       }
       if (window.location.href === 'https://www.cclub.nl/famdonate.php') {
              if (bank > famDonateThreshold) {
                     $("#bedrag")[0].value = 10000000;
                     document.querySelectorAll('input[value][type="submit"]')[0].click();
                     return true;
              }
       }
       return false;
}

function travel() {
       if (!enableSmuggle) {
              return false;
       }
       if (needToBuyDrugs || needToBuyLiquor) {
              return false;
       }
       if (window.location.href === 'https://www.cclub.nl/reizen.php') {
              let radios = document.querySelectorAll('input[value][type="radio"]');
              if (currentState === 'Louisiana') {
                     // radios[0].click();
              }
              if (currentState === 'Illinois') {
                     radios[2].click();
              }
              if (currentState === 'Colorado') {
                     radios[4].click();
              }
              if (currentState === 'Pennsylvania') {
                     radios[5].click();
              }
              setSmuggleState('drugs', false);

              setTimeout(() => {
                     setSmuggleState('liquor', false);
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="submit"]')[0].click();
                     }, randomNumber(10, 10000));
              }, 20)


              return true;
       }
       return false;
}

function handleDrugs() {
       if (!enableSmuggle) {
              return false;
       }
       if (!needToBuyDrugs) {
              return false;
       }
       if (window.location.href === 'https://www.cclub.nl/drugs.php') {
              solveImageCaptcha();
              let tds = document.querySelectorAll('.inhoud');
              let buy = true;
              for (let i = 0; i < tds.length; i++) {
                     if (tds[i].innerHTML.includes('drugs dragen, dus nog (<b>0</b>) bi')) {
                            buy = false;
                     }
              }
              if (buy) {
                     buyDrugs();
              } else {
                     sellDrugs();
              }
              return true;
       }
       return false;
}

function buyDrugs() {
       if (currentState === 'Louisiana') {
              document.querySelectorAll('.code')[2].value = '1100';
       }
       if (currentState === 'Illinois') {
              document.querySelectorAll('.code')[1].value = '1100';
       }
       if (currentState === 'Colorado') {
              document.querySelectorAll('.code')[4].value = '1100';
       }
       if (currentState === 'Pennsylvania') {
              document.querySelectorAll('.code')[5].value = '1100';
       }
       setSmuggleState('drugs', true);
       setTimeout(() => {
              document.querySelectorAll('.code')[6].click();
       }, 100);

}

function sellDrugs() {
       if (currentState === 'Louisiana') {
              document.querySelectorAll('.code')[5].value = '1100';
       }
       if (currentState === 'Illinois') {
              document.querySelectorAll('.code')[2].value = '1100';
       }
       if (currentState === 'Colorado') {
              document.querySelectorAll('.code')[1].value = '1100';
       }
       if (currentState === 'Pennsylvania') {
              document.querySelectorAll('.code')[4].value = '1100';
       }
       setTimeout(() => {
              document.querySelectorAll('.code')[7].click();
       }, 100);
}

function handleLiquor() {
       if (!enableSmuggle) {
              return false;
       }
       if (!needToBuyLiquor) {
              return false;
       }
       if (window.location.href === 'https://www.cclub.nl/dranksmokkel.php') {
              solveImageCaptcha();
              let tds = document.querySelectorAll('.inhoud');
              let buy = true;
              for (let i = 0; i < tds.length; i++) {
                     if (tds[i].innerHTML.includes('drank dragen, dus nog (<b>0</b>) bi')) {
                            buy = false;
                     }
              }
              if (buy) {
                     buyLiquor();
              } else {
                     sellLiquor();
              }
              return true;
       }
       return false;
}

function buyLiquor() {
       if (currentState === 'Louisiana') {
              document.querySelectorAll('.code')[4].value = '1100';
       }
       if (currentState === 'Illinois') {
              document.querySelectorAll('.code')[1].value = '1100';
       }
       if (currentState === 'Colorado') {
              document.querySelectorAll('.code')[3].value = '1100';
       }
       if (currentState === 'Pennsylvania') {
              document.querySelectorAll('.code')[2].value = '1100';
       }
       setSmuggleState('liquor', true);
       setTimeout(() => {
              document.querySelectorAll('.code')[6].click();
       }, 100);

}

function sellLiquor() {
       if (currentState === 'Louisiana') {
              document.querySelectorAll('.code')[2].value = '1100';
       }
       if (currentState === 'Illinois') {
              document.querySelectorAll('.code')[4].value = '1100';
       }
       if (currentState === 'Colorado') {
              document.querySelectorAll('.code')[1].value = '1100';
       }
       if (currentState === 'Pennsylvania') {
              document.querySelectorAll('.code')[3].value = '1100';
       }
       setTimeout(() => {
              document.querySelectorAll('.code')[7].click();
       }, 100);
}

function setSmuggleState(key, val) {
       chrome.storage.sync.get(['smuggle'], (result) => {
              let storage = result.smuggle;
              if (storage == null) {
                     storage = {
                            'liquor': false,
                            'drugs': false,
                     }
              }
              storage[key] = val;
              console.log("STORE: ", storage);
              chrome.storage.sync.set({ smuggle: storage }, () => {
              });
       });

}

function solveImageCaptcha() {
       let images = document.querySelectorAll('.answer');
       if (images.length === 0) {
              return;
       }
       let answer = 0;
       for (let i = 1; i < images.length; i++) {
              if (getBase64(images[0]) === getBase64(images[i])) {
                     answer = i;
              }
       }
       images[answer].click();
}

function getBase64(img) {
       var canvas = document.createElement("canvas");
       canvas.width = img.width;
       canvas.height = img.height;
       var ctx = canvas.getContext("2d");
       ctx.drawImage(img, 0, 0);
       return canvas.toDataURL("image/png");

}

function setBombTimer() {
       if (!enableBomb) {
              return false;
       }
       if (window.location.href.startsWith("https://www.cclub.nl/plattegrond.php?p=plattegrond&staat=10&id=")) {
              let store = {
                     'seconds': 0,
                     'timestring': 'unknown'
              }

              let alltds = document.querySelectorAll('td');
              for (let i = 0; i < alltds.length; i++) {
                     if (alltds[i].innerHTML.includes('Je moet nog') && alltds[i].classList.contains('inhoud')) {
                            let secondsRemaining = alltds[i].innerHTML.split("Je moet nog <b>")[1].split("</b> seconden wachten voordat je weer kan bombarderen")[0];
                            store.seconds = secondsRemaining;
                            store.timestring = getFormattedTimeFromNow(secondsRemaining);
                            chrome.storage.sync.set({ bombs: store }, () => {
                            });
                            return false;
                     }
              }
              let shouldResetTimer = true;
              for (let i = 0; i < alltds.length; i++) {
                     if (alltds[i].innerHTML.includes('Je kunt een landje van een speler bombarderen. Kans op succes han') && alltds[i].classList.contains('inhoud')) {
                            shouldResetTimer = false;
                            if (getBombardmentWaitSecondsRemaining() <= 0) {
                                   resetBombTimer(store);
                                   document.querySelectorAll('input')[0].value = 5;
                                   document.querySelectorAll('input[value][type="submit"]')[0].click();
                                   return true;
                            }
                     }

              }
              if (shouldResetTimer) {
                     resetBombTimer(store);
              }
       }
       return false;
}

function resetBribeTimer(seconds) {
       console.log("RESET BRIB TIMER: ", seconds);
       let store = {
       }
       store.seconds = seconds;
       store.timestring = getFormattedTimeFromNow(seconds);
       chrome.storage.sync.set({ bribe: store });
}

function resetBombTimer(store) {
       store.seconds = 600;
       store.timestring = getFormattedTimeFromNow(600);
       chrome.storage.sync.set({ bombs: store });
}

function getFormattedTimeFromNow(seconds) {
       let now = new Date();
       now.setSeconds(now.getSeconds() + parseInt(seconds));
       let timeString = now.toTimeString();
       return timeString.split(' ')[0];
}

function bombsAway() {
       if (!enableBomb) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/plattegrond.php?staat=10") {
              if (getBombardmentWaitSecondsRemaining() > 0) {
                     return false;
              }
              let areas = document.querySelectorAll('area');
              let foundDivs = document.querySelectorAll('div');
              let counter = 0;
              //getal is hier aantal zelf toegevoegd menu items + 1
              // 4 is geizen het aantal vakjes in menu teogevoegd dus als nog meer dan dit cijfer ophogen.
              let possibilities = [];
              for (let i = 5; i < foundDivs.length; i++) {
                     if (!foundDivs[i].style.backgroundImage.split('url(')[1].includes(bombImageUrl)) {
                            possibilities.push(areas[i - 5]);
                            // console.log(areas[i - 5].click());
                            counter++;
                            // break;
                     }
              }
              if (possibilities.length > 0) {
                     let randArea = randomNumber(0, possibilities.length - 1);
                     possibilities[randArea].click();
              }
              if (counter == 0) {
                     let store = {
                            'seconds': 0,
                            'timestring': 'unknown'
                     }
                     resetBombTimer(store);
              }

              return false;
       }
       return false;
}

function doCrushAndConvert() {
       if (!enableCrushConvert) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/garage.php") {
              let links = document.querySelectorAll('a');
              for (let i = 0; i < links.length; i++) {
                     if (links[i].innerHTML.includes('Alles Crushen en Converten')) {
                            let store = {
                                   number: 0
                            }
                            chrome.storage.sync.set({ cars: store }, () => {
                            });
                            if (document.querySelectorAll('center').innerHTML !== "Je hebt 0 auto's in je garage.") {
                                   links[i].click();
                                   return true;
                            }
                     }
              }
       }
       return false;
}

function prison() {
       console.log(minWaitDelay);
       if (!enablePrison) {
              return false;
       }
       if (minWaitDelay < 1000) {
              return false;
       }
       if (window.location.href.includes("https://www.cclub.nl/gevangenis.php")) {
              discoverPrison();
              let links = document.querySelectorAll('a');
              let counter = 0;
              for (let i = links.length - 1; i >= 0; i--) {
                     if (links[i].text.includes("Breek uit")) {
                            counter++;
                            links[i].click();
                            return;
                     }
              }
              reloadPageWithDelay(randomNumber(500, 700));
       }
       return false;
}

function discoverPrison() {
       if (!window.location.href.includes('https://www.cclub.nl/gevangenis.php')) {
              return;
       }
       let prisonColumns = document.querySelectorAll(".inhoud_c");
       let superCounter = 0;
       for (let i = 2; i < prisonColumns.length;) {
              superCounter++;
              i = i + 4;
       }
       console.log("IN PRISON :", superCounter);
       let prisonNames = document.querySelectorAll(".inhoud");
       let people = [];
       let superCounter2 = 0;
       for (let i = 12; i < prisonNames.length; i++) {
              if (superCounter > 0) {
                     people.push(prisonNames[i]);
                     superCounter2++;

                     superCounter--;
              }
       }
       console.log(people);
}

function doHeal() {
       if (!enableHeal) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/ziekenhuis.php") {
              if (health !== '100%') {
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="submit"]')[0].click();
                     }, randomNumber(250, 500));
                     return true;
              }
       }
       return false;
}

function trainGym() {
       if (!enableGym) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/sportschool.php") {
              if (!$("#cdsportschool2").length) {
                     let option = randomNumber(0, 2);
                     if (document.querySelectorAll('input[value][type="submit"]').length < 3) {
                            return false;
                     }
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="submit"]')[2].click();
                     }, randomNumber(250, 500));
                     return true;
              }
       }
       return false;
}

function trainWeapon() {
       if (!enableWeapon) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/wapenervaring.php") {
              if (!$("#cdwapenervaring2").length) {
                     if (document.querySelectorAll('input[value][type="submit"]').length === 0) {
                            return false;
                     }
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="submit"]')[0].click();
                     }, randomNumber(250, 500));
                     return true;
              }
       }
       return false;
}

function doBribe() {
       if (!enableSmuggle || !enableBribe) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/rld.php") {
              if (getBribeWaitSecondsRemaining() <= 0) {
                     let inhouds = document.querySelectorAll('.inhoud');
                     let bribe = false;
                     for (let i = 0; i < inhouds.length; i++) {
                            if (inhouds[i].innerHTML.includes('Koop de douane om')) {
                                   bribe = true;
                            }
                     }
                     if (bribe) {
                            document.querySelectorAll('.code')[1].value = 250;
                            setTimeout(() => {
                                   resetBribeTimer(180);
                                   document.querySelectorAll('input[value][type="submit"]')[1].click();
                            }, 200);
                            return true;
                     } else {
                            resetBribeTimer(180);
                     }
                     return false;
              }
       }
       return false;
}

function pimpHooker() {
       if (!enablePimp) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/rld.php") {
              if (currentState === 'Louisiana' && !enableSmuggle) {
                     let text = document.querySelectorAll(".container")[1].innerText;
                     let aantalHoeren = parseInt(text.split("Je kunt nog")[1].split(" hoeren achter")[0]);
                     aantalHoeren = Math.max(0, aantalHoeren - 250);
                     if (aantalHoeren !== 0 && document.querySelectorAll(".container")[0].innerText.includes("geen hoeren in de voorbereidin")) {
                            document.querySelectorAll(".container")[1].querySelectorAll('input')[0].value = aantalHoeren;
                            let jaja = document.querySelectorAll(".container")[1].querySelectorAll('input[value][type="submit"]');
                            if (jaja.length == 1) {
                                   document.querySelectorAll(".container")[1].querySelectorAll('input[value][type="submit"]')[0].click();
                            } else {
                                   document.querySelectorAll(".container")[1].querySelectorAll('input[value][type="submit"]')[1].click();
                            }
                            return true;
                     }
              }
              if (!$("#cdhoerenpimpen2").length) {
                     if (document.querySelectorAll('input[value][type="submit"]').length === 0) {
                            return false;
                     }
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="submit"]')[0].click();
                     }, randomNumber(250, 500));
                     return true;
              }
       }
       return false;
}

function doCrime() {
       if (!enableCrimes) {
              return false;
       }
       if (window.location.href === "https://www.cclub.nl/misdaad.php") {
              if (isPremium) {
                     let buttons = document.querySelectorAll('input[value][type="submit"]');
                     for (let i = 0; i < buttons.length; i++) {
                            if (buttons[i].value === 'Ontsnap!') {
                                   buttons[i].click();
                                   return false;
                            }
                     }
              }
              if (!$("#cdmisdaad_s2").length || !$("#cdmisdaad_g2").length) {
                     if (document.querySelectorAll('input[value][type="submit"]').length === 0) {
                            return false;
                     }
                     setTimeout(() => {
                            document.querySelectorAll('input[value][type="checkbox"]')[0].checked = false;
                            document.querySelectorAll('input[value][type="checkbox"]')[1].checked = false;
                            document.querySelectorAll('input[value][type="checkbox"]')[2].checked = false;
                            if (rank === 'Legendary Don') {
                                   document.querySelectorAll('input[value][type="checkbox"]')[3].checked = true;
                            } else {
                                   document.querySelectorAll('input[value][type="checkbox"]')[3].checked = false;
                            }
                            if (canHeavyCrime()) {
                                   document.querySelectorAll('input[value][type="checkbox"]')[4].checked = true;
                            } else {
                                   document.querySelectorAll('input[value][type="checkbox"]')[4].checked = false;
                            }
                            document.querySelectorAll('input[value][type="checkbox"]')[5].checked = true;
                            document.querySelectorAll('input[value][type="submit"]')[0].click();
                     }, randomNumber(250, 500));
                     return true;
              }
       }
       return false;
}


function stealVehicle() {
       if (!enableVehicles) {
              return false;
       }

       if (window.location.href === "https://www.cclub.nl/voertuigstelen.php") {
              checkIfCarStolen();
              if (!$("#cdauto_s2").length) {
                     if (document.querySelectorAll('input[value][type="submit"]').length === 0) {
                            return false;
                     }
                     setTimeout(() => {
                            let inputField = Math.round((Math.random() * 1));
                            document.querySelectorAll('input[value][type="submit"]')[inputField].click();
                     }, randomNumber(250, 500));
                     return true;
              } else if (!$("#cdauto_g3").length) {
                     if (canHeavyCrime()) {
                            if (document.querySelectorAll('input[value][type="submit"]').length === 0) {
                                   return false;
                            }
                            setTimeout(() => {
                                   let inputField = Math.round((Math.random() * 1)) + 2;
                                   document.querySelectorAll('input[value][type="submit"]')[inputField].click();
                            }, randomNumber(250, 500));
                            return true;
                     }
              }
       }
       return false;
}

function checkIfCarStolen() {
       let images = document.querySelectorAll('img');
       for (let i = 0; i < images.length; i++) {
              if (images[i].src.includes("vink")) {
                     chrome.storage.sync.get(['cars'], (result) => {
                            let toStore = result.cars;
                            if (toStore.number == null) {
                                   toStore.number = 0;
                            } else {
                                   toStore.number = toStore.number + 1;
                            }
                            chrome.storage.sync.set({ cars: toStore }, function () {
                            });
                     });

              }
       }
}

function getMinWaitingTime() {
       let min = 9999;
       if (enablePimp && canPimp()) {
              if ($("#cdhoerenpimpen2").length) {
                     min = Math.min(min, $("#cdhoerenpimpen2")[0].innerHTML)
              } else {
                     if (window.location !== 'https://www.cclub.nl/rld.php') {
                            return 0;
                     }
              }
       }
       if (enableVehicles) {
              if ($("#cdauto_s2").length) {
                     min = Math.min(min, $("#cdauto_s2")[0].innerHTML)
              } else {
                     if (window.location !== 'https://www.cclub.nl/voertuigstelen.php') {
                            return 0;
                     }
              }
              if (canHeavyCrime()) {
                     if ($("#cdauto_g3").length) {
                            min = Math.min(min, $("#cdauto_g3")[0].innerHTML)
                     } else {
                            if (window.location !== 'https://www.cclub.nl/voertuigstelen.php') {
                                   return 0;
                            }
                     }
              }
       }
       if (enableCrimes) {
              if ($("#cdmisdaad_s2").length) {
                     min = Math.min(min, $("#cdmisdaad_s2")[0].innerHTML)
              } else {
                     if (window.location.href !== "https://www.cclub.nl/misdaad.php") {
                            return 0;
                     }
              }
              if (canHeavyCrime()) {
                     if ($("#cdmisdaad_g2").length) {
                            min = Math.min(min, $("#cdmisdaad_g2")[0].innerHTML)
                     } else {
                            if (window.location.href !== "https://www.cclub.nl/misdaad.php") {
                                   return 0;
                            }
                     }
              }
       }
       if (enableWeapon) {
              if ($("#cdwapenervaring2").length) {
                     min = Math.min(min, $("#cdwapenervaring2")[0].innerHTML)
              } else {
                     if (window.location.href !== "https://www.cclub.nl/wapenervaring.php") {
                            return 0;
                     }
              }
       }

       if (enableBomb && getBombardmentWaitSecondsRemaining > 0) {
              min = Math.min(min, getBombardmentWaitSecondsRemaining());
       }

       if (enableSmuggle && getBribeWaitSecondsRemaining() > 0) {
              min = Math.min(min, getBribeWaitSecondsRemaining());
       }
       if (enableSmuggle && (needToBuyDrugs || needToBuyLiquor)) {
              return 0;
       }

       if (enableGym) {
              if ($("#cdsportschool2").length) {
                     min = Math.min(min, $("#cdsportschool2")[0].innerHTML);
              } else {
                     if (window.location.href !== "https://www.cclub.nl/sportschool.php") {
                            return 0;
                     }
              }
       }

       if (enablePrison) {
              return 1;
       }

       if (min === 9999) {
              return 10;
       } else {
              return min;
       }
}

function setRoute() {
       if (window.location.href === "https://www.cclub.nl/loguit.php" || window.location.href === "https://www.cclub.nl/index.php") {
              console.log("SET LOGIN");
              window.location.href = "https://www.cclub.nl/login.php";
              return true;
       }
       if (window.location.href === "https://www.cclub.nl/login.php") {
              return false;
       }
       if (enableHeal) {
              if (!health.includes('100%')) {
                     if (window.location.href !== "https://www.cclub.nl/ziekenhuis.php") {
                            window.location.href = "https://www.cclub.nl/ziekenhuis.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableAutoBank) {
              if (cash > cashBankThreshold) {
                     if (window.location.href !== "https://www.cclub.nl/bank.php") {
                            window.location.href = "https://www.cclub.nl/bank.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableAutoFam) {
              if (bank > famDonateThreshold) {
                     if (window.location.href !== "https://www.cclub.nl/famdonate.php") {
                            window.location.href = "https://www.cclub.nl/famdonate.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableCrushConvert) {
              if (carsGarage > 8) {
                     if (window.location.href !== "https://www.cclub.nl/garage.php") {
                            window.location.href = "https://www.cclub.nl/garage.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enablePimp) {
              if (!$("#cdhoerenpimpen2").length && canPimp()) {
                     if (window.location.href !== "https://www.cclub.nl/rld.php") {
                            window.location.href = "https://www.cclub.nl/rld.php";
                            return true;
                     }
                     return false;
              }
       }
       if (enableBomb) {
              if (getBombardmentWaitSecondsRemaining() <= 0) {
                     if (window.location.href !== "https://www.cclub.nl/plattegrond.php?staat=10" && !window.location.href.startsWith("https://www.cclub.nl/plattegrond.php?p=plattegrond&staat=10&id=")) {
                            window.location.href = "https://www.cclub.nl/plattegrond.php?staat=10"
                            return true;
                     }
                     return false;
              }
       }
       if (enableVehicles) {
              if (canHeavyCrime()) {
                     if (!$("#cdauto_g3").length) {
                            if (window.location.href !== "https://www.cclub.nl/voertuigstelen.php") {
                                   window.location.href = "https://www.cclub.nl/voertuigstelen.php";
                                   return true;
                            }
                            return false;
                     }
              }
              if (!$("#cdauto_s2").length) {
                     if (window.location.href !== "https://www.cclub.nl/voertuigstelen.php") {
                            window.location.href = "https://www.cclub.nl/voertuigstelen.php";
                            return true;
                     }
                     return false;
              }
       }
       if (enableCrimes) {
              if (canHeavyCrime()) {
                     if (!$("#cdmisdaad_g2").length) {
                            if (window.location.href !== "https://www.cclub.nl/misdaad.php") {
                                   window.location.href = "https://www.cclub.nl/misdaad.php";
                                   return true;
                            }
                            return false;
                     }
              }
              if (!$("#cdmisdaad_s2").length) {
                     if (window.location.href !== "https://www.cclub.nl/misdaad.php") {
                            window.location.href = "https://www.cclub.nl/misdaad.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableWeapon) {
              if (!$("#cdwapenervaring2").length) {
                     if (window.location.href !== "https://www.cclub.nl/wapenervaring.php") {
                            window.location.href = "https://www.cclub.nl/wapenervaring.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableGym) {
              if (!$("#cdsportschool2").length) {
                     if (window.location.href !== "https://www.cclub.nl/sportschool.php") {
                            window.location.href = "https://www.cclub.nl/sportschool.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enableSmuggle) {
              if (enableBribe) {
                     if (getBribeWaitSecondsRemaining() <= 0) {
                            if (window.location.href !== "https://www.cclub.nl/rld.php") {
                                   window.location.href = "https://www.cclub.nl/rld.php";
                                   return true;
                            }
                            return false;
                     }
              }

              if (needToBuyDrugs) {
                     if (window.location.href !== "https://www.cclub.nl/drugs.php") {
                            window.location.href = "https://www.cclub.nl/drugs.php";
                            return true;
                     }
                     return false;
              }

              if (needToBuyLiquor) {
                     if (window.location.href !== "https://www.cclub.nl/dranksmokkel.php") {
                            window.location.href = "https://www.cclub.nl/dranksmokkel.php";
                            return true;
                     }
                     return false;
              }
              if (!isPremium) {
                     if ($("#cdhoerenpimpen2").length) {
                            if ($("#cdhoerenpimpen2")[0].innerHTML < 90) {
                                   return false;
                            }
                     }
              }

              if (!needToBuyDrugs && !needToBuyLiquor && getBribeWaitSecondsRemaining() > 0) {
                     if (window.location.href !== "https://www.cclub.nl/reizen.php") {
                            window.location.href = "https://www.cclub.nl/reizen.php";
                            return true;
                     }
                     return false;
              }
       }

       if (enablePrison) {
              if (minWaitDelay > 1000) {
                     if (window.location.href !== "https://www.cclub.nl/gevangenis.php") {
                            window.location.href = "https://www.cclub.nl/gevangenis.php";
                            return true;
                     }
                     return false;
              }

       }
       return false;
}

function randomNumber(low, high) {
       let waiting = Math.floor((Math.random() * high) + low);
       return waiting;

}