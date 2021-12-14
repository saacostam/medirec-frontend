<template>
    <div class="search-doctor container">
        <div class="row">
            <form @submit="submit"  class="col-lg-6 offset-lg-3 form">
                <div class="form-group">
                    <label for="nameInput">Nombre</label>
                    <input type="text" id="nameInput" class="form-control" v-model="name">
                </div>
                <div class="form-group">
                    <label for="documentInput">Documento</label>
                    <input type="number" id="documentInput" class="form-control" v-model="document">
                </div>
                <input type="submit" value="Buscar" class="btn btn-primary">
            </form>

            <div class="search-results col-lg-6 offset-lg-3 mt-5" v-if="this.searchResults !== null">
                <div class="result p-2 border" v-for="result in this.searchResults" :key="result.name"> 
                    <h4>{{result.userFirstName+' '+result.userLastName}}</h4>
                    <h6 class="text-muted">{{result.patientEps}}</h6>
                    <p class="text-primary">{{result.userEmail}}</p>
                    <button class="btn btn-primary" @click="request(result.userId)">Solicitar Acceso</button>
                </div>
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
            name: null,
            document: null,
            searchResults: null
        }
    },
    methods:{
        submit(event){
            event.preventDefault();
            const session =getAuthenticationToken();

            const path = '/patient/search';
            axios.get( this.$store.state.backURL + path, { 
                params: { sessionToken: session.token, 
                        name: this.name, 
                        doc: this.document
                } 
            })
            .then( response => {
            if( response.status !== 200 ){
                alert( 'Error Realizando la Busqueda' );
            }else{
                const data = response.data.data;
                this.searchResults = data;
                console.log(data);
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        request(id){
            console.log(id);
            const session = getAuthenticationToken();
            console.log(session.userId)
            const path = '/doctor/prof='+session.userId+'/makeRequest';

            axios.post( this.$store.state.backURL + path,
            {
                patientId: id
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            ).then( response => {
                if( response.status !== 202 ){
                    alert( "Error en la actualización de datos" );
                }else{
                    alert( 'Success' );
                }
            } ).catch( error => {
                if( error.response.status === 400 ){
                    alert( "Error 400" );
                }else{
                    alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        }
    }
}
</script>

<style scoped>

</style>