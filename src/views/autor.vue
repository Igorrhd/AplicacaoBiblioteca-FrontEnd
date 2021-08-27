
<template>
 <div style="padding: 20px;">
   <a-card  title="Gerenciamento de Autores">

<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="Nome do Autor">
      <a-input
        v-model="form.nome"
        placeholder="Insira o nome do autor"
      />
    </a-form-item>
        <a-form-item label="Data de Nascimento">
      <a-input
        v-model="form.ano_nascimento"
        placeholder="Data de Nascimento"
      />
          <!-- <a-date-picker 
             placeholder="Data de Nascimento"
          v-model="form.ano_nascimento" style="width: 100%"/> -->
    </a-form-item>
        <a-form-item label="Nacionalidade">
      <a-input
      v-model="form.nacionalidade"
        placeholder="Insira a nacionalidade do Autor"
      />
    </a-form-item>
        <a-form-item label="Sexo">
       <a-select
    v-model="form.sexo"
        placeholder="Selecione o sexo do autor"

      >
        <a-select-option value="Masculino">
          Masculino
        </a-select-option>
        <a-select-option value="Feminino">
          Feminino
        </a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <div v-if="button">
      <a-button @click="createAutor()" type="primary" html-type="submit">
       Cadastrar
      </a-button>
      </div>
              <div v-if="!button">
      <a-button @click="updateAutor()" type="primary" html-type="submit">
       Confirmar
      </a-button>
            <a-button @click="cancelEdit()" type="danger" html-type="submit">
       Cancelar
      </a-button>
      </div>
      
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
    
 <a-table :columns="columns" :data-source="autores" >
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span  slot="customTitle"><a-icon type="smile-o" /> Nome</span>

    <span slot-scope="autor" slot="action" >
    <a-button @click="editAutor(autor)"  html-type="submit">
       Editar
      </a-button >
          <a-button :disabled="!button" @click="deleteAutor(autor.id)" type="danger" html-type="submit">
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
    dataIndex: 'nome',
    key: 'nome',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'nome' },
  },
  {
    title: 'Ano De Nascimento',
    dataIndex: 'ano_nascimento',
    key: 'ano_nascimento',
  },
  {
    title: 'Nacionalidade',
    dataIndex: 'nacionalidade',
    key: 'nacionalidade',
  },
  {
    title: 'Sexo',
    key: 'sexo',
    dataIndex: 'sexo',

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
        autores:[],
        autorId:"",
        form:{
            nome: "",
            ano_nascimento: "",
            sexo: "",
            nacionalidade: ""
            }

       }
    },

mounted(){
  this.getAutores();
},
methods:{
    getAutores(){
        LibApi
            .getAutores()
                .then((data)=>{
                    console.log(data)
                this.autores = data.data
    })
                .catch()
    },
    createAutor(){
        LibApi
        .createAutor(this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                nome: "",
                ano_nascimento: "",
                sexo: "",
                nacionalidade: ""
            };
            this.getAutores();
        })
    },

    editAutor(autor){
        console.log("Autor", autor)
        this.autorId = autor.id,
        this.form.nome = autor.nome,
        this.form.nacionalidade = autor.nacionalidade,
        this.form.sexo = autor.sexo,
        this.form.ano_nascimento = autor.ano_nascimento
        this.button = false
    },
    cancelEdit(){
       this.form = {
                nome: "",
                ano_nascimento: "",
                sexo: "",
                nacionalidade: ""
            };
            this.autorId = "",
            this.button = true
    },

    deleteAutor(id){
        console.log(id)
        LibApi
        .deleteAutor(id)
        .then((data) => {
            console.log(data)
            this.getAutores()
        })
    },
    updateAutor(){
        LibApi
        .updateAutor(this.autorId, this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                nome: "",
                ano_nascimento: "",
                sexo: "",
                nacionalidade: ""
            };
            this.getAutores();
            this.autorId = "",
            this.button = true
        })
    }

}
    
}
</script>