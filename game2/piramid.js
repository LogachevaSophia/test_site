

function toMainfrom() {
  document.getElementsByClassName("windowFlask")[0].style.display = "none";
  document.getElementsByClassName("windowPiramid")[0].style.display = "none";
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "block";
  document.getElementsByClassName(
    "windowPiramidContinueFailure"
  )[0].style.display = "none";

  document.getElementsByClassName("windowPiramidContinue")[0].style.display =
    "none";
  arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));

  let str =
    "уровень: " +
    document.getElementsByClassName("level")[1].textContent +
    " Очки: " +
    document.getElementsByClassName("score")[1].textContent;
  document.getElementsByClassName("ResultsPiramid")[0].textContent =
    "Ваш результат: " + str;
  localStorage.setItem("toMainletPiramid", true);
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
  localStorage.setItem("arrColbasPiramid", arrColbas);
}

function globalPiramid() {
  localStorage.setItem("toMainletPiramid", false);

  localStorage.setItem(
    "arrColorPiramid",
    JSON.stringify(["white", "red", "yellow", "green", "brown", "black"])
  );
  //var name_user = "";

  localStorage.setItem("name_user", "");
  let datapiramid = [];
  datapiramid[1] = {
    countColb: 5,
    countPart: 5,
    arrColb: [
      [1, 2, 3, 4, 5],
      [0, 1, 2, 3, 4],
      [0, 0, 1, 2, 3],
      [0, 0, 0, 1, 2],
      [0, 0, 0, 0, 1],
    ],
  };
  localStorage.setItem("datapiramid", JSON.stringify(datapiramid));
  let arrColbas = [];
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));

  let arrUse = [];
  localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
  if (
    String(localStorage.getItem("levelPiramid")) == "null" ||
    String(localStorage.getItem("levelPiramid")) == "0"
  ) {
    localStorage.setItem("levelPiramid", 1);
  }
}

function piramid() {
  let button = document.getElementById('piramidContinue');
  button.disabled = true;
  //функция стартовая
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "none";
  document.getElementsByClassName("windowPiramid")[0].style.display = "block";
  document.getElementsByClassName("field")[1].style.display = "flex";
  globalPiramid();
  start_piramid();
}

function start_piramid() {
  let datapiramid = JSON.parse(localStorage.getItem("datapiramid"));
  document.getElementsByClassName("status-bar")[1].textContent = " ";
  if (document.getElementById("name").value == "") {
  } else {
    name_user = document.getElementById("name").value;
    if (localStorage.getItem("levelPiramid") == null) {
      localStorage.setItem("levelPiramid", 1);
    }
    if (document.getElementsByClassName("level")[1].textContent == "Level: ") {
      document.getElementsByClassName("level")[1].textContent += String(
        Number(localStorage.getItem("levelPiramid")) + 1
      );
    } else {
      document.getElementsByClassName("level")[1].textContent =
        "Level: " + String(Number(localStorage.getItem("levelPiramid")) + 1);
    }
    if (String(localStorage.getItem("levelPiramid")) != "0") {
      datapiramid[localStorage.getItem("levelPiramid")] =
        renderStepLevelPiramid();
      localStorage.setItem("datapiramid", JSON.stringify(datapiramid));
    }

    document.getElementById("timerPiramid").textContent = 30;

    time = parseFloat(document.getElementById("timerPiramid").textContent);
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
          "windowPiramidContinueFailure"
        )[0].style.display = "block";
        document.getElementsByClassName("windowPiramid")[0].style.display =
          "none";
        document.getElementsByClassName("status-bar")[1].style.width = 0 + "%";
        //заканчиваем игру
      } else {
        if (localStorage.getItem("toMainletPiramid") == "true") {
          localStorage.setItem("toMainletPiramid", false);
          document.getElementById("timerPiramid").textContent = "";
          clearInterval(interval);
        }
        if (chekAllProbPiramid()) {
          

          setTimeout(function () {
            document.getElementsByClassName(
              "windowPiramidContinue"
            )[0].style.display = "block";
            document.getElementsByClassName("windowPiramid")[0].style.display =
              "none";
            document.getElementsByClassName("status-bar")[1].style.width =
              0 + "%";
            clearInterval(interval);
          }, 500);
        } else {
          time -= 0.1;

          /*if (time <= 0) {
                  time = 0;
                  document.getElementsByClassName("windowFlaskContinueFailure")[0].display = 'block';
                  document.getElementsByClassName("windowFlask")[0].style.display =
                  "none";
      
      
      
      
                }*/
          document.getElementsByClassName("status-bar")[1].style.width =
            (time * 8) / 3 + "%";
          document.getElementById("timerPiramid").textContent = time.toFixed(1);
        }
      }
    }, 100);

    renderStartPiramid();
    /* if (String(localStorage.getItem("levelPiramid")) == "0") {
        renderPreviewLevelPiramid();
    } else {*/
    renderLevelPiramid(localStorage.getItem("levelPiramid"));
    //}
  }
}

