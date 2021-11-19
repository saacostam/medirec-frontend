<template>
  <div class="col-12 text-center">
    <h1>Autenticado</h1>
  </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

const requestPath = '/mis-roles';

export default {
  name: 'Roles',
  data( ){
    return {
      
    }
  },
  beforeCreate(){
    // axios.get( this.$store.state.backURL + requestPath, { params: { access_token: getAuthenticationToken( ) } } )
    //     .then( response => {
    //       if( response.status !== 200 ){
    //         alert( 'Error Obteniendo sus roles' );
    //       }else{
    //         this.roles = response.data;
    //       }
    //     } ).catch( error => {
    //       alert( 'Error en la petición' );
    //       console.log( error );
    //     } );
  }
}
</script>

<style scoped>

</style>
