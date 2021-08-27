<template>
  <div>
    <a-menu mode="horizontal">
      <a-menu-item key="home"> <a-icon type="home" />Home <router-link to="/"/> </a-menu-item>
      
      <a-menu-item key="livros"> <a-icon type="book" />Livros <router-link to="/livro"/> </a-menu-item>
      <a-menu-item key="autores"> <a-icon type="user" />Autores <router-link to="/autor"/> </a-menu-item>
      <a-menu-item key="genero"> <a-icon type="team" />Generos <router-link to="/genero"/></a-menu-item>
      <a-menu-item key="editoras"> <a-icon type="container" />Editoras<router-link to="/editora"/> </a-menu-item>
   
    </a-menu>
  </div>
</template>
<script>
export default {
  name: "SideBar",

  
};
</script>