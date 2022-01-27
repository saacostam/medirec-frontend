<template>
    <div class="medRecordValidation">
        <router-view v-if="this.done"></router-view>
        <div class="loading d-flex flex-column align-items-center m-5" v-else>
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only" color="#1F4567">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        const session = getAuthenticationToken();
        if (session.authorities[0].authority === "PATIENT"){
            this.$router.push( {name: 'home'} );
        }

        let dataObject = {
            authority: '',
            userId: '',
            allergies: [],
            illnesses: [],
            personalRecords: [],
            familyBackgrounds: []
        };

        const requestPath = "/patient/medicalHistory/";

        axios.get( this.$store.state.backURL + requestPath + this.$route.params.id, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo la Historia Medica' );
          }else{
            const data = response.data.data;

            // Get Registered Entries
            if (data.allergies !== []){dataObject.allergies = data.allergies;}
            if (data.illnesses !== []){dataObject.illnesses = data.illnesses;}
            if (data.personalRecords !== []){dataObject.personalRecords = data.personalRecords;}
            if (data.familyBackgrounds !== []){dataObject.familyBackgrounds = data.familyBackgrounds;}

            // Format Time
            for(let i=0; i<dataObject.illnesses.length; i++){
                dataObject.illnesses[i].detectionDate = dataObject.illnesses[i].detectionDate.split('T')[0];
            }

            // Format Time and Manage BackEnd Name Changes
            for(let i=0; i<dataObject.personalRecords.length; i++){
                dataObject.personalRecords[i].date = dataObject.personalRecords[i].date.split('T')[0];
                dataObject.personalRecords[i].description = dataObject.personalRecords[i].prDescription;
            }

            this.$store.state.medRecord = dataObject;
            this.done = true;
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );

        return {
            medRecord: this.$store.state.medRecord,
            done: false,
            name: "Paciente"
        }
    }
}
</script>

<style scoped>

</style>