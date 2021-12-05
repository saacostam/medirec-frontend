<template>
  <div class="singup-pick h-100 container-fluid d-flex m-0 p-0 flex-column">
    <button class="btn btn-back p-0 m-4" @click="back">
      <img src="../../public/static/svg/arrow-left-circle.svg">
    </button>
    <div class="title text-center m-3 align-items-center justify-content-center">
      <img src="../../public/static/img/heart-rate.png" alt="logo" width="96" height="96" viewBox="0 0 96 96">
      <h1 class="text-color-main-light d-inline ml-2 font-weight-bold">MediRec</h1>
    </div>
    <div class="options flex-fill d-flex flex-row">
      <div @click="pickPaciente()" class="pick-option bg-color-secondary-dark flex-fill text-center text-white d-flex flex-column">
        <div class="flex-fill d-flex align-items-center justify-content-center flex-column">
          <h2 class="mt-3 mb-2">Paciente</h2>
          <div class="flex-fill pl-5 pr-5 d-flex align-items-center justify-content-center">
            <img src="../../public/static/img/opcion-paciente.png" height="400" width="400" class="option-image img-fluid">
          </div>
        </div>
      </div>
      <div @click="pickDoctor()" class="pick-option bg-color-main-dark flex-fill text-center text-white d-flex flex-column">
        <div class="flex-fill d-flex flex-column">
          <h2 class="mt-3 mb-2">Doctor</h2>
          <div class="flex-fill pl-5 pr-5 d-flex align-items-center justify-content-center">
            <img src="../../public/static/img/opcion-doctor.png" height="400" width="400" class="option-image img-fluid">
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="container-fluid text-center h-100">
      <div class="row">
        <div class="col-12 logo text-center d-flex align-items-center justify-content-center m-3">
          <img src="../../public/static/img/heart-rate.png" alt="logo" width="96" height="96" viewBox="0 0 96 96">
          <h1 class="text-color-main-light d-inline ml-2">MediRec</h1>
        </div>
        <div class="col-sm-6 d-flex align-items-center justify-content-center bg-color-secondary-dark">
          <router-link class="pick-link" to="registro/paciente/1">
          </router-link>
        </div>
        <div class="col-sm-6 d-flex align-items-center justify-content-center bg-color-main-dark">
          <router-link class="pick-link" to="registro/doctor">
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "singUpPick",
  data(){
    return {
    }
  },
  beforeCreate(){

  },
  methods:{
    pickDoctor(){
      this.$router.push( {name: 'signupdoctor1'} );
    },
    pickPaciente(){
      this.$router.push( {name: 'signuppatient1'} );
    },
    back(){
      this.$router.push( {name: 'login'} );
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

.pick-option:hover{
  cursor:pointer;
}

.btn-back{
  width: 44px;
  height: 44px;

  border-radius: 22px;
  position: absolute;
}

.btn-back:focus {
  box-shadow:unset;
}
</style>