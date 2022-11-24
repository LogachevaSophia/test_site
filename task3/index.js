const arr_rus = [
  "Привычка - вторая натура",
  "Заметьте хорошо!",
  "Беда не приходит одна",
  "Через тернии к звёздам",
];
const arr_lat = [
  "Consuetudo est altera natura",
  "Nota bene",
  "Nulla calamitas sola",
  "Per aspera ad astra",
];

let arr_use = [];
for (let i = 0; i < arr_rus.length; i++) {
  arr_use.push(i);
}

const max = arr_rus.length - 1;
const min = 0;
var let_top = 50;
var let_width = window.screen.width;
console.log(document.getElementsByClassName("conteiner")[0].style);
document.getElementsByClassName("conteiner")[0].style.width =
  0.8 * let_width + "px";
document.getElementsByClassName("conteiner")[0].style.marginLeft =
  0.1 * let_width + "px";
document.getElementsByClassName("conteiner")[0].style.marginRight =
  0.1 * let_width + "px";

function create_block() {
  if (arr_use.length != 0) {
    var block = document.getElementById("obj");

    var create = document.createElement("div");
    create.className = "block";

    let numb = Math.floor(Math.random() * arr_use.length);

    create.textContent = "Фраза "+ String(arr_use[numb]+1) + " "+arr_rus[arr_use[numb]];
    arr_use.splice(numb, 1);
    create.style.top = let_top + "px";
    create.style.right = 0.1 * let_width + "px";
    let_top += 80;

    if (
      let_top >
      document
        .getElementsByClassName("conteiner")[0]
        .style.minHeight.replace("px", "")
    ) {
      document.getElementsByClassName("conteiner")[0].style.minHeight =
        let_top + 50 + "px";
    }
    create.addEventListener("click", function (e) {
      e.preventDefault();
      if (
        this.className == "block" ||
        this.className == "block_active_active"
      ) {
        const index = arr_rus.findIndex((el) => el === this.textContent);
        if (index != -1) {
          this.textContent = arr_lat[index];
        }
        this.className = "block_active";

        let str = "translateX(";
        let dop = -0.8 * let_width;
        dop += this.offsetWidth + 0.05 * let_width;
        str += String(dop);
        str += "px)";
        console.log(str);
        this.style.transform = String(str);
      }
    });

    block.appendChild(create);
  } else {
    var block = document.getElementById("obj");
    var create = document.createElement("div");
    create.className = "block";
    create.textContent = "Фразы закончились";
    create.style.top = let_top + "px";
    create.style.right = 0.1 * let_width + "px";
    block.appendChild(create);
    let but = document.getElementsByClassName("create");
    console.log(but);
    but[0].disabled = true;
    but = document.getElementsByClassName("reload")[0];
    but.style.visibility = "inherit";





    block = document.getElementsByClassName("frase")[0];
    create = document.createElement("div");
    create.textContent = "Фразы закончились";
    create.style.color = "red";
    create.style.textAlign = "center";
    block.appendChild(create);
  }
}

function decorate_block() {
  var bl = document.getElementsByClassName("block");

  for (var i = 0; i < bl.length; i++) {
    bl[i].className = "block_active_active";
    i--;
  }
}


