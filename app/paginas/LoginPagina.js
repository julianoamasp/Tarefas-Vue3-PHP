import UsuarioService from "/app/services/usuario/UsuarioService.js";

export default {
    methods:{
        entrar(){
            if(this.nome != "" && this.senha != ""){
                UsuarioService.entrar(this.nome,this.senha,(res)=>{
                    if(res.cod == 200){
                        this.$router.push("/")
                    }
                    if(res.msgs.length > 0){
                        res.msgs.forEach(element => {
                            alert(element.msg);
                        });
                    }
                })
            }else{
                alert("Preencha todos os campos!")
            }
        }
    },
    data() {
        return {
            nome: "Juliano",
            senha: ""
        }
    },
    
    template: `
    <h1>Entrar Usuário {{nome}}</h1>
    <input type="text" v-model="nome">
    <input type="text" v-model="senha">
    <button @click="entrar">Entrar</button>`
}