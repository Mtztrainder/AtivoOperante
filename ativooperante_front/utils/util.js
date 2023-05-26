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

function sidebarToggle() {
    if (sidebar.style.display === "none") {
        sidebar.style.display = "block";
    } else {
        sidebar.style.display = "none";
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
        let ativo = elem.link.indexOf(tela) > 0 ? "bg-orange-200" : ""

        html = html + `
            <li class=" w-full h-full py-3 px-2  ${ativo}">
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