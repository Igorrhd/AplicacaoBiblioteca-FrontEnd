
<template>
 <div style="padding: 20px;">
   <a-card  title="Gerenciamento de Editoras">
<a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
    <a-form-item label="Nome do Autor">
      <a-input
        v-model="form.nome"
        placeholder="Insira o nome da Editora"
      />
    </a-form-item>
 
        <a-form-item label="Endereço">
      <a-input
      v-model="form.endereco"
        placeholder="Insira a endereço da Editora"
      />
    </a-form-item>
    

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <div v-if="button">
      <a-button @click="createEditoras()" type="primary" html-type="submit">
       Cadastrar
      </a-button>
      </div>
              <div v-if="!button">
      <a-button @click="updateEditoras()" type="primary" html-type="submit">
       Confirmar
      </a-button>
            <a-button @click="cancelEdit()" type="danger" html-type="submit">
       Cancelar
      </a-button>
      </div>
      
    </a-form-item>


        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
 <a-table :columns="columns" :data-source="editoras" >
    <a slot="name" slot-scope="text">{{ text }}</a>
    <span slot="customTitle"><a-icon type="smile-o" /> Nome</span>

    <span slot-scope="editora" slot="action" >
    <a-button @click="editEditora(editora)"  html-type="submit">
       Editar
      </a-button >
          <a-button :disabled="!button" @click="deleteEditoras(editora.id)" type="danger" html-type="submit">
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
        width: '50%',
  },
  {
    title: 'Endereço',
    dataIndex: 'endereco',
    key: 'endereco',
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
        editoras:[],
        editoraId:"",
        form:{
            nome: "",
            endereco:"",
            }

       }
    },

mounted(){
  this.getEditoras();
},
methods:{
    getEditoras(){
        LibApi
            .getEditoras()
                .then((data)=>{
                    console.log(data)
                this.editoras = data.data
    })
                .catch()
    },
    createEditoras(){
        LibApi
        .createEditoras(this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                nome: "",
                endereco: "",

            };
            this.getEditoras();
        })
    },

    editEditora(editora){
        console.log("Autor", editora)
        this.editoraId = editora.id,
        this.form.nome = editora.nome,
        this.form.endereco = editora.endereco,
  
        this.button = false
    },
    cancelEdit(){
       this.form = {
                nome: "",
                endereco: ""
            };
            this.editoraId = "",
            this.button = true
    },

    deleteEditoras(id){
        console.log(id)
        LibApi
        .deleteEditoras(id)
        .then((data) => {
            console.log(data)
            this.getEditoras()
        })
    },
    updateEditoras(){
        LibApi
        .updateEditoras(this.editoraId, this.form)
        .then((data) => {
            console.log(data)
            this.form = {
                nome: "",
                endereco: ""
            };
            this.getEditoras();
            this.editoraId = "",
            this.button = true
        })
    }

}
    
}
</script>