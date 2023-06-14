<template>
  <div class="notificacoes">
    <article
      class="message"
      v-for="notificacao in notificacoes"
      :key="notificacao.id"
      :class="context[notificacao.tipo]"
    >
      <div class="message-header">{{ notificacao.titulo }}</div>
      <div class="message-body">{{ notificacao.texto }}</div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/INotificacao";

export default defineComponent({
  name: "Notificacoes",
  data() {
    return {
      context: {
        [TipoNotificacao.SUCESSO]: "is-success",
        [TipoNotificacao.ALERTA]: "is-warning",
        [TipoNotificacao.ERRO]: "is-danger",
      },
    };
  },
  setup() {
    const store = useStore();
    return {
      notificacoes: computed(() => store.state.notificacoes),
    };
  },
});
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8;
  z-index: 100;
}
</style>