<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Tarefa" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto" name="" id="">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">{{ projeto.nome }}</option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @temporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from 'vuex';
import { key } from '@/store';

    export default defineComponent({
        name: "Formulario",
        components:{
            Temporizador
        },
        emits: ['aoSalvarTarefa'],
        data(){
            return{
                descricao: '',
                idProjeto: ''
            }
        },
        methods:{
            finalizarTarefa(tempoDecorrido:number) : void{
                this.$emit('aoSalvarTarefa', {
                    duracaoSegundos: tempoDecorrido,
                    descricao: this.descricao,
                    projeto: this.projetos.find(proj => proj.id == this.idProjeto)
                });
                this.descricao = "";
            }
        },
        setup(){
            const store = useStore(key)
            return{ projetos: computed( () => store.state.projetos)}
        }
    })
</script>

<style>
.formulario{
    color: var(--txt-primary);
    background-color: var(--bg-primary);
}
</style>