//название изменено
function renderStepLevelPiramid() {
  let level = localStorage.getItem("levelPiramid");
  let arr = [];
  let countColb = 5;
  let countPart = 5;
  let arrPart = [];
  let arrUse = [];
  for (let i = 0; i < countColb; i++) {
    for (let j = 0; j < i; j++) {
      arrPart.push(0);
    }
    let j = 1;
    while (arrPart.length != countPart) {
      arrPart.push(j);
      j += 1;
    }
    arr.push(arrPart);
    arrPart = [];
  }

  for (let i = 0; i < 10 * level; i++) {
    let one = Math.floor(Math.random() * arrUse.length);
    let two = Math.floor(Math.random() * arrUse.length);

    while (one == two || arr[two][0] != 0 || arr[one][countPart - 1] == 0) {
      two = Math.floor(Math.random() * countColb);
      one = Math.floor(Math.random() * countColb);
    }
    let indOne = findColorPiramid(arr[one]); //первый не белый цвет в первой колбе
    let indTwo = findColorPiramid(arr[two]); //первый не белый цвет в второй колбе
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

  //заполняем нулями
  /*for (let i = 0; i < countColb - 1; i++) {
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

    let indOne = findColorPiramid(arr[one]); //первый не белый цвет в первой колбе
    let indTwo = findColorPiramid(arr[two]); //первый не белый цвет в второй колбе
    arr[two][indTwo - 1] = arr[one][indOne];
    arr[one][indOne] = 0;
  }
  let ret = {
    countColb: countColb,
    countColb: countColb,
    countPart: countPart,
    arrColb: arr,
  };

  return ret;*/
}

function calculate_score_piramid(time, all = 30) {
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

//название изменено
function renderPreviewLevelPiramid(level = 0) {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));
  let data = JSON.parse(localStorage.getItem("datapiramid"));
  document.getElementsByClassName("username")[1].textContent =
    document.getElementById("name").value;
  document.getElementsByClassName("field")[1].style.display = "flex";
  let conteiner = document.getElementsByClassName("field")[1];
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
    if (j == 1) {
      create.setAttribute("status", 0);
      create.style.boxShadow = "0px -1px 25px 25px rgb(4 255 0 / 82%)";
      //мы должны из 1 переложить в 3, чтобы выиграть
      create.addEventListener("click", function (e) {
        let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));
        e.preventDefault();
        if (this.getAttribute("status") == 0) {
          if (String(arrUse) == "null") arrUse = [];
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
              useColbaObjOne,
                (useColbaObjTwo = movePiramid(
                  useColbaObjOne,
                  useColbaObjTwo,
                  this
                ));
              updateColbPiramid();
            }
          }
        }
        localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
      });
    }
    if (j == 3) {
      create.setAttribute("status", 0);
      create.addEventListener("click", function (e) {
        let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));
        e.preventDefault();
        if (document.getElementById("1").getAttribute("status") == 1) {
          if (arrUse.length == 0) {
            arrUse.push(this.getAttribute("numb"));
            this.style.marginTop = 0;
          } else {
            //пользователь дурак и решил в саму себя же перелить
            if (this.getAttribute("numb") == arrUse[0]) {
              document.getElementById(arrUse[0]).style.marginTop = "3%";
              arrUse.splice(0, 1);
            } else {
              let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
              let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую
              useColbaObjOne,
                (useColbaObjTwo = movePiramid(
                  useColbaObjOne,
                  useColbaObjTwo,
                  this
                ));
              updateColbPiramid();
            }
          }
        }
        localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
      });
    }

    conteiner.appendChild(create);
  }
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));
  updateColbPiramid();
}

