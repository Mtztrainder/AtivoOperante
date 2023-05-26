async function LoadTable(busca) {

    let html = "";

    let url 
    if (busca != null && busca != ""){
        url = "http://localhost:8080/apis/admin/get-tipos-nome/"+busca
    }else{
        url = "http://localhost:8080/apis/admin/get-tipos"
    }
    
    const URL_TO_FETCH = url
    const dados = await fetch(URL_TO_FETCH, { method: 'GET' }).then(res => {
        return res.json()
    });

    html += `
    <table class="w-full divide-gray-600">
    <thead class="flex bg-gray-500">
        <tr class="flex w-full mb-4">
            <th scope="col" class="p-4 w-3/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Código
            </th>
            <th scope="col" class="p-4 w-5/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Nome
            </th>    
            <th scope="col" class="p-4 w-4/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Ações
            </th>
        </tr>
    </thead>
    <tbody class="bg-grey-300 flex flex-col items-center justify-between overflow-y-scroll w-full" style="max-height: 50vh;">
    `;
    dados.forEach(tipo => {
        html += `
        <tr class="flex w-full hover:bg-gray-100 hover:bg-gray-200">
            <td class="p-4 w-3/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${tipo.id}</td>   
            <td class="p-4 w-5/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${tipo.nome}</td>   
            <td class="p-4 w-4/12 space-x-2 whitespace-nowrap">
                <button type="button" 
                    data-modal-toggle="edit-user-modal" 
                    class="inline-flex items-center px-2 py-2 text-sm font-medium 
                    text-center text-white 
                    rounded-lg bg-blue-700 
                    hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" onclick="Editar(${tipo.id}, '${tipo.nome}');">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg>
                </button>
                <button type="button" data-modal-toggle="delete-user-modal" class="inline-flex items-center px-2 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:ring-red-900" onclick="Deletar(${tipo.id}, '${tipo.nome}')" >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                </button>
            </td>
        </tr>
    
        `
    });
    html += `</tbody>
            </table>`;

    

    document.getElementById("tabela").innerHTML = html;

}


function OpenModal() {
    let modalContent = "";

    modalContent = `   
    <div class="py-12 bg-gray-700 bg-opacity-80 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0" id="modal">
    <div role="alert" class=" container mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        
            <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">Cadastrar Tipos</h1>
            <form id="form-tipo">
                <input id="id" name="id" type="hidden" placeholder="Ex: Trânsito" />
                <label for="nome" class="text-gray-800 text-sm 
                                        font-bold leading-tight tracking-normal">Nome do Tipo</label>
                <input type="text" id="nome" name="nome" 
                    class="mb-5 mt-2 text-gray-600 
                            focus:outline-none focus:border focus:border-indigo-700 
                            font-normal w-full h-10 flex 
                            items-center pl-3 text-sm border-gray-300 rounded border" 
                    placeholder="Ex: Trânsito" />
                <div class="relative mb-5 mt-2">
            </form>
                
        </div>
        
        <div class="flex items-center justify-start w-full">
            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm" onclick="Salvar()">Enviar</button>
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


async function Salvar() {
    const URL_TO_FETCH = "http://localhost:8080/apis/admin/save-tipo"
    const form = document.getElementById("form-tipo");

    const data = new FormData(form);
    const formJSON = Object.fromEntries(data.entries());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify(formJSON);
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const dados = await fetch(URL_TO_FETCH, requestOptions).then(res => {
        return res.json()
    });

    document.getElementById("set-modal").children[0].remove();
    LoadTable($("#filtro").val())
}


async function Deletar(id, nome){
    const URL_TO_FETCH = `http://localhost:8080/apis/admin/del-tipo/${id}`    

    Swal.fire({
        title: 'Atenção',
        html: `Deseja realmente excluir o tipo <b>${nome}</b>`,
        showDenyButton: true,
        confirmButtonText: 'Confirmar',
        denyButtonText: `Cancelar`,
    }).then(async (result) => {
        if (result.isConfirmed) {
            const dados = await fetch(URL_TO_FETCH, {method: 'GET'}).then(res => {
                return res.text()
            });
        

            
            let icon = "error"
            let title = "Erro ao deletar :("
            let content = dados
            if (dados == "deletado com sucesso"){
                icon = "success"
                title = "Sucesso :)"
                content = "Sucesso ao deletar :D"
            }

            Swal.fire({
                icon: icon,
                title: title,
                text: content
            })

            LoadTable($("#filtro").val())
        }
    })
}


async function Editar(id, nome){
    await OpenModal();
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome; 
}

async function Filtrar(){
    LoadTable(event.target.value)
}