<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="d-block title text-white text-center w-100">{{name}}</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container">
                <div class="row p-2 mt-3">
                    <div class="offset-lg-1 col-lg-3 offset-md-2 col-md-4 p-2 d-flex flex-column justify-content-end nav-group" @click="toProfile">
                        <img src="/static/img/doctorProfileInformationIcon.png" alt="" class="mx-auto" width="120px" height="120px" style="border:solid 2px #418ef2; border-radius: 50%;">
                        <div class="nav-option bg-color-main-light text-white h5">Perfil</div>
                    </div>
                    <div class="col-lg-4 col-md-4 d-none d-lg-block d-lg-block p-2 d-lg-flex">
                        <img src="/static/img/navBanner.png" alt="" class="mx-auto d-none d-lg-block" style="max-width:250px; max-height: 250px">
                    </div>
                    <div class="offset-lg-0 col-lg-3 col-md-4 p-2 d-flex flex-column justify-content-end nav-group" @click="toChat">
                        <img src="/static/img/chatIcon.png" alt="" class="mx-auto" width="120px" height="120px" style="border:solid 2px #418ef2; border-radius: 50%;" >
                        <div class="nav-option bg-color-main-light text-white h5">Chat</div>
                    </div>
                    <div class="offset-lg-4 col-lg-4 offset-md-4 col-md-4 p-2 d-flex flex-column justify-content-end mt-2 nav-group" @click="toRate">
                        <img src="/static/img/qualifiedIcon.png" alt="" class="mx-auto" width="120px" height="120px" >
                        <div class="nav-option bg-color-main-light text-white h5">Calificar</div>
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
            name:'Doctor', 
            done: false, 
            valid:true
        }
    },
    beforeCreate(){
        const session = getAuthenticationToken();
        const requestPath = `/doctor/${this.$route.params.id}`;
        console.log(this.$route.params.id)
        axios.get( this.$store.state.backURL + requestPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los Sintomas' );
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
            this.$router.push( {name: "profileViewDoctor"} )
        },
        toRate(){
            this.$router.push( {name: "rateDoctor"} )
        },
        toChat(){
            this.$router.push( {name: "patientChat"} )
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
        padding: 4px 42px;
        border: solid 1px gray;
        border-radius: 10px;
    }

    .nav-group:hover{
        cursor: pointer;
    }
</style>