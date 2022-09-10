import conexao from "./../conexao.js";
export default {
    pegarSubCategoriaPorCategoria(id,callback) {
        const request = conexao.conn("GET", "/subcategoria/getById?idcatregoria="+id);
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    },
    salvar(obj,callback) {
        const request = conexao.conn("POST", "/subcategoria");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send(JSON.stringify(obj));
    },
    delete(id,callback) {
        const request = conexao.conn("DELETE", "/subcategoria?subcategoriasId="+id);
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            callback(jsonres)
        }
        request.send();
    }
}