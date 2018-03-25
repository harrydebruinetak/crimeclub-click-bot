$(document).ready(() => {
       insertHeader();
       insertStats();
       function insertStats() {
              let levenMenuItem = document.querySelectorAll("td");
              for (let i = 0; i < levenMenuItem.length; i++) {
                     if (levenMenuItem[i].classList.contains('header')) {
                            let tableRef = levenMenuItem[i].parentElement.parentElement;
                            var newRow = tableRef.insertRow(tableRef.rows.length);
                            fillUpEmptySpace(newRow);
                            insertWeaponStats(newRow);
                            insertBribe(newRow);
                            insertGarageStats(newRow);
                            insertBombardmentStats(newRow);
                     }
              }
       }

       function insertHeader() {
              let images = document.querySelectorAll('img');
              for (let i = 0; i < images.length; i++) {
                     if (images[i].src === "https://www.cclub.nl/IMG/header_image.jpg") {
                            images[i].style.height = '120px';
                            images[i].parentElement.style.textAlign = 'center';
                            images[i].src = chrome.extension.getURL('images/logo.png');
                     }
              }
       }

       function insertBribe(newRow) {
              var newCell = newRow.insertCell(0);
              newCell.classList.add('inhoud');
              newCell.style.textAlign = 'left';
              newCell.style.width = '10%';
              var a = document.createElement('a');
              var linkText = document.createTextNode("Douane omkopen:");
              a.appendChild(linkText);
              a.title = "Tijd tot je weer moet omkopen";
              a.href = "https://www.cclub.nl/rld.php";
              newCell.appendChild(a);
              var br = document.createElement("br");
              newCell.appendChild(br);
              var secondsRemaining = getBribeWaitSecondsRemaining();
              var div = document.createElement("div");
              div.id = "bribeCounter";
              if (secondsRemaining > 0) {
                     div.innerHTML = secondsRemaining;
                     div.style.color = 'red';
                     newCell.appendChild(div);
                     decreaseBribeTimer();
              } else {
                     div.innerHTML = 'Nu!';
                     div.style.color = 'green';
                     newCell.appendChild(div);
              }
       }

       function insertWeaponStats(newRow) {
              var newCell = newRow.insertCell(0);
              newCell.classList.add('inhoud');
              newCell.style.textAlign = 'left';
              newCell.style.width = '10%';
              var a = document.createElement('a');
              // todo fix deze unit
              var linkText = document.createTextNode("");
              a.appendChild(linkText);
              a.title = "Wapen stats";
              a.href = "https://www.cclub.nl/rld.php";
              newCell.appendChild(a);
              var br = document.createElement("br");
              newCell.appendChild(br);

       }

       function insertGarageStats(newRow) {
              var temp = newRow.insertCell(0);
              temp.classList.add('inhoud');
              temp.style.textAlign = 'left';
              temp.style.width = '10%';
              var a = document.createElement('a');
              var linkText = document.createTextNode("Garage:");
              a.appendChild(linkText);
              a.title = "Aantal auto's in garage";
              a.href = "https://www.cclub.nl/garage.php?&x=crushandconvert";
              temp.appendChild(a);
              var div = document.createElement("div");
              div.innerHTML = carsGarage;
              temp.appendChild(div);
       }

       function insertBombardmentStats(newRow) {
              var newCell = newRow.insertCell(0);
              newCell.classList.add('inhoud');
              newCell.style.textAlign = 'left';
              newCell.style.width = '10%';
              var a = document.createElement('a');
              var linkText = document.createTextNode("Bombarderen:");
              a.appendChild(linkText);
              a.title = "Tijd tot je weer kan bombarderen";
              a.href = "https://www.cclub.nl/plattegrond.php?staat=10";
              newCell.appendChild(a);
              var br = document.createElement("br");
              newCell.appendChild(br);
              var secondsRemaining = getBombardmentWaitSecondsRemaining();
              var div = document.createElement("div");
              div.id = "bombCounter";
              if (secondsRemaining > 0) {
                     div.innerHTML = secondsRemaining;
                     div.style.color = 'red';
                     newCell.appendChild(div);
                     decreaseTimer();
              } else {
                     div.innerHTML = 'Nu!';
                     div.style.color = 'green';
                     newCell.appendChild(div);
              }
       }

       function fillUpEmptySpace(newRow) {
              for (let i = 0; i < 6; i++) {
                     var temp = newRow.insertCell(0);
                     temp.classList.add('inhoud');
                     temp.style.textAlign = 'left';
                     temp.style.width = '10%';
              }
       }

       function decreaseBribeTimer() {
              setTimeout(() => {
                     let counter = parseInt($('#bribeCounter')[0].innerHTML) - 1;
                     if (counter > 0) {
                            $('#bribeCounter')[0].innerHTML = counter;
                            decreaseBribeTimer();
                     } else {
                            $('#bribeCounter')[0].innerHTML = 'Nu!';
                            $('#bribeCounter')[0].style.color = 'green';
                     }
              }, 1000)
       }

       function decreaseTimer() {
              setTimeout(() => {
                     let counter = parseInt($('#bombCounter')[0].innerHTML) - 1;
                     if (counter > 0) {
                            $('#bombCounter')[0].innerHTML = counter;
                            decreaseTimer();
                     } else {
                            $('#bombCounter')[0].innerHTML = 'Nu!';
                            $('#bombCounter')[0].style.color = 'green';

                     }

              }, 1000)
       }
});

function getBombardmentWaitSecondsRemaining() {
       if (bombTimeString === 'Nu!') {
              return 0;
       }
       let hours = bombTimeString.split(':')[0];
       let minutes = bombTimeString.split(':')[1];
       let seconds = bombTimeString.split(':')[2];
       let now = new Date();
       now.setHours(hours);
       now.setSeconds(seconds);
       now.setMinutes(minutes);
       var dif = now.getTime() - new Date().getTime();
       var secondsRemaining = Math.max(0, Math.floor(dif / 1000));
       if (secondsRemaining > 600) {
              return 0;
       }
       return secondsRemaining;
}

function getBribeWaitSecondsRemaining() {
       if (bribeTimeString === 'Nu!') {
              return 0;
       }
       let hours = bribeTimeString.split(':')[0];
       let minutes = bribeTimeString.split(':')[1];
       let seconds = bribeTimeString.split(':')[2];
       let now = new Date();
       now.setHours(hours);
       now.setSeconds(seconds);
       now.setMinutes(minutes);
       var dif = now.getTime() - new Date().getTime();
       var secondsRemaining = Math.max(0, Math.floor(dif / 1000));
       if (secondsRemaining > 3600) {
              return 0;
       }
       return secondsRemaining;
}