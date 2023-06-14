<template>
  <div class="box has-text-weight-bold" :style="styles">
    <slot>
      <!-- O slot faz com que o que tiver dentro do componente Box seja rendenizado de forma automática -->
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Box",
  data() {
    return {
      styles: {
        background: "#faf0ca",
      },
    };
  },
});
</script>

<!-- <style scoped> /* a tag scoped faz com que o estilo só seja aplicado para este componente */
 .box {
     background: #faf0ca;
 }
</style> -->