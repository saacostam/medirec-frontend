<template>
    <div class="my-doctors container-fluid h-100">
        <div class="row h-100">
            <div class="col-lg-6 nav h-100">
                <div class="h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                    <img src="https://via.placeholder.com/200" width="200px" height="200px" class="mb-5">
                    <button class="btn btn-primary bg-color-main-light btn-search" @click="toSearch">Busqueda<br>Doctores</button>
                </div>
            </div>
            <div class="col-lg-6 img">

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        return {
            doctors: []
        }
    },
    beforeCreate(){
        const session =getAuthenticationToken();
        const path = '/patient/prof='+session.userId+'/mydoctors';
        let dataObject = [];

        axios.get( this.$store.state.backURL + path, {})
        .then( response => {
        if( response.status !== 202 ){
            alert( 'Error Realizando la Busqueda' );
        }else{
            const data = response.data.data;
            console.log(data);
            this.doctors = data;
        }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );
    },
    methods:{
        toProfile(id){
            this.$router.push( '/mis-doctores/perfil/'+id );
        },
        toSearch(){
            this.$router.push( {name:'searchDoctors'} );
        }
    }
}
</script>

<style scoped> 
.bg-color-main-light{
    background-color: #418ef2;
}

.btn-search{
    padding: 10px 70px;
    font-weight: 600;
    font-size: 18px;
}
</style>