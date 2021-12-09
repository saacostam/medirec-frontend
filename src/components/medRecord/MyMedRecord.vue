<template>
    <div class="flex-fill myMedRecord container p-4 d-flex flex-column">
        <div class="main-title title text-white">Mi Historia Clínica</div>
        <div class="flex-fill border d-flex">
            <div class="flex-fill d-flex flex-column">
                <div class="flex-fill container">
                    <div class="row">
                        <div class="col-lg-4 d-flex flex-column p-3">
                            <div class="flex-fill d-flex align-items-center justify-content-center div-select flex-column m-3 media" id="view-button" v-if="this.hasData" @click="toView">
                                <h3 class="">Visualizar</h3>
                                <p>Historia Clínica</p>
                                <!-- <img src="../../../public/static/svg/eye.svg"> -->
                            </div>
                            <div class="flex-fill d-flex align-items-center justify-content-center div-select flex-column m-3 media" id="create-button" v-else @click="toCreate">
                                <h3 class="">Crear</h3>
                                <p>Historia Clínica</p>
                                <!-- <img src="../../../public/static/svg/plus-square.svg"> -->
                            </div>
                            <div class="flex-fill d-flex align-items-center justify-content-center div-select flex-column m-3 media" id="update-button" v-bind:class="this.hasDataClass">
                                <h3 class="">Actualizar</h3>
                                <p>Historia Clínica</p>
                                <!-- <img src="../../../public/static/svg/pencil-square.svg"> -->
                            </div>
                            <div class="flex-fill d-flex align-items-center justify-content-center div-select flex-column m-3 media" id="upload-button" v-bind:class="this.hasDataClass" @click="toUpload">
                                <h3 class="">Subir</h3>
                                <p>Documentos</p>
                                <!-- <img src="../../../public/static/svg/file-earmark-arrow-up.svg"> -->
                            </div>
                        </div>
                        <div class="col-lg-4 p-3" v-if="this.hasData">
                            <div class="">
                                <div class="title text-center text-white mt-3">ALERGIAS</div>
                                <table class="table table-sm border mb-4">
                                    <thead class="bg-color-secondary-dark text-white">
                                        <tr>
                                            <th scope="col">Alergia</th>
                                            <th scope="col">Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="allergy in this.allergies.slice(0,2)">
                                        <tr>
                                            <th scope="row">{{allergy.allergen}}</th>
                                            <td>{{allergy.type}}</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th scope="row">...</th>
                                            <td>...</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="title text-center text-white mt-3">ENFERMEDADES</div>
                                <table class="table table-sm border">
                                    <thead class="bg-color-secondary-dark text-white">
                                        <tr>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="illness in this.illnesses.slice(0,2)">
                                        <tr>
                                            <th scope="row">{{illness.illnessName}}</th>
                                            <td>{{illness.detectionDate}}</td>
                                            <td>{{illness.illnessDescription.slice(0,10)}}...</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th scope="row">...</th>
                                            <td>...</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-4 p-3" v-if="this.hasData">
                            <div class="">
                                <div class="title text-center text-white mt-3">ANTECEDENTES PERSONALES</div>
                                <table class="table table-sm border mb-4">
                                    <thead class="bg-color-secondary-dark text-white">
                                        <tr>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="personalRecord in this.personalRecords.slice(0,2)">
                                        <tr>
                                            <th scope="row">{{personalRecord.date}}</th>
                                            <td>{{personalRecord.description.slice(0,20)}}...</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th scope="row">...</th>
                                            <td>...</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="title text-center text-white mt-3">ANTECEDENTES FAMILIARES</div>
                                <table class="table table-sm border">
                                    <thead class="bg-color-secondary-dark text-white">
                                        <tr>
                                            <th scope="col">Familiar</th>
                                            <th scope="col">Descripción</th>
                                        </tr>
                                    </thead>
                                    <tbody v-for="familyBackground in this.familyBackgrounds.slice(0,2)">
                                        <tr>
                                            <th scope="row">{{familyBackground.familyMember}}</th>
                                            <td>{{familyBackground.description.slice(0,20)}}...</td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <th scope="row">...</th>
                                            <td>...</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col-lg-8 p-3 text-center" v-else>
                            <h3 class="text-color-main-dark mt-3">¡No se ha encontrado ninguna <b class="text-color-main-light">Historia Clínica</b>!</h3>
                            <div class="ml-5 mr-5 p-3">
                                <p class="ml-5 mr-5 p-3" id="empty-message">Presione <b id="create-sym">Crear</b> para construir la Historia Clinica.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      authority: '',
      userId: '',
      hasData: false,
      hasDataClass:'',
      allergies: [],
      illnesses: [],
      personalRecords: [],
      familyBackgrounds: []
    };
    const session = getAuthenticationToken( )

    dataObject.authority = session.authorities[0].authority;
    dataObject.userId = session.userId;

    if (dataObject.authority === "DOCTOR"){
        this.$router.push( {name: 'home'} );
        return dataObject;
    }

    const requestPath = "/patient/medicalHistory/"

    axios.get( this.$store.state.backURL + requestPath + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo la Historia Medica' );
          }else{
            const data = response.data.data;
            
            // Check if data is empty
            if (data.allergies.length===0 && data.illnesses.length===0 && data.personalRecords.length===0 && data.familyBackgrounds.length===0){
                this.hasData=false;
                this.hasDataClass="no-data-div";
                return
            }

            this.hasData = true;

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
          }
        } ).catch( error => {
          alert( 'Error en la petición' );
          console.log( error );
        } );

    return dataObject
  },
  beforeCreate(){
  },
  methods:{
    next(event){
        this.step += 1;
        event.preventDefault();
    },
    back(){
        this.step -= 1;
    },
    myAlert(text){
        document.getElementById('my-message').innerText = text;
    },
    addAllergy(){this.allergies.push( {allergen:'', type:''} );},
    removeAllergy(){this.allergies.pop()},
    addIlness(){this.illnesses.push( {illnessName:'', detectionDate:'', illnessDescription:''} );},
    removeIlness(){this.illnesses.pop()},
    addPersonalRecord(){this.personalRecords.push( {date:'', description:''} );},
    removePersonalRecord(){this.personalRecords.pop()},
    addFamilyBackground(){this.familyBackgrounds.push( {familyMember:'', description:''} );},
    removeFamilyBackground(){this.familyBackgrounds.pop()},
    toProfile(){
        this.$router.push( {name: 'profile'} );
    },
    toCreate(){
        this.$router.push( {name: 'createMedRecord'} );
    },
    toUpload(){
        if (this.hasData){
            this.$router.push({name: 'uploadMedRecordFile'})
        }
    },
    toView(){
        this.$router.push({name:'viewMedRecord'})
    }
  }
}
</script>

