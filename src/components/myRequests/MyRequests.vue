<template>
    <div class="my-requests">
        {{this.doctors}}

        <div class="doctor p-3 border" v-for="doctor in this.doctors" :key="doctor.id">
            <h4>{{doctor.firstName+' '+doctor.lastName}}</h4>
            <h6 class="text-primary">{{doctor.specialization}}</h6>
            <button class="btn btn-success mr-1" @click="accept(doctor.id)">Accept</button>
            <button class="btn btn-danger m-1" @click="decline(doctor.id)">Decline</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        let responseObject = {doctors:null}

        const session =getAuthenticationToken();
        
        if (session.authorities[0].authority !== 'PATIENT'){
            this.$router.push( {name: 'home'} );
        }

        const path = '/patient/prof='+session.userId+'/management-requests';
        
        axios.post( this.$store.state.backURL + path)
        .then( response => {
        if( response.status !== 202 ){
            alert( 'Error Realizando la Petición' );
        }else{
            const data = response.data.data;
            responseObject.doctors = data;
            console.log(data);
        }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );

        return responseObject
    },
    methods: {
        accept(docId){
            const session =getAuthenticationToken();
            const path = '/patient/acceptRequest';
            
            axios.post( this.$store.state.backURL + path, {doctorId: docId, patientId: session.userId})
            .then( response => {
            if( response.status !== 202 ){
                alert( 'Error Realizando la Petición' );
            }else{
                location.reload();
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        },
        decline(docId){
            const session =getAuthenticationToken();
            const path = '/patient/rejectRequest';
            
            axios.post( this.$store.state.backURL + path, {doctorId: docId, patientId: session.userId})
            .then( response => {
            if( response.status !== 202 ){
                alert( 'Error Realizando la Petición' );
            }else{
                location.reload();
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );
        }
    }
}
</script>

<style scoped>

</style>