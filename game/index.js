const arrColor = ["white", "red", "yellow", "green", "brown", "black"];
//localStorage.setItem('level',null);
/*const data = {
  level1: {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [0, 0, 0, 0, 1],
      [0, 1, 2, 2, 2],
      [0, 0, 3, 3, 3],
      [0, 1, 4, 4, 4],
      [0, 0, 5, 5, 5],
    ],
  },
};*/

const data = [
  {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [0, 0, 0, 0, 1],
      [0, 1, 2, 2, 2],
      [0, 0, 3, 3, 3],
      [0, 1, 4, 4, 4],
      [0, 0, 5, 5, 5],
    ],
  },
  {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [0, 0, 0, 1, 1],
      [0, 0, 2, 2, 2],
      [0, 0, 3, 3, 3],
      [0, 0, 4, 4, 4],
      [0, 1, 2, 3, 5],

    ],
  },
  {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [0, 0, 0, 1, 1],
      [0, 1, 2, 2, 2],
      [0, 5, 3, 2, 3],
      [0, 3, 4, 4, 4],
      [0, 1, 2, 5, 5],

    ],
  },
];

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

function start() {
  if (localStorage.getItem("level") == null) {
    localStorage.setItem("level", 0);
  }
  renderStart();
  renderLevel(localStorage.getItem("level"));
}

function renderLevel(level) {
  /*localStorage.setItem('username',document.getElementById('name').value);*/
  let winner = document.getElementsByClassName("winner")[0];
  winner.textContent = "";

  document.getElementsByClassName("username")[0].textContent =
    document.getElementById("name").value;

  //удаляем стартовое окно
  document.getElementsByClassName("field_start")[0].style.display = "none";
  document.getElementsByClassName("field_continue")[0].style.display = "none";

  document.getElementsByClassName("field")[0].style.display = "flex";

  let conteiner = document.getElementsByClassName("field")[0];

  for (let j = 0; j < data[level].countColb; j++) {
    let create = document.createElement("div");
    create.className = "colba";
    create.setAttribute("numb", j);
    create.id = j;
    let colba = new Colba();
    arrColbas.push(colba);
    for (i = 0; i < data[level].countPart; i++) {
      let createPart = document.createElement("div");
      createPart.className = "partColba";

      //createPart.style.backgroundColor = arrColor[data.level1.arrColb[j][i]];

      //createPart.style.backgroundColor = arrColor[data[level].arrColb[j][i]];
      colba.pushColor(data[level].arrColb[j][i]);

      create.appendChild(createPart);
    }
    //console.log("Колба № ", j);
    //console.log(colba.getColors());
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
  updateColb();

  /*for (let j = 0; j < 5; j++) {
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
  }*/
}

function updateColb() {
  console.log("****************We are in update***************");
  console.log(arrColbas);

  for (let i = 0; i < arrColbas.length; i++) {
    //console.log(arrColbas[i]);
    for (let j = 0; j < arrColbas[i].colors.length; j++) {
      /* console.log(document.getElementsByClassName('partColba')[i*5+j]);*/

      //console.log(i*5+j);
      document.getElementsByClassName("partColba")[
        i * 5 + j
      ].style.backgroundColor = arrColor[arrColbas[i].colors[j]];
    }
  }
  console.log("Вышли из update");
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
      useColbaObjOne.colors[inColorOne] = 0;

      /*document.getElementsByClassName("partColba")[
        useObj.getAttribute("numb") * 5 + inColorTwo - 1
      ].style.backgroundColor = arrColor[useColbaObjOneColor[inColorOne]];

      document.getElementsByClassName("partColba")[
        arrUse[0] * 5 + inColorOne
      ].style.backgroundColor = arrColor[0];
      useColbaObjOne.colors[inColorOne] = 0;
      //console.log("первая колба",useColbaObjOne)1*/
    }
  }

  //а вдруг там несколько блоков, которые надо перелить?
  //console.log("а вдруг там несколько блоков, которые надо перелить?");
  //console.log(useColbaObjOne);
  inColorOne = findColor(useColbaObjOne.colors);
  inColorTwo = findColor(useColbaObjTwo.colors);
  //console.log("inColorOne = ", inColorOne);
  //console.log("color = ", color);
  console.log("первая колба", useColbaObjOne);
  console.log("вторая колба", useColbaObjTwo);
  //пока цвет совпадает - переливаем
  while (useColbaObjOne.colors[inColorOne] == color && inColorTwo != 0) {
    useColbaObjOne,
      (useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, useObj));
    inColorOne = findColor(useColbaObjOne.colors);

    //надо перекрасить, а я опять забыла
  }
  updateColb();

  /* inColorOne = findColor(useColbaObjOneColor);
  console.log("первая колба пустая?",checkNull(useColbaObjOne));
  console.log("Еще один блок для перелива?",useColbaObjOne.colors[inColorOne] == color);
  while (
    !checkNull(useColbaObjOne) &&
    useColbaObjOne.colors[inColorOne] == color
  ) {
    //у нас есть еще один блок, который надо перелить}
    useColbaObjOne,useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, useObj);
    inColorOne = findColor(useColbaObjOneColor);
  }*/

  //забыла опустить колбу
  console.log(arrUse[0]);
  document.getElementById(arrUse[0]).style.marginTop = "3%";

  arrColbas[arrUse[0]] = useColbaObjOne;
  arrColbas[useObj.getAttribute("numb")] = useColbaObjTwo;
  arrUse.splice(0, 1);

  //проверка на выигрыш
  if (chekAllProb()) {
    let winner = document.getElementsByClassName("winner")[0];
    winner.textContent = "Вы заполнили все колбы! УРА!";
    localStorage.setItem("level", Number(localStorage.getItem("level")) + 1);
    if (localStorage.getItem("level") == String(data.length)) {
      localStorage.setItem("level", 0);
    }

    setTimeout(function () {
      document.getElementsByClassName("field")[0].style.display = "none";
      document.getElementsByClassName("field_continue")[0].style.display =
        "flex";
    }, 2000);
  }
  return useColbaObjOne, useColbaObjTwo;
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
  let conteiner = document.getElementsByClassName("field")[0];
  while (document.getElementsByClassName("colba").length != 0) {
    conteiner.removeChild(document.getElementsByClassName("colba")[0]);
  }
  while (arrColbas.length != 0) {
    arrColbas.splice(0, 1);
  }
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
//количество цветов помимо белого должно было не более 1
function checkColba(colba) {
  let arrColor = colba.getColors();
  //console.log("цвета:", arrColor);
  let f = [];
  let count = 0;
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0 && !f.includes(arrColor[i])) {
      count++;
      f.push(arrColor[i]);
    }
  }
  //console.log("Количество цветов помимо белого",count);
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
