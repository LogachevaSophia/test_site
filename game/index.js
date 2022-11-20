const arrColor = ["white", "red", "yellow", "green", "brown", "black"];
//import data from './index.json';


/* "level1": {
        "countColb": 5,
        "countPart": 4,
        "arrColb": [[0,0,1,1,1],[0,0,2,2,2],[0,0,3,3,3],[0,0,4,4,4],[0,0,5,5,5]]}*/
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
//console.log(data);

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
        if (j == 0) {
          if (i == 2) {
            createPart.style.backgroundColor = arrColor[1];
            colba.pushColor(1);
          }
          if (i == 3) {
            createPart.style.backgroundColor = arrColor[1];
            colba.pushColor(1);
          }
          if (i == 4) {
            createPart.style.backgroundColor = arrColor[1];
            colba.pushColor(1);
          }
        }
        if (j == 1) {
          if (i == 2) {
            createPart.style.backgroundColor = arrColor[2];
            colba.pushColor(2);
          }
          if (i == 3) {
            createPart.style.backgroundColor = arrColor[2];
            colba.pushColor(2);
          }
          if (i == 4) {
            createPart.style.backgroundColor = arrColor[2];
            colba.pushColor(2);
          }
        }
        if (j == 2) {
          if (i == 2) {
            createPart.style.backgroundColor = arrColor[3];
            colba.pushColor(3);
          }
          if (i == 3) {
            createPart.style.backgroundColor = arrColor[3];
            colba.pushColor(3);
          }
          if (i == 4) {
            createPart.style.backgroundColor = arrColor[3];
            colba.pushColor(3);
          }
        }
        if (j == 3) {
          if (i == 2) {
            createPart.style.backgroundColor = arrColor[4];
            colba.pushColor(4);
          }
          if (i == 3) {
            createPart.style.backgroundColor = arrColor[4];
            colba.pushColor(4);
          }
          if (i == 4) {
            createPart.style.backgroundColor = arrColor[4];
            colba.pushColor(4);
          }
        }
        if (j == 4) {
          if (i == 2) {
            createPart.style.backgroundColor = arrColor[5];
            colba.pushColor(5);
          }
          if (i == 3) {
            createPart.style.backgroundColor = arrColor[5];
            colba.pushColor(5);
          }
          if (i == 4) {
            createPart.style.backgroundColor = arrColor[5];
            colba.pushColor(5);
          }
        }

        /* let numb = Math.floor(Math.random() * (arrColor.length - 1) + 1);
        createPart.style.backgroundColor = arrColor[numb];
        colba.pushColor(numb);*/
      } else {
        if (j == 1 && i == 1) {
          createPart.style.backgroundColor = arrColor[1];
          colba.pushColor(1);
        } else {
          if (j == 3 && i == 1) {
            createPart.style.backgroundColor = arrColor[1];
            colba.pushColor(1);
          } else {
            createPart.style.backgroundColor = arrColor[0];
            colba.pushColor(0);
          }
        }
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
          move(useColbaObjOne, useColbaObjTwo, this);
        }
      }
    });

    conteiner.appendChild(create);
  }
}

function move(useColbaObjOne, useColbaObjTwo, useObj) {
  let useColbaObjOneColor = useColbaObjOne.getColors(); //цвета первой колбы
  let useColbaObjTwoColor = useColbaObjTwo.getColors(); //цвета второй колбы
  let inColorOne = findColor(useColbaObjOneColor); //индекс первого не белого цвета у первой колбы
  let inColorTwo = findColor(useColbaObjTwoColor); // индекс первого не белого цвета у второй колбы

  let color = useColbaObjOneColor[inColorOne]; //запомним цвет, который переливали
  //есть ли места во второй колбе?
  if (inColorTwo != 0) {
    //совпадают ли цвета
    if (
      useColbaObjOneColor[inColorOne] == useColbaObjTwoColor[inColorTwo] ||
      checkNull(useColbaObjTwo)
    ) {
      useColbaObjTwo.colors[inColorTwo - 1] = useColbaObjOneColor[inColorOne];

      document.getElementsByClassName("partColba")[
        useObj.getAttribute("numb") * 5 + inColorTwo - 1
      ].style.backgroundColor = arrColor[useColbaObjOneColor[inColorOne]];

      document.getElementsByClassName("partColba")[
        arrUse[0] * 5 + inColorOne
      ].style.backgroundColor = arrColor[0];
      useColbaObjOne.colors[inColorOne] = 0;
    }
  }

  //а вдруг там несколько блоков, которые надо перелить?
  inColorOne = findColor(useColbaObjOneColor);
  while ((!checkNull(useColbaObjOne)) && (useColbaObjOne.colors[inColorOne] == color)) {
      //у нас есть еще один блок, который надо перелить}
      move(useColbaObjOne, useColbaObjTwo, useObj);
      inColorOne = findColor(useColbaObjOneColor);
  }

  //забыла опустить колбу
  document.getElementById(arrUse[0]).style.marginTop = "3%";

  arrColbas[arrUse[0]] = useColbaObjOne;
  arrColbas[useObj.getAttribute("numb")] = useColbaObjTwo;
  arrUse.splice(0, 1);

  //проверка на выигрыш
  if (chekAllProb()) {
    let winner = document.getElementsByClassName("winner")[0];
    winner.textContent = "Вы заполнили все колбы! УРА!";
  }
}

function findColor(useColbaObjOneColor) {
  //ищу первый цвет не белый (не пустой) в первой колбе
  var indColor = 0;
  while (
    indColor < useColbaObjOneColor.length &&
    useColbaObjOneColor[indColor] == 0
  ) {
    indColor++;
  }
  return indColor;
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
  let f = [];
  let count = 0;
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0 && !f.includes(arrColor[i])) {
      count++;
      f.push(arrColor[i]);
    }
  }
  return count <= 1;
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
