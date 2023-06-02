async function cadatrar(){

    if (validaDados())
    {
        const form = new FormData()
        form.append("email", $("#email").val());
        form.append("nome", $("#nome").val());
        form.append("cpf", $("#CPF").val());
        form.append("senha", $("#senha").val());

        const URL_TO_FETCH = "http://localhost:8080/security/cadastrar-usuario" 
        const dados = await fetch(URL_TO_FETCH, {
            method: 'POST',
            body: form
        }).then(res => {
            return res.text()
        });


        if (dados == "OK"){
            Swal.fire(
                'Perfeito :)',
                'Seu usuário foi cadastrado com sucesso :)',
                'success'
            ).then(() =>{
                $('#cadastrar-form').trigger("reset")
            })
        }else{
            Swal.fire(
                'Eita... :(',
                dados,
                'error'
            )
        }
    }
}

function validaDados(){
    let email       = $("#email").val()
    let nome        = $("#nome").val()
    let CPF         = $("#CPF").val()
    let senha       = $("#senha").val()
    let confSenha   = $("#confsenha").val()
    let erro = false

    if (email == ""){
        addErro("email")
        erro = true
    }else{
        removeErro("email")
    }

    if (nome == ""){
        addErro("nome")
        erro = true
    }else{
        removeErro("nome")
    }

    if (CPF == ""){
        addErro("CPF")
        erro = true
    }else{
        removeErro("CPF")
    }

    if (senha == ""){
        addErro("senha")
        erro = true
    }else{
        if (confSenha != "" && senha != confSenha){
            addErro("senha", "A senha não está igual a confirmação da senha")
            erro = true
        }else
            removeErro("senha")
    }

    if (confSenha == ""){
        addErro("confsenha")
        erro = true
    }else{
        if (senha != "" && senha != confSenha){
            addErro("confsenha", "A confirmação da senha não está igual a senha")
            erro = true
        }else
            removeErro("confsenha")
    }

    return !erro
}