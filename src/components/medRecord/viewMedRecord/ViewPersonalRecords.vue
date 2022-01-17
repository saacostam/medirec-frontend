<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="d-block title text-white text-center w-100">Mi Historia Clínica</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="../../../../public/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row  p-2">
                    <div class="col-lg-5 p-5">
                        <img src="../../../../public/static/img/antecedentesPersonalesIcon.png" class="img-fluid img-button">
                        <div>
                            <h4 class="name bg-color-main-light text-white">Antecedentes</h4>
                        </div>
                    </div>
                    <div class="col-lg-7 p-5">
                        <div class="d-block title text-white text-center">Antecedentes</div>
                        <table class="table" v-if="this.personalRecords.length>0">
                            <thead>
                                <tr class="bg-color-secondary-dark text-white">
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="personalRecord in this.personalRecords" :key="personalRecord.date">
                                    <th scope="row">{{personalRecord.date}}</th>
                                    <td>{{personalRecord.prDescription}}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else>
                            <div class="card message">
                                <div class="card-body offset-lg-2 col-lg-8">
                                    <h5 class="card-title text-center">Tiene <b class="text-color-main-dark">0</b> antecedentes registrados.</h5>
                                    <p class="card-text mb-2 text-center">Presione <router-link style="white-space: nowrap;" class="text-color-main-dark" :to="{name: 'updateMedRecord'}" >aqui</router-link> si quiere añadir un nuevo antecedente.</p>
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
    data( ){
        let dataObject = this.$store.state.medRecord;
        return dataObject;
    },
    methods:{
        back(){
            this.$router.push( {name: 'viewMedRecord'} );
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
</style>