<style scoped>
    .text-color-main-dark{
        color: #1F4567;
    }

    .text-color-main-light{
        color: #418ef2;
    }

    .border-color-main-light{
        border-color: #418ef2;
    }

    .border-color-main-dark{
        border-color: #1F4567;
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

    .bg-color-secondary-light{
        background-color: #F6A78B;
    }

    .bg-color-secondary-dark{
        background-color: #FB7837;
    }

    .bg-color-main-lighter{
        background-color: rgb(218, 225, 230);
    }

    
    .div-select{
        background-image: url();
        border-radius: 25px;
        background-color: #418ef2;
    }

    .div-select:hover{
        background-color: #1F4567;
    }

    .div-select:active{
        filter:drop-shadow(1px 1px 0.6px black);
    }

    .div-select p, .div-select h3{
        color: white;
    }
    
    .div-select img{
        height: 48px;
        width: 48px;
        margin-bottom: 5px;
    }

    .title{
        background-color:#1F4567;
        padding: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-weight: 700;
    }

    .main-title{
        width: fit-content;
        margin: 0 auto;
    }

    div .no-data-div, div .no-data-div:hover, div .no-data-div:active{
        opacity: 50%;
        filter:drop-shadow(0px 0px 0px black);
        background-color: #418ef2;
    }

    #create-sym{
        background-color: #418ef2;
        color: white;
        padding: 2px;
        padding-left: 5px;
        padding-right: 5px;
        border-radius: 5px;
    }

    #empty-message{
        border: 2px dotted #dee2e6!important;
        border-radius: 25px;
    }
</style>