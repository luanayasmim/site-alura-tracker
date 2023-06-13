import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue';
import Projetos from '../views/Projetos.vue';
import Formulario from '../views/Projetos/Formulario.vue';
import Lista from '../views/Projetos/Lista.vue';

const paths: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },
    {
        path:'/projetos',
        component: Projetos, 
        children: [
            {
                path: '',
                name: 'Listar Projetos',
                component: Lista
            },
            {
                path: 'cadastrar',
                name: 'Novo Projetos',
                component: Formulario
            },
            {
                path: 'editar/:id',
                name: 'Editar Projetos',
                component: Formulario,
                props: true
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: paths
});

export default router;