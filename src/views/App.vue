<template>
  <div class="app">
      <nav class="navbar navbar-light bg-light">
        <router-link class="navbar-brand" :to="{name: 'profile'}">
          <img src="../../public/static/img/heart-rate.png" width="30" height="30" class="d-inline-block align-top" alt="">
          Medirec
        </router-link>
        <div class="dual-collapse2 order-2 order-md-2">
          <div class="navbar-nav mr-auto text-center">
            <button class="btn btn-secondary" @click="logOut">Cerrar Sesión</button>
          </div>
        </div>
      </nav>
      <router-view></router-view>
  </div>
</template>

<script>
  import {getAuthenticationToken, deleteAuthenticationToken} from '@/dataStorage';

  export default{
    name: "App",
    beforeCreate( ){
      if( !getAuthenticationToken( ) ){
        this.$router.push( {name: "login"} );
      }
    },
    methods:{
      logOut(){
        deleteAuthenticationToken();
        this.$router.push( {name: "login"} );
      }
    }
  }
</script>

<style>

</style>
