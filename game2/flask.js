function flask(){
    document.getElementsByClassName("windowGamePreview")[0].style.display = 'none';
    document.getElementsByClassName("windowFlask")[0].style.display = 'block';

}






function renderLevel(level) {
  
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
  