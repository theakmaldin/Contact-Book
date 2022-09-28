let inpName = document.getElementById("name");
let inpEmail = document.getElementById("email");
let inpImgUrl = document.getElementById("imgUrl");
let btn = document.getElementById("infoSend");
let ul = document.getElementById("infoLi");
console.log(btn);

//? Create - созданиие/добавление новых данных
//? Read - отабражение данных
//? Update - изминение (обновление) существующих данных
//? Delete - удаление всех данных или только выбранной

// ! ========= Creat Start ===========
function createInfo(infor) {
  if (!localStorage.getItem("info")) {
    localStorage.setItem("info", "[]");
  }
  let data = JSON.parse(localStorage.getItem("info"));
  data.push(infor);
  localStorage.setItem("info", JSON.stringify(data));
}
btn.addEventListener("click", () => {
  if (!inpName.value.trim()) {
    alert("Заполните поле 'name'");
    return;
  } else if (!inpEmail.value.trim()) {
    alert("Заполните поле 'email'");
    return;
  } else if (!inpImgUrl.value.trim()) {
    alert("Заполните поле 'imgUrl'");
    return;
  }

  let obj = {
    name: inpName.value,
    email: inpEmail.value,
    imgUrl: inpImgUrl.value,
  };

  createInfo(obj);

  readInfo();

  inpName.value = "";
  inpEmail.value = "";
  inpImgUrl.value = "";
});
// ! ========= Creat Finish ===========

// ! ======== Read Start ===========
function readInfo() {
  if (!localStorage.getItem("info")) {
    localStorage.setItem("info", "[]");
  }
  let data = JSON.parse(localStorage.getItem("info"));

  ul.innerHTML = "";

  data.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerText = `${item.name},
    ${item.email},
    ${item.imgUrl}`;

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Удалить";

    li.append(btnDelete);

    btnDelete.addEventListener("click", () => {
      deleteInfo(index);
    });
    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Изменить";
    li.append(btnEdit);

    btnEdit.addEventListener("click", () => {
      editInfo(index, item);
    });
    ul.append(li);
  });
}
// ! ======== Read Finish ===========

// ! =========== Delete Start ==========
function deleteInfo(index) {
  let data = JSON.parse(localStorage.getItem("info"));

  data.splice(index, 1);

  localStorage.setItem("info", JSON.stringify(data));

  readInfo();
}
// ! =========== Delete Finish ==========

// ! ============ Edit Start ============
let mainModal = document.querySelector(".main-modal");
let innerModalName = document.getElementById("innerModalName");
let innerModalEmail = document.getElementById("innerModalEmail");
let innerModalUrl = document.getElementById("innerModalUrl");

let boxIndex = document.querySelector(".boxIndex");

function editInfo(index, item) {
  console.log(item);
  mainModal.style.display = "block";
  innerModalName.value = `${item.name}`;
  innerModalEmail.value = `${item.email}`;
  innerModalUrl.value = `${item.imgUrl}`;

  boxIndex.setAttribute("id", index);
}

let btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", () => {
  if (!innerModalName.value.trim()) {
    alert("Заполните поле 'name'");
    return;
  } else if (!innerModalEmail.value.trim()) {
    alert("Заполните поле 'email'");
    return;
  } else if (!innerModalUrl.value.trim()) {
    alert("Заполните поле 'imgUrl'");
    return;
  }

  let data = JSON.parse(localStorage.getItem("info"));

  let obj2 = {
    name: innerModalName.value,
    email: innerModalEmail.value,
    imgUrl: innerModalUrl.value,
  };

  data.splice(boxIndex.id, 1, obj2);

  localStorage.setItem("info", JSON.stringify(data));

  readInfo();
  mainModal.style.display = "none";
});

let btnCloseModal = document.getElementById("btnCloseModal");
btnCloseModal.addEventListener("click", () => {
  mainModal.style.display = "none";
});
// ! ============ Edit Finish ============
readInfo();
