import conexao from "./../conexao.js";
export default {

    getAll(callback) {
        const request = conexao.conn("GET", "/categoria");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    },
    salvar(obj,callback) {
        const request = conexao.conn("POST", "/categoria");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send(JSON.stringify(obj));
    },
    delete(id,callback) {
        const request = conexao.conn("DELETE", "/categoria?CategoriasId="+id);
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    }


}