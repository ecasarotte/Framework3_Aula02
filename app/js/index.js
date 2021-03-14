System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function lerJson() {
        let xmlhttp2 = new XMLHttpRequest();
        xmlhttp2.open("GET", "http://localhost:8081/Disciplinas");
        xmlhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let disciplinas = JSON.parse(this.responseText);
                let tbody = document.getElementById('Resultados');
                tbody.innerHTML = "";
                for (let disciplina of disciplinas) {
                    tbody.innerHTML += `<td scope="row">${disciplina.id}</td>
                    <td scope="row">${disciplina.Descricao}</td>
                    <td scope="row">${formataData(disciplina.DataInicio)}</td>
                    <td scope="row">${formataValorReais(parseFloat(disciplina.Valor))}</td>
                    <td scope="row">${disciplina.Optativa}</td>`;
                }
            }
        };
        xmlhttp2.send();
    }
    function incluirJson() {
        let codigo = document.getElementById('Codigo').value;
        let valor = document.getElementById('Valor').value;
        let descricao = document.getElementById('Descricao').value;
        let data = document.getElementById('Data').value;
        let optativa = document.getElementById('Optativa').value;
        if (eValido()) {
            let tbody = document.getElementById('Resultados');
            tbody.innerHTML += `<td scope="row">${codigo}` +
                `<td scope="row">${descricao}` +
                `<td scope="row">${formataData(data)}` +
                `<td scope="row">${formataValorReais(parseFloat(valor))}` +
                `<td scope="row">${optativa}`;
            let dtoDisciplina = {
                id: codigo,
                Descricao: descricao,
                DataInicio: data,
                Valor: valor,
                Optativa: optativa
            };
            let json = JSON.stringify(dtoDisciplina);
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:8081/Disciplinas");
            request.setRequestHeader('Content-type', 'application/json');
            request.send(json);
        }
        else {
            $('.alert').removeClass('d-none');
            setTimeout(() => {
                $('.alert').addClass('d-none');
            }, 5000);
        }
    }
    function eValido() {
        let codigo = document.getElementById('Codigo').value;
        let valor = document.getElementById('Valor').value;
        let descricao = document.getElementById('Descricao').value;
        let data = document.getElementById('Data').value;
        let optativa = document.getElementById('Optativa').value;
        if (!codigo || !valor || !descricao || !data || !optativa) {
            return false;
        }
        else
            return true;
    }
    function consultarJson() {
        const id = document.getElementById('Codigo').value;
        if (id) {
            $('span').addClass('d-none');
            const request = new XMLHttpRequest();
            request.open("GET", `http://localhost:8081/Disciplinas/${id}`);
            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    let disciplina = JSON.parse(this.responseText);
                    let tbody = document.getElementById('Resultados');
                    tbody.innerHTML = '';
                    tbody.innerHTML += `<td scope="row">${disciplina.id}
                                <td scope="row">${disciplina.Descricao}
                                <td scope="row">${formataData(disciplina.DataInicio)}
                                <td scope="row">${formataValorReais(parseFloat(disciplina.Valor))}
                                <td scope="row">${disciplina.Optativa}`;
                }
            };
            request.send();
        }
        else {
            $('span').removeClass('d-none');
        }
    }
    function excluirJson() {
        let codigo = document.getElementById("Codigo").value;
        if (codigo) {
            let xmlhttp2 = new XMLHttpRequest();
            xmlhttp2.open("DELETE", "http://localhost:8081/Disciplinas/" + codigo, true);
            xmlhttp2.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    alert("Disciplina excluida com sucesso!");
                }
            };
            xmlhttp2.send();
        }
        else
            alert('insira o código da disciplina');
    }
    function alterarJson() {
        let codigo = document.getElementById('Codigo').value;
        let valor = document.getElementById('Valor').value;
        let descricao = document.getElementById('Descricao').value;
        let data = document.getElementById('Data').value;
        let optativa = document.getElementById('Optativa').value;
        if (codigo) {
            let tbody = document.getElementById('Resultados');
            tbody.innerHTML += `<td scope="row">${codigo}` +
                `<td scope="row">${descricao}` +
                `<td scope="row">${formataData(data)}` +
                `<td scope="row">${formataValorReais(parseFloat(valor))}` +
                `<td scope="row">${optativa}`;
            let dtoDisciplina = {
                id: codigo,
                Descricao: descricao,
                DataInicio: data,
                Valor: valor,
                Optativa: optativa
            };
            let json = JSON.stringify(dtoDisciplina);
            let request = new XMLHttpRequest();
            request.open("PUT", "http://localhost:8081/Disciplinas/" + codigo);
            request.setRequestHeader('Content-type', 'application/json');
            request.send(json);
        }
    }
    function formataData(str) {
        return str.split("-").reverse().join("/");
    }
    function formataValorReais(valor) {
        return valor.toLocaleString("pt-BR", { style: 'currency', currency: "BRL" });
    }
    return {
        setters: [],
        execute: function () {
            $(document).ready(() => {
                $('#btnIncluir').click((event) => {
                    event.preventDefault();
                    incluirJson();
                });
                $('#btnConsultar').click((event) => {
                    event.preventDefault();
                    consultarJson();
                });
                $('#btnLer').click((event) => {
                    event.preventDefault();
                    lerJson();
                });
                $('#btnAlterar').click((event) => {
                    event.preventDefault();
                    alterarJson();
                });
                $('#btnExcluir').click((event) => {
                    event.preventDefault();
                    excluirJson();
                });
            });
        }
    };
});
