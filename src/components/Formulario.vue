<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Tarefa"
          v-model="descricao"
        />
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto" name="" id="">
            <option value="">Selecione o projeto</option>
            <option
              :value="projeto.id"
              v-for="projeto in projetos"
              :key="projeto.id"
            >
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <Temporizador @temporizadorFinalizado="finalizarTarefa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from "./Temporizador.vue";
import { useStore } from "vuex";
import { key } from "@/store";

export default defineComponent({
  name: "Formulario",
  components: {
    Temporizador,
  },
  emits: ["aoSalvarTarefa"],
  setup(props, { emit }) {
    const store = useStore(key);
    const descricao = ref("");
    const idProjeto = ref("");
    const projetos = computed(() => store.state.projeto.projetos);

    const finalizarTarefa = (tempoDecorrido: number): void => {
      emit("aoSalvarTarefa", {
        duracaoSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find((proj) => proj.id == idProjeto.value),
      });
      descricao.value = "";
    };

    return {
      descricao,
      idProjeto,
      projetos,
      finalizarTarefa,
    };
  },
});
</script>

<style>
.formulario {
  color: var(--txt-primary);
  background-color: var(--bg-primary);
}
</style>