<template>
    <div class="flex-fill patient-3 d-flex flex-column">
        <h1 class="text-center text-color-main-light m-4 font-weight-bold">MediRec</h1>
        <div class="d-flex">
            <hr>
            <div class="col-4 text-center">
                <div class="circle circle-active">1</div>
                <p>Información Personal</p>
            </div>
            <div class="col-4 text-center">
                <div class="circle circle-active">2</div>
                <p>Contraseña</p></div>
            <div class="col-4 text-center">
                <div class="circle circle-active">3</div>
                <p>Bienvenida</p>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
            <img src="../../../public/static/img/comprobado-patient.png" class="col-4 img-fluid">
            <div class="message row">
                <p class="offset-2 col-8 text-center">Ha completado su perfil de forma satisfactoria. Bienvenido a <b class="text-color-main-light">MediRec</b></p>
            </div>
        </div>
        <div class="d-flex justify-content-center m-4">
            <button @click="back" type="button" class="btn bg-color-main-light text-white mb-3">Volver</button>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {setPaciente, getPaciente, deletePaciente} from '@/dataStorage';

  const path = '/register/patient';

  export default {
    name: "SignUpPatient",
    data(){
      if ( getPaciente()){
        let userObject = getPaciente();
        if (userObject.source !== 2){
          this.$router.push( {name: 'signuppatient1'} );
        }
        deletePaciente();
      }else{
        this.$router.push( {name: 'signuppatient1'} );
      }
      return{}
    },
    beforeCreate(){},
    methods:{
      back(){
          this.$router.push( {name: 'login'} );
      }
    }
  }
</script>

<style scoped>
    .circle{
        border: solid 2px #FB7837;
        background-color: white;
        width: 50px;
        height: 50px;
        margin: 0 auto;
        text-align: center;
        border-radius: 25px;
        font-size: 30px;
        font-weight: bold;
    }

    .circle-active{
        background-color: #FB7837;
        color: white;
    }

    .text-color-main-light{
	    color: #418ef2;
    }

    hr {
        position: absolute;
        width: 65%;
        margin-left: 13%;
        margin-right: 13%;
        color: #FB7837;
        border: solid 5px #FB7837;
    }

    .form-control::placeholder{
        color: black;
        opacity: 50%;
    }

    .form-group{
        border-radius: 20px;
    }

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

</style>