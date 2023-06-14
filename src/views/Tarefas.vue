<template>
  <main
    class="columns ls-gapless is-multiline"
    :class="{ darkmode: modoEscuroAtivo }"
  >
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <div class="field">
          <p class="control has-icons-left">
            <input
              type="text"
              class="input"
              placeholder="Buscar"
              v-model="filtro"
            />
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div>
      </div>

      <Tarefa
        v-for="(tarefa, index) in tarefas"
        :key="index"
        :tarefa="tarefa"
        @aoTarefaClicada="selecionarTarefa"
      />
      <Box v-if="verificaLista"> Você não está mto produtivo hoje :( </Box>

      <Modal :exibir="tarefaSelecionada != null">
        <template v-slot:cabecalho>
          <p class="modal-card-title">Editar Tarefa</p>
          <button
            class="delete"
            aria-label="close"
            @click="fecharModal"
          ></button>
        </template>
        <template v-slot:corpo>
          <div class="field">
            <label for="descricaoTarefa" class="label">Descrição</label>
            <input
              type="text"
              class="input"
              id="descricaoTarefa"
              v-model="tarefaSelecionada.descricao"
            />
          </div>
        </template>
        <template v-slot:rodape>
          <button class="button is-success" @click="alterarTarefa">
            Salvar mudanças
          </button>
          <button class="button is-danger" @click="fecharModal">
            Cancelar
          </button>
        </template>
      </Modal>
    </div>
  </main>
</template>
  
<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from "vue";
import Formulario from "../components/Formulario.vue";
import Tarefa from "../components/Tarefa.vue";
import Box from "../components/Box.vue";
import Modal from "../components/Modal.vue";
import ITarefa from "../interfaces/ITarefa";
import { useStore } from "@/store";
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  OBTER_TAREFAS,
} from "@/store/tipo-acoes";

export default defineComponent({
  name: "App",
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal,
  },
  data() {
    return {
      modoEscuroAtivo: false,
      tarefaSelecionada: null as ITarefa | null,
    };
  },
  computed: {
    verificaLista(): boolean {
      return this.tarefas.length === 0;
    },
  },
  methods: {
    salvarTarefa(tarefa: ITarefa): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa);
    },
    alterarTarefa() {
      this.store
        .dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal());
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    },
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_PROJETOS);
    store.dispatch(OBTER_TAREFAS);

    const filtro = ref("");
    /*(const tarefas = computed(() =>
      store.state.tarefa.tarefas.filter(
        (t) => !filtro.value || t.descricao.includes(filtro.value)
      )
    );*/

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefa.tarefas),
      store,
      filtro,
    };
  },
});
</script>
  
<style>
main {
  --bg-primary: #fff;
  --txt-primary: #000;
}
main.darkmode {
  --bg-primary: #2b2d42;
  --txt-primary: #ddd;
}

.conteudo {
  background-color: var(--bg-primary);
}
.lista {
  padding: 1.25rem;
}
</style>