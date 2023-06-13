<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="projetoNome" class="label">Nome do Projeto:</label>
                <input type="text" id="projetoNome" class="input" v-model="projetoNome">
            </div>
            <div class="field">
                <button type="submit" class="button">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';
import { ADICIONA_PROJETO, EDITAR_PROJETO } from '@/store/tipo-mutacoes';
import { TipoNotificacao } from '@/interfaces/INotificacao';
import useNotificador from '@/hooks/notificador';
//import { notificacaoMixin } from '@/mixin/notificar';

    export default defineComponent({
        name: 'Formulario',
        props:{
            id:{
                type: String
            }
        },
        //mixins:[notificacaoMixin],
        mounted(){
            if(this.id){
                const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
                this.projetoNome = projeto?.nome || ''
            }
        },
        data(){
            return{
                projetoNome:'',
            }
        },
        methods:{
            salvar(){
                if(this.id){
                    //editar
                    this.store.commit(EDITAR_PROJETO, {
                        id: this.id,
                        nome: this.projetoNome
                    })
                }
                else{
                    this.store.commit(ADICIONA_PROJETO, this.projetoNome);

                }
                this.projetoNome = '';
                this.notificar('Mensagem de sucesso', 'Projeto cadastrado com sucesso :)', TipoNotificacao.SUCESSO);
                this.$router.push('/projetos')
            }
        },
        setup() {
            const store = useStore();
            const { notificar } = useNotificador()
            return {
                store,
                notificar
            }
        }
    });
</script>