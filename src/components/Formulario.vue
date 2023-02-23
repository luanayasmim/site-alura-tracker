<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text" class="input" placeholder="Tarefa" v-model="descricao">
            </div>
            <div class="column">
                <Temporizador @temporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import Temporizador from './Temporizador.vue';

    export default defineComponent({
        name: "Formulario",
        components:{
            Temporizador
        },
        emits: ['aoSalvarTarefa'],
        data(){
            return{
                descricao: ''
            }
        },
        methods:{
            finalizarTarefa(tempoDecorrido:number) : void{
                this.$emit('aoSalvarTarefa', {
                    duracaoSegundos: tempoDecorrido,
                    descricao: this.descricao
                });
                this.descricao = "";
            }
        }
    })
</script>

<style>
.formulario{
    color: var(--txt-primary);
    background-color: var(--bg-primary);
}
</style>