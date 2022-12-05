function start() {
    let name = document.getElementById("name").value;
  if (
    name == "" ||
    name == " "
  ) {
    document.getElementsByClassName("errName")[0].style.display = "block";
  } else {
    windowGamePreview = document.getElementsByClassName("windowGamePreview")[0];
    windowStart = document.getElementsByClassName("windowStart")[0];
    windowStart.style.display = "none";
    windowGamePreview.style.display = "flex";
    let res = getResultFlask(name);
    let  str= "уровень: " + res['level'] +  " Очки: "+  res['score'];
    document.getElementsByClassName("ResultsFlask")[0].textContent += str;
    res = getResultPiramid(name);
    str = "уровень: " + res['level'] +  " Очки: "+  res['score'];
    document.getElementsByClassName("ResultsPiramid")[0].textContent += str;
  }

}


function getResultFlask(name){
    console.log(localStorage.getItem('results'));
    let res = JSON.parse(localStorage.getItem('results'));
    if (String(res)=='null'){
        return {level: 0, score: 0}
    }
    else{
        //получили массив объектов
        let fl = false;
        for (let i=0;i<res.length;i++){
            if (res[i]['name']==name){
                fl==true;
                break;
            }
        }
        if (fl){ //нашли такого пользователя
            return res[i]['results']['flask']
        }
        else { //играет впервые
            return {level: 0, score: 0}
        }
    }

}
function getResultPiramid(name){
    let res = JSON.parse(localStorage.getItem('results'));
    if (String(res)=='null'){
        return {level: 0, score: 0}
    }
    else{
        //получили массив объектов
        let fl = false;
        for (let i=0;i<res.length;i++){
            if (res[i]['name']==name){
                fl==true;
                break;
            }
        }
        if (fl){ //нашли такого пользователя
            return res[i]['results']['piramid']
        }
        else { //играет впервые
            return {level: 0, score: 0}
        }
    }

}


