<template>

    <header>
        <h1><img src="../assets/logo.png" alt="Logo principal"></h1>

        <button class="button" @click="alterarTema">
            {{textoBotao}}
        </button>
    </header>

</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BarraLateral',
        emits: ['aoAlterarTema'],
        data(){
            return{
                modoEscuroAtivo: false
            }
        },
        methods:{
            alterarTema(){
                this.modoEscuroAtivo = !this.modoEscuroAtivo
                this.$emit('aoAlterarTema', this.modoEscuroAtivo)
            }
        },
        computed:{
            textoBotao(){
                if(this.modoEscuroAtivo)
                    return 'Modo Claro'

                return  'Modo Escuro'
            }
        }
    })
</script>

<!-- Estilo do componente -->
<style scoped>
    header{
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        text-align: center;
    }
    @media only screen and(max-width: 768px){
        header{
            padding: 2.5rem;
            height: auto;
        }
    }
</style>