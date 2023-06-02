async function LoadTable(busca) {

    let html = "";

    let url
    if (busca != null && busca != "") {
        url = `http://localhost:8080/apis/cidadao/get-denuncia-titulo/${atob(localStorage.getItem("id"))}/${busca}` 
    } else {
        url = `http://localhost:8080/apis/cidadao/get-denuncia/${atob(localStorage.getItem("id"))}`;
    }

    const URL_TO_FETCH = url
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const dados = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.json()
    });

    html += `
    <h1> Minhas Denuncias </h1>
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
                Tipo
            </th>   
            <th scope="col" class="p-4 w-1/12 text-xs font-medium text-left text-white uppercase text-gray-400">
                Feedback
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
            <td class="p-4 w-1/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${getUrgencia(denuncia.urgencia)}</td>   
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${getFormattedDateTime(denuncia.dtCriacao)}</td>   
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.orgao.nome}</td>
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${denuncia.tipo.nome}</td>
            <td class="p-4 w-2/12 text-base font-medium text-gray-900 whitespace-nowrap text-white">${getFeedBack(denuncia.feedback)}</td>
            
        </tr>
    
        `
    });
    html += `</tbody>
            </table>`;



    document.getElementById("tabela").innerHTML = html;

}



async function getOrgao() {
    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-orgaos";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));

    const dados = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.json()
    });
    return dados;
}

async function getTipo() {

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("token"));
    const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/get-tipos";

    const dados = await fetch(URL_TO_FETCH, { method: 'GET', headers: myHeaders }).then(res => {
        return res.json()
    });
    return dados;
}

