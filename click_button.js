const urlGET = 'https://rest-full-for-edu.onrender.com/api/read/';
const urlSET = 'https://rest-full-for-edu.onrender.com/api/update/';


const myModal = document.querySelector('.modal');
var dataServer;


// (async () => {
//   await fetch(urlGET)
//     .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//     })
//     .then(data=> {
//       console.log(data);
//       dataServer = data;
//     });
// })

fetch(urlGET)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data=> {
      console.log(data);
      for(var classButton of document.querySelectorAll('.data')){
        classButton.querySelector('.data_name').textContent = data[classButton.id  / 11 - 1].info.name;
        classButton.querySelector('.data_login').textContent = data[classButton.id  / 11 - 1].info.login;
        classButton.querySelector('.data_password').textContent = data[classButton.id  / 11 - 1].info.password;
        classButton.querySelector('.data_date').textContent = data[classButton.id  / 11 - 1].date;
      }
    });

var ID;
for(var classButton of document.querySelectorAll('.data')){
  const btn = classButton.querySelector('.data_change')

  // classButton.querySelector('.data_name').textContent = 
  btn.addEventListener('click', () => {
    ID = btn.id;
    fetch(urlGET + ID)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data=> {
      // console.log(data);
      document.querySelector('#inputName').value = data.info.name;
      document.querySelector('#inputLog').value = data.info.login;
      document.querySelector('#inputPas').value = data.info.password;
    });
    myModal.style.display = "block";
  })
}

document.querySelector('#save').addEventListener('click', ()=>{
  const info = {
    name: document.querySelector('#inputName').value,
    login: document.querySelector('#inputLog').value,
    password: document.querySelector('#inputPas').value
  };
  const data = {info};

  fetch(urlSET + ID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then((res) => res.json())
    .then((res) => {
       console.log(data);
    });
    myModal.style.display = "none";

    fetch(urlGET)
    .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data=> {
      console.log(data);
      for(var classButton of document.querySelectorAll('.data')){
        classButton.querySelector('.data_name').textContent = data[classButton.id  / 11 - 1].info.name;
        classButton.querySelector('.data_login').textContent = data[classButton.id  / 11 - 1].info.login;
        classButton.querySelector('.data_password').textContent = data[classButton.id  / 11 - 1].info.password;
        classButton.querySelector('.data_date').textContent = data[classButton.id  / 11 - 1].date;
      }
    });
});
 
document.querySelector('#exit').addEventListener('click', ()=>{
  // document.querySelector('.modal_content').classList.add('animation_close');
  myModal.style.display = "none";
});

window.addEventListener('touchend', function(event) {
  if (event.target == myModal) {
    // document.querySelector('.modal_content').classList.toggle('animation_close')
    myModal.style.display = "none";
  }
});
