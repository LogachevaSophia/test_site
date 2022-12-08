//let toMainlet = false;
//const arrColor = ["white", "red", "yellow", "green", "brown", "black"];

function Synth(context) { 
  this.audioContext = context; 
  this.output = context.createGain(); 
  this._oscillators = {}; 
} 


Synth.prototype.play = function(note) { 
  var oscillator; 

  oscillator = this._oscillators[note.pitch] = this.audioContext.createOscillator(); 
  oscillator.frequency.value = note.frequency; 
  oscillator.connect(this.output); 
  oscillator.start(0); 
  return oscillator; 
}; 

Synth.prototype.stop = function(note) { 
  this._oscillators[note.pitch].stop(0); 
};


function global() {
  localStorage.setItem("toMainlet", false);

  localStorage.setItem(
    "arrColor",
    JSON.stringify(["white", "red", "yellow", "green", "brown", "black"])
  );
  //var name_user = "";
  localStorage.setItem("name_user", "");
  let data = [];
  data[0] = {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [0, 0, 1, 1, 1],
      [0, 0, 4, 2, 2],
      [0, 0, 3, 3, 3],
      [0, 0, 0, 4, 4],
      [0, 0, 0, 0, 0],
    ],
  };
  localStorage.setItem("data", JSON.stringify(data));
  let arrColbas = [];
  localStorage.setItem("arrColbas", JSON.stringify(arrColbas));

  let arrUse = [];
  localStorage.setItem("arrUse", JSON.stringify(arrUse));
  if (String(localStorage.getItem("level")) == "null") {
    localStorage.setItem("level", 0);
  }


  



}

function toMain() {
  document.getElementsByClassName("windowFlask")[0].style.display = "none";
  document.getElementsByClassName("windowPiramid")[0].style.display = "none";
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "block";

  let str =
    "уровень: " +
    document.getElementsByClassName("level")[0].textContent +
    " Очки: " +
    document.getElementsByClassName("score")[0].textContent;
  document.getElementsByClassName("ResultsFlask")[0].textContent =
    "Ваш результат: " + str;

  //toMainlet = true;
  localStorage.setItem("toMainlet", true);
  try {
    let conteiner = document.getElementsByClassName("field")[0];
    while (document.getElementsByClassName("colba").length != 0) {
      conteiner.removeChild(document.getElementsByClassName("colba")[0]);
    }
    while (arrColbas.length != 0) {
      arrColbas.splice(0, 1);
    }
  } catch {
    try {
      let conteiner = document.getElementsByClassName("field")[1];
      while (document.getElementsByClassName("colba").length != 0) {
        conteiner.removeChild(document.getElementsByClassName("colba")[0]);
      }
      while (arrColbas.length != 0) {
        arrColbas.splice(0, 1);
      }
    } catch {}
  }
}
function flask() {
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "none";
  document.getElementsByClassName("windowFlaskContinue")[0].style.display =
    "none";
  document.getElementsByClassName(
    "windowFlaskContinueFailure"
  )[0].style.display = "none";
  document.getElementsByClassName("windowFlask")[0].style.display = "block";
  global();
  start_flask();
}

localStorage.removeItem("results");
localStorage.removeItem("level");

