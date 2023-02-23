<template>
  <main class="columns ls-gapless is-multiline" :class="{'darkmode' : modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoAlterarTema="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa"/>
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="verificaLista">
          Você não está mto produtivo hoje :(
        </Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import Box from './components/Box.vue'
import ITarefa from './interfaces/ITarefa';

export default defineComponent({
    name: "App",
    components: { 
      BarraLateral,
      Formulario,
      Tarefa,
      Box
     },
     data(){
        return{
          tarefas: [] as ITarefa[],
          modoEscuroAtivo: false
        }
     },
     computed:{
      verificaLista() : boolean{
        return this.tarefas.length === 0
      }
     },
     methods:{
        salvarTarefa(tarefa: ITarefa){
          this.tarefas.push(tarefa);
        },
        trocarTema(modoEscuroAtivo: boolean){
          this.modoEscuroAtivo = modoEscuroAtivo
        }
     },
     
});
</script>

<style>
main{
   --bg-primary: #fff;
   --txt-primary: #000;
}
main.darkmode{
  --bg-primary: #2b2d42;
   --txt-primary: #ddd;
}

.conteudo{
  background-color: var(--bg-primary);
}
.lista{
  padding: 1.25rem;
}
</style>
