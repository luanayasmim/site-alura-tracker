<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoSegundos="tempoSegundos" />
    <Botao
      @clicado="iniciar"
      icone="fas fa-play"
      texto="play"
      :desabilitado="cronometroRodando"
    />
    <Botao
      @clicado="finalizar"
      icone="fas fa-stop"
      texto="stop"
      :desabilitado="!cronometroRodando"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Botao from "./Botao.vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
  name: "Temporizador",
  emits: ["TemporizadorFinalizado"],
  components: {
    Cronometro,
    Botao,
  },
  data() {
    return {
      tempoSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    };
  },

  methods: {
    iniciar() {
      this.cronometroRodando = true;
      //iniciando a contagem
      this.cronometro = setInterval(() => {
        this.tempoSegundos++;
      }, 1000); // realizando a contagem em milissegundos
    },
    finalizar() {
      this.cronometroRodando = false;
      clearInterval(this.cronometro);
      this.$emit("TemporizadorFinalizado", this.tempoSegundos);
      this.tempoSegundos = 0;
    },
  },
});
</script>