async function OpenModal() {
    let modalContent = "";
    let orgaos = await getOrgao();
    let tipos = await getTipo();
    let urg = getUrgencias()
    
    modalContent = `   
    <div class="py-12 bg-gray-700 bg-opacity-80 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0  flex flex-col justify-center items-center" id="modal">
    <div role="alert" class=" container align-center w-11/12 md:w-2/3 max-w-lg">
        <div class="relative py-8 px-5 md:px-10 bg-white dark:bg-gray-800 shadow-md rounded border border-gray-400">
          
            <h1 class="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4 dark:text-white">Denuncie</h1>
            <form id="form-denuncia">
                <input id="id" name="id" type="hidden" />

                <label for="titulo" class="text-gray-800 text-sm 
                                        font-bold leading-tight tracking-normal dark:text-white">Titulo da Denuncia <span class="text-red-600 italic  text-xs">*</span></label>
                <input type="text" id="titulo" name="titulo" 
                    class="mb-1 mt-2 text-gray-600 
                            focus:outline-none focus:border focus:border-indigo-700 
                            font-normal w-full h-10 flex 
                            items-center pl-3 text-sm border-gray-300 rounded border
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Ex: Problema na Rua XXX" />
                <span id="e_titulo" class="hidden text-red-600 italic text-xs">Campo obrigatório</span>
                
                <label for="urgencia" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Urgência <span class="text-red-600 italic  text-xs">*</span></label>
                <select id="urgencia" name="urgencia" class="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option></option>`
                    urg.forEach(elem => {
                        modalContent += `<option value='${elem.id}'>${elem.nome}</option>`
                    })
                    modalContent += `
                </select>
                <span id="e_urgencia" class="hidden text-red-600 italic text-xs">Campo obrigatório</span>

                <label for="orgao" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Orgão <span class="text-red-600 italic  text-xs">*</span></label>
                <select id="orgao" name="orgao" class="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""> </option>`
                    orgaos.forEach(org => {
                        modalContent += `<option value=${org.id}> ${org.nome} </option>`;
                    })

                    modalContent +=`
                </select>
                <span id="e_orgao" class="hidden text-red-600 italic text-xs">Campo obrigatório</span>

                <label for="tipo" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo do Problema <span class="text-red-600 italic  text-xs">*</span></label>
                <select id="tipo" name="tipo" class="mb-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value=""> </option>`
                    tipos.forEach(tip =>{
                        modalContent += `<option value=${tip.id}> ${tip.nome} </option>`;
                    })
                modalContent +=
                    `
                </select>
                <span id="e_tipo" class="hidden text-red-600 italic text-xs">Campo obrigatório</span>  

                    <label for="texto" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição da denuncia <span class="text-red-600 italic  text-xs">*</span></label>
                    <textarea id="texto" name="texto" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descrição da denuncia"></textarea>
                    <span id="e_texto" class="hidden text-red-600 italic text-xs">Campo obrigatório</span>

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


function validarDados(){
    let titulo = $("#titulo").val()
    let urgencia = $("#urgencia").val()
    let orgao = $("#orgao").val()
    let tipo = $("#tipo").val()
    let texto = $("#texto").val()

    let erro = false

    if (titulo == ""){
        addErro("titulo")
        erro = true
    }else{
        removeErro("titulo")
    }

    if (urgencia == ""){
        addErro("urgencia")
        erro = true
    }else{
        removeErro("urgencia")
    }

    if (orgao == ""){
        addErro("orgao")
        erro = true
    }else{
        removeErro("orgao")
    }

    if (tipo == ""){
        addErro("tipo")
        erro = true
    }else{
        removeErro("tipo")
    }

    if (texto == ""){
        addErro("texto")
        erro = true
    }else{
        removeErro("texto")
    }

    return !erro
}

async function Salvar() {
    if (validarDados())
    {
        await Swal.fire({
            title: 'Atenção!',
            html: 'Você tem certeza que deseja enviar esta denuncia? Uma vez enviada, não poderá ser excluída ou alterada.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if (result.isConfirmed) {
                const URL_TO_FETCH = "http://localhost:8080/apis/cidadao/add-denuncia"
                const form = document.getElementById("form-denuncia");
        
                const data = new FormData(form);
                // const formJSON = Object.fromEntries(data.entries());
                let formJSON = {};
        
                for (const [chave, valor] of data.entries()) {
                    if (chave != "orgao" && chave != "tipo") {
                        formJSON[chave] = valor;
                    }
                }
        
                const datac = new Date();
                const dataFormatada = datac.toISOString();
                formJSON.dtCriacao = dataFormatada;
        
                let select = document.querySelector('select[name="orgao"]');
                let selectedOption = select.options[select.selectedIndex];
        
                formJSON.orgao = {
                    "id": selectedOption.value,
                    "nome": selectedOption.text
                }
        
                select = document.querySelector('select[name="tipo"]');
                selectedOption = select.options[select.selectedIndex];
                formJSON.tipo = {
                    "id": selectedOption.value,
                    "nome": selectedOption.text
                }
        
        
                formJSON.usuario = {
                    "id": atob(localStorage.getItem("id"))
                }
        
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", localStorage.getItem("token"));
        
                var raw = JSON.stringify(formJSON);
        
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
        
                const dados = await fetch(URL_TO_FETCH, requestOptions).then(res => {
                    return res.text()
                });

                if (dados == "OK"){
                    await Swal.fire(
                        'Perfeito :)',
                        'Denuncia adicionada com sucesso!',
                        'success'
                    ).then(() => {
                        document.getElementById("set-modal").children[0].remove();
                        LoadTable($("#filtro").val())
                    })
                }else{
                    await Swal.fire(
                        'Eita... :(',
                        dados,
                        'error'
                    ).then(() => {
                        document.getElementById("set-modal").children[0].remove();
                        LoadTable($("#filtro").val())
                    })
                }
            }
        })
    }
}

async function Filtrar() {
    LoadTable(event.target.value)
}

function getFormattedDateTime(datac) {
    var data = new Date(datac);
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = String(data.getFullYear());
    var horas = String(data.getHours()).padStart(2, '0');
    var minutos = String(data.getMinutes()).padStart(2, '0');
    var segundos = String(data.getSeconds()).padStart(2, '0');

    return dia + '/' + mes + '/' + ano + ' ' + horas + ':' + minutos + ':' + segundos;
}

function getFeedBack(feedback) {
    let str = "Não possui feedback";
    if (feedback != undefined && feedback != null && feedback.texto.length > 0) {
        str = feedback.texto;
    }
    return str;
}


$(document).ready(() => {
    LoadTable(); 
    AtualizaUsuarioLogado();
    ProfileDropDown();
})