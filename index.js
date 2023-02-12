//! DEV
//* Tymczasowe dane folderów i notatek 
var Folder = [
    {
    "id": 1,
    "name": "Nowy Folder",
    "notes": [
        {"id":1,"name":"Moja pierwsza notatka","content":"Ciesz się każdym dniem jakby był ostatnim."},
        {"id":2,"name":"test #2","content":"Szukaj szczęścia w prostych rzeczach."},
        {"id":3,"name":"test #3","content":"Miej odwagę być sobą."},
        {"id":4,"name":"test #4","content":"Miej odwagę być sobą."}
    ]
    },
    {
    "id": 2,
    "name": "Listy zakupowe 🛒",
    "notes": [
        {"id":1,"name":"Biedronka 🐞","content":"Nie bój się podejmować ryzyka."},
        {"id":2,"name":"Rzeczy do budowy","content":"Uśmiechaj się, nawet jeśli nie jest ci do śmiechu."},
        {"id":3,"name":"Kwiatki","content":"Nie czekaj na idealne warunki, działaj teraz."},
        {"id":4,"name":"Kwiatki","content":"Nie czekaj na idealne warunki, działaj teraz."},
        {"id":5,"name":"Kwiatki","content":"Nie czekaj na idealne warunki, działaj teraz."},
        {"id":6,"name":"Kwiatki","content":"Nie czekaj na idealne warunki, działaj teraz."},
        {"id":7,"name":"Kwiatki","content":"Nie czekaj na idealne warunki, działaj teraz."},
    ]
    },
    {
        "id": 3,
        "name": "Nowy Folder #3",
        "notes": [
            {"id":1,"name":"test #1","content":"Ciesz się każdym dniem jakby był ostatnim."},
            {"id":2,"name":"test #2","content":"Szukaj szczęścia w prostych rzeczach."},
            {"id":3,"name":"test #3","content":"Miej odwagę być sobą."},
            {"id":4,"name":"test #4","content":"Miej odwagę być sobą."},
            {"id":5,"name":"test #5","content":"Miej odwagę być sobą."}
        ]
    },
    {
        "id": 4,
        "name": "Nowy Folder #4",
        "notes": [
            {"id":1,"name":"test #1","content":"Ciesz się każdym dniem jakby był ostatnim."},
            {"id":2,"name":"test #2","content":"Szukaj szczęścia w prostych rzeczach."},
            {"id":3,"name":"test #3","content":"Miej odwagę być sobą."}
        ]
    }
]
//!
//* Zmienne aktalnie otwartego folderu / notatki
var actual_folder = 1
var actual_note = 0
//* Pozycja myszki
var mouseX = 0
var mouseY = 0
//* Edit menu
var EditVisable = false
var EditSelected = null
var EditSelectedFolder = null
//* Zmienne elementów pobranych z HTML'a
const mainScreen = document.querySelector('#main_screen_box')
const structurPath = document.querySelector('#path_structure')
const box = document.querySelector('#note_list_box')
const editBox = document.querySelector('#edit_box')
//* Aktalizacja pozycji myszki
function updateDisplay(event) {
    mouseX = event.pageX;
    mouseY = event.pageY;
}
document.addEventListener("mousemove", updateDisplay, false);
//* Funkcja szukająca notatkia porzez podanie [ id ] folderu oraz [ id ] notatki
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
//* Funkcja szukająca folderu poprzez podanie jego [ id ]
function findFolder(folderId) {
    for (const folder of Folder) {
        if (folder.id === folderId) {
            return folder;
        }
    }
    return null;
}
//* Funkcja odpowiadająca za zwijanie/rozwijanie folderów
function ToggleFolder(e) {
    e.classList.toggle('hiden')
    if (e.className.split(' ').includes('hiden') == true) {
        e.parentNode.parentNode.children[1].style.display = 'none'
    } else {
        e.parentNode.parentNode.children[1].style.display = 'block'
    }
}
//* Dodawanie klasy [ active ] dla aktualnie otwartej notatki/folderu
function HiglideActivDirectory(type,id) {
    //* Usuwanie klasy [ active ] ze wszystkich elementów z klasą [ note ]
    document.querySelectorAll('.note').forEach((x) => {
        x.classList.remove('active')
    })
    //* Usuwanie klasy [ active ] ze wszystkich elementów z klasą [ folderNameBox ]
    document.querySelectorAll('.folderNameBox').forEach((x) => {
        x.classList.remove('active')
    })
    //* Określanie czy trzeba podświetlić folder czy notatkę
    const selFolder = Folder.indexOf(Folder[actual_folder-1])
    const selNote = Folder[selFolder].notes.indexOf(Folder[actual_folder-1].notes[id-1])

    const realFolder = Folder[selFolder]
    const realNote = Folder[selFolder].notes[selNote]

    if (type == 'folder') {
        document.querySelectorAll('.folderName').forEach((e) => {
            if (e.getAttribute('dbid') == realFolder.id) {
                e.parentNode.classList.add('active')
            }
        })
    } else if (type == 'note') {
        document.querySelectorAll('.folderName').forEach((e) => {
            if (e.getAttribute('dbid') == realFolder.id) {
                e.parentNode.parentNode.children[1].children[selNote].classList.add('active')
            }
        })
    }
}
//* Funkcja odpowiadająca za oteiranie folderu/notatki
function OpenFolder(e) {
    //* Zmienna sciezki
    var path = ''
    //* Określanie co trzeba otworzyć [ folder / notatka ]
    if(e.getAttribute('type') == 'folder') {    //* Folder
        var path = `<p>${e.innerText}</p>`
        structurPath.innerHTML = path
        //! Ładowanie wyświetlania contentu
        // 
        actual_folder = Folder.indexOf(findFolder(parseInt(e.getAttribute('dbid'))))+1
        actual_note = 0
        // 
        const selFolder = Folder.indexOf(Folder[actual_folder-1])
        // const selNote = Folder[selFolder].notes.indexOf(Folder[actual_folder-1].notes[id-1])
        // 
        const tableIndex = Folder.indexOf(findFolder(parseInt(e.getAttribute('dbid'))))
        mainScreen.classList.add('grid')
        mainScreen.innerHTML = ``
        Folder[tableIndex].notes.forEach((b) => {
            mainScreen.innerHTML += `<div onclick="OpenFolder(this)" dbid="${b.id}" class="mini_note">
                <h1 class="title">${b.name}</h1>
                <p class="content">${b.content}</p>
            </div>`
        })
        HiglideActivDirectory('folder',actual_folder)
    } else if (e.getAttribute('type') == 'note') {    //* Notatka
        mainScreen.classList.remove('grid')
        const FolderElement = e.parentNode.parentNode.parentNode.children[0].children[1]
        var path = `<p>${FolderElement.innerText}</p><p>></p>`
        structurPath.innerHTML = `${path}<p>${e.innerText}</p>`
        const clickedNote = findNote(parseInt(FolderElement.getAttribute('dbid')),parseInt(e.getAttribute('dbid')));
        // 
        actual_folder = Folder.indexOf(findFolder(parseInt(FolderElement.getAttribute('dbid'))))+1
        actual_note = parseInt(e.getAttribute('dbid'))
        //* Aktualizacja ekranu głównego
        mainScreen.innerHTML = `<p>${clickedNote.content}</p>`
        HiglideActivDirectory('note',actual_note)
    } else {
        mainScreen.classList.remove('grid')
        const FolderElement = findFolder(actual_folder)
        var path = `<p>${FolderElement.name}</p><p>></p>`
        const clickedNote = findNote(parseInt(FolderElement.id),parseInt(e.getAttribute('dbid')));
        structurPath.innerHTML = `${path}<p>${clickedNote.name}</p>`
        // 
        actual_folder = parseInt(FolderElement.id)
        actual_note = parseInt(e.getAttribute('dbid'))
        //* Aktualizacja ekranu głównego
        mainScreen.innerHTML = `<p>${clickedNote.content}</p>`
        HiglideActivDirectory('note',actual_note)
    }
}
//* Generowanie edytora
function GenerateEditBox(e) {
    editBox.innerHTML = ``
    const dbid = e.parentNode.children[1].getAttribute('dbid')
    //* Przesuniecie w góre
    if (e.parentNode.children[1].getAttribute('type') == 'folder') {
        EditSelected = findFolder(parseInt(dbid))
        EditSelectedFolder = null
        //* Jeśli edytowany jest folder
        if (Folder.indexOf(findFolder(parseInt(dbid))) != 0) {
            const event = document.createElement('div')
            event.innerHTML = `<p moveNum="-1" onclick="moveFolder(this)"><i class="bi bi-arrow-up"></i> Move Up Folder</p>`
            editBox.appendChild(event)
        }
        //* Przesunięcie w dół
        if (Folder.indexOf(findFolder(parseInt(dbid))) != Folder.length-1) {
            const event = document.createElement('div')
            event.innerHTML = `<p moveNum="1" onclick="moveFolder(this)"><i class="bi bi-arrow-down"></i> Move Down Folder</p>`
            editBox.appendChild(event)
        }
        //* Usuwanie
        const event = document.createElement('div')
        event.innerHTML = `<p onclick="removeData(this)"><i class="bi bi-trash3"></i> Remove Folder</p>`
        editBox.appendChild(event)
    } else if (e.parentNode.children[1].getAttribute('type') == 'note') {
        const FolderId = e.parentNode.parentNode.parentNode
        EditSelected = findNote(parseInt(FolderId.getAttribute('dbid')),parseInt(dbid))
        EditSelectedFolder = findFolder(parseInt(FolderId.getAttribute('dbid')))
        //* Usuwanie
        const event = document.createElement('div')
        event.innerHTML = `<p onclick="removeData(this)"><i class="bi bi-trash3"></i> Remove Note</p>`
        editBox.appendChild(event)
    }
}
//* Edytowanie folderów
function editFolder(e) {
    console.warn();
    GenerateEditBox(e)
    EditVisable = true
    editBox.style.left = `${mouseX-3}px`
    editBox.style.top = `${mouseY-3}px`
    editBox.style.display = 'block'
}
//* Tworzenie wszystkich folderów oraz notatek w nich ( tymczasowo dane są pobierane z lokalnego arraya )
//* W przyszłości wprowadzenie pobierania z bazy danych od konkretnego użytkownika
function CreateFolderAndNotes() {
    if (Folder.length < 1) { return }
    box.innerHTML = ''
    const fileContent = `<i class="bi bi-file-earmark"></i>`
    Folder.forEach((e) => {
        const folder = document.createElement('div')
        folder.classList.add('folder')
        folder.setAttribute('dbid',e.id)
        folder.innerHTML = `
        <div class="folderNameBox">
            <div class="pathBox" onclick="ToggleFolder(this)"><div class="arrow"></div></div><h1 onclick="OpenFolder(this)" type="folder" dbid="${e.id}" class="folderName">${e.name}</h1>
            <i onclick="editFolder(this)" class="bi bi-three-dots"></i>
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
                    <div class="pathBox"><img src='assets/end.svg'></div><h1 onclick="OpenFolder(this)" dbid="${element.id}" type="note" class="noteName">${fileContent} ${element.name}</h1>
                <i onclick="editFolder(this)" class="bi bi-three-dots edit"></i>
                `
            } else {
                note.innerHTML = `
                    <div class="pathBox"><img src='assets/next.svg'></div><h1 onclick="OpenFolder(this)" dbid="${element.id}" type="note" class="noteName">${fileContent} ${element.name}</h1>
                <i onclick="editFolder(this)" class="bi bi-three-dots edit"></i>
                `
            }
            folder.children[1].appendChild(note)
        }
    })
}
//* Wywołanie funkcji
CreateFolderAndNotes()
//* Funkcja aktalizująca Ekran główny { ten co wyświetla zawartość notatek/folderów }
function updateMainScreen() {
    const element = Folder[actual_folder-1]
    if (actual_note == 0) {     //* Otwiera tylko folder
        if (actual_folder == 0) { return }
        var path = `<p>${element.name}</p>`
        structurPath.innerHTML = path
        //* Ładowanie wyświetlania contentu
        mainScreen.innerHTML = ``
        HiglideActivDirectory('folder',actual_folder)
        //! Ładowanie wyświetlania contentu
        mainScreen.classList.add('grid')
        mainScreen.innerHTML = ``
        element.notes.forEach((b) => {
            mainScreen.innerHTML += `<div onclick="OpenFolder(this)" dbid="${b.id}" class="mini_note">
                <h1 class="title">${b.name}</h1>
                <p class="content">${b.content}</p>
            </div>`
        })
        HiglideActivDirectory('folder',actual_folder)
    } else {    //* Otwiera folder a w nim notatke o konkretnym id
        const clickedNote = Folder[actual_folder-1];
        var path = `<p>${element.name}</p><p>></p>`
        structurPath.innerHTML = `${path}<p>${clickedNote.notes[actual_note-1].name}</p>`
        //* Ładowanie wyświetlania contentu
        mainScreen.innerHTML = `<p>${clickedNote.notes[actual_note-1].content}</p>`
        HiglideActivDirectory('note',actual_note)
    }
}
//* Funkcja przewijania do poprzednije notatki/folderu ( odejmowanie liczby do numeru notatki )
function GoBack() {
    if (Folder.length < 1) { return }
    const actual = Folder[actual_folder-1];
    if (actual_note > 0 ) {
        actual_note -= 1
    } else {
        if (actual_folder-1 >= 1) {
            actual_note = Folder[Folder.indexOf(actual)-1].notes.length
            actual_folder -= 1
        }
    }
    updateMainScreen()
}
//* Funkcja przewijania do nastepnej notatki/folderu ( dodawanie liczby do numeru notatki )
function GoNext() {
    if (Folder.length < 1) { return }
    const actual = Folder[actual_folder-1];
    if (actual_note <= actual.notes.length) {
        actual_note += 1
        if (actual_note > actual.notes.length) {
            if (actual_folder != Folder.length) {
                actual_note = 0
                actual_folder += 1
            } else {
                actual_note = Folder[actual_folder-1].notes.length
                actual_folder = Folder.length
            }
        }
    }
    updateMainScreen()
}
//* Podstawowe wyświetlanie pierwszego folderu notatek
if (Folder.length > 0) {
    updateMainScreen()
}
//* Dodawanie nasłuchiwania do elementów z klasą [ backBTN ]
document.querySelectorAll('.backBTN').forEach((e) => {
    e.addEventListener('click',GoBack)
})
//* Dodawanie nasłuchiwania do elementów z klasą [ nextBTN ]
document.querySelectorAll('.nextBTN').forEach((e) => {
    e.addEventListener('click',GoNext)
})
//* Dodawanie nasłuchiwania do elementów z klasą [ backBTN ]
//* Dodawanie możliwości przewijania sie pomiędzy notatkami i folderami przy użyciu strzałek
document.addEventListener('keydown', (e) => {
    if (e.code == 'ArrowRight') {
        GoNext()
    }
    if (e.code == 'ArrowLeft') {
        GoBack()
    }
})
//* Zwijanie wszystkich folderów 
function hideAllFolders() {
    document.querySelectorAll('.folderNameBox').forEach((e) => {
        e.children[0].classList.add('hiden')
        e.parentNode.children[1].style.display = 'none'
    })
}
//* Rozwijanie wszystkich folderów
function showAllFolders() {
    document.querySelectorAll('.folderNameBox').forEach((e) => {
        e.children[0].classList.remove('hiden')
        e.parentNode.children[1].style.display = 'block'
    })
}
//*
var mouseOn = false
//* Zamykwanie okieenka edycji po wyjechaniu myszki 
function closeEditBox() {
    editBox.style.display = 'none'
    EditVisable = false
    EditSelected = null
    EditSelectedFolder = null
}
//* Zamykanie okna edycji jeśli myszka jest poza
editBox.onmouseleave = function(e) {
    // mouseOn = true
    if(EditVisable == true) {
        closeEditBox()
    }
}
//* Przesuwanie elementu o jeden w góre / dół
function changeFolderPosition(id, position) {
    // Znajdź folder o danym id
    var targetFolder;
    for (var i = 0; i < Folder.length; i++) {
        if (Folder[i].id === id) {
            targetFolder = Folder[i];
            break;
        }
    }

    // Usuń folder z jego bieżącej pozycji
    var targetIndex = Folder.indexOf(targetFolder);
    Folder.splice(targetIndex, 1);

    // Dodaj folder na wybrane miejsce
    Folder.splice(position, 0, targetFolder);
}
//* Przesuwanie Folderów
function moveFolder(e) {
    changeFolderPosition(EditSelected.id, Folder.indexOf(EditSelected) + parseInt(e.getAttribute('movenum')))
    CreateFolderAndNotes()
    closeEditBox()
    actual_folder = 1
    actual_note = 0
    updateMainScreen()
}
//* Remove Folder / Note 
function removeData(e) {
    if (EditSelectedFolder == null) {
        Folder.splice(Folder.indexOf(EditSelected), 1)
    } else {
        const noteIndex = Folder[Folder.indexOf(EditSelectedFolder)].notes.indexOf(EditSelected)
        Folder[Folder.indexOf(EditSelectedFolder)].notes.splice(noteIndex, 1)
    }
    CreateFolderAndNotes()
    updateMainScreen()
}
//* Zwijanie menu
var menuOpen = true
function foldMenu(e) {
    const leftMenu = document.querySelector('#left_menu')
    document.body.classList.toggle('hideMenu')
    if (menuOpen) {
        leftMenu.style.display = 'none'
        menuOpen = false
    } else {
        leftMenu.style.display = 'grid'
        menuOpen = true
    }
}