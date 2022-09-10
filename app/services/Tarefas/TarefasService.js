import conexao from "./../conexao.js";
export default {

    getAll(callback) {
        const request = conexao.conn("POST", "/tarefa");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    },
    getByDia(dia,data,callback) {
        const request = conexao.conn("GET", "/tarefa?dia="+dia+"&data="+data);
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    },
    salvar(obj,callback) {
        const request = conexao.conn("POST", "/tarefa");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send(JSON.stringify(obj));
    },
    salvarCronometro(obj,callback) {
        const request = conexao.conn("PUT", "/tarefa/cronometro");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send(JSON.stringify(obj));
    },
    atualizar(obj,callback) {
        const request = conexao.conn("PUT", "/tarefa");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send(JSON.stringify(obj));
    },
    remover(id,callback) {
        const request = conexao.conn("DELETE", "/tarefa?TarefasId="+id);
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    }


}