function updateres(prop) {

  /*name, flask|piramid, level, score*/

  let arr = JSON.parse(localStorage.getItem("results"));

  if (String(arr) == "null") {
    if (prop[1] == "flask") {
      let dop = {
        name: prop[0],
        results: {
          flask: {
            level: prop[2],
            score: prop[3],
          },
          piramid: { level: 0, score: 0 },
        },
      };
      localStorage.setItem("results", JSON.stringify([dop]));
    } else {
      let dop = {
        name: prop[0],
        results: {
          flask: { level: 0, score: 0 },
          piramid: { level: prop[2], score: prop[3] },
        },
      };
      localStorage.setItem("results", JSON.stringify([dop]));
    }

    //у нас нет ничего в резах
    //let dop = JSON.stringify([prop]);
    //localStorage.setItem("results", dop);
  } else {
    let fl = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i]["name"] == prop[0]) {
        fl = true;
        //такой челочек уже когда-то играл
        //arr[i] = prop;
        if (prop[1] == "flask") {
          let dop = arr[i]["results"]["piramid"];
          let dop2 = {
            name: prop[0],
            results: {
              flask: {
                level: prop[2],
                score: prop[3],
              },
              piramid: dop,
            },
          };
          localStorage.setItem("results", JSON.stringify([dop2]));
          break;
        } else {
          let dop = arr[i]["results"]["flask"];
          let dop2 = {
            name: prop[0],
            results: {
              flask: dop,
              piramid: {
                level: prop[2],
                score: prop[3],
              },
            },
          };
          localStorage.setItem("results", JSON.stringify([dop2]));
          break;
        }
      }
      if (!fl) {
        //человечек первый раз играет
        //arr.push(prop);
        //localStorage.setItem("results", JSON.stringify(arr));
        if (prop[1] == "flask") {
          let dop = {
            name: prop[0],
            results: {
              flask: {
                level: prop[2],
                score: prop[3],
              },
              piramid: { level: 0, score: 0 },
            },
          };
          localStorage.setItem("results", JSON.stringify([dop]));
        } else {
          let dop = {
            name: prop[0],
            results: {
              flask: { level: 0, score: 0 },
              piramid: { level: prop[2], score: prop[3] },
            },
          };
          localStorage.setItem("results", JSON.stringify([dop]));
        }
      }
    }
  }
}
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
  for (let i = 0; i < countColb - 1; i++) {
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
  arrPart = [0];
  for (let j = 0; j < countPart - 1; j++) {
    arrPart.push(0);
  }
  arr.push(arrPart);

  for (let i = 0; i < 5 * level + 1; i++) {
    let one = Math.floor(Math.random() * arrUse.length);
    let two = Math.floor(Math.random() * arrUse.length);

    while (one == two || arr[two][0] != 0 || arr[one][countPart - 1] == 0) {
      two = Math.floor(Math.random() * countColb);
      one = Math.floor(Math.random() * countColb);
    }

    let indOne = findColor(arr[one]); //первый не белый цвет в первой колбе
    let indTwo = findColor(arr[two]); //первый не белый цвет в второй колбе
    arr[two][indTwo - 1] = arr[one][indOne];
    arr[one][indOne] = 0;
  }
  let ret = {
    countColb: countColb,
    countColb: countColb,
    countPart: countPart,
    arrColb: arr,
  };

  return ret;
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

function logout() {
  localStorage.removeItem("username");
  document.getElementsByClassName("username").textContent = "";
}

function calculate_score(time, all = 30) {
  let part = all / 3;
  if (time <= part) {
    return 5;
  } else {
    if (time <= 2 * part) {
      return 10;
    } else {
      return 15;
    }
  }
}
/*
[	{
		name: lena
		results:{
			flask: {level: 5, score: 55}
			piramid: 10
			}
	},
	{
		name: lena
		results:{
			flask: 5
			piramid: 10
			}
	},

]
 */

function start_flask() {
  let data = JSON.parse(localStorage.getItem("data"));
  document.getElementsByClassName("status-bar")[0].textContent = " ";
  if (document.getElementById("name").value == "") {
  } else {
    name_user = document.getElementById("name").value;
    if (localStorage.getItem("level") == null) {
      localStorage.setItem("level", 0);
    }
    if (document.getElementsByClassName("level")[0].textContent == "Level: ") {
      document.getElementsByClassName("level")[0].textContent += String(
        Number(localStorage.getItem("level")) + 1
      );
    } else {
      document.getElementsByClassName("level")[0].textContent =
        "Level: " + String(Number(localStorage.getItem("level")) + 1);
    }
    if (String(localStorage.getItem("level")) != "0") {
      data[localStorage.getItem("level")] = renderStepLevel();
      localStorage.setItem("data", JSON.stringify(data));
    }
    clearInterval();
    document.getElementById("timer").textContent = 30;

    time = parseFloat(document.getElementById("timer").textContent);
    var interval = setInterval(function () {
      if (time <= 0) {
        clearInterval(interval);
        /*setTimeout(function () {
          document.getElementsByClassName("status-bar")[0].style.width =
            0 + "%";

          document.getElementsByClassName("field")[0].style.display = "none";
          document.getElementsByClassName("field_continue")[0].style.display =
            "flex";
          document.getElementsByClassName("field_continue")[0].style.opacity =
            "1";
        }, 500);*/
        document.getElementsByClassName(
          "windowFlaskContinueFailure"
        )[0].style.display = "block";
        document.getElementsByClassName("windowFlask")[0].style.display =
          "none";
        document.getElementsByClassName("status-bar")[0].style.width = 0 + "%";
        //заканчиваем игру
      } else {
        if (localStorage.getItem("toMainlet") == 'true') {
          localStorage.setItem("toMainlet", false);
          document.getElementById("timer").textContent = "";
          clearInterval(interval);
        }
        if (chekAllProb()) {
          setTimeout(function () {
            document.getElementsByClassName(
              "windowFlaskContinue"
            )[0].style.display = "block";
            document.getElementsByClassName("windowFlask")[0].style.display =
              "none";
            document.getElementsByClassName("status-bar")[0].style.width =
              0 + "%";
            clearInterval(interval);
          }, 1000);
        } else {
          time -= 0.1;

          /*if (time <= 0) {
            time = 0;
            document.getElementsByClassName("windowFlaskContinueFailure")[0].display = 'block';
            document.getElementsByClassName("windowFlask")[0].style.display =
            "none";




          }*/
          document.getElementsByClassName("status-bar")[0].style.width =
            (time * 8) / 3 + "%";
          document.getElementById("timer").textContent = time.toFixed(1);
        }
      }
    }, 100);

    renderStart();
    if (String(localStorage.getItem("level")) == "0") {
      renderPreviewLevel();
    } else {
      renderLevel(localStorage.getItem("level"));
    }
  }
}

function renderPreviewLevel(level = 0) {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbas"));
  let data = JSON.parse(localStorage.getItem("data"));
  document.getElementsByClassName("username")[0].textContent =
    document.getElementById("name").value;
  document.getElementsByClassName("field")[0].style.display = "flex";
  let conteiner = document.getElementsByClassName("field")[0];
  for (let j = 0; j < data[level].countColb; j++) {
    let create = document.createElement("div");
    create.className = "colba";



  
    create.onmousedown = function(event) {

      let shiftX = event.clientX - create.getBoundingClientRect().left;
      let shiftY = event.clientY - create.getBoundingClientRect().top;
    
      create.style.position = 'absolute';
      create.style.zIndex = 1000;
      document.body.append(create);
    
      moveAt(event.pageX, event.pageY);
    
      // переносит мяч на координаты (pageX, pageY),
      // дополнительно учитывая изначальный сдвиг относительно указателя мыши
      function moveAt(pageX, pageY) {
        create.style.left = pageX - shiftX + 'px';
        create.style.top = pageY - shiftY + 'px';
      }
    
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
    
      // передвигаем мяч при событии mousemove
      document.addEventListener('mousemove', onMouseMove);
    
      // отпустить мяч, удалить ненужные обработчики
      create.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        create.onmouseup = null;
      };
    
    };
    
    create.ondragstart = function() {
      return false;
    };





















    create.setAttribute("numb", j);
    create.id = j;
    let colba = new Colba();
    arrColbas.push(colba);
    for (i = 0; i < data[level].countPart; i++) {
      let createPart = document.createElement("div");
      createPart.className = "partColba";
      colba.pushColor(data[level].arrColb[j][i]);
      create.appendChild(createPart);
    }
    if (j == 1) {
      create.setAttribute("status", 0);
      create.style.boxShadow = "0px -1px 25px 25px rgb(4 255 0 / 82%)";
      //мы должны из 1 переложить в 3, чтобы выиграть
      create.addEventListener("click", function (e) {
        let arrUse = JSON.parse(localStorage.getItem("arrUse"));
        e.preventDefault();
        if (this.getAttribute("status") == 0) {
          if (String(arrUse) == 'null') arrUse = []
          if (arrUse.length == 0) {
            //первый раз нажимает
            arrUse.push(this.getAttribute("numb"));
            this.style.marginTop = 0;
            this.setAttribute("status", 1);
            this.style.boxShadow = "none";
            document.getElementById("3").style.boxShadow =
              "0px -1px 25px 25px rgb(4 255 0 / 82%)";
          } else {
            //пользователь дурак и решил в саму себя же перелить
            if (this.getAttribute("numb") == arrUse[0]) {
              document.getElementById(arrUse[0]).style.marginTop = "3%";
              arrUse.splice(0, 1);
            } else {
              let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
              let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую
              useColbaObjOne, useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, this);
              updateColb();
            }
          }
        }
        localStorage.setItem("arrUse", JSON.stringify(arrUse));
      });
    }
    if (j == 3) {
      create.setAttribute("status", 0);
      create.addEventListener("click", function (e) {
        let arrUse = JSON.parse(localStorage.getItem("arrUse"));
        e.preventDefault();

        
        if (document.getElementById("1").getAttribute("status") == 1) {
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
              useColbaObjOne, useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, this);
              updateColb();
            }
          }
        }
        localStorage.setItem("arrUse", JSON.stringify(arrUse));
      });
    }

    conteiner.appendChild(create);
  }
  localStorage.setItem('arrColbas', JSON.stringify(arrColbas));
  updateColb();
}

