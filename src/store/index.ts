import { tarefa } from './modules/tarefas/index';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { NOTIFICAR } from "./tipo-mutacoes";
import { INotificacao } from "@/interfaces/INotificacao";
import { EstadoProjeto, projeto } from "./modules/projetos";
import { EstadoTarefa } from "./modules/tarefas";

export interface Estado {
    projeto: EstadoProjeto,
    tarefa: EstadoTarefa,
    notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
    state: {
        projeto: { projetos: [] },
        tarefa: {tarefas: []},
        notificacoes: []
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao) {
            novaNotificacao.id = new Date().getTime(),
                state.notificacoes.push(novaNotificacao)

            setTimeout(() => {
                state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
            }, 3000)
        }
    },
    modules:{
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key);
}