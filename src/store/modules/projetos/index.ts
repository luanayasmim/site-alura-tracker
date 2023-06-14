import http from "@/http";
import IProjeto from "@/interfaces/IProjeto";
import { Estado } from "@/store";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, APAGAR_PROJETO } from "@/store/tipo-acoes";
import { ADICIONA_PROJETO, EDITAR_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoProjeto {
    projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
    mutations: {
        [ADICIONA_PROJETO](state, nomeProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeProjeto
            } as IProjeto
            state.projetos.push(projeto);
        },
        [EDITAR_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id);
        },
        [DEFINIR_PROJETOS](state, projetos: IProjeto[]) {
            state.projetos = projetos;
        },
    },
    actions: {
        [OBTER_PROJETOS]({ commit }) {
            http.get('projetos')
                .then(response => commit(DEFINIR_PROJETOS, response.data));
        },
        [CADASTRAR_PROJETO](contexto, nomeProjeto: string) {
            return http.post('projetos', {
                nome: nomeProjeto
            });
        },
        [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
            return http.put(`projetos/${projeto.id}`, projeto);
        },
        [APAGAR_PROJETO]({ commit }, id: number) {
            return http.delete(`projetos/${id}`).then(() => { commit(EXCLUIR_PROJETO, id) });
        },
    },
}