function renderLevel(level) {
  /*localStorage.setItem('username',document.getElementById('name').value);*/

  document.getElementsByClassName("username")[0].textContent =
    document.getElementById("name").value;
  document.getElementsByClassName("field")[0].style.display = "flex";

  let conteiner = document.getElementsByClassName("field")[0];
  let arrColbas = JSON.parse(localStorage.getItem("arrColbas"));
  let data = JSON.parse(localStorage.getItem("data"));
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
      colba.pushColor(data[level].arrColb[j][i]);
      create.appendChild(createPart);
    }
    create.addEventListener("click", function (e) {
      let arrUse = JSON.parse(localStorage.getItem("arrUse"));
      e.preventDefault();

      
        if (arrUse.length == 0) {
          arrUse.push(this.getAttribute("numb"));
          localStorage.setItem('arrUse', JSON.stringify(arrUse));
          this.style.marginTop = 0;
        } else {
          //пользователь дурак и решил в саму себя же перелить
          if (this.getAttribute("numb") == arrUse[0]) {

            document.getElementById(arrUse[0]).style.marginTop = "3%";
            arrUse.splice(0, 1);

            localStorage.setItem("arrUse", JSON.stringify(arrUse));
          } else {
            let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
            let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую
            useColbaObjOne, useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, this);
            arrUse.splice(0, 1);
            localStorage.setItem("arrUse", JSON.stringify(arrUse));
            updateColb();
          }
        }
      localStorage.setItem("arrUse", JSON.stringify(arrUse));
    });

    conteiner.appendChild(create);
  }
  localStorage.setItem('arrColbas', JSON.stringify(arrColbas));
  updateColb();
}

