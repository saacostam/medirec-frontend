<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="d-block title text-white text-center w-100">Mis Síntomas y Medicamentos</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="../../../public/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row  p-2">
                    <div class="col-lg-5 p-5">
                        <img src="../../../public/static/img/syntomsIcon.png" class="img-fluid">
                        <div>
                            <h4 class="name bg-color-main-light text-white">Sintomas</h4>
                        </div>
                    </div>
                    <div class="col-lg-7 p-5">
                        <div class="d-block title text-white text-center">Sintomas</div>
                        <table class="table" v-if="this.symptoms.length>0">
                            <!-- if  -->
                            <thead>
                                <tr class="bg-color-secondary-dark text-white">
                                    <th scope="col" class="text-center">Descripción</th>
                                    <th class="text-center">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="symptom in this.symptoms" :key="symptom.id">
                                    <th class="text-center">{{symptom.description}}</th>
                                    <th class="text-center">{{symptom.date.split('T')[0]}}</th>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else>
                            <!-- else -->
                            <div class="card message">
                                <div class="card-body offset-lg-2 col-lg-8">
                                    <h5 class="card-title text-center">Tiene <b class="text-color-main-dark">0</b> alergias registradas.</h5>
                                    <p class="card-text mb-2 text-center">Presione <router-link style="white-space: nowrap;" class="text-color-main-dark" :to="{name: 'updateMedRecord'}" >aqui</router-link> si quiere añadir una nueva alergia.</p>
                                </div>
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
const path = '/patient/documents/'

export default {
    data(){
        return {symptoms:{}}
    },
    beforeCreate(){
        const session = getAuthenticationToken();

        const requestPath = "/patient/medicalHistory/";

        axios.get( this.$store.state.backURL + requestPath + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los Sintomas' );
          }else{
            const data = response.data.data;

            let symptoms = []

            for (let i = 0; i < data.symptoms.length; i++){
                if (data.symptoms[i].description){
                    symptoms.push(data.symptoms[i])
                }
            }

            console.log(symptoms)
            this.symptoms = symptoms;
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );
    },
    methods:{
        back(){
            this.$router.push( {name: 'navViewSymptoms'} );
        }
    }

}
</script>

<style scoped>
    .name{
        width: fit-content;
        margin: 5px auto;
        padding: 5px 20px;
        border-radius: 20px;
    }

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

    .download{
        border-left: 1px solid #dee2e6;
    }

    .download:hover{
        cursor: pointer;
    }

    .download:active{
        box-shadow:1px 1px 1px rgb(36, 36, 36);
    }

    a{
        color:#418ef2 !important;
    }
</style>