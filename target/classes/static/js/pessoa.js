

var operacao = "A";
var indice_selecionado = -1;
var tbClientes = localStorage.getItem("tbClientes");
tbClientes = JSON.parse(tbClientes);

if (tbClientes == null) {

    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.status);
            if (xhr.status == 200) {
                tbClientes = []
                tbClientes2 = JSON.parse(this.responseText);
                for (var i in JSON.parse(this.responseText)) {
                    var cli = JSON.parse(this.responseText)[i];
                    var cliente = JSON.stringify({
                        id: cli.id,
                        name: cli.name,
                        cpf: cli.cpf,
                        phone: cli.phone,
                        email: cli.email
                    });

                    tbClientes.push(cliente);
                    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
                }

                var cliente = JSON.stringify({
                    id: "0",
                    name: "My name 4",
                    cpf: "74668869066",
                    phone: "11987654321",
                    email: "myemail4@test.com.br"
                });
                tbClientes.push(cliente);
                localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
            }
        }
    }
    xhr.open("GET", "http://localhost:9001/carregar");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
}

function Cadastrar() {

    var operacao = "A";
    var indice_selecionado = -1;
    var tbClientes = localStorage.getItem("tbClientes");
    tbClientes = JSON.parse(tbClientes);
    if (tbClientes == null) {
        tbClientes = [];

    }



    var cliente = JSON.stringify({
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        cpf: document.getElementById("cpf").value.replace(/[^\d]+/g, ''),
        phone: document.getElementById("phone").value.replace(/[^\d]+/g, ''),
        email: document.getElementById("email").value
    });

    tbClientes.push(cliente);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro adicionado.");
    return true;
};


function Excluir() {
    tbClientes.splice(indice_selecionado, 1);
    localStorage.setItem("tbClientes", JSON.stringify(tbClientes));
    alert("Registro excluído.");
    ConsultarTodos()
}


function ConsultarTodos() {
    var HTML;
    HTML = '<table style="width:100%" class="table table-borderless table-dark"><tr><th scope="col">Ação</th> <th scope="col">ID</th><th scope="col">NOME COMPLETO</th><th scope="col">CPF</th> <th scope="col">TELEFONE</th><th scope="col">EMAIL</th>  </tr>';

    if (tbClientes == null) {
        HTML += '</table';
    }
    else {
        for (var i in tbClientes) {
            var cli = JSON.parse(tbClientes[i]);
            HTML += '<tr><th scope="row">'
            HTML += '<button onclick="Excluir()"  type="button" class="mdc-button mdc-button--raised"> <div class="mdc-button__ripple"></div> <span class="mdc-button__label">X</span> <div class="mdc-button__touch"></div> </button>'
            HTML += '</th>';
            HTML += '</th><th scope="row">';
            HTML += cli.id;
            HTML += '</th><th scope="row">';
            HTML += cli.name;
            HTML += '</th><th scope="row">';
            HTML += cli.cpf;
            HTML += '</th><th scope="row">';
            HTML += cli.phone;
            HTML += '</th><th scope="row">';
            HTML += cli.email;
            HTML += '</th><th id="tipo" scope="row">';
            HTML += '</th><th scope="row">';
        }
        document.getElementById("boxcartorios").innerHTML = HTML;
        console.log(this.responseText);
    }

    HTML += '</table';

};


window.onload = function () {

    const name = document.getElementById('name')
    const cpf = document.getElementById('cpf')
    const phone = document.getElementById('phone')
    const email = document.getElementById('email')
    const form = document.getElementById('form')
    const errorElement = document.getElementById('error')

    form.addEventListener('submit', (e) => {
        let messages = []
        if (name.value === '' || name.value == null) {
            messages.push('Nome precisa ser preenchido')
        }

        if (phone.value.length <= 13) {
            messages.push('Telefone não é válido')
        }

        if (phone.value.length >= 16) {
            messages.push('Telefone não é válido')
        }
        
        
        usuario = email.value.substring(0, email.value.indexOf("@"));
		dominio = email.value.substring(email.value.indexOf("@")+ 1, email.value.length);
		if ((usuario.length >=1) &&
    		(dominio.length >=3) &&
    		(usuario.search("@")==-1) &&
   			(dominio.search("@")==-1) &&
    		(usuario.search(" ")==-1) &&
    		(dominio.search(" ")==-1) &&
    		(dominio.search(".")!=-1) &&
    		(dominio.indexOf(".") >=1)&&
    		(dominio.lastIndexOf(".") < dominio.length - 1)) {
			}
			else{
            messages.push('Email Inválido')
			}

        if (validaCpfCnpj(document.getElementById("cpf").value) == false) {
            messages.push('CPF é inválido')
        }

        if (messages.length > 0) {
            e.preventDefault()
            errorElement.innerText = messages.join(', ')
        } else {
            Cadastrar();

        }
    })
}




