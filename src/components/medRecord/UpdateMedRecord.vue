<template>
    <div class="view-medRecord d-flex flex-column" v-if="!this.loading">
        <div class="d-block title text-white text-center w-100">Mi Historia Clínica</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="../../../public/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row  p-2 mt-3">
                    <div class="col-lg-8 p-5">
                        <div class="alergia mb-4">
                            <h4 class="text-center text-color-main-dark" style="font-weight: 600">Alergia</h4>
                            <form class="d-flex flex-row" @submit="sendAllergy"> 
                                <div class="flex-fill border-div p-3">
                                    <div class="form-group">
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/health.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="allergy" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Alergia" required>
                                        </div>
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/123.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="allergyType" type="number" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Tipo de Alergia" required min="1" max="4">
                                        </div>
                                    </div>
                                </div>
                                <div class="button d-flex align-items-center p-3">
                                    <input type="submit" value="Agregar" class="btn text-white bg-color-main-light add-button">
                                </div>
                            </form>
                        </div>
                        
                        <div class="enfermedad mb-4">
                            <h4 class="text-center text-color-main-dark" style="font-weight: 600">Enfermedad</h4>
                            <form class="d-flex flex-row" @submit="sendIllness"> 
                                <div class="flex-fill border-div p-3">
                                    <div class="form-group">
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/health.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="illness" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Enfermedad" required>
                                        </div>
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/calendar-check.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="illnessDetectionDate" type="date" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Fecha de Descubrimiento" required v-bind:max="new Date().toISOString().split('T')[0]">
                                        </div>
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <textarea v-model="illnessDescription" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="button d-flex align-items-center p-3">
                                    <input type="submit" value="Agregar" class="btn text-white bg-color-main-light add-button">
                                </div>
                            </form>
                        </div>

                        <div class="personalRecords mb-4">
                            <h4 class="text-center text-color-main-dark" style="font-weight: 600">Antecedentes Personales</h4>
                            <form class="d-flex flex-row" @submit="sendRecord"> 
                                <div class="flex-fill border-div p-3">
                                    <div class="form-group">
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/calendar-check.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="personalRecordDate" type="date" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Fecha de Descubrimiento" required v-bind:max="new Date().toISOString().split('T')[0]">
                                        </div>
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <textarea v-model="personalRecordDescription" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="button d-flex align-items-center p-3">
                                    <input type="submit" value="Agregar" class="btn text-white bg-color-main-light add-button">
                                </div>
                            </form>
                        </div>

                        <div class="familyRecords mb-4">
                            <h4 class="text-center text-color-main-dark" style="font-weight: 600">Antecedentes Familiares</h4>
                            <form class="d-flex flex-row" @submit="sendFamilyRecord"> 
                                <div class="flex-fill border-div p-3">
                                    <div class="form-group">
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <input v-model="familyMember" type="text" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Familiar" required>
                                        </div>
                                        <div class="input-group m-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-secondary-dark">
                                                    <img src="../../../public/static/svg/body-text.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <textarea v-model="familyBackgroundDescription" type="long" class="form-control border-0 bg-color-secondary-light mr-3" placeholder="Descripción" required></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="button d-flex align-items-center p-3">
                                    <input type="submit" value="Agregar" class="btn text-white bg-color-main-light add-button">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="col-lg-4 p-5">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="loading d-flex flex-column align-items-center m-5" v-else>
        <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only" color="#1F4567">Loading...</span>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
    data(){
        return{
            allergy:'',
            allergyType: '',
            illness: '',
            illnessDetectionDate: '',
            illnessDescription: '',
            personalRecordDate: '',
            personalRecordDescription : '',
            familyMember: '',
            familyBackgroundDescription: '',

            loading: false
        }
    },
    methods:{
        back(){
            this.$router.push( {name:'myMedRecord'} );
        },
        sendAllergy(event){
            event.preventDefault();
            
            this.sendData( [{allergen: this.allergy, type: this.allergyType}], [], [], [] );
        },
        sendIllness(event){
            event.preventDefault();

            this.sendData( [], [{illnessName: this.illness, detectionDate: this.illnessDetectionDate, illnessDescription: this.illnessDescription}], [], [] );
        },
        sendRecord(event){
            event.preventDefault();
            
            this.sendData( [], [], [{description: this.personalRecordDescription, date: this.personalRecordDate}], [] );
        },
        sendFamilyRecord(event){
            event.preventDefault();
            
            this.sendData( [], [], [], [{familyMember: this.familyMember, description: this.familyBackgroundDescription}] );
        },
        sendData(allergies, illnesses, personalRecords, familyBackgrounds){
            const session = getAuthenticationToken();
            const path = "/patient/medicalHistory/";

            // DATE FORMAT
            for(let i=0; i<illnesses.length; i++){
                illnesses[i].detectionDate = illnesses[i].detectionDate.split('-').reverse().join('/');
            }
            for(let i=0; i<personalRecords.length; i++){
                personalRecords[i].date = personalRecords[i].date.split('-').reverse().join('/');
            }

            axios.post( this.$store.state.backURL + path +session.userId,
            {
                allergies,
                illnesses,
                personalRecords,
                familyBackgrounds
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { sessionToken: session.token }
            }
            ).then( response => {
                if( response.status !== 200 ){
                    alert( "Error en la actualización de datos" );
                }else{
                    this.loading = true;
                    this.updateMedRecord();
                }
            } ).catch( error => {
                this.$store.state.testToken();
                if( error.response.status === 400 ){
                    alert( "Error 400" );
                }else{
                    alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        },
        
        
        updateMedRecord(){
            let dataObject = {
                authority: '',
                userId: '',
                allergies: [],
                illnesses: [],
                personalRecords: [],
                familyBackgrounds: []
            };

            const requestPath = "/patient/medicalHistory/";
            const session = getAuthenticationToken();

            axios.get( this.$store.state.backURL + requestPath + session.userId, { params: { sessionToken: session.token } } )
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
            }
            } ).catch( error => {
                this.$store.state.testToken();
                alert( 'Error en la petición' );
                console.log( error );
            } );

            this.$store.state.medRecord = dataObject;
            this.loading = false;
            location.reload();
        }
    }
}
</script>

<style scoped>
    .title{
        background-color:#1F4567;
        padding: 10px;
        font-weight: 700;
        margin: 0 auto;
    }

    .bg-color-purple{
        background-color: rgb(86, 81, 226);
    }

    .border-color-purple{
        border: solid 3px;
        border-color: rgb(86, 81, 226);
        border-radius: 20px;
    }

    .img-button{
        border-radius: 50%;
        border: solid 3px #418ef2;
    }

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
    }

    .bg-color-main-light{
        background-color: #418ef2;
    }

    .bg-color-main-dark{
        background-color: #1F4567;
    }

    .text-color-main-dark{
        color: #1F4567;
    }

    .bg-color-secondary-light{
        background-color: #F6A78B;
    }

    .bg-color-secondary-dark{
        background-color: #FB7837;
    }

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
    }

    .btn-back{
      width: 44px;
      height: 44px;

      border-radius: 22px;
      position: absolute;   
      z-index: 2;  
    }

    .btn-back:focus {
      box-shadow:unset;
    }

    .border-div{
        border: solid 2px #418ef2;
        border-radius: 25px;
    }

    .add-button{
        padding: 15px 10px;
    }
</style>