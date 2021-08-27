//Arquivo responsável pelas rotas da aplicação. 
import Vue from 'vue'
import Router from 'vue-router'
import PgInicial from '@/components/PgInicial'
import Autor from '../views/autor.vue'
import Livro from '../views/livro.vue'
import Genero from '../views/genero.vue'
import Editora from '../views/editora.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PgInicial',
      component: PgInicial
    },
    {
      path: '/autor',
      name: 'Autor',
      component: Autor
    },
    {
      path: '/livro',
      name: 'Livro',
      component: Livro
    },
    {
      path: '/genero',
      name: 'Genero',
      component: Genero
    },    {
      path: '/editora',
      name: 'Editora',
      component: Editora
    }
  ]
})
