var audio;
audio = new Audio("sound2.mp3");
function start() {
  let name = document.getElementById("name").value;
  if (name == "" || name == " ") {
    document.getElementsByClassName("errName")[0].style.display = "block";
  } else {
    audio.pause();
    audio.play();
    windowGamePreview = document.getElementsByClassName("windowGamePreview")[0];
    windowStart = document.getElementsByClassName("windowStart")[0];
    windowStart.style.display = "none";
    windowGamePreview.style.display = "block";
    let res = getResultFlask(name);
    let str = "уровень: " + res["level"] + " Очки: " + res["score"];
    document.getElementsByClassName("ResultsFlask")[0].textContent += str;
    res = getResultPiramid(name);
    str = "уровень: " + res["level"] + " Очки: " + res["score"];
    document.getElementsByClassName("ResultsPiramid")[0].textContent += str;
    localStorage.setItem("name", document.getElementById("name").value);
    localStorage.setItem("level", res["level"]);
  }
}

function rating() {
  windowRatingFlask = document.getElementsByClassName("windowRatingFlask")[0];
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "none";
  windowRatingFlask.style.display = "block";
  let create;
  let dop;
  let res = JSON.parse(localStorage.getItem("results"));
  console.log(res);
  for (let i = 0; i < res.length; i++) {
    createParent = document.createElement("tr");

    create = document.createElement("th");
    dop = res[i]["name"];
    create.textContent = String(dop);
    createParent.appendChild(create);

    create = document.createElement("th");
    dop = res[i]["results"]["flask"]["level"];
    create.textContent = String(dop);
    createParent.appendChild(create);

    create = document.createElement("th");
    dop = res[i]["results"]["flask"]["score"];
    create.textContent = String(dop);
    createParent.appendChild(create);

    document.getElementsByClassName("table")[0].appendChild(createParent);
  }
}

function back() {
  document.getElementsByClassName("windowStart")[0].style.display = "block";
  document.getElementsByClassName("windowSettings")[0].style.display = "none";

  document.getElementsByClassName("windowRatingFlask")[0].style.display =
    "none";
  audio.pause();
}

function settings() {
  document.getElementsByClassName("windowGamePreview")[0].style.display =
    "none";
  document.getElementsByClassName("windowSettings")[0].style.display = "block";
}
function changeVolume() {
  audio.volume = Number(document.getElementById("vIn").value) / 100;
}

function getResultFlask(name) {
  console.log(localStorage.getItem("results"));
  let res = JSON.parse(localStorage.getItem("results"));
  if (String(res) == "null") {
    return { level: 0, score: 0 };
  } else {
    //получили массив объектов
    let fl = false;
    for (let i = 0; i < res.length; i++) {
      if (res[i]["name"] == name) {
        fl == true;
        break;
      }
    }
    if (fl) {
      //нашли такого пользователя
      return res[i]["results"]["flask"];
    } else {
      //играет впервые
      return { level: 0, score: 0 };
    }
  }
}
function getResultPiramid(name) {
  let res = JSON.parse(localStorage.getItem("results"));
  if (String(res) == "null") {
    return { level: 0, score: 0 };
  } else {
    //получили массив объектов
    let fl = false;
    for (let i = 0; i < res.length; i++) {
      if (res[i]["name"] == name) {
        fl == true;
        break;
      }
    }
    if (fl) {
      //нашли такого пользователя
      return res[i]["results"]["piramid"];
    } else {
      //играет впервые
      return { level: 0, score: 0 };
    }
  }
}
