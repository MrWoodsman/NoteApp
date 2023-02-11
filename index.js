var Folder = [
    {
    "id": 1,
    "name": "Nowy Folder #1",
    "notes": [
        {"id":1,"name":"test #1","content":"Ciesz się każdym dniem jakby był ostatnim."},
        {"id":2,"name":"test #2","content":"Szukaj szczęścia w prostych rzeczach."},
        {"id":3,"name":"test #3","content":"Miej odwagę być sobą."}
    ]
    },
    {
    "id": 2,
    "name": "Nowy Folder #2",
    "notes": [
        {"id":1,"name":"test #1","content":"Nie bój się podejmować ryzyka."},
        {"id":2,"name":"test #2","content":"Uśmiechaj się, nawet jeśli nie jest ci do śmiechu."},
        {"id":3,"name":"test #3","content":"Nie czekaj na idealne warunki, działaj teraz."}
    ]
    }
]

var actual_folder = 1
var actual_note = 0

const box = document.querySelector('#note_list_box')

function findNote(folderId, noteId) {
    for (const folder of Folder) {
        if (folder.id === folderId) {
            for (const note of folder.notes) {
                if (note.id === noteId) {
                    return note;
                }
            }
        }
    }
    return null;
}
function findFolder(folderId) {
    for (const folder of Folder) {
        if (folder.id === folderId) {
            return folder;
        }
    }
    return null;
}

function ToggleFolder(e) {
    e.classList.toggle('hiden')
    // console.warn(e.className.split(' ').includes('hiden'));
    if (e.className.split(' ').includes('hiden') == true) {
        e.parentNode.parentNode.children[1].style.display = 'none'
    } else {
        e.parentNode.parentNode.children[1].style.display = 'block'
    }
}
function HiglideActivDirectory(type,id) {
    document.querySelectorAll('.note').forEach((x) => {
        x.classList.remove('active')
    })
    document.querySelectorAll('.folderNameBox').forEach((x) => {
        x.classList.remove('active')
    })


    if (type == 'note') {
        const activeDB = findNote(actual_folder,id)
        document.querySelectorAll('.folderName').forEach((e) => {
            if (e.getAttribute('dbid') == actual_folder) {
                const child = e.parentNode.parentNode.children[1]
                for (let b = 0; b < child.children.length; b++) {
                    const element = child.children[b];
                    if (element.children[1].getAttribute('dbid') == id) {
                        element.classList.add('active')
                    }
                }
            }
        })
    } else if (type == 'folder') {
        document.querySelectorAll('.folderName').forEach((e) => {
            if (e.getAttribute('dbid') == actual_folder) {
                e.parentNode.classList.add('active')
            }
        })
    }
}

const mainScreen = document.querySelector('#main_screen_box')
const structurPath = document.querySelector('#path_structure')
function OpenFolder(e) {
    // console.warn(e.getAttribute('type'));
    var path = ''
    
    if(e.getAttribute('type') == 'folder') {
        // console.warn(1);
        //! Folder
        var path = `<p>${e.innerText}</p>`
        structurPath.innerHTML = path
        //! Ładowanie wyświetlania contentu
        // 
        actual_folder = parseInt(e.getAttribute('dbid'))
        // 
        mainScreen.innerHTML = ``
        HiglideActivDirectory('folder',actual_folder)
    } else {
        // console.warn(2);
        //! Notatka
        const FolderElement = e.parentNode.parentNode.parentNode.children[0].children[1]
        var path = `<p>${FolderElement.innerText}</p><p>></p>`
        structurPath.innerHTML = `${path}<p>${e.innerText}</p>`
        //! Ładowanie wyświetlania contentu
        const clickedNote = findNote(parseInt(FolderElement.getAttribute('dbid')),parseInt(e.getAttribute('dbid')));
        // 
        actual_folder = parseInt(FolderElement.getAttribute('dbid'))
        actual_note = parseInt(e.getAttribute('dbid'))
        // 
        mainScreen.innerHTML = `<p>${clickedNote.content}</p>`
        HiglideActivDirectory('note',actual_note)
    }
    // document.querySelector('3').getAttribute
}

function CreateFolderAndNotes() {
    const fileContent = `<i class="bi bi-file-earmark"></i>`
    Folder.forEach((e) => {
        console.warn(e);
        const folder = document.createElement('div')
        folder.classList.add('folder')
        folder.innerHTML = `
        <div class="folderNameBox">
            <div class="pathBox" onclick="ToggleFolder(this)"><div class="arrow"></div></div><h1 onclick="OpenFolder(this)" type="folder" dbid="${e.id}" class="folderName">${e.name}</h1>
        </div>
        <div class="folderContent"></div>
        `
        box.appendChild(folder)

        for (let i = 0; i < e.notes.length; i++) {
            const element = e.notes[i];
            
            const note = document.createElement('div')
            note.classList.add('note')
            if (i == e.notes.length - 1) {
                note.innerHTML = `
                <div class="pathBox"><div class="next_arrow"></div></div><h1 onclick="OpenFolder(this)" dbid="${element.id}" type="note" class="noteName">${fileContent} ${element.name}</h1>
                `
            } else {
                note.innerHTML = `
                <div class="pathBox"><div class="next_arrow"></div><div class="down"></div></div><h1 onclick="OpenFolder(this)" dbid="${element.id}" type="note" class="noteName">${fileContent} ${element.name}</h1>
                `
            }
            folder.children[1].appendChild(note)
            // console.warn(element, i, Folder.length);
        }
    })
}
CreateFolderAndNotes()

function updateMainScreen() {
    const element = findFolder(actual_folder)
    if (actual_note == 0) {
        if (actual_folder == 0) { return }
        //! Otwiera tylko folder
        var path = `<p>${element.name}</p>`
        structurPath.innerHTML = path
        //! Ładowanie wyświetlania contentu
        mainScreen.innerHTML = ``
        HiglideActivDirectory('folder',actual_folder)
    } else {
        //! Otwiera folder a w nim notatke o konkretnym id
        const clickedNote = findNote(actual_folder,actual_note);
        // const FolderElement = e.parentNode.parentNode.parentNode.children[0].children[1]
        var path = `<p>${element.name}</p><p>></p>`
        structurPath.innerHTML = `${path}<p>${clickedNote.name}</p>`
        //! Ładowanie wyświetlania contentu
        // 
        // actual_folder = parseInt(FolderElement.getAttribute('dbid'))
        // actual_note = parseInt(e.getAttribute('dbid'))
        // 
        mainScreen.innerHTML = `<p>${clickedNote.content}</p>`
        HiglideActivDirectory('note',actual_note)
    }
    // console.warn(actual_folder, actual_note);
}

function GoBack() {
    // console.log('<- BACk');
    const actual = findFolder(actual_folder)
    if (actual_note > 0 ) {
        actual_note -= 1
    } else {
        if (actual_folder-1 >= 1) {
            actual_note = actual.notes.length
            actual_folder -= 1
        }
    }
    updateMainScreen()
}
function GoNext() {
    // console.log('NEXT ->');
    const actual = findFolder(actual_folder)
    if (actual_note < actual.notes.length ) {
        actual_note += 1
    } else {
        if (actual_folder+1 <= Folder.length) {
            actual_note = 0
            actual_folder += 1
        }
    }
    updateMainScreen()
}

// HiglideActivDirectory('folder',1)

document.querySelectorAll('.backBTN').forEach((e) => {
    e.addEventListener('click',GoBack)
})

document.querySelectorAll('.nextBTN').forEach((e) => {
    e.addEventListener('click',GoNext)
})