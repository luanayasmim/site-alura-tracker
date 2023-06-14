<template>
  <section>
    <router-link to="projetos/cadastrar" class="button is-success">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo Projeto</span>
    </router-link>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link
              :to="`projetos/editar/${projeto.id}`"
              class="button is-warning"
            >
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { APAGAR_PROJETO, OBTER_PROJETOS } from "@/store/tipo-acoes";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
  name: "Lista",
  methods: {
    excluir(id: string) {
      this.store
        .dispatch(APAGAR_PROJETO, id)
        .then(() => {
          this.notificar(
            "Mensagem de Sucesso",
            "Projeto excluido com sucesso!",
            TipoNotificacao.SUCESSO
          );
          //this.store.dispatch(OBTER_PROJETOS);
        })
        .catch(() => {
          this.notificar(
            "Mensagem de Erro",
            "Houve um erro ao excluir o projeto",
            TipoNotificacao.ERRO
          );
        });
    },
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    store.dispatch(OBTER_PROJETOS);
    return {
      projetos: computed(() => store.state.projeto.projetos),
      store,
      notificar,
    };
  },
});
</script>