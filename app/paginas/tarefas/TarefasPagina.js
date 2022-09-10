import TarefasComponente from "/../app/paginas/tarefas/componentes/TarefasComponente.js";
import CategoriasComponente from "/../app/paginas/tarefas/componentes/CategoriasComponente.js";
import UsuarioService from "/app/services/usuario/UsuarioService.js";
export default {
    components: { TarefasComponente, CategoriasComponente },
    created() {
        this.abaAtiva = 'hoje'
        this.usuarioNome = UsuarioService.getNome()
    },
    data() {
        return {
            abaAtiva: 'hoje',
            usuarioNome:""
        }
    },
    methods: {
        sair: function () {
            console.log(this)
            UsuarioService.sair();
            this.$router.push("/login");
        }
    },
    template: `
    <div style="display: flex;gap: 20px;font-size: 20px;position: absolute;top: 0px;background-color: #ffffff;padding: 20px;z-index: 11;width: 100%;    justify-content: center;">
        <div style="display: flex;gap: 20px;font-size: 20px;position: absolute;top: 0px;background-color: rgb(255, 255, 255);padding: 14px;z-index: 11;box-shadow: #00000021 0px 0px 10px 2px;border-radius: 0px 0px 10px 10px;">
        <div>{{usuarioNome}}</div>
        <div @click="sair()" style="cursor: pointer;color: red;">Sair</div>
        </div>
    </div>

    <div class="card px-4 pb-4 sm:px-5">
    <div class="max">
        <div class="mt-5">



            <div  class="tabs flex flex-col">
                <div class="is-scrollbar-hidden overflow-x-auto">

                    <div class="tabs-list flex">

                        <button @click="abaAtiva = 'hoje'" :class="abaAtiva == 'hoje'?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">
                            HOJE
                        </button>
                        <button @click="abaAtiva = 'categorias'" :class="abaAtiva == 'categorias'?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium  dark:text-accent-light">
                            CATEGORIAS
                        </button>

                    </div>
                </div>
                <div class="tab-content pt-4">
                    <TarefasComponente v-if="abaAtiva == 'hoje'"></TarefasComponente>
                    <CategoriasComponente v-if="abaAtiva == 'categorias'"></CategoriasComponente>

				</div>
            </div>
        </div>
    </div>
</div>
    `
}
