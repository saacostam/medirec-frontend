<template>
    <div class="flex-fill patient-2 d-flex flex-column">
        <h1 class="text-center text-color-main-light m-4">Medirec</h1>
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
                <div class="circle">3</div>
                <p>Bienvenida</p>
            </div>
        </div>
        <form  @submit="signUp" class="data form-group flex-fill d-flex flex-column">
            <div class="flex-fill d-flex align-items-center">
                <div class="offset-2 col-8">
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-color-secondary-dark border-0">
                            <img src="../../../public/static/svg/shield-lock.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input v-model="password" type="password" class="form-control bg-color-secondary-light border-0" placeholder="Contraseña" required>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <div class="input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text bg-color-secondary-dark border-0 text-light">
                            <img src="../../../public/static/svg/check-circle.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                            </div>
                        </div>
                        <input class="form-control bg-color-secondary-light border-0" type="password"
                            placeholder="Confirmar Contraseña" v-model="cPassword" required
                            :class="{ 'is-invalid': cPassword !== '' && cPassword !== password,
                                        'is-valid': cPassword !== '' && cPassword === password }"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center m-4">
                <button type="submit" class="btn bg-color-main-light text-white">Siguiente</button>
            </div>
        </form>
    </div>
</template>

<script>
  import axios from 'axios'
  import {setPaciente, getPaciente, deletePaciente} from '@/dataStorage';

  const path = '/register/patient';

  export default {
    name: "SignUpPatient",
    data(){
        let userObject;
        if ( getPaciente()){
            userObject = getPaciente();
            deletePaciente();
        }else{
            this.$router.push( {name: 'signuppatient1'} );
        }

        const retorno = {
            firstName: userObject.firstName,
            lastName: userObject.lastName,
            docType: userObject.docType,
            doc: userObject.doc,
            email: userObject.email,
            eps:userObject.eps,
            password: '',
            cPassword: ''
        }

        return retorno;
    },
    beforeCreate(){},
    methods:{
      signUp( event ){
        if( this.password !== this.cPassword ){
          event.preventDefault( );
          return;
        }
        axios
          .post( this.$store.state.backURL + path,
            {
              firstName: this.firstName.trim( ),
              lastName: this.lastName.trim( ),
              docType: this.docType.trim( ),
              doc: this.doc.trim(),
              email: this.email.trim(),
              password: this.password.trim(),
              eps: this.eps.trim()
            }
          ).then( response => {
            if( response.status !== 200 ){
              alert( "Error en el almacenamiento del usuario" )
            }else{
              this.$router.push( {name: 'signuppatient3'} );
            }
          }).catch( error =>{
            if( error.response.status === 400 ){
              alert( "Parece que ya existe un usuario con el correo \"" + this.email + "\"" );
            }else{
              alert( "Error en la aplicación" );
            }
          });
        event.preventDefault( );
        return true;
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