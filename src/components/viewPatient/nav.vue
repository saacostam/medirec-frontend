<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row p-2 mt-3">
                    <div class="col-lg-6 d-lg-block d-none pt-5">
                        <img src="/static/img/consultPatientIcon.png" alt="" class="d-block mx-auto mt-3" width="400px" height="320px">
                        <div class="bg-color-purple text-white d-flex mx-auto align-items-center justify-content-center" style="width:400px; height:80px;">
                            <span style="font-size: 1.3em; font-weight: 600">Paciente: {{name}}</span>
                        </div>
                    </div>
                    <div class="col-lg-6 offset-lg-0 col-md-8 offset-md-2 pt-5">
                        <div class="row">
                            <div class="col-sm-6 p-2 d-flex flex-column justify-content-end nav-group" @click="toProfile">
                                <img src="/static/img/doctorProfileInformationIcon.png" alt="" class="mx-auto" width="140px" height="140px" style="border:2px solid #418ef2; border-radius:50%">
                                <div class="nav-option bg-color-main-light text-white h5">Perfil</div>
                            </div>
                            <div class="col-sm-6 p-2 d-flex flex-column justify-content-end nav-group" @click="toChat">
                                <img src="/static/img/chatIcon.png" alt="" class="mx-auto" width="140px" height="140px" style="border:2px solid #418ef2; border-radius:50%">
                                <div class="nav-option bg-color-main-light text-white h5">Chat</div>
                            </div>
                            <div class="col-sm-6 p-2 d-flex flex-column justify-content-end nav-group" @click="toMedRecord">
                                <img src="/static/img/medHeart.png" alt="" class="mx-auto" width="140px" height="140px" style="border:2px solid #418ef2; border-radius:50%">
                                <div class="nav-option bg-color-main-light text-white h5">Historia<br>Clínica</div>
                            </div>
                            <div class="col-sm-6 p-2 d-flex flex-column justify-content-end nav-group" @click="toSymp">
                                <img src="/static/img/sympOption.png" alt="" class="mx-auto" width="140px" height="140px" style="border:2px solid #418ef2; border-radius:50%">
                                <div class="nav-option bg-color-main-light text-white h5">Sintomas y<br>Medicamentos</div>
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
        return {
            name:'Patient', 
            done: false, 
            valid:true
        }
    },
    beforeCreate(){
        const session = getAuthenticationToken();
        const requestPath = `/patient/${this.$route.params.id}`;
        console.log(this.$route.params.id)
        axios.get( this.$store.state.backURL + requestPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de paciente' );
          }else{
            const data = response.data.data;
            this.name = data.userFirstName+' '+data.userLastName
            this.done = true
            console.log(data);
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
            this.valid = false
        } );

    },
    methods:{
        back(){
            this.$router.push( {name: 'home'} );
        },
        toProfile(){
            this.$router.push( {name: "profileViewPatient"} )
        },
        toChat(){
            this.$router.push( {name: "doctorChat"} )
        },
        toMedRecord(){
            this.$router.push( {name: "navViewMedRecordPatient"} )
        },
        toSymp(){
            this.$router.push( {name: "navViewSymptomsPatient"} )
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
        font-size: 1.2em;
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

    .nav-option{
        margin: 25px auto 10px;
        padding: 4px 12px;
        border: solid 1px gray;
        border-radius: 10px;
        text-align: center;
        width: 145px;
    }

    .nav-group:hover{
        cursor: pointer;
    }
</style>