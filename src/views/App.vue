<template>
  <div class="container-fluid mt-2">
    <h1></h1>
    <div class="row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import {getAuthenticationToken} from '@/dataStorage';

  export default{
    name: "App",
    beforeCreate( ){
      if( !getAuthenticationToken( ) ){
        this.$router.push( {name: "login"} );
      }
    }
  }
</script>

<style>

</style>
