document.addEventListener('DOMContentLoaded', () => {
    let games = [];
    const grid = document.querySelector('#grid-body');   
    const saveBnt = document.getElementById('save-id');
    const addBtn = document.getElementById('add-id');
    const addBtnModal = document.getElementById('modal-add-id');

    const name_id = document.getElementById('name-id'); 
    const year_id = document.getElementById('year-id');
    const genre_id = document.getElementById('genre-id');
    const status_id = document.getElementById('status-id');
    const click_year = document.querySelector('.year-games');
    const click_name = document.querySelector('.name-games');
    const click_genre = document.querySelector('.genre-games');


    let sortYearType = true;
    let sortNameType = true;
    let sortGenreType = true;
 
    

    let string = '';
    

    const cancelBtn = document.getElementById('modal-cancel-id'); 
    
    let gameId = 0;

const modal = document.querySelector(".modal");
const closeModal = document.getElementsByClassName("close")[0];

closeModal.addEventListener('click', function(){
    modal.style.display = 'none';
})

const AddModal = document.querySelector('.add-modal');
const shutAddModal = document.getElementsByClassName("close-add")[0];
const cancelBtnEdit = document.getElementById('cancel-id');

addBtn.addEventListener('click', () => {
    AddModal.style.display = 'block';
})

shutAddModal.addEventListener('click', ()=>{
    AddModal.style.display = 'none';

})

saveBnt.addEventListener('click', () => {
    SaveGame();
})

addBtnModal.addEventListener('click', ()=> {
    AddGames();
})

cancelBtn.addEventListener('click', ()=> {
    AddModal.style.display = 'none';
})

click_year.addEventListener('click', () => {
    sort_year();
})

click_name.addEventListener('click', () => {
    sort_name();
})

click_genre.addEventListener('click', () => {
    sort_genre();
})


cancelBtnEdit.addEventListener('click', ()=> {
    modal.style.display = 'none';
})


function SaveGame(){
    const newData = [         
        {propName: 'name', value: name_id.value},
        {propName: 'year' , value: year_id.value},
        {propName: 'genre', value: genre_id.value},
        {propName: 'status', value: status_id.checked == true ? 1 : 0},
    ];

    fetch(`https://peridot-pastry.glitch.me/games/${gameId}`, {
        method: 'PATCH',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(newData)
    }).then(() => {
        modal.style.display = 'none';
        getGames();
    })
}

    const add_name_id = document.getElementById('add-name-id'); 
    const add_year_id = document.getElementById('add-year-id');
    const add_genre_id = document.getElementById('add-genre-id');
    const add_status_id = document.getElementById('add-status-id');

    

function AddGames(){
    const Data = [
        {propName: 'name', value: add_name_id.value},
        {propName: 'year' , value: add_year_id.value},
        {propName: 'genre', value: add_genre_id.value},
        {propName: 'status', value: add_status_id.checked == true ? 1 : 0}
    ];
    if(!add_name_id.value.length || !add_year_id.value.length) {
        alert('Ви не ввели нічого. Введіть будь ласка дані');
    }
    else {
    fetch('https://peridot-pastry.glitch.me/games', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
        }).then(()=> {
        AddModal.style.display = 'none';
        getGames();
    })
}
}
    
function RenderGames() {
    string = '';
    games.forEach((game) => {
        string += 
        `<div class="informations">
            <div class="name-games"><span class="text">${game.name}</span></div>
            <div class="year-games"><span class="text">${game.year}</span></div>
            <div class="genre-games"><span class="text">${game.genre}</span></div>
            <div class="status-game"><input type="checkbox" ${game.status ? 'checked' : ''}></div>
            <div class="actions">
                <div class="edit-games"><button data-id="${game._id}" class="btn edit pointer" action="edit"><i class='bx bxs-edit'></i>Змінити</button></div>
                <div class="delete-games"><button data-id="${game._id}" class="btn delete pointer" action="delete"><i class='bx bxs-trash'></i>Видалити</button></div>
            </div>
        </div>`;
    });
    
    grid.innerHTML = string;

    const knopki = document.querySelectorAll("button[action=edit]");
    const knopki_del = document.querySelectorAll("button[action=delete]");

    knopki_del.forEach(function(item, i){
        item.addEventListener('click', () => {
            const buttonId = item.getAttribute('data-id');
            const areUSure = confirm('are u sure?');

            if (areUSure) {
                fetch(`https://peridot-pastry.glitch.me/games/${buttonId}`, {
                    method: 'DELETE',
                    mode: 'cors' 
                }).then(() => {
                    getGames();
                })
            }

        })
    });

    knopki.forEach(function(item, i){
        item.addEventListener('click' , function() {
            const buttonId = item.getAttribute('data-id');
            gameId = buttonId;
            const selectedGame = games.find((game) => game._id === buttonId);
            modal.style.display = "block";

            modal.querySelector('#name-id').value = selectedGame.name;
            modal.querySelector('#year-id').value = selectedGame.year;
            modal.querySelector('#genre-id').value = selectedGame.genre;
            modal.querySelector('#status-id').checked = selectedGame.status == 1 ? true : false;
        })
    })

}

function sort_name() {
    sortNameType = !sortNameType;

   
    games.sort((a, b) => {
        if (a.name > b.name) {
            return sortNameType ? 1 : -1;
          }
          if (a.name < b.name) {
            return sortNameType ? -1 : 1;
          }
          
          return 0;
    });
    RenderGames();
}

function sort_genre() {
    sortGenreType =!sortGenreType;

    games.sort((a, b) => {
        if (a.genre > b.genre) {
            return sortGenreType ? 1 : -1;
        }
        if (a.genre < b.genre){
            return sortGenreType ? -1 : 1;
        }
        return 0;
    });
    RenderGames();
}

function sort_year() { 
    sortYearType = !sortYearType;
    games.sort((a, b) => {
        return sortYearType ? a.year - b.year : b.year - a.year;
    })


//     if (sortYearType){
//         games.sort((a, b) => a.year - b.year)
//         sortYearType = false;
//     }
//    else if(!sortYearType)
//    {
//         games.sort((a, b) => b.year  - a.year)
//         sortYearType = true;
//    }    
    RenderGames();
}


function getGames(){ 
    fetch('https://peridot-pastry.glitch.me/games', {
        method: 'GET',
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then((response) => {
        games = response;
        RenderGames();
    })
}

getGames();
    
});
