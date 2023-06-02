
async function logar(){
    const URL_TO_FETCH = `http://localhost:8080/security/login?email=${$("#email").val()}&senha=${$("#senha").val()}`  
    
    fetch(URL_TO_FETCH, { method: 'GET'} )
        .then(response => {
            if (response.ok) 
                return response.text();
            else 
                throw Error("erro")
        })
        .then( async (result) =>  {
            localStorage.setItem("token", result);
            localStorage.setItem("login", btoa($("#email").val()))            
            window.location.href = 'pages/home/home.html'
        })
        .catch(err => {
            let mensagem = err
            if (err == "Error: erro"){
                mensagem = "E-mail/senha inválido!"
            }
            
            Swal.fire({
                title: 'Erro',
                icon: 'error',
                html: mensagem
            })

            localStorage.removeItem("token");
            localStorage.removeItem("login")
            console.error(err.message)
        })
}

$(document).ready(() => {
    let login = localStorage.getItem("login");
    if (login != null)
        $("#email").val(atob(login));

    localStorage.clear()
})