function updateColb() {
  let arrColbas = JSON.parse(localStorage.getItem('arrColbas'));
  let arrColor = JSON.parse(localStorage.getItem('arrColor'))

  for (let i = 0; i < arrColbas.length; i++) {
    for (let j = 0; j < arrColbas[i].colors.length; j++) {
      document.getElementsByClassName("partColba")[
        i * 5 + j
      ].style.backgroundColor = arrColor[arrColbas[i].colors[j]];
    }
  }
}

function move(useColbaObjOne, useColbaObjTwo, useObj) {
  let arrColbas = JSON.parse(localStorage.getItem('arrColbas'));
  let arrUse = JSON.parse(localStorage.getItem('arrUse'));

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
  localStorage.setItem('arrColbas', JSON.stringify(arrColbas));
  localStorage.setItem('arrUse', JSON.stringify(arrUse));
  //а вдруг там несколько блоков, которые надо перелить?

  inColorOne = findColor(useColbaObjOne.colors);
  inColorTwo = findColor(useColbaObjTwo.colors);

  //пока цвет совпадает - переливаем
  while (useColbaObjOne.colors[inColorOne] == color && inColorTwo != 0) {
    useColbaObjOne,
      (useColbaObjTwo = move(useColbaObjOne, useColbaObjTwo, useObj));
    inColorOne = findColor(useColbaObjOne.colors);

    //надо перекрасить, а я опять забыла
  }
  //updateColb();

  
  //забыла опустить колбу
  document.getElementById(arrUse[0]).style.marginTop = "3%";

  arrColbas[arrUse[0]] = useColbaObjOne;
  arrColbas[useObj.getAttribute("numb")] = useColbaObjTwo;
  arrUse.splice(0, 1);
  localStorage.setItem('arrColbas', JSON.stringify(arrColbas));
  localStorage.setItem('arrUse', JSON.stringify(arrUse));

  //проверка на выигрыш
  if (chekAllProb()) {
    setTimeout(function () {
      localStorage.setItem("level", Number(localStorage.getItem("level")) + 1);
      document.getElementsByClassName("windowFlaskContinue")[0].style.display =
        "block";
      document.getElementsByClassName("windowFlask")[0].style.display = "none";

      document.getElementsByClassName("score")[0].textContent =
        Number(document.getElementsByClassName("score")[0].textContent) +
        calculate_score(Number(document.getElementById("timer").textContent));
      let score = calculate_score(Number(document.getElementById("timer").textContent));
      if (score <=5){
        document.getElementById('zv1').style.display = null;
        document.getElementById('zv2').style.display = 'none';
        document.getElementById('zv3').style.display = 'none';
      }
      else{
        if (score<=10){
          document.getElementById('zv1').style.display = null;
        document.getElementById('zv2').style.display = null;
        document.getElementById('zv3').style.display = 'none';

        }
        else{
          document.getElementById('zv1').style.display = null;
        document.getElementById('zv2').style.display = null;
        document.getElementById('zv3').style.display = null;

        }
      }

      document.getElementById("timer").textContent = "";
      updateres([
        document.getElementsByClassName("username")[0].textContent,
        "flask",
        localStorage.getItem("level"),
        Number(document.getElementsByClassName("score")[0].textContent),
      ]);
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
  let arrColbas = JSON.parse(localStorage.getItem('arrColbas'));
  let conteiner = document.getElementsByClassName("field")[0];
  while (document.getElementsByClassName("colba").length != 0) {
    conteiner.removeChild(document.getElementsByClassName("colba")[0]);
  }
  while (arrColbas.length != 0) {
    arrColbas.splice(0, 1);
  }
  localStorage.setItem('arrColbas',JSON.stringify(arrColbas));
}

//проверка всех колб на то, одного цвета или нет
function chekAllProb() {
  let arrColbas = JSON.parse(localStorage.getItem('arrColbas'));
  //для победы у меня должна быть одна пустая и остальные по одному цвету
  //првоерим, есть ли вообще хотя бы одна пустая
  let fl = false;
  for (var i = 0; i < arrColbas.length; i++) {
    if (checkNull(arrColbas[i])) {
      fl = true;
      break;
    }
  }

  //если fl=true, тогда проверяем, чтобы в каждой колбе было по 1 цвету включая белый
  if (fl) {
    for (var i = 0; i < arrColbas.length; i++) {
      if (!checkNull(arrColbas[i]) && !checkColba(arrColbas[i])) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

//true, если все одного цвета или полностю пустая, false? если 2 и больше цвета
//количество цветов помимо белого должно было не более 1
function checkColba(colba) {
  let arrColor = colba.colors;

  let f = [];
  let count = 0;
  for (var i = 0; i < arrColor.length; i++) {
    if (!f.includes(arrColor[i]) && arrColor[i] != 0) {
      count++;
      f.push(arrColor[i]);
    }
  }

  return count <= 1;
}

function checkNull(colba) {
  let arrColor = colba.colors;
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0) {
      return false;
    }
  }
  return true;
}
