async function getIdUsuario() {
    const URL_TO_FETCH = `http://localhost:8080/security/get-id-usuario`
    const result = await fetch(URL_TO_FETCH, {
        method: 'GET',
        headers: { "Authorization": localStorage.getItem("token") }
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
        headers: { "Authorization": localStorage.getItem("token") }
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



async function LoadTable(busca) {

    let html = "";

    let url
    if (busca != null && busca != "") {
        url = "http://localhost:8080/apis/admin/get-denuncias-titulo/" + busca
    } else {
        url = "http://localhost:8080/apis/admin/get-denuncias";
    }

    const URL_TO_FETCH = url
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const dados = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.json()
    });

    html += `
    <h1> Todas Denuncias </h1>
    <table class="w-full divide-gray-600">
    <thead class="flex bg-gray-500">
        <tr class="flex w-full mb-4">
            <th scope="col" class="p-4 w-1/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Código
            </th>
            <th scope="col" class="p-4 w-2/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Titulo
            </th>
            <th scope="col" class="p-4 w-1/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Urgência
            </th>    
            <th scope="col" class="p-4 w-2/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Data de Criação
            </th>               
            <th scope="col" class="p-4 w-2/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Orgão
            </th>             
            <th scope="col" class="p-4 w-2/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Feedback
            </th>
            <th scope="col" class="p-4 w-2/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Ações
            </th>
        </tr>
    </thead>
    <tbody class="bg-grey-300 flex flex-col items-center justify-between overflow-y-scroll w-full" style="max-height: 50vh;">
    `;
    dados.forEach(denuncia => {
        html += `
        <tr class="flex w-full hover:bg-gray-100 hover:bg-gray-200">
            <td class="p-4 w-1/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.id}</td>   
            <td class="p-4 truncate w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.titulo}</td>   
            <td class="p-4 w-1/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.urgencia}</td>   
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${getFormattedDateTime(denuncia.dtCriacao)}</td>   
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.orgao.nome}</td>            
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${getFeedBack(denuncia.feedback)}</td>
            <td class="p-4 w-2/12 space-x-2 whitespace-nowrap text-center">
                <button type="button" 
                    data-modal-toggle="edit-user-modal" 
                    class="inline-flex items-center px-2 py-2 text-sm font-medium 
                    text-center text-white 
                    rounded-lg bg-blue-700 
                    hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" onclick="Feedback(${denuncia.id});">
                    <i class="fa-solid fa-comment text-white h-4 w-4 "></i>
                </button>
                <button type="button" data-modal-toggle="delete-user-modal" class="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:ring-red-900" onclick="Deletar(${denuncia.id}, '${denuncia.titulo}')" >
                <i class="fa-solid fa-trash text-white"></i>
                </button>
                
            </td>
        </tr>
    
        `
    });
    html += `</tbody>
            </table>`;



    document.getElementById("tabela").innerHTML = html;

}


function getFormattedDateTime(datac) {
    var data = new Date(datac);
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = String(data.getFullYear());
    var horas = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');

    return dia + '/' + mes + '/' + ano + ':' + horas + ':' + minutos + ':' + segundos;
}

function getFeedBack(feedback) {
    let str = "Não possui feedback";
    if (feedback != undefined && feedback != null && feedback.length > 0) {
        str = feedback;
    }
    return str;
}

async function getDenuncia(id) {
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/get-denuncias-id/" + id;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));

    const dados = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.json()
    });
    return dados;
}

async function Feedback(id){
    OpenModal();
    const den = await getDenuncia(id);
    document.getElementById("id").value = id;
    document.getElementById("titulo").value = den.titulo;
    document.getElementById("urgencia").value = den.urgencia;
    document.getElementById("orgao").value = den.orgao.nome;
    document.getElementById("orgao").html = den.orgao.nome;
    document.getElementById("tipo").value = den.tipo.nome;
    document.getElementById("texto").value = den.texto;
  


}


async function OpenModal() {
    let modalContent = "";
    modalContent = `   
    <div class="py-12 bg-gray-700 bg-opacity-80 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0  flex flex-col justify-center items-center" id="modal">
    <div role="alert" class=" container align-center w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          
            <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Denuncie</h1>
            <form id="form-denuncia">
                <input id="id" name="id" type="hidden" />
                <label for="titulo" class="text-gray-800 text-sm 
                                        font-bold leading-tight tracking-normal">Titulo da Denuncia</label>
                <input type="text" id="titulo" name="titulo"  readonly
                    class="mb-5 mt-2 text-gray-600 
                            focus:outline-none focus:border focus:border-indigo-700 
                            font-normal w-full h-10 flex 
                            items-center pl-3 text-sm border-gray-300 rounded border" 
                    placeholder="Ex: ..." />
                    
                
                    <label for="urgencia" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Urgência</label>
                    <input id="urgencia" name="urgencia" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly />
                    
                    <label for="orgao" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Orgão</label>
                    <input id="orgao" name="orgao" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly/>                    
                    <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo do Problema</label>
                    <input id="tipo" name="tipo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readonly/>
                                                            
                    <label for="texto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição da denuncia</label>
                    <textarea readonly id="texto" name="texto" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descrição da denuncia"></textarea>

                    <label for="texto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adicionar Feedback</label>
                    <textarea  id="feedback" name="feedback" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Adicionar Feedback"></textarea>

                <div class="relative mb-5 mt-2"> 
            </form>
                
        </div>
            
        
            
        <div class="flex items-center justify-start w-full">
            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onclick="AddFeedback()">Enviar</button>
            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm" onclick="CloseModal()">Cancelar</button>
            </div>

            <button class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600" onclick="CloseModal()" aria-label="close modal" role="button">
                <svg  xmlns="http://www.w3.org/2000/svg"  
                    class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>
        </div>
    </div>
</div>
`;
    document.getElementById("set-modal").innerHTML = modalContent;
}


function CloseModal() {
    document.getElementById("set-modal").children[0].remove();
}


async function AddFeedback(){
    id = document.getElementById("id").value;
    feedback = document.getElementById("feedback").value;
    const URL_TO_FETCH = `http://localhost:8080/apis/admin/add-feedback/${id}/${feedback}`;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));

    var msg = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.text()
    });

    console.log(msg);

    document.getElementById("set-modal").children[0].remove();
    LoadTable($("#filtro").val())
}