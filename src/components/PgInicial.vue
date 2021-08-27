 <!-----Esta é a pagina inicial da aplicação web.------->
<template>
 <div style="padding: 20px;">
   <a-card  >
      <center>
            <h1>Bem vindo a minha biblioteca virtual!</h1>

            <h1>Aqui estão alguns de nossos livros cadastrados no sistema</h1>

        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
 <a-table :columns="columns" :data-source="livros" >
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"> Nome</span>

  </a-table>
        </a-form-item>
        </center>
   </a-card>
  </div>
</template>

<script>
import LibApi from '../services/biblioteca-api'

  const columns = [
  {
    dataIndex: 'titulo',
    key: 'titulo',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'titulo' },
  },
  {
    title: 'Genero Literario',
    dataIndex: 'genero_literario',
    key: 'genero_literario',
  },
  {
    title: 'Autor',
    dataIndex: 'autor',
    key: 'autor',
  },
  {
    title: 'Editora',
    key: 'editora',
    dataIndex: 'editora',

  },
    {
    title: 'Lançamento',
    key: 'ano_lancamento',
    dataIndex: 'ano_lancamento',

  },

];
export default {
      data(){
        return{
          columns,
        livros:[],
       }
    },
    mounted(){
  this.getLivros();
},
methods:{
      getLivros(){
        LibApi
            .getLivros()
                .then((data)=>{
                    console.log(data)
                this.livros = data.data
    })
                .catch()
    },
}
}
</script>