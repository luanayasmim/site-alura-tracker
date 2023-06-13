<template>
  <main class="columns ls-gapless is-multiline" :class="{'darkmode' : modoEscuroAtivo}">
    <div class="column is-one-quarter">
      <BarraLateral @aoAlterarTema="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes/>
      <router-view/>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
    name: "App",
    components: { 
      BarraLateral,
      Notificacoes
     },
     data(){
        return{
          modoEscuroAtivo: false
        }
     },
     methods:{
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
