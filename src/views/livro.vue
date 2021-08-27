<!-----Arquivo que realiza a consulta, inclusão, edição e exclusão dos livors. 
 E também fica responsável por exibir a tabela com os dados dos livros------->
<template>
 <div style="padding: 20px;">
   <a-card  title="Gerenciamento de Livros">

<a-form  :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="Titulo do Livro">
      <a-input
        v-model="form.titulo"
        placeholder="Insira o titulo do livro"
      />
    </a-form-item>
            <a-form-item label="Genero Literario">
  <a-select v-model="form.genero_literario" >
      <a-select-option v-for="genero in generos" :key="genero.tipo">
        {{ genero.tipo }}
      </a-select-option>
    </a-select>
    </a-form-item>
        <a-form-item label="Autor">
  <a-select v-model="form.autor" >
      <a-select-option v-for="autor in autores" :key="autor.nome">
        {{ autor.nome }}
      </a-select-option>
    </a-select>
        </a-form-item>

       <a-form-item label="Editora">
  <a-select v-model="form.editora" >
      <a-select-option v-for="editora in editoras" :key="editora.nome">
        {{ editora.nome }}
      </a-select-option>
    </a-select>
       </a-form-item>
               <a-form-item label="Ano de Lançamento">
      <a-input
      v-model="form.ano_lancamento"

        placeholder="Insirao ano de lançamento do livro"
      />
    </a-form-item>


    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <div v-if="button">
      <a-button @click="createLivros()" type="primary" html-type="submit">
       Cadastrar
      </a-button>
      </div>
              <div v-if="!button">
      <a-button @click="updateLivros()" type="primary" html-type="submit">
       Confirmar
      </a-button>
            <a-button @click="cancelEdit()" type="danger" html-type="submit">
       Cancelar
      </a-button>
      </div>
      
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
    
 <a-table :columns="columns" :data-source="livros" >
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Nome</span>

    <span slot-scope="livro" slot="action" >
    <a-button @click="editLivro(livro)"  html-type="submit">
       Editar
      </a-button >
          <a-button :disabled="!button" @click="deleteLivros(livro.id)" type="danger" html-type="submit">
      Excluir
      </a-button>
    </span>
  </a-table>
    </a-form-item>
  </a-form>
  
   </a-card>
 </div>
</template>
<script>
import LibApi from '../services/biblioteca-api'
import moment from 'moment';


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
  {
    title: 'Ação',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

export default {
    data(){
        return{
        button : true,
        columns,
        moment,
        livros:[],
        autores:[],
        editoras:[],
        generos:[],
        livroId:"",
        form:{
            titulo: "",
            autor: "",
            editora: "",
            genero_literario: "",
            ano_lancamento: ""
            }

       }
    },

mounted(){
  this.getLivros();
  this.getAutores();
  this.getEditoras();
  this.getGeneros();
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
        getAutores(){
        LibApi
            .getAutores()
                .then((data)=>{
                    console.log(data)
                this.autores = data.data
    })
                .catch()
    },
        getEditoras(){
        LibApi
            .getEditoras()
                .then((data)=>{
                    console.log(data)
                this.editoras = data.data
    })
                .catch()
    },
        getGeneros(){
        LibApi
            .getGeneros()
                .then((data)=>{
                    console.log(data)
                this.generos = data.data
    })
                .catch((erro) =>{
                    console.log(erro)
                })
    },
    createLivros(){
        LibApi
        .createLivros(this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                titulo: "",
                autor: "",
                editora: "",
                genero_literario: "",
                ano_lancamento:""
            };
            this.getLivros();
        })
    },

    editLivro(livro){
        console.log("Autor", livro)
        this.livroId = livro.id,
        this.form.titulo = livro.titulo,
        this.form.autor = livro.autor,
        this.form.editora = livro.editora,
        this.form.ano_lancamento = livro.ano_lancamento,
        this.form.genero_literario = livro.genero_literario
        this.button = false
    },
    cancelEdit(){
              this.form = {
                titulo: "",
                autor: "",
                editora: "",
                genero_literario: "",
                ano_lancamento
            };
            this.livroId = "",
            this.button = true
    },

    deleteLivros(id){
        console.log(id)
        LibApi
        .deleteLivros(id)
        .then((data) => {
            console.log(data)
            this.getLivros()
        })
    },
    updateLivros(){
        LibApi
        .updateLivros(this.livroId, this.form)
        .then((data) => {
            console.log(data)
                 this.form = {
                titulo: "",
                autor: "",
                editora: "",
                genero_literario: "",
                ano_lancamento: ""
            };
            this.getLivros();
            this.livroId = "",
            this.button = true
        })
    }

}
    
}
</script>