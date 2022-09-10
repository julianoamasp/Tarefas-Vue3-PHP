
import TarefasService from "/../../app/services/Tarefas/TarefasService.js";
import SubCategoriasService from "/../../app/services/Tarefas/SubCategoriasService.js";
import CategoriasService from "/../../app/services/Tarefas/CategoriasService.js";
import TiposService from "/../../app/services/Tarefas/TiposService.js";
import DiasSemanaService from "/../../app/services/Tarefas/DiasSemanaService.js";
import PrioridadeService from "/../../app/services/Tarefas/PrioridadeService.js";
import ModalComponent from "/../../app/shared/ModalComponent.js";
import "/../../app/plugins/vuequil/vue-quill.global.prod.js";
const { QuillEditor } = VueQuill

export default {
    components: { ModalComponent, QuillEditor },
    created() {
        const tempdate = new Date();

        this.diaContextoAtual = tempdate.getDay() + 1;

        let tempdateYMD = tempdate.toLocaleString().split(", ")
        this.datetime = tempdateYMD[0].split("/")[2] + "/" + tempdateYMD[0].split("/")[1] + "/" + tempdateYMD[0].split("/")[0] + " " + tempdateYMD[1];

        let tempDay = tempdate.getDay() + 1
        this.diaContexto = tempdate.getDay() + 1;
        this.buscarTarefas();

        let diasSemana = ["Domingo", "Segunda Feira", "Terça Feira", "Quarta Feira", "Quinta Feira", "Sexta Feira", "Sábado"]
        let meses = [
            "janeiro",
            "fevereiro",
            "março",
            "abril",
            "maio",
            "junho",
            "julho",
            "agosto",
            "setembro",
            "outubro",
            "novembro",
            "dezembro"
        ]

        setInterval(() => {
            const date = new Date();
            this.diaAtual = date.getDate();
            this.diaDaSemana = diasSemana[date.getDay()];

            this.mesDoAno = meses[date.getMonth()];
            this.horaAtual = date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours();
            this.minutoAtual = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes();
            this.segundoAtual = date.getSeconds().toString().length == 1 ? "0" + date.getSeconds() : date.getSeconds();;
        }, 1000)
    },
    methods: {

        adicionar: function () {
            this.modalTarefa.aberto = true;
            CategoriasService.getAll((res) => {
                this.modalTarefa.categorias = res.data.categorias;
            });
            TiposService.getAll((res2) => {
                this.modalTarefa.tipos = res2.data.tipos;
            });
            DiasSemanaService.getAll((res3) => {
                this.modalTarefa.diasSemana = res3.data.diasDaSemana;
            });
            PrioridadeService.getAll((res4) => {
                this.modalTarefa.prioridades = res4.data.prioridades;
            });
        },
        buscarSubcategorias: function (id) {
            SubCategoriasService.pegarSubCategoriaPorCategoria(id, (res) => {
                this.modalTarefa.subcategorias = res.data.subcategorias
            });
        },
        checarDia(dia) {
            let res = false;
            for (let x = 0; x < this.modalTarefa.tarefa.diasDaSemana.length; x++) {
                if (dia.AuxDiasSemanaId == this.modalTarefa.tarefa.diasDaSemana[x].AuxDiasSemanaId) {
                    res = true;
                    break;
                }
            }
            return res;
        },
        verificarDiaDaSemana(diasDaSemana, diaNumero) {
            if (diasDaSemana.length > 0) {
                for (let x = 0; x < diasDaSemana.length; x++) {
                    if (diasDaSemana[x].RelDiasSemanaTarefaIdDia == diaNumero) {
                        return true;
                    }
                }
            }
        },
        clickCheck(event, dia) {
            if (event.target.checked) {
                let add = true;
                for (let x = 0; x < this.modalTarefa.tarefa.diasDaSemana.length; x++) {
                    if (dia.AuxDiasSemanaId == this.modalTarefa.tarefa.diasDaSemana[x].AuxDiasSemanaId) {
                        add = false;
                        break;
                    }
                }
                if (add == true) {
                    this.modalTarefa.tarefa.diasDaSemana.push(dia);
                }
            } else {
                for (let x = 0; x < this.modalTarefa.tarefa.diasDaSemana.length; x++) {
                    if (dia.AuxDiasSemanaId == this.modalTarefa.tarefa.diasDaSemana[x].AuxDiasSemanaId) {
                        this.modalTarefa.tarefa.diasDaSemana.splice(x, 1);
                        break;
                    }
                }
            }
        },
        buscarTarefas: function () {
            this.tarefas = [];
            TarefasService.getByDia(this.diaContexto, this.datetime, (a) => {
                let tafRep = a.data.tarefas;
                for (let x = 0; x < tafRep.length; x++) {
                    let htmlRep = ""
                    
                        htmlRep = decodeURI(tafRep[x].TarefasHtml);
                        tafRep[x].TarefasHtml = htmlRep
/*
                    try {
                        tafRep[x].TarefasHtml = JSON.parse(htmlRep);
                    } catch (error) { }

                    let repTotal = 0;
                    if (tafRep[x].evento.length > 0) {
                        
                                                for (let x2 = 0; x2 < tafRep[x].evento.length; x2++) {
                        
                                                    //console.log(this.getTimestamp("pt-BR"))
                                                    //var iso = new Date(tafRep[x].evento[x2].TarefaEventoInicio.replace(" ","T")+".000Z");
                                                    //console.log("Dia: "+iso.getUTCDate())
                                                    //console.log("Ano: "+iso.getUTCFullYear())
                        
                                                    console.log(this.getTimestamp(tafRep[x].evento[x2].TarefaEventoInicio))
                        
                        
                        
                        
                        
                                                    console.log("inicio: " + tafRep[x].evento[x2].TarefaEventoInicio)
                                                    console.log("Término: " + tafRep[x].evento[x2].TarefaEventoTermino)
                                                    console.log("Diferença: ")
                                                }
                        tafRep[x].eventoTempoConcluido = repTotal
                    }*/
                    this.tarefas.push(tafRep[x]);
                }




            });
        },
        getTimestamp: function (timezone) {
            //const str = '04/16/2022 06:45:12';
            const str = timezone;

            const [dateComponents, timeComponents] = str.split(' ');
            console.log(dateComponents); //"04/16/2022"
            console.log(timeComponents); //"06:45:12"

            const [year, month, day] = dateComponents.split('-');
            const [hours, minutes, seconds] = timeComponents.split(':');

            const date = new Date(+year, month - 1, +day, +hours, +minutes, +seconds);
            console.log(date); //Sat Apr 16 2022 06:45:12

            //Get timestamp
            const timestamp = date.getTime();
            console.log(timestamp); //1650080712000
        },
        salvarTarefa: function () {
            let Ok = true;
            if (this.modalTarefa.tarefa.TarefasCatId == "") { Ok = false; alert("Campo é Categoria obrigatório!"); }
            if (this.modalTarefa.tarefa.TarefasSubCatId == "") { Ok = false; alert("Campo é Subcategoria obrigatório!"); }
            if (this.modalTarefa.tarefa.TarefasIdTipo == "") { Ok = false; alert("Campo é tipo obrigatório!"); }
            if (this.modalTarefa.tarefa.TarefasIdPrioridade == "") { Ok = false; alert("Campo é prioridade obrigatório!"); }
            if (this.modalTarefa.tarefa.diasDaSemana.length == 0) { Ok = false; alert("É obrigatório especificar pelo menos 1 dia da semana e seu tempo!"); }
            if (this.modalTarefa.tarefa.TarefasNome == "") { Ok = false; alert("Campo Nome é obrigatório!"); }
            if (this.modalTarefa.tarefa.TarefasDescricao == "") { Ok = false; alert("Campo Descrição é obrigatório!"); }

            if (Ok == true) {
                let htmlRepo = this.modalTarefa.tarefa.TarefasHtml
                this.modalTarefa.tarefa.TarefasHtml = encodeURI(htmlRepo);
                TarefasService.salvar(this.modalTarefa.tarefa, (res) => {
                    //this.modalTarefa.tarefa.TarefasHtml = btoa(htmlRepo);
                    if (res.cod == 200) {
                        this.modalTarefa.aberto = false;
                        this.buscarTarefas();
                        this.limparModalTarefa();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });
            }
        },
        atualizarTarefa: function (tarefa, event) {

            //.focus()
            tarefa.TarefasHtml = tarefa.TarefasHtml+" "
            let Ok = confirm("Deseja atualizar a tarefa?");
            //tarefa.TarefasHtml = encodeURI(JSON.stringify(tarefa.TarefasHtml))



            if (Ok == true) {

                    let htmlRepo = tarefa.TarefasHtml
                    tarefa.TarefasHtml = encodeURI(tarefa.TarefasHtml)
                    
                    TarefasService.atualizar(tarefa, (res) => {
                        if (res.cod == 200) {
                            tarefa.TarefasHtml = htmlRepo
                            this.buscarTarefas();
                        }
                        if (res.msgs.length > 0) {
                            for (let x = 0; x < res.msgs.length; x++) {
                                alert(res.msgs[x].msg);

                            }
                        }
                    });

            }

        },
        atualizarTarefaTimestamp: function (tarefaTime) {
            tarefaTime.executando = false;
            clearInterval(tarefaTime.cronometroMotor);
            let Ok = true;
            if (Ok == true) {
                tarefaTime.evento.TarefaEventoTimestampQtde = parseInt(tarefaTime.evento.TarefaEventoTimestampQtde) + 1
                tarefaTime.evento.TarefaEventoTimestampQtde = parseInt(tarefaTime.evento.TarefaEventoTimestampQtde) - 1
                TarefasService.salvarCronometro(tarefaTime.evento, (res) => {
                    if (res.cod == 200) {
                        this.buscarTarefas();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                });

        }
        },
        removerTarefa: function () {
            let Ok = confirm('Deseja remover a tarefa "' + this.tarefaSelecionada.TarefasNome + '"?')
            if (Ok == true) {
                TarefasService.remover(this.tarefaSelecionada.TarefasId, (res) => {
                    if (res.cod == 200) {
                        this.tarefaSelecionada = null;
                        this.buscarTarefas();
                    }
                    if (res.msgs.length > 0) {
                        for (let x = 0; x < res.msgs.length; x++) {
                            alert(res.msgs[x].msg);

                        }
                    }
                })
            }
        },
        limparModalTarefa() {
            this.modalTarefa.tarefa.TarefasCatId = "",
                this.modalTarefa.tarefa.TarefasSubCatId = "",
                this.modalTarefa.tarefa.TarefasIdTipo = "",
                this.modalTarefa.tarefa.TarefasIdPrioridade = "",
                this.modalTarefa.tarefa.diasDaSemana = [],
                this.modalTarefa.tarefa.TarefasNome = "",
                this.modalTarefa.tarefa.TarefasDescricao = "",
                this.modalTarefa.tarefa.TarefasHtml = ""
        },//executando
        executarTarefaPlay: function (tarefa) {
            tarefa.executando = true;
            if (tarefa.evento.TarefaEventoTimestampQtde == undefined) { tarefa.evento.TarefaEventoTimestampQtde = 0 }
            tarefa.cronometroMotor = setInterval(() => {
                tarefa.evento.TarefaEventoTimestampQtde++;
            }, 1000)
        },
        executarTarefaStop: function (tarefa) {
            tarefa.executando = false;
            clearInterval(tarefa.cronometroMotor);
        },
    },

    watch: {
        // whenever question changes, this function will run
        diaContexto(newdiaContexto, olddiaContexto) {
            this.buscarTarefas()
        },
        buscaContexto(newbuscaContexto, oldbuscaContexto) {
            this.buscarTarefas()
        }
    },
    data() {
        return {
            tarefas: [],
            datetime: null,
            diaAtual: null,
            diaDaSemana: null,
            mesDoAno: null,
            horaAtual: null,
            minutoAtual: null,
            segundoAtual: null,

            //dia do contexto
            diaContexto: 1,
            diaContextoAtual: 1,
            buscaContexto: "",
            tarefaSelecionada: null,

            modalTarefa: {
                categorias: [],
                subcategorias: [],
                tipos: [],
                prioridades: [],
                diasSemana: [],
                aberto: false,
                tarefa: {
                    TarefasCatId: "",
                    TarefasSubCatId: "",
                    TarefasIdTipo: "",
                    TarefasIdPrioridade: "",
                    diasDaSemana: [],
                    TarefasNome: "",
                    TarefasDescricao: "",
                    TarefasHtml: ""
                }
            }
        }
    },

    template: `
                    <ModalComponent v-show="modalTarefa.aberto" @fecharmodal="modalTarefa.aberto = false">
                        <template v-slot:header>
                            Adicionar Tarefa
                        </template>
                        <template v-slot:body>

                        <div style="display:none;">
                            <div>cat: {{modalTarefa.tarefa.TarefasCatId}}</div>
                            <div>subcat: {{modalTarefa.tarefa.TarefasSubCatId}}</div>
                            <div>tipo: {{modalTarefa.tarefa.TarefasIdTipo}}</div>
                            <div>Prioridade: {{modalTarefa.tarefa.TarefasIdPrioridade}}</div>
                            <div>Dias: {{modalTarefa.tarefa.diasDaSemana}}</div>
                            <div>Nome: {{modalTarefa.tarefa.TarefasNome}}</div>
                            <div>Descrição: {{modalTarefa.tarefa.TarefasDescricao}}</div>
                        </div>
                        
                        <div style="display: grid;grid-template-columns: 33.3333% 33.3333% 33.3333%;    margin-bottom: 20px;">
                            <div>
                                <label>Categorias: </label><br>
                                <select v-model="modalTarefa.tarefa.TarefasCatId" @change="buscarSubcategorias(modalTarefa.tarefa.TarefasCatId)" style="border: 1px solid #d5d5d5;">
                                    <option disabled value="">Seleciona categoria</option>
                                    <option v-for="cat in modalTarefa.categorias" :value="cat.CategoriasId">{{cat.CategoriasNome}}</option>
                                </select>
                            </div>
                            <div >
                                <label>Subcategorias: </label><br>
                                <select :disabled="modalTarefa.subcategorias.length == 0" v-model="modalTarefa.tarefa.TarefasSubCatId" style="border: 1px solid #d5d5d5;">
                                    <option disabled value="">Seleciona subcategoria</option>
                                    <option v-for="subcat in modalTarefa.subcategorias" :value="subcat.subcategoriasId">{{subcat.subcategoriasNome}}</option>
                                </select>
                            </div>
                            <div>
                                <label>Tipo: </label><br>
                                <select v-model="modalTarefa.tarefa.TarefasIdTipo" style="border: 1px solid #d5d5d5;">
                                    <option disabled value="">Seleciona tipo</option>
                                    <option v-for="tipo in modalTarefa.tipos" :value="tipo.auxtarefatipoId">{{tipo.auxtarefatipoNome}}</option>
                                </select>
                            </div>
                        </div>
                        <div style="margin-bottom: 20px;">
                            <div>
                                <label>Dias </label>
                                <div style="display: flex;justify-content: space-around;">
                                    <div v-for="diaSem in modalTarefa.diasSemana">
                                        <div style="display: flex;align-items: center;gap: 6px;">
                                            <input type="checkbox"  :checked="checarDia(diaSem)" @click="clickCheck($event,diaSem)" style="border: 1px solid #d5d5d5;">
                                            <label>{{diaSem.AuxDiasSemanaNome}}</label>
                                        </div>
                                        <div v-show="checarDia(diaSem)">
                                            <label>Minutos</label><br>
                                            <input type="number"  v-model="diaSem.quantidadeMinutos" style="border: 1px solid #d5d5d5;width: 60px;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="display: grid;gap: 2%;margin-bottom: 20px;grid-template-columns: 68% 30%;">
                            <div>
                                <label>Nome: </label>
                                <input type="text" v-model="modalTarefa.tarefa.TarefasNome" style="border: 1px solid #d5d5d5;width:100%;">
                            </div>
                            <div>
                                <label>Prioridade: </label><br>
                                <select v-model="modalTarefa.tarefa.TarefasIdPrioridade" style="border: 1px solid #d5d5d5;">
                                <option disabled value="">Seleciona prioridade</option>
                                    <option v-for="prio in modalTarefa.prioridades" :value="prio.auxPrioridadeId">{{prio.auxPrioridadeNome}}</option>
                                </select>
                            </div>
                        </div>
                        <div style="display: flex;gap: 20px;">
                            <div style="width: 100%;">
                                <label>Descrição: </label><br>
                                <textarea v-model="modalTarefa.tarefa.TarefasDescricao" style="border: 1px solid #d5d5d5;width:100%;"></textarea>
                            </div>
                        </div>
                        <div>
                        
                            <quill-editor :toolbar="[['bold', 'italic', 'underline', 'strike','image','video'],['blockquote', 'code-block'],[{ 'header': 1 }, { 'header': 2 }],[{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'script': 'sub'}, { 'script': 'super' }],[{ 'indent': '-1'}, { 'indent': '+1' }],[{ 'direction': 'rtl' }],[{ 'size': ['small', false, 'large', 'huge'] }],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],[{ 'color': [] }, { 'background': [] }],[{ 'font': [] }],[{ 'align': [] }],['clean']]" theme="snow" v-model:content="modalTarefa.tarefa.TarefasHtml" contentType="html" ></quill-editor>
                        </div>


                        
                        </template>
                            <template v-slot:footer>
                              <button @click="salvarTarefa()" style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Confirmar</button>
                              <button @click="modalTarefa.aberto = false" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Cancelar</button>
                            </template>
                        </ModalComponent>

                    <div  style="display: flex;gap: 15px;">

                        <div class=" todo-app w-full  pb-8">
                            <div class="py-5" >









                                <div  class="flex items-center justify-between">
                                    <div>
                                        <div class="flex space-x-2">
                                            <div class="text-xl font-medium text-slate-800 dark:text-navy-50" >
                                                {{diaDaSemana}}, {{mesDoAno}}. {{diaAtual}} 
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <div>Hora: {{horaAtual}}:{{minutoAtual}}:{{segundoAtual}}</div>
                                        </div>

                                    </div>
                                    <div class="flex items-center space-x-2">
                                        <label class="relative hidden sm:flex">
                                            <input v-model="buscaContexto" class="form-input peer h-9 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:z-10 hover:border-slate-400 focus:z-10 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent" placeholder="Buscar por Título..." type="text">
                                            <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3.316 13.781l.73-.171-.73.171zm0-5.457l.73.171-.73-.171zm15.473 0l.73-.171-.73.171zm0 5.457l.73.171-.73-.171zm-5.008 5.008l-.171-.73.171.73zm-5.457 0l-.171.73.171-.73zm0-15.473l-.171-.73.171.73zm5.457 0l.171-.73-.171.73zM20.47 21.53a.75.75 0 101.06-1.06l-1.06 1.06zM4.046 13.61a11.198 11.198 0 010-5.115l-1.46-.342a12.698 12.698 0 000 5.8l1.46-.343zm14.013-5.115a11.196 11.196 0 010 5.115l1.46.342a12.698 12.698 0 000-5.8l-1.46.343zm-4.45 9.564a11.196 11.196 0 01-5.114 0l-.342 1.46c1.907.448 3.892.448 5.8 0l-.343-1.46zM8.496 4.046a11.198 11.198 0 015.115 0l.342-1.46a12.698 12.698 0 00-5.8 0l.343 1.46zm0 14.013a5.97 5.97 0 01-4.45-4.45l-1.46.343a7.47 7.47 0 005.568 5.568l.342-1.46zm5.457 1.46a7.47 7.47 0 005.568-5.567l-1.46-.342a5.97 5.97 0 01-4.45 4.45l.342 1.46zM13.61 4.046a5.97 5.97 0 014.45 4.45l1.46-.343a7.47 7.47 0 00-5.568-5.567l-.342 1.46zm-5.457-1.46a7.47 7.47 0 00-5.567 5.567l1.46.342a5.97 5.97 0 014.45-4.45l-.343-1.46zm8.652 15.28l3.665 3.664 1.06-1.06-3.665-3.665-1.06 1.06z"></path>
                                                </svg>
                                            </span>
                                        </label>

                                        <button style="background-color: rgb(13, 172, 13); padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;" @click="adicionar()">Adicionar</button>

                                    </div>
                                </div>







                                <div style="display: grid;justify-content: space-around;grid-template-columns: 14.2857% 14.2857% 14.2857% 14.2857% 14.2857% 14.2857% 14.2857%;">
                                    <div @click="diaContexto = 1" :class="diaContexto == 1?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Domingo</div>
                                    <div @click="diaContexto = 2" :class="diaContexto == 2?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Segunda</div>
                                    <div @click="diaContexto = 3" :class="diaContexto == 3?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Terça</div>
                                    <div @click="diaContexto = 4" :class="diaContexto == 4?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Quarta</div>
                                    <div @click="diaContexto = 5" :class="diaContexto == 5?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Quinta</div>
                                    <div @click="diaContexto = 6" :class="diaContexto == 6?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Sexta</div>
                                    <div @click="diaContexto = 7" :class="diaContexto == 7?'border-primary dark:border-accent text-primary':''" class="btn shrink-0 rounded-none border-b-2 px-3 py-2 font-medium dark:text-accent-light">Sábado</div>
                                </div>

                            </div>






                
                
                            
                                <div >


                                    <div :class="tarefa.auxPrioridadeCor" class="tarefa-item border-b border-slate-150 py-3 dark:border-navy-500" v-for="tarefa in tarefas" @click="tarefaSelecionada = tarefa">
                                        <div class="flex items-center space-x-2 sm:space-x-3">
                                            <label class="flex">
                                                <input :checked="(tarefa.evento.TarefaEventoTimestampQtde / 60).toFixed(2)>(tarefa.RelDiasSemanaTarefaQtdeTempoTimestamp / 60)" disabled type="checkbox" class="form-checkbox is-outline h-5 w-5 rounded-full border-slate-400/70 before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent">
                                            </label>


                                            <div style="display: flex;justify-content: space-between;    width: 100%;">
                                                <div>
                                                    <h2 class="cursor-pointer text-slate-600 line-clamp-1 dark:text-navy-100" style="font-weight: bold;font-size: 20px;">
                                                        {{tarefa.TarefasNome}} 
                                                    </h2>
                                                    <span style="font-size: 12px;color: #00000069;">{{tarefa.CategoriasNome}} - {{tarefa.subcategoriasNome}}</span>
                                                </div>

                                                <div v-if="tarefa.evento.TarefaEventoTimestampQtde > 0" style="display: flex;flex-direction: column;">
                                                    <span style="    border-radius: 5px;box-shadow: rgba(0, 0, 0, 0.19) 0px 0px 10px 5px;background-color: rgb(71, 85, 105);color: rgb(255, 255, 255);padding: 5px 20px;font-size: 30px;height: 55px;display: flex;align-items: center;">{{(tarefa.evento.TarefaEventoTimestampQtde / 60).toFixed(2)}} Minutos</span>
                                                    <button v-show="diaContexto == diaContextoAtual" @click="atualizarTarefaTimestamp(tarefa)" style="background-color: rgb(255, 152, 0);padding: 3px 15px;font-size: 12px;color: rgb(255, 255, 255);margin: 0px 5px;border-radius: 5px;text-transform: uppercase;width: fit-content;align-self: center;margin-top: -7px;">Atualizar</button>
                                                </div>

                                                <div style="display: flex;gap: 15px;">
                                                    <div style="display: flex;gap: 5px;">
                                                        <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16"><path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg></div>
                                                        <div style="display: flex;gap:5px;">
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,1) == true ? 'ativo':'','diaDaSemanaMenu']">Dom</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,2) == true ? 'ativo':'','diaDaSemanaMenu']">Seg</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,3) == true ? 'ativo':'','diaDaSemanaMenu']">Ter</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,4) == true ? 'ativo':'','diaDaSemanaMenu']">Qua</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,5) == true ? 'ativo':'','diaDaSemanaMenu']">Qui</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,6) == true ? 'ativo':'','diaDaSemanaMenu']">Sex</span>
                                                            <span :class="[verificarDiaDaSemana(tarefa.diasdasemana,7) == true ? 'ativo':'','diaDaSemanaMenu']">Sáb</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                        <div class="mt-1 flex items-end justify-between">
                                            <div class="flex flex-wrap items-center font-inter text-xs">
                                                
                                            
                                                
                                                <span class="flex items-center space-x-1" :class="(tarefa.evento.TarefaEventoTimestampQtde / 60).toFixed(2)>(tarefa.RelDiasSemanaTarefaQtdeTempoTimestamp / 60) ? 'tarefa-concluida':'tarefa-nao-concluida'">
                                                    <svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/></svg>
                                                    <span>{{tarefa.RelDiasSemanaTarefaQtdeTempoTimestamp / 60}}</span>
                                                </span>

                                                <div class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"></div>

                                                <div style="display: flex;" :class="(tarefa.evento.TarefaEventoTimestampQtde / 60).toFixed(2)>(tarefa.RelDiasSemanaTarefaQtdeTempoTimestamp / 60) ? 'tarefa-concluida':'tarefa-nao-concluida'"><svg style="margin-right: 10px;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16"><path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/></svg>
                                                    <p >{{(tarefa.evento.TarefaEventoTimestampQtde / 60).toFixed(2)}}</p>
                                                </div>


                                                <div class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"></div>

                                                <div :class="tarefa.auxPrioridadeCor" class="badge space-x-2.5 px-1">
                                                    <div  class="h-2 w-2 rounded-full bg-current"></div>
                                                    <span>{{tarefa.auxPrioridadeNome}}</span>
                                                </div>

                                                <div class="m-1.5 w-px self-stretch bg-slate-200 dark:bg-navy-500"></div>

                                                <span :class="[tarefa.mostrarInfo == true ? 'menuTarefa':'','']" @click="tarefa.mostrarInfo == undefined ? tarefa.mostrarInfo = true:tarefa.mostrarInfo = undefined" style="cursor: pointer;">Mostrar</span>
                                                


                                            </div>
                                            
                                            <div v-show="diaContexto == diaContextoAtual" class="flex items-center space-x-1" style="position: absolute;right: 10px;top: 44px;">
                                                <div >
                                                    <div @click="executarTarefaPlay(tarefa)" v-if="!tarefa.executando"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg></div>
                                                    <div @click="executarTarefaStop(tarefa)" v-if="tarefa.executando"><svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" fill="currentColor" class="bi bi-stop-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3z"/></svg></div>
                                                </div>
                                            </div>
                                        </div>

                                    <div v-show="tarefa.mostrarInfo" style="margin: 20px 0px;border: 1px solid #e0e0e0;border-bottom: 1px solid #e0e0e0;">
                                        <div style="padding: 5px 10px 10px 10px;">
                                            <p style="margin: 15px;">{{tarefa.TarefasDescricao}}</p>
                                            <quill-editor :toolbar="[['bold', 'italic', 'underline', 'strike','image','video'],['blockquote', 'code-block'],[{ 'header': 1 }, { 'header': 2 }],[{ 'list': 'ordered'}, { 'list': 'bullet' }],[{ 'script': 'sub'}, { 'script': 'super' }],[{ 'indent': '-1'}, { 'indent': '+1' }],[{ 'direction': 'rtl' }],[{ 'size': ['small', false, 'large', 'huge'] }],[{ 'header': [1, 2, 3, 4, 5, 6, false] }],[{ 'color': [] }, { 'background': [] }],[{ 'font': [] }],[{ 'align': [] }],['clean']]" theme="snow" v-model:content="tarefa.TarefasHtml" contentType="html" ></quill-editor>
    
                                        </div>
                                        <div style="padding: 5px 10px 10px;display: flex;justify-content: space-between;">
                                            <button @click="atualizarTarefa(tarefa,$event)" style="background-color: #ff9800; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Atualizar</button>
                                            <button @click="removerTarefa(tarefa)" style="background-color: #f44336; padding: 3px 15px; font-size: 12px; color: rgb(255, 255, 255); margin: 0px 5px; border-radius: 5px; text-transform: uppercase;">Remover</button>
                                        </div>
                                    </div>

                                    </div>


                                </div>
             
                
                
                
                
						</div>

                    </div>
    `
}
