let dataPiramid = [];
dataPiramid[1] = {
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

let toMainPiramid = false;

function toMainfrom()
{
    document.getElementsByClassName("windowFlask")[0].style.display = "none";
  document.getElementsByClassName("windowPiramid")[0].style.display = "none";
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "flex";

  let str =
    "уровень: " +
    document.getElementsByClassName("level")[0].textContent +
    " Очки: " +
    document.getElementsByClassName("score")[0].textContent;
  document.getElementsByClassName("ResultsFlask")[0].textContent =
    "Ваш результат: " + str;
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
function piramid() {
  //функция стартовая
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "none";
  document.getElementsByClassName("windowPiramid")[0].style.display = "block";
  document.getElementsByClassName("field")[1].style.display = "flex";
  let level = localStorage.getItem('piramidLevel');
  if (String(level) == 'null'){
    level = 1;
    //localStorage.setItem('piramidLevel',);
  }
  if (level == 0) {
    //рендер превью
  } else {
    generateLevel(level);
  }
}




function generateLevel(level) {

    let conteiner = document.getElementsByClassName("field")[1];

  for (let j = 0; j < dataPiramid[level].countColb; j++) {
    let create = document.createElement("div");
    create.className = "colba";
    create.setAttribute("numb", j);
    create.id = j;
    let colba = new Colba();
    arrColbas.push(colba);
    for (i = 0; i < dataPiramid[level].countPart; i++) {
      let createPart = document.createElement("div");
      createPart.className = "partColba";
      colba.pushColor(dataPiramid[level].arrColb[j][i]);
      create.appendChild(createPart);
    }
    create.addEventListener("click", function (e) {
      e.preventDefault();

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
          move(useColbaObjOne, useColbaObjTwo, this);
        }
      }
    });

    conteiner.appendChild(create);
  }
}
function updateColb() {
    console.log(arrColbas);
    for (let i = 0; i < arrColbas.length; i++) {
      for (let j = 0; j < arrColbas[i].colors.length; j++) {
        document.getElementsByClassName("partColba")[
          i * 5 + j
        ].style.backgroundColor = arrColor[arrColbas[i].colors[j]];
      }
    }
  }