//название изменено
function renderLevelPiramid(level) {
  /*localStorage.setItem('username',document.getElementById('name').value);*/

  document.getElementsByClassName("username")[1].textContent =
    document.getElementById("name").value;
  document.getElementsByClassName("field")[1].style.display = "flex";

  let conteiner = document.getElementsByClassName("field")[1];
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));
  let data = JSON.parse(localStorage.getItem("datapiramid"));
  for (let j = 0; j < data[level].countColb; j++) {
    let create = document.createElement("div");
    create.className = "colba";

   /* create.draggable = "true";

    create.addEventListener("dragstart", function (e) {
      let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));
      arrUse[0] = this.id;
      localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
    });

    create.addEventListener("dragend", function (e) {});

    create.addEventListener("dragover", function (e) {
      e.preventDefault();
    });
    create.addEventListener("dragenter", function (e) {});

    create.addEventListener("dragleave", function (e) {});

    create.addEventListener("drop", function (e) {
      let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));
      let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
      let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую

      if (this.id != arrUse[0]) {
        useColbaObjOne,
          (useColbaObjTwo = movePiramid(useColbaObjOne, useColbaObjTwo, this));
        updateColb();
      }
    });*/


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
      let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));
      e.preventDefault();

      if (arrUse.length == 0) {
        arrUse.push(this.getAttribute("numb"));
        localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
        this.style.marginTop = 0;
      } else {
        //пользователь дурак и решил в саму себя же перелить
        if (this.getAttribute("numb") == arrUse[0]) {
          document.getElementById(arrUse[0]).style.marginTop = "3%";
          arrUse.splice(0, 1);
          localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
        } else {
          let useColbaObjOne = arrColbas[arrUse[0]]; // объект колбы, которая была выделена первый раз
          let useColbaObjTwo = arrColbas[this.getAttribute("numb")]; //объект колбы, котоую выделили вторую
          useColbaObjOne,
            (useColbaObjTwo = movePiramid(
              useColbaObjOne,
              useColbaObjTwo,
              this
            ));
          arrUse.splice(0, 1);
          localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
          updateColbPiramid();
        }
      }
      localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
    });

    conteiner.appendChild(create);
  }
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));
  updateColbPiramid();
}

//название изменено
function updateColbPiramid() {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));
  let arrColor = JSON.parse(localStorage.getItem("arrColorPiramid"));

  for (let i = 0; i < arrColbas.length; i++) {
    for (let j = 0; j < arrColbas[i].colors.length; j++) {
      document.getElementsByClassName("partColba")[
        i * 5 + j
      ].style.backgroundColor = arrColor[arrColbas[i].colors[j]];
    }
  }
}

//название изменено
function movePiramid(useColbaObjOne, useColbaObjTwo, useObj) {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));
  let arrUse = JSON.parse(localStorage.getItem("arrUsePiramid"));

  let useColbaObjOneColor = useColbaObjOne.getColors(); //цвета первой колбы
  let useColbaObjTwoColor = useColbaObjTwo.getColors(); //цвета второй колбы
  let inColorOne = findColorPiramid(useColbaObjOneColor); //индекс первого не белого цвета у первой колбы
  let inColorTwo = findColorPiramid(useColbaObjTwoColor); // индекс первого не белого цвета у второй колбы

  let color = useColbaObjOneColor[inColorOne]; //запомним цвет, который переливали
  //есть ли места во второй колбе?
  if (inColorTwo != 0) {
    useColbaObjTwo.colors[inColorTwo - 1] = useColbaObjOneColor[inColorOne];
    useColbaObjOne.colors[inColorOne] = 0;
  }
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));
  localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));
  //а вдруг там несколько блоков, которые надо перелить?

  inColorOne = findColorPiramid(useColbaObjOne.colors);
  inColorTwo = findColorPiramid(useColbaObjTwo.colors);

  //пока цвет совпадает - переливаем
  /*while (useColbaObjOne.colors[inColorOne] == color && inColorTwo != 0) {
      useColbaObjOne,
        (useColbaObjTwo = movePiramid(useColbaObjOne, useColbaObjTwo, useObj));
      inColorOne = findColorPiramid(useColbaObjOne.colors);
  
      //надо перекрасить, а я опять забыла
    }*/
  //updateColb();
  //забыла опустить колбу
  document.getElementById(arrUse[0]).style.marginTop = "3%";

  arrColbas[arrUse[0]] = useColbaObjOne;
  arrColbas[useObj.getAttribute("numb")] = useColbaObjTwo;
  arrUse.splice(0, 1);
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));
  localStorage.setItem("arrUsePiramid", JSON.stringify(arrUse));

  //проверка на выигрыш
  if (chekAllProbPiramid()) {




    let button = document.getElementById('piramidContinue');
    audio.pause();
    let sound = new Audio("winner.mp3");
    sound.play();
    setTimeout(function () {
      audio.play();
      button.disabled = false;
    },5000);






    setTimeout(function () {
      localStorage.setItem(
        "levelPiramid",
        Number(localStorage.getItem("levelPiramid")) + 1
      );
      document.getElementsByClassName(
        "windowPiramidContinue"
      )[0].style.display = "block";
      document.getElementsByClassName('windowPiramidContinueFailure')[0].display = 'none';
      document.getElementsByClassName("windowPiramid")[0].style.display =
        "none";

      document.getElementsByClassName("score")[1].textContent =
        Number(document.getElementsByClassName("score")[1].textContent) +
        calculate_score_piramid(
          Number(document.getElementById("timerPiramid").textContent)
        );

      let score = calculate_score(
        Number(document.getElementById("timerPiramid").textContent)
      );
      if (score <= 5) {
        document.getElementById("zv1p").style.display = null;
        document.getElementById("zv2p").style.display = "none";
        document.getElementById("zv3p").style.display = "none";
      } else {
        if (score <= 10) {
          document.getElementById("zv1p").style.display = null;
          document.getElementById("zv2p").style.display = null;
          document.getElementById("zv3p").style.display = "none";
        } else {
          document.getElementById("zv1p").style.display = null;
          document.getElementById("zv2p").style.display = null;
          document.getElementById("zv3p").style.display = null;
        }
      }

      document.getElementById("timerPiramid").textContent = "";
      updateres([
        document.getElementsByClassName("username")[1].textContent,
        "piramid",
        localStorage.getItem("levelPiramid"),
        Number(document.getElementsByClassName("score")[1].textContent),
      ]);
    }, 500);
  }
  return useColbaObjOne, useColbaObjTwo;
}

