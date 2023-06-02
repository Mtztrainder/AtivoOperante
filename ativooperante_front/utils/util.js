/**
 * ### Modals ###
 */

function toggleModal(action, elem_trigger)
{
    elem_trigger.addEventListener('click', function () {
        if (action == 'add') {
            let modal_id = this.dataset.modal;
            document.getElementById(`${modal_id}`).classList.add('modal-is-open');
        } else {
            // Automaticlly get the opned modal ID
            let modal_id = elem_trigger.closest('.modal-wrapper').getAttribute('id');
            document.getElementById(`${modal_id}`).classList.remove('modal-is-open');
        }
    });
}

var sidebar = document.getElementById('sidebar');

function sidebarToggle(icon) {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
        icon.className = "fa-solid fa-x pr-2 text-white"
    } else {
        sidebar.style.display = "none";
        icon.className = "fas fa-bars pr-2 text-white"
    }
}

var profileDropdown = document.getElementById('ProfileDropDown');

function profileToggle() {
    if (profileDropdown.style.display === "none") {
        profileDropdown.style.display = "block";
    } else {
        profileDropdown.style.display = "none";
    }
}
// Check if there is modals on the page
if (document.querySelector('.modal-wrapper'))
{
    // Open the modal
    document.querySelectorAll('.modal-trigger').forEach(btn => {
        toggleModal('add', btn);
    });
    
    // close the modal
    document.querySelectorAll('.close-modal').forEach(btn => {
        toggleModal('remove', btn);
    });
}
    

function geraASIDE(tela){
    let List = [
        {
            "link": "../home/home.html",
            "nome": "Início",
            "icone": ``
        },

        {
            "link": "../orgaos/orgaos.html",
            "nome": "Órgãos",
            "icone": ``
        },

        {
            "link": "../tipos/tipos.html",
            "nome": "Tipos",
            "icone": ``
        }
    ]



    let html = `<ul class="list-reset flex flex-col">`
    List.forEach((elem) =>{
        let ativo = elem.link.indexOf(tela) > 0 ? "bg-white" : ""

        html = html + `
            <li class=" w-full h-full py-3 px-2 border-b border-light-border ${ativo}">
                <a href="${elem.link}"
                    class="font-sans font-hairline 
                            hover:font-normal text-sm text-nav-item no-underline">
                    ${elem.icone}
                    ${elem.nome}
                    <span><i class="fas fa-angle-right float-right"></i></span>
                </a>
            </li>
        `
    })

    html = html + "</ul>"


    $("aside").html(html)
}

$(document).ready(() =>{
    let tela = window.location.pathname.split("/")
    geraASIDE(tela[tela.length-1])
})


async function AtualizaUsuarioLogado() {
   
    $("#usu_name").html(atob(localStorage.getItem("nome")));
}

async function getNivel(){
    const URL_TO_FETCH = `http://localhost:8080/security/get-nivel`  

    const nivel = await fetch(URL_TO_FETCH, { 
        method: 'GET',
        headers:{
            "Authorization": `${localStorage.getItem("token")}`
        }
    }).then(response => {
        return response.text();
    })

    return nivel;
}

async function getNome(){
    const URL_TO_FETCH = `http://localhost:8080/security/get-usu`  

    const nivel = await fetch(URL_TO_FETCH, { 
        method: 'GET',
        headers:{
            "Authorization": `${localStorage.getItem("token")}`
        }
    }).then(response => {
        return response.text();
    })

    return nivel;
}

async function getIdUsuario() {
    const URL_TO_FETCH = `http://localhost:8080/security/get-id-usuario`
    const result = await fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { "Authorization": `${localStorage.getItem("token")}` }
    }
    ).then((response) => {
        return response.json();
    })

    return result;
}


async function getNomeUsuario() {
    const URL_TO_FETCH = `http://localhost:8080/security/get-nome-usuario`
    const result = await fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { "Authorization": `${localStorage.getItem("token")}` }
    }
    ).then((response) => {
        return response.text();
    })

    return result;
}

async function setUsuario() {
    localStorage.setItem("id", btoa(await getIdUsuario()))
    localStorage.setItem("nome", btoa(await getNomeUsuario()))
}

function ProfileDropDown(){
    $("#ProfileDropDown").html(`
        <ul class="list-reset">
            <li><a href="../../index.html" class="no-underline px-4 py-2 block text-black hover:bg-grey-light">Sair</a></li>
        </ul>
    `)
}