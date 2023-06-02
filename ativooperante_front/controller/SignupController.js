async function cadatrar() {

    if (validaDados()) {
        const form = new FormData()                
        form.append("email", $("#email").val());
        form.append("nome", $("#nome").val());
        form.append("cpf", $("#CPF").val().replaceAll(".", "").replaceAll("-", ""));
        form.append("senha", $("#senha").val());

        const URL_TO_FETCH = "http://localhost:8080/security/cadastrar-usuario"
        const dados = await fetch(URL_TO_FETCH, {
            method: 'POST',
            body: form
        }).then(res => {
            return res.text()
        });


        if (dados == "OK") {
            Swal.fire(
                'Perfeito :)',
                'Seu usuário foi cadastrado com sucesso :)',
                'success'
            ).then(() => {
                $('#cadastrar-form').trigger("reset")
            })
        } else {
            Swal.fire(
                'Eita... :(',
                dados,
                'error'
            )
        }
    }
}

function validaDados() {
    let email = $("#email").val()
    let nome = $("#nome").val()
    let CPF = $("#CPF").val()
    let senha = $("#senha").val()
    let confSenha = $("#confsenha").val()
    let erro = false

    if (email == "") {
        addErro("email")
        erro = true
    } else {
        removeErro("email")
    }

    if (nome == "") {
        addErro("nome")
        erro = true
    } else {
        removeErro("nome")
    }

    if (CPF == "") {
        addErro("CPF")
        erro = true
    } else {
        if(validarCPF(CPF))
            removeErro("CPF")
        else{
            addErro("CPF", "O CPF é Inválido");
            erro = true;
        }
            
    }

    if (senha == "") {
        addErro("senha")
        erro = true
    } else {
        if (confSenha != "" && senha != confSenha) {
            addErro("senha", "A senha não está igual a confirmação da senha")
            erro = true
        } else
            removeErro("senha")
    }

    if (confSenha == "") {
        addErro("confsenha")
        erro = true
    } else {
        if (senha != "" && senha != confSenha) {
            addErro("confsenha", "A confirmação da senha não está igual a senha")
            erro = true
        } else
            removeErro("confsenha")
    }

    return !erro
}




function validarCPF(CPF) {
    var cpf = CPF;
    var ok = 1;
    var add;

    if (cpf != "") {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            ok = 0;

        if (ok == 1) {
            add = 0;
            for (i = 0; i < 9; i++)
                add += parseInt(cpf.charAt(i)) * (10 - i);
            rev = 11 - (add % 11);
            if (rev == 10 || rev == 11)
                rev = 0;
            if (rev != parseInt(cpf.charAt(9)))
                ok = 0;
            if (ok == 1) {
                add = 0;
                for (i = 0; i < 10; i++)
                    add += parseInt(cpf.charAt(i)) * (11 - i);
                rev = 11 - (add % 11);
                if (rev == 10 || rev == 11)
                    rev = 0;
                if (rev != parseInt(cpf.charAt(10)))
                    ok = 0;
            }
        }

        return ok == 1;
    }
}