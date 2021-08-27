//Arquivo responsável pela integração do Back-End com o Front-End (é onde as requisições são feitas).
import axios from "axios"

export const http = axios.create({
    baseURL: 'http://api-rest.test/api'
    
})


let LibApi = {
    //Autores
    createAutor: (autorObj) =>{
        return http.post('/autores' ,autorObj)
    },
    getAutores: () =>{
        return http.get('/autores')
    },
    deleteAutor: (idAutor) =>{
        return http.delete(`/autores/${idAutor}`)
    },
    updateAutor: (idAutor, autorObj) =>{
        return http.put(`/autores/${idAutor}`, autorObj)
    },

    //Livros
    getLivros: () => {
        return http.get('/livros')
    },
    createLivros: (livrosObj) => {
        return http.post('/livros', livrosObj)
    },
    updateLivros: (idLivros, livrosObj) => {
        return http.put(`/livros/${idLivros}`, livrosObj)
    },
    deleteLivros: (idLivros) => {
        return http.delete(`/livros/${idLivros}`)
    },

    //Generos literarios
    getGeneros: () => {
        return http.get('/genero_literarios')
    },
    createGeneros: (generoObj) => {
        return http.post('/genero_literarios', generoObj)
    },
    updateGeneros: (idGenero, generoObj) => {
        return http.put(`/genero_literarios/${idGenero}`, generoObj)
    },
    deleteGeneros: (idGenero) => {
        return http.delete(`/genero_literarios/${idGenero}`)
    },
    //Editoras
    getEditoras: () => {
        return http.get('/editoras')
    },
    createEditoras: (editoraObj) => {
        return http.post('/editoras', editoraObj)
    },
    updateEditoras: (idEditora, editoraObj) => {
        return http.put(`/editoras/${idEditora}`, editoraObj)
    },
    deleteEditoras: (idEditora) => {
        return http.delete(`/editoras/${idEditora}`)
    },
    
}

export default LibApi 