<template>
    <div class="view-medRecord container-fluid">
        <button class="btn btn-back p-0 m-4" @click="back">
            <img src="/static/svg/arrow-left-circle.svg">
        </button>
        <div class="row">
            <div class="col-lg-8 offset-lg-2 p-4">
                <div class="d-flex flex-column">
                    <div class="d-block title text-white">Historia Clínica</div>
                    <div class="flex-fill border-color-purple">
                        <div class="d-flex flex-row p-3">
                            <div class="flex-fill d-flex flex-column align-items-center">
                                <img src="/static/img/alergiasIcon.png" width="125px" height="125px" @click="toAllergies" class="img-button mb-4">
                                <div class="body justify-content-center align-content-center border bg-color-main-light text-white text-center div-button" @click="toAllergies">
                                    <h4>Alergias</h4>
                                </div>
                            </div>
                            <div class="flex-fill d-flex flex-column align-items-center">
                                <img src="/static/img/enfermedadesIcon.png" width="125px" height="125px" @click="toIllnesses" class="img-button mb-4">
                                <div class="body justify-content-center align-content-center border bg-color-main-light text-white text-center div-button" @click="toIllnesses">
                                    <h4>Enfermedades</h4>
                                </div>
                            </div>
                            <div class="flex-fill d-flex flex-column align-items-center">
                                <img src="/static/img/antecedentesPersonalesIcon.png" width="125px" height="125px" @click="toPersonalRecords" class="img-button mb-4">
                                <div class="body justify-content-center align-content-center border bg-color-main-light text-white text-center div-button" @click="toPersonalRecords">
                                    <h4>Antecedentes</h4>
                                </div>
                            </div>
                        </div>
                        <div class="offset-2 col-8 d-flex flex-row justify-content-around mb-3">
                            <div class="d-flex flex-column align-items-center">
                                <img src="/static/img/antecedentesFamiliaresIcon.png" width="125px" height="125px" @click="toFamilyBackgrounds" class="img-button mb-4">
                                <div class="body justify-content-center align-content-center border bg-color-main-light text-white text-center div-button" @click="toFamilyBackgrounds">
                                    <h4>Antecedentes<br>Familiares</h4>
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-center">
                                <img src="/static/img/archivosIcon.png" width="125px" height="125px" @click="toFiles" class="img-button mb-4">
                                <div class="body justify-content-center align-content-center border bg-color-main-light text-white text-center div-button" @click="toFiles">
                                    <h4>Archivos<br></h4>
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

export default {
    data(){
        return {}
    },
    methods: {
        toAllergies(){
            this.$router.push( {name: 'allergyViewMedRecordPatient'} );
        },
        toIllnesses(){
            this.$router.push( {name: 'illnessViewMedRecordPatient'} );
        },
        toPersonalRecords(){
            this.$router.push( {name: 'personalViewMedRecordPatient'} );
        },
        toFamilyBackgrounds(){
            this.$router.push( {name: 'familyViewMedRecordPatient'} );
        },
        toFiles(){
            this.$router.push( {name: 'filesViewMedRecordPatient'} );
        },
        back(){
            this.$router.push( {name: 'navViewPatient'} );
        },
    }
}
</script>

<style scoped>
    .title{
        background-color:#1F4567;
        padding: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        font-weight: 700;
        width: fit-content;
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

    .div-button{
        border-radius: 20px;
        padding: 1px 20px;
    }

    .div-button:hover{
        cursor: pointer;
    }

    .div-button>h4{
        font-size: 22px;
        margin: 0;
    }

    .img-button{
        border-radius: 50%;
        border: solid 3px #418ef2;
    }

    .img-button:hover{
        cursor: pointer;
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
      
      z-index: 200;
    }

    .btn-back:focus {
      box-shadow:unset;
    }
</style>