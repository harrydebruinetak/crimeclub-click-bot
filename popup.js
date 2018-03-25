
function hello(e) {

       var checkBoxes = document.getElementsByClassName("clickme");
       let obj = {};
       for (var i = 0; i < checkBoxes.length; i++) {
              let curCheck = checkBoxes[i];
              let key = curCheck.id;
              obj[key] = curCheck.checked;
       }
       chrome.storage.sync.set({ key: obj }, function () {
       });

}

let classname = document.getElementsByClassName("clickme");

for (let i = 0; i < classname.length; i++) {
       classname[i].addEventListener('click', hello, false);

       chrome.storage.sync.get(['key'], (result) => {
              classname[i].checked = result.key[classname[i].id];

       });
}

chrome.storage.sync.get(['key'], (result) => {
       document.getElementById("imageurl").value = result.key.mapimage;
});





