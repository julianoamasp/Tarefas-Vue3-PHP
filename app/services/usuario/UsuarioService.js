import UsuarioAuth from "./../../auths/Usuarioauth.js";
import conexao from "./../conexao.js";
export default {

    logado: false,
    entrar(nome, senha, callback) {
        const request = conexao.conn("POST", "/usuario/entrar");
        request.onload = (aa) => {
            let jsonres = JSON.parse(aa.target.responseText);
            if (jsonres.cod == 200) {
                UsuarioAuth.setCookieUsuario("usuario", JSON.stringify({ nome: jsonres.data.UsuariosNome, email: jsonres.data.UsuariosEmail, token: jsonres.data.UsuariosToken }), 30)
                this.logado = true;
            }
            callback(jsonres)
        }
        request.send(JSON.stringify({ UsuariosEmail: nome, UsuariosSenha: senha }));
    },

    usuarioLogado() {
        if (UsuarioAuth.checkCookieUsuario()) {
            return true;
        } else {
            return false;
        }
    },
    sair() {
        this.logado = false;
        UsuarioAuth.clearCookies()
        return true;
    },
    getUsuario() {
        return JSON.parse(UsuarioAuth.getCookieUsuario());
    },
    getNome() {
        let usu = JSON.parse(UsuarioAuth.getCookieUsuario())
        return usu.nome;
    },
    getEmail() {
        let usu = JSON.parse(UsuarioAuth.getCookieUsuario())
        return usu.email;
    },
    getToken() {
        let usu = JSON.parse(UsuarioAuth.getCookieUsuario())
        return usu.token;
    }
}