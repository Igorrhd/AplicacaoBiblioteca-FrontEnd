import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Autor from '../views/autor.vue'
import Livro from '../views/livro.vue'
import Genero from '../views/genero.vue'
import Editora from '../views/editora.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
