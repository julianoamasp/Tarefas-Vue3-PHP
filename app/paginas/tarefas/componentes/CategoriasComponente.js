
import SubCategoriasService from "/../../app/services/Tarefas/SubCategoriasService.js";
import CategoriasService from "/../../app/services/Tarefas/CategoriasService.js";
import ModalComponent from "/../../app/shared/ModalComponent.js";

export default {
    components: { ModalComponent },
    created() {
        this.buscarCategorias();
    },
    methods: {
        buscarCategorias: function () {
            CategoriasService.getAll((a) => {
                this.categorias = a.data.categorias
            });
        },
        salvarCategoria: function () {
            let Ok = true;
            if (this.modalCategoria.categoria.CategoriasNome == "") { Ok = false; alert("Campo é Categoria obrigatório!"); }
            if (this.modalCategoria.categoria.CategoriasNome == "") { Ok = false; alert("Campo é Categoria obrigatório!"); }
            if (Ok == true) {
                CategoriasService.salvar(this.modalCategoria.categoria, (res) => {
                    if (res.cod == 200) {
                        this.modalCategoria.aberto = false;
                        this.buscarCategorias();
                        this.limparModalCategorias();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });
            }
        },
        limparModalCategorias: function () {
            this.modalCategoria.categoria.CategoriasNome = "";
            this.modalCategoria.categoria.CategoriasDescricao = "";
        },
        removerCategoria: function (categoria) {
            let Ok = confirm("Deseja remover?");
            if (Ok == true) {
                CategoriasService.delete(categoria.CategoriasId, (res) => {
                    if (res.cod == 200) {
                        this.modalCategoria.aberto = false;
                        this.buscarCategorias();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });
            }
        },




        salvarSubCategoria: function () {
            let Ok = true;
            if (this.modalSubCategoria.subcategoria.subcategoriasNome == "") { Ok = false; alert("Campo é Nome obrigatório!"); }
            if (Ok == true) {
                SubCategoriasService.salvar(this.modalSubCategoria.subcategoria, (res) => {
                    if (res.cod == 200) {
                        this.modalSubCategoria.aberto = false;
                        this.buscarCategorias();
                        this.limparModalCategorias();
                        this.limparModalCategorias();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });
            }
        },
        removerSubCategoria: function (subcat) {
            let Ok = confirm("Deseja remover?");
            if (Ok == true) {
                SubCategoriasService.delete(subcat.subcategoriasId, (res) => {
                    if (res.cod == 200) {
                        this.buscarCategorias();
                        this.limparModalCategorias();
                        this.limparModalCategorias();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });
            }
        },
        limparModalCategorias: function () {
            this.modalSubCategoria.subcategoria.subcategoriasIdCategoria = "";
            this.modalSubCategoria.subcategoria.subcategoriasNome = "";
        },

    },
    data() {
        return {
            categorias: [],

            modalCategoria: {
                aberto: false,
                categoria: {
                    CategoriasNome: "",
                    CategoriasDescricao: "",
                }
            },
            modalSubCategoria: {
                aberto: false,
                subcategoria: {
                    subcategoriasIdCategoria:"",
                    subcategoriasNome: ""
                }
            }
        }
    },

    template: `
                    <div>





                    <ModalComponent v-show="modalCategoria.aberto" @fecharmodal="modalCategoria.aberto = false">
                        <template v-slot:header>
                            Adicionar categoria
                        </template>
                    <template v-slot:body>

                        <div style="gap: 2%;margin-bottom: 20px;">
                            <div>
                                <label>Nome: </label>
                                <input type="text" v-model="modalCategoria.categoria.CategoriasNome" style="border: 1px solid #d5d5d5;width:100%;">
                            </div>
                        </div>
                        <div style="display: flex;gap: 20px;">
                            <div style="width: 100%;">
                                <label>Descrição: </label><br>
                                <textarea v-model="modalCategoria.categoria.CategoriasDescricao" style="border: 1px solid #d5d5d5;width:100%;"></textarea>
                            </div>
                        </div>

                    </template>
                        <template v-slot:footer>
                          <button @click="salvarCategoria()" style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Confirmar</button>
                          <button @click="modalCategoria.aberto = false" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Cancelar</button>
                        </template>
                    </ModalComponent>






                    <ModalComponent v-show="modalSubCategoria.aberto" @fecharmodal="modalSubCategoria.aberto = false">
                        <template v-slot:header>
                            Adicionar Subcategoria
                        </template>
                    <template v-slot:body>

                        <div style="gap: 2%;margin-bottom: 20px;">
                            <div>
                                <label>Nome: </label>
                                <input type="text" v-model="modalSubCategoria.subcategoria.subcategoriasNome" style="border: 1px solid #d5d5d5;width:100%;">
                            </div>
                        </div>

                    </template>
                        <template v-slot:footer>
                          <button @click="salvarSubCategoria()" style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Confirmar</button>
                          <button @click="modalSubCategoria.aberto = false" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Cancelar</button>
                        </template>
                    </ModalComponent>




















                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-xl font-medium text-slate-800 dark:text-navy-50">Categorias</h2>
                            </div>
                            <div class="flex items-center space-x-2">
                                <label class="relative hidden sm:flex"><input class="form-input peer h-9 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent" placeholder="Buscar por Título..." type="text">
                                    <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent"><svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path></svg></span>
                                </label>
                                <button @click="modalCategoria.aberto = true" style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Adicionar Categoria</button>
                            </div>
                        </div>


                        <div>
                                
                                <div v-for="categoria in categorias" style="border: 1px solid #00000021;padding: 6px;margin: 10px 0px;">
                                    <div style="display: flex;justify-content: space-between;padding: 5px 0px;">
                                            <div style="display: flex;gap: 7px;"><div style="font-weight: bold;font-size: 30px;">{{categoria.CategoriasNome}}</div>
                                                <span style="background-color: #ff9800;color: #ffffff;font-weight: bold;padding: 6px 11px;border-radius: 100%;">{{categoria.subcategorias.length}}</span>
                                            </div>
                                        <div>
                                            <button @click="modalSubCategoria.aberto = true;modalSubCategoria.subcategoria.subcategoriasIdCategoria = categoria.CategoriasId;" style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Adicionar SubCategoria</button>
                                            <button @click="removerCategoria(categoria)" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Remover</button>
                                            
                                        </div>
                                    </div>
                                    <div class="pairs">Descrição: {{categoria.CategoriasDescricao}}</div>
                                    
                                        <div v-for="subcat in categoria.subcategorias" style="border: 1px solid #0000003b;padding: 5px;margin: 5px;display: flex;justify-content: space-between;">
                                            <div>
                                                {{subcat.subcategoriasNome}}
                                            </div>
                                            <button @click="removerSubCategoria(subcat)" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Remover</button>
                                        </div>
                                    
                                </div>

                        </div>



                    </div>
    `
}
