<template>
    <div class="flex-fill patient-1 d-flex flex-column">
        <h1 class="text-center text-color-main-light m-4">Medirec</h1>
        <div class="d-flex">
            <hr>
            <div class="col-4 text-center">
                <div class="circle circle-active">1</div>
                <p>Información Personal</p>
            </div>
            <div class="col-4 text-center">
                <div class="circle">2</div>
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
                          <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                            <img src="../../../public/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                          </div>
                        </div>
                        <input v-model="firstName" type="text" class="form-control bg-color-secondary-light border-0" placeholder="Nombres" required>
                      </div>
                  </div>

                  <div class="form-group mb-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                            <img src="../../../public/static/svg/person-circle.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                          </div>
                        </div>
                        <input v-model="lastName" type="text" class="form-control bg-color-secondary-light border-0" placeholder="Apellidos" required>
                      </div>
                  </div>

                  <div class="form-group mb-4">
                      <div class="input-group">
                      <div class="input-group-prepend">
                          <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                          <img src="../../../public/static/svg/envelope.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                          </div>
                      </div>
                      <input v-model="email" type="email" class="form-control bg-color-secondary-light border-0" placeholder="Correo Electronico" required>
                      </div>
                  </div>

                  <div class="form-group mb-4">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                            <img src="../../../public/static/svg/person-badge.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                          </div>
                        </div>
                        <input v-model="doc" type="number" class="form-control bg-color-secondary-light border-0" placeholder="Documento" required>
                        <div class="input-group-append">
                          <select v-model="docType" class="form-control bg-color-secondary-light border-0" required>
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                          </select>
                        </div>
                      </div>
                  </div>

                  <div class="form-group">
                      <div class="input-group">
                          <div class="input-group-prepend">
                              <div class="input-group-text bg-color-secondary-dark border-0 text-white">
                              <img src="../../../public/static/svg/bandaid.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                              </div>
                          </div>
                          <input v-model="eps" type="text" class="form-control bg-color-secondary-light border-0" placeholder="EPS" required>
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
  import {setPaciente} from '@/dataStorage';

  const path = '/register/patient';

  export default {
    name: "SignUpPatient",
    data(){
      return{
        firstName: '',
        lastName: '',
        docType: 'CC',
        doc: '',
        email: '',
        eps: ''
      }
    },
    beforeCreate(){},
    methods:{
      signUp( event ){
        setPaciente( {firstName: this.firstName, 
                      lastName: this.lastName,
                      docType: this.docType,
                      doc: this.doc,
                      email: this.email, 
                      eps: this.eps} );
        this.$router.push( {name: 'signuppatient2'} );
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