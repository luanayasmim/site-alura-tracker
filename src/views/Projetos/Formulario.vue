<template>
  <section>
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="projetoNome" class="label">Nome do Projeto:</label>
        <input
          type="text"
          id="projetoNome"
          class="input"
          v-model="projetoNome"
        />
      </div>
      <div class="field">
        <button type="submit" class="button is-success">Salvar</button>
        <button class="button is-danger" @click="cancelar">Cancelar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";
//import { notificacaoMixin } from '@/mixin/notificar';

export default defineComponent({
  name: "Formulario",
  props: {
    id: {
      type: String,
    },
  },
  methods: {
    cancelar() {
      this.$router.push("/projetos");
    },
  },
  setup(props) {
    const store = useStore();
    const { notificar } = useNotificador();
    const router = useRouter();
    const projetoNome = ref("");

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        (proj) => proj.id == props.id
      );

      projetoNome.value = projeto?.nome || "";
    }

    const salvar = () => {
      if (props.id) {
        //editar
        store
          .dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: projetoNome.value,
          })
          .then(() => lidarComSucesso("Nome do projeto alterado com sucesso!"))
          .catch(() => lidarComErro("Erro ao alterar o projeto!"));
      } else {
        //cadastrar
        store
          .dispatch(CADASTRAR_PROJETO, projetoNome.value)
          .then(() => lidarComSucesso("Projeto cadastrado com sucesso :)"))
          .catch(() => lidarComErro("Erro ao cadastrar o projeto :("));
      }
    };

    const lidarComSucesso = (texto: string) => {
      projetoNome.value = "";
      notificar("Mensagem de sucesso", texto, TipoNotificacao.SUCESSO);
      router.push("/projetos");
    };

    const lidarComErro = (texto: string) => {
      projetoNome.value = "";
      notificar("Mensagem de erro", texto, TipoNotificacao.ERRO);
      router.push("/projetos");
    };

    return {
      projetoNome,
      salvar,
    };
  },
});
</script>

<style scoped>
.button {
  margin-right: 10px;
}
</style>