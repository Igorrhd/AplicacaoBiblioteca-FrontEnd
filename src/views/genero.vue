<!-----Arquivo que realiza a consulta, inclusão, edição e exclusão dos generos literários. 
 E também fica responsável por exibir a tabela com os dados dos generos literários------->
<template>
 <div style="padding: 20px;">
   <a-card  title="Gerenciamento de Generos">
<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="Tipo do Genero Literario">
      <a-input
        v-model="form.tipo"
        placeholder="Insira o tipo do Genero Literario"
      />
    </a-form-item>
    

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <div v-if="button">
      <a-button @click="createGeneros()" type="primary" html-type="submit">
       Cadastrar
      </a-button>
      </div>
              <div v-if="!button">
      <a-button @click="updateGeneros()" type="primary" html-type="submit">
       Confirmar
      </a-button>
            <a-button @click="cancelEdit()" type="danger" html-type="submit">
       Cancelar
      </a-button>
      </div>
      
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
    
 <a-table :columns="columns" :data-source="generos" >
    <a  slot="tipo" slot-scope="text">{{ text }}</a>
    <span   slot="customTitle"> Genero Literario</span>

    <span slot-scope="genero" slot="action" >
    <a-button @click="editAutor(genero)"  html-type="submit">
       Editar
      </a-button >
          <a-button :disabled="!button" @click="deleteGeneros(genero.id)" type="danger" html-type="submit">
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
    dataIndex: 'tipo',
    key: 'tipo',
    slots: { title: 'customTitle' },
        width: '80%',
 
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
        generos:[],
        generoId:"",
        form:{
            tipo: "",
            }

       }
    },
mounted(){
  this.getGeneros();
},
methods:{
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
    createGeneros(){
        LibApi
        .createGeneros(this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                tipo: "",
        
            };
            this.getGeneros();
        })
    },

    editAutor(genero){
        console.log("Genero", genero)
        this.generoId = genero.id,
        this.form.tipo = genero.tipo,
        this.button = false
    },
    cancelEdit(){
       this.form = {
                tipo: "",
     
            };
            this.generoId = "",
            this.button = true
    },

    deleteGeneros(id){
        console.log(id)
        LibApi
        .deleteGeneros(id)
        .then((data) => {
            console.log(data)
            this.getGeneros()
        })
    },
    updateGeneros(){
        LibApi
        .updateGeneros(this.generoId, this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                tipo: "",
            };
            this.getGeneros();
            this.generoId = "",
            this.button = true
        })
    }

}
    
}
</script>