//название изменено
function findColorPiramid(useColbaObjOneColor) {
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

//название изменено
function renderStartPiramid() {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));
  let conteiner = document.getElementsByClassName("field")[1];
  while (document.getElementsByClassName("colba").length != 0) {
    conteiner.removeChild(document.getElementsByClassName("colba")[0]);
  }
  while (arrColbas.length != 0) {
    arrColbas.splice(0, 1);
  }
  localStorage.setItem("arrColbasPiramid", JSON.stringify(arrColbas));
}

//проверка всех колб на то, одного цвета или нет

//название изменено
function chekAllProbPiramid() {
  let arrColbas = JSON.parse(localStorage.getItem("arrColbasPiramid"));

  let colbas = {};
  //для победы у меня должна быть проверка, что колбы с 5 цветами - 1, колба с 4 цветами - 1, колба с 3 цветами - 1, колба с 2 цветами - 1, колба с 1 цветом - 1
  for (let i = 0; i < arrColbas.length; i++) {
    //проверка, что нет повторяющихся уветов в колбе
    if (checkUniqColor(arrColbas[i])) {
      let a = checkColbaPiramid(arrColbas[i]); //сколько цветов в i колбе
      if (String(a) in colbas) {
        return false;
      } else {
        colbas[String(a)] = 1;
      }
    } else {
      return false;
    }
  }
  return true;

  //для победы у меня должна быть одна пустая и остальные по одному цвету
  //првоерим, есть ли вообще хотя бы одна пустая
  /*let fl = false;
    for (var i = 0; i < arrColbas.length; i++) {
      if (checkNullColb(arrColbas[i])) {
        fl = true;
        break;
      }
    }
  
    //если fl=true, тогда проверяем, чтобы в каждой колбе было по 1 цвету включая белый
    if (fl) {
      for (var i = 0; i < arrColbas.length; i++) {
        if (!checkNullColb(arrColbas[i]) && !checkColbaPiramid(arrColbas[i])) {
          return false;
        }
      }
    } else {
      return false;
    }
  
    return true;*/
}

function checkUniqColor(colba) {
  let arrColor = colba.colors;

  let f = [];
  let count = 0;
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0) {
      if (f.includes(arrColor[i])) {
        return false;
      } else {
        f.push(arrColor[i]);
      }
    }
  }
  return true;
}

//true, если все одного цвета или полностю пустая, false? если 2 и больше цвета
//количество цветов помимо белого должно было не более 1
//название изменено
function checkColbaPiramid(colba) {
  //возвращает сколько цветов в колбе
  let arrColor = colba.colors;

  let f = [];
  let count = 0;
  for (var i = 0; i < arrColor.length; i++) {
    if (!f.includes(arrColor[i]) && arrColor[i] != 0) {
      count++;
      f.push(arrColor[i]);
    }
  }

  return count;
}

//название изменено
function checkNullColb(colba) {
  let arrColor = colba.colors;
  for (var i = 0; i < arrColor.length; i++) {
    if (arrColor[i] != 0) {
      return false;
    }
  }
  return true;
}
