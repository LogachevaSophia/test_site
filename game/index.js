const arrColor = ["white", "red", "yellow", "green", "brown", "black"];
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
localStorage.setItem('level',0);
console.log(localStorage.getItem('level'));
let data = []
  /*{
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
      [0, 0, 0, 0, 0],
    ],
  },
];*/
//renderStepLevel();

function renderStepLevel() {
  let level = localStorage.getItem("level");
  let arr = [];
  let countColb = 5;
  let countPart = 5;
  let arrPart = [];
  let arrUse = [];
  //заполняем нулями
  for (let i = 0; i < countColb-1; i++) {
    for (let j = 0; j < countPart; j++) {
      if (j < countPart - 3) {
        arrPart.push(0);
      } else {
        arrPart.push(i + 1);
      }
    }
    arr.push(arrPart);
    arrPart = [];
  }
  arrPart = [0]
    for (let j = 0; j < countPart-1; j++) {
      arrPart.push(0);
    }
    arr.push(arrPart);
  console.log("arr = ", arr);

  for (let i = 0; i < 5*level+1; i++) {
    let one = Math.floor(Math.random() * arrUse.length);
    let two = Math.floor(Math.random() * arrUse.length);

    while (one == two || arr[two][0] != 0 || arr[one][countPart - 1] == 0) {
      two = Math.floor(Math.random() * countColb);
      one = Math.floor(Math.random() * countColb);
    }
    /* console.log("первая = ",one);
    console.log(arr[one]);
    console.log("вторя = ", two);
    console.log(arr[two]);*/

    let indOne = findColor(arr[one]); //первый не белый цвет в первой колбе
    let indTwo = findColor(arr[two]); //первый не белый цвет в второй колбе
    arr[two][indTwo - 1] = arr[one][indOne];
    arr[one][indOne] = 0;
    /*console.log(arr[one]);
    console.log(arr[two]);*/
  }
  let ret = {
    countColb: countColb,
    countColb: countColb,
    countPart: countPart,
    arrColb: arr
  }
  console.log("HEELLLOO");
  console.log("ret = ", ret)
  return ret
}

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
  data.push(renderStepLevel());
  console.log("!!!!!!!!!!!!!!!!!!!!!");
  console.log(data);
  
  console.log(data[localStorage.getItem("level")])
  document.getElementById("timer").textContent = 30;

  time = parseFloat(document.getElementById("timer").textContent);
  var interval = setInterval(function () {
    if (time <= 0) {
      clearInterval(interval);
      setTimeout(function () {
        let winner = document.getElementsByClassName("winner")[0];
        winner.textContent = "Неудача...";
        document.getElementsByClassName("field")[0].style.display = "none";
        document.getElementsByClassName("field_continue")[0].style.display =
          "flex";
        document.getElementsByClassName("field_continue")[0].style.opacity =
          "1";
      }, 1000);
      //заканчиваем игру
    } else {
      if (chekAllProb()) {
        clearInterval(interval);
      } else {
        time -= 0.1;
        if (time <= 0) {
          time = 0;
        }
        document.getElementById("timer").textContent = time.toFixed(1);
      }
    }
  }, 100);

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
  console.log("level = ", level);
  console.log(data[level]);
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
}

function updateColb() {
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
    }
  }

  //а вдруг там несколько блоков, которые надо перелить?
  //console.log("а вдруг там несколько блоков, которые надо перелить?");
  //console.log(useColbaObjOne);
  inColorOne = findColor(useColbaObjOne.colors);
  inColorTwo = findColor(useColbaObjTwo.colors);
  //console.log("inColorOne = ", inColorOne);
  //console.log("color = ", color);
  //пока цвет совпадает - переливаем
  while (useColbaObjOne.colors[inColorOne] == color && inColorTwo != 0) {
    useColbaObjOne,
      (useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, useObj));
    inColorOne = findColor(useColbaObjOne.colors);

    //надо перекрасить, а я опять забыла
  }
  updateColb();

  //забыла опустить колбу
  document.getElementById(arrUse[0]).style.marginTop = "3%";

  arrColbas[arrUse[0]] = useColbaObjOne;
  arrColbas[useObj.getAttribute("numb")] = useColbaObjTwo;
  arrUse.splice(0, 1);

  //проверка на выигрыш
  if (chekAllProb()) {
    console.log("Ты выиграл");
    let winner = document.getElementsByClassName("winner")[0];
    winner.textContent = "Вы заполнили все колбы! УРА!";
    localStorage.setItem("level", Number(localStorage.getItem("level")) + 1);
    if (localStorage.getItem("level") == String(data.length)) {
      localStorage.setItem("level", 0);
    }

    document.getElementById("timer").textContent = "";

    setTimeout(function () {
      document.getElementsByClassName("field")[0].style.display = "none";
      document.getElementsByClassName("field_continue")[0].style.display =
        "flex";
      document.getElementsByClassName("field_continue")[0].style.opacity = "1";
    }, 1000);
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
  //для победы у меня должна быть одна пустая и остальные по одному цвету

  //првоерим, есть ли вообще хотя бы одна пустая
  let fl = false;
  for (var i =0;i<arrColbas.length;i++){
    if (checkNull(arrColbas[i])) fl = true;
  }


  //если fl=true, тогда проверяем, чтобы в каждой колбе было по 1 цвету включая белый
  if (fl){
    for (var i = 0; i < arrColbas.length; i++) {
      if ((!checkNull(arrColbas[i]))&&(!checkColba(arrColbas[i]))) {
        return false;
      }
    }
  }
  else{
    return false
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
    if (!f.includes(arrColor[i])) {
      count++;
      f.push(arrColor[i]);
    }
  }
  //console.log("Количество цветов помимо белого",count);
  return count <= 2;
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
