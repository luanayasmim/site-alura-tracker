import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA, APAGAR_TAREFA } from "@/store/tipo-acoes";
import { ADICIONA_TAREFA, DEFINIR_TAREFAS, EDITAR_TAREFA, EXCLUIR_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoTarefa {
    tarefas: ITarefa[];
}

export const tarefa: Module<EstadoTarefa, Estado> = {
    mutations: {
        [ADICIONA_TAREFA](state, tarefa: ITarefa) {
            state.tarefas.push(tarefa);
        },
        [EDITAR_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id);
            state.tarefas[index] = tarefa;
        },
        [EXCLUIR_TAREFA](state, id: number) {
            state.tarefas = state.tarefas.filter(tarefa => tarefa.id != id);
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas;
        },
    },
    actions: {
        [OBTER_TAREFAS]({ commit }, filtro: string) {
            let url = 'tarefas';
            if (filtro)
                url += '?descricao=' + filtro;
            http.get(url)
                .then(response => commit(DEFINIR_TAREFAS, response.data));
        },
        [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.post('tarefas', tarefa).then(response => commit(ADICIONA_TAREFA, response.data));
        },
        [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa).then(() => commit(EDITAR_TAREFA, tarefa));
        },
        [APAGAR_TAREFA]({ commit }, descricao) {
            return http.delete(`tarefas/${descricao}`).then(() => { commit(EXCLUIR_TAREFA, descricao) });
        }
    },
}