const arrColor = ["white", "red", "yellow", "green", "brown", "black"];

class Colba {
  constructor() {
    this.colors = [];
  }
  getColors() {
    return this.colors;
  }
  pushColor(newColor) {
    this.colors.push(newColor);
  }
}

let arrColbas = [];

let arrUse = [];

function renderLevel() {
  let conteiner = document.getElementsByClassName("field")[0];

  for (let j = 0; j < 5; j++) {
    let create = document.createElement("div");
    create.className = "colba";
    create.setAttribute("numb", j);
    create.id = j;
    let colba = new Colba();
    arrColbas.push(colba);
    for (i = 0; i < 5; i++) {
      let createPart = document.createElement("div");
      createPart.className = "partColba";
      if (i != 0 && i != 1) {
        let numb = Math.floor(Math.random() * (arrColor.length - 1) + 1);
        createPart.style.backgroundColor = arrColor[numb];
        colba.pushColor(numb);
      } else {
        createPart.style.backgroundColor = arrColor[0];
        colba.pushColor(0);
      }

      create.appendChild(createPart);
    }
    colba.getColors();
    create.addEventListener("click", function (e) {
      e.preventDefault();

      if (arrUse.length == 0) {
        arrUse.push(this.getAttribute("numb"));
        this.style.marginTop = 0;
      } else {
        //пользователь дурак и решил в саму себя же перелить
        if (this.getAttribute("numb") == arrUse[0]) {
          let winner = document.getElementsByClassName("winner")[0];
          winner.textContent = "дурак";
          
          document.getElementById(arrUse[0]).style.marginTop = "3%";
          arrUse.splice(0, 1);
        } else {
          let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
          let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую

          let useColbaObjOneColor = useColbaObjOne.getColors(); //цвета первой колбы
          let useColbaObjTwoColor = useColbaObjTwo.getColors(); //цвета второй колбы

          //ищу первый цвет не белый (не пустой) в первой колбе
          var indColorOne = 0;
          while (
            indColorOne < useColbaObjOneColor.length &&
            useColbaObjOneColor[indColorOne] == 0
          ) {
            indColorOne++;
          }
          //ищу первый цвет не белый (не пустой) в первой колбе
          var indColorTwo = 0;
          while (
            indColorTwo < useColbaObjTwoColor.length &&
            useColbaObjTwoColor[indColorTwo] == 0
          ) {
            indColorTwo++;
          }

          //есть ли места во второй колбе?
          if (indColorTwo != 0) {
            //если цвета совпадают, то у второй меняю цвет на полученный, у первый делаю белым
            if (
              useColbaObjOneColor[indColorOne] ==
                useColbaObjTwoColor[indColorTwo] ||
              checkNull(useColbaObjTwo)
            ) {
              useColbaObjTwo.colors[indColorTwo - 1] =
                useColbaObjOneColor[indColorOne];

              document.getElementsByClassName("partColba")[
                this.getAttribute("numb") * 5 + indColorTwo - 1
              ].style.backgroundColor =
                arrColor[useColbaObjOneColor[indColorOne]];

              document.getElementsByClassName("partColba")[
                arrUse[0] * 5 + indColorOne
              ].style.backgroundColor = arrColor[0];
              useColbaObjOne.colors[indColorOne] = 0;
            }
          }

          //забыла опустить колбу
          document.getElementById(arrUse[0]).style.marginTop = "3%";

          
          arrColbas[arrUse[0]] = useColbaObjOne;
          arrColbas[this.getAttribute("numb")] = useColbaObjTwo;
          arrUse.splice(0, 1);

          //проверка на выигрыш
          if (chekAllProb()) {
            let winner = document.getElementsByClassName("winner")[0];
            winner.textContent = "Вы заполнили все колбы! УРА!";

          }
        }
      }
    });

    conteiner.appendChild(create);
  }
}

function renderStart() {
  let conteiner = document.getElementsByClassName("conteiner")[0];
  let child = document.getElementsByClassName("field")[0];
  conteiner.removeChild(child);
}

//проверка всех колб на то, одного цвета или нет
function chekAllProb() {
  for (var i = 0; i < arrColbas.length; i++) {
    if (!checkColba(arrColbas[i])) {
      return false;
    }
  }
  return true;
}

//true, если все одного цвета или полностю пустая, false? если 2 и больше цвета
function checkColba(colba) {
  let arrColor = colba.getColors();
  let f = arrColor[0];
  for (var i = 1; i < arrColor.length; i++) {
    if (arrColor[i] != f) {
      return false;
    }
  }
  return true;
}

function checkNull(colba) {
  let arrColor = colba.getColors();
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0) {
      return false;
    }
  }
  return true;
}
