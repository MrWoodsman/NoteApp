var edit_type = undefined

/*
actual_folder - zeby pobrac z array to -1
actual_note - zeby pobrac z array to -1
*/

document.querySelector('#createList').addEventListener('click', CreateList)
document.querySelector('#create_text').addEventListener('click', CreateText)
document.querySelectorAll('.create_title').forEach((e) => {
    e.addEventListener('click', CreateTitle)
})

var default_text_list = 'Lista'
var default_text_title = 'Nagłówek'
var default_text_paragraph = 'Tekst'

function CreateList() {
    console.log('Tworzenie listy');
    mainScreenID.innerHTML += `
    <ul contenteditable="true" onclick="setThistToEdit(this)">
        <li >${default_text_list}</li>
    </ul>`
}
function CreateTitle(e) {
    const size = e.target.getAttribute('size')
    console.log('Tworzenie listy');
    mainScreenID.innerHTML += `
    <h${size} contenteditable="true" onclick="setThistToEdit(this)">${default_text_title}</h${size}>`
}
function CreateText(e) {
    const size = e.target.getAttribute('size')
    console.log('Tworzenie listy');
    mainScreenID.innerHTML += `
    <p contenteditable="true" onclick="setThistToEdit(this)">${default_text_paragraph}</p>`
}

function setThistToEdit(e) {
    edit_type = e
    console.warn(edit_type);
}

document.addEventListener('keydown', (e) => {
    if(edit_type != undefined) {
        if(edit_type.tagName == 'UL')
        if(edit_type.children.length < 1) {
            const li = document.createElement('li')
            li.innerText = `${edit_type.textContent}`
            console.warn(edit_type);
            edit_type.appendChild(li)
            // edit_type.remove()
        }
    }
})

// document.querySelector('2').getAttribute