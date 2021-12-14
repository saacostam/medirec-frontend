<template>
    <div class="flex-fill myMedRecord container p-4 d-flex flex-column">
        <div class="flex-fill d-flex flex-column">
            <div class="flex-fill container">
                <div class="row h-100">
                    <div class="col-lg-7 col-md-4 img-med-record">
                        <img src="../../../public/static/img/clinicalHistoryIcon.jpg" alt="" class="img-med-record img-fluid">
                    </div>
                    <div class="col-lg-5 col-md-8 flex-fill d-flex flex-column p-3" v-if="this.hasData">
                        <div class="flex-fill d-flex flex-row p-3 align-items-center">
                            <img src="../../../public/static/img/viewMedicalHistoryIcon.png" width="125px" height="125px" @click="toView" class="img-button">
                            <div class="body flex-fill d-flex justify-content-center align-content-center ml-4 p-2 border bg-color-main-light text-white text-center div-button" @click="toView">
                                <h4>Consultar Historia Clínica</h4>
                            </div>
                        </div>
                        <div class="flex-fill d-flex flex-row p-3 align-items-center">
                            <img src="../../../public/static/img/updateMedicalHistoryIcon.png" width="125px" height="125px" @click="toUpdate" class="img-button">
                            <div class="body flex-fill d-flex justify-content-center align-content-center ml-4 p-2 border bg-color-main-light text-white text-center div-button" @click="toUpdate">
                                <h4>Actualizar Historia Clínica</h4>
                            </div>
                        </div>
                        <div class="flex-fill d-flex flex-row p-3 align-items-center">
                            <img src="../../../public/static/img/uploadMedicalHistoryIcon.png" width="125px" height="125px" @click="toUpload" class="img-button">
                            <div class="body flex-fill d-flex justify-content-center align-content-center ml-4 p-2 border bg-color-main-light text-white text-center div-button" @click="toUpload">
                                <h4>Subir archivos de su Historia Clínica</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5 col-md-8 flex-fill d-flex flex-column p-3" v-else>
                        <div class="flex-fill d-flex flex-column p-3 align-items-center justify-content-center">
                            <img src="../../../public/static/img/createMedicalHistoryIcon.png" width="125px" height="125px" @click="toCreate" class="img-button mb-4">
                            <div class="body justify-content-center align-content-center p-2 pl-5 pr-5 mt-2 border bg-color-main-light text-white text-center div-button" @click="toCreate">
                                <h4>Agregar Historia <br> Clínica</h4>
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
    let dataObject = this.$store.state.medRecord;

    if (dataObject.allergies.length===0 && dataObject.allergies.length===0 && dataObject.personalRecords.length===0 && dataObject.familyBackgrounds.length===0){
        dataObject.hasData = false;
    }else{ dataObject.hasData = true}
    return dataObject;
  },
  beforeCreate(){
  },
  methods:{
    toProfile(){
        this.$router.push( {name: 'profile'} );
    },
    toCreate(){
        this.$router.push( {name: 'createMedRecord'} );
    },
    toUpload(){
        this.$router.push({name: 'uploadMedRecordFile'})
    },
    toView(){
        this.$router.push({name:'viewMedRecord'})
    },
    toUpdate(){
        this.$router.push({name:'updateMedRecord'})
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

    .div-button{
        border-radius: 20px;
    }

    .div-button:hover{
        cursor: pointer;
    }

    .div-button>h4{
        font-size: 22px;
    }

    .img-button:hover{
        cursor: pointer;
    }
</style>