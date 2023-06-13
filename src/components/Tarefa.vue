<template>
    <Box>
        <div class="columns">
            <div class="column is-4">
                {{tarefa.descricao || 'Tarefa sem descrição'}}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome || 'N/D' }}
            </div>
            <div class="column ">
                <Cronometro :tempoSegundos="tarefa.duracaoSegundos" />
            </div>
        </div>
    </Box>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ITarefa from '@/interfaces/ITarefa';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';

export default defineComponent({
    name: "Tarefa",
    components:{
        Cronometro,
        Box
    },
    props:{
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
      }
     }
})
</script>
