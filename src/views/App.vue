<template>
  <div class="app h-100 d-flex flex-column flex-fill">
    <nav class="navbar-light bg-white">
      <div class="container-fluid mb-0">
        <div class="row w-100 mb-2 mt-3">
          <nav class="support col-lg-2 col-3">
            <img src="../../public/static/img/tutorialIcon.png" @click="toTutorial" class="support-option d-block" width="70px" height="70px" :style="[authority==='DOCTOR' ? {'border-color': '#1F4567'} : {'border-color': '#FB7837'}]">
            <img src="../../public/static/img/donationsIcon.png" @click="toDonations" class="support-option d-block" width="70px" height="70px" :style="[authority==='DOCTOR' ? {'border-color': '#1F4567'} : {'border-color': '#FB7837'}]">
          </nav>

          <div class="col-lg-8 col-6 brand d-flex justify-content-center mb-0">
            <router-link class="navbar-brand" :to="{name: 'home'}">
              <img src="../../public/static/svg/MedirecLogo.svg" width="auto" height="60" class="d-inline-block align-top" alt="">
            </router-link>
          </div>
          <div class="logout col-lg-2 col-3 mb-0 d-flex flex-column align-items-end justify-content-center">
            <button class="btn" id="logout-button" @click="logOut">Cerrar Sesión</button>
          </div>
        </div>
      </div>
    </nav>
    <div class="h-line"></div>
    <div class="flex-fill d-flex flex-row">
      <div id="menu" class="menu d-flex flex-column p-0">
        <!-- <div class="profile d-flex justify-content-center align-items-center flex-column text-center mb-4">
          <img src="../../public/static/svg/person-circle.svg" width="150px" height="150px" class="d-block mb-2">
          <span class="d-block h6 text-white mb-0">{{this.email}}</span>
          <span class="text-white">{{this.authority}}</span>
        </div> -->
        <div class="menu-options p-3 text-center">
          <p class="p-0 m-0 menu-title">Menu</p>
        </div>
        <hr class="bg-white m-0">
        <div class="menu-options p-3 d-flex align-items-center">
          <router-link :to="{name: 'home'}"><img src="../../public/static/img/homeIcon.png" width="40px" height="40px" class="mr-2"> Inicio</router-link>
        </div>
        <hr class="bg-white m-0">
        <div class="menu-options p-3 d-flex align-items-center">
          <router-link :to="{name: 'profile'}"><img src="../../public/static/img/profileIcon.png" width="40px" height="40px" class="mr-2"> Mi Perfil</router-link>
        </div>
        <hr class="bg-white m-0">
        <div class="menu-options p-3 d-flex align-items-center">
          <router-link :to="{name: 'dataUpdate'}"><img src="../../public/static/img/updateDataIcon.png" width="40px" height="40px" class="mr-2" v-if="this.authority==='PATIENT'"><img src="../../public/static/img/updateDataDoctorIcon.png" width="40px" height="40px" class="mr-2" v-else> Actualización de Datos</router-link>
        </div>
        <hr class="bg-white m-0">
        <div class="menu-options p-3 d-flex align-items-center" v-if="this.authority==='PATIENT'">
          <router-link :to="{name: 'myMedRecord'}"><img src="../../public/static/img/medicalHistoryIcon.png" width="40px" height="40px" class="mr-2"> Mi Historia Clinica</router-link>
        </div>
        <hr class="bg-white m-0" v-if="this.authority==='PATIENT'">
        <!---->
        <div class="menu-options p-3 d-flex align-items-center" v-if="this.authority==='PATIENT'">
          <router-link :to="{name: 'myDoctors'}"><img src="../../public/static/svg/myDoctorsIcon.svg" width="40px" height="40px" class="mr-2"> Busqueda de Doctores</router-link>
        </div>
        <hr class="bg-white m-0" v-if="this.authority==='PATIENT'">
        <div class="menu-options p-3 d-flex align-items-center" v-if="this.authority==='PATIENT'">
          <router-link :to="{name: 'myRequests'}"><img src="../../public/static/img/misSolicitudesIcon.png" width="40px" height="40px" class="mr-2"> Mis Solicitudes</router-link>
        </div>
        <hr class="bg-white m-0" v-if="this.authority==='PATIENT'">
        <!---->
        <div class="menu-options p-3 d-flex align-items-center" v-if="this.authority==='DOCTOR'">
          <router-link :to="{name: 'myPatients'}"><img src="../../public/static/img/myPatientsIcon.png" width="40px" height="40px" class="mr-2"> Busqueda de Pacientes</router-link>
        </div>
        <hr class="bg-white m-0" v-if="this.authority==='DOCTOR'">
        <div class="menu-options p-3 d-flex align-items-center" v-if="this.authority==='DOCTOR'">
          <router-link :to="{name: 'MyReviews'}"><img src="../../public/static/img/myReviewsIcon.png" width="40px" height="40px" class="mr-2"> Mis Reseñas</router-link>
        </div>
        <hr class="bg-white m-0" v-if="this.authority==='DOCTOR'">
      </div>
      <div class="v-line"></div>
      <router-view class="flex-fill"></router-view>
    </div>
  </div>
</template>

<script>
  import {getAuthenticationToken, deleteAuthenticationToken} from '@/dataStorage';

  export default{
    name: "App",
    data(){
      const session = getAuthenticationToken();
      const auth = session.authorities[0].authority;
      return {
        email: session.username,
        authority: auth
      }
    },
    beforeCreate( ){
      if( !getAuthenticationToken( ) ){
        this.$router.push( {name: "login"} );
      }
    },
    mounted(){
      const session = getAuthenticationToken();
      if (session.authorities[0].authority === "DOCTOR"){
        document.getElementById('menu').style.backgroundColor  = "#1F4567";
      }
    },
    methods:{
      logOut(){
        deleteAuthenticationToken();
        this.$store.state.medRecord = null;
        this.$router.push( {name: "login"} );
      },
      toDonations(){
        this.$router.push({name:'donations'});
      },
      toTutorial(){
        this.$router.push({name:'tutorial'})
      }
    }
  }
</script>

<style scoped>
.menu{
  max-width: 275px;
  min-width: 275px;
  width: 275px;
  background-color: #FB7837;
  padding: 25px;
}

.menu-options{
  margin: 0; padding: 0;
}

.menu-options a, .menu-title{
  color: white;
  font-size: 18px;
  text-decoration: none;
  font-weight: bold;
}

#logout-button{
  background-color: #1F4567;
  color: white;
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

.h-line {
  width: 100%;
  color: #1F4567;
  border: solid 1px #1F4567;
}

.v-line{
  height: 100%;
  color: #1F4567;
  border: solid 1px #1F4567;
  margin-bottom: 0;
}

hr{
  height: 1px;
  border: none;
}

.support{
  display: flex;
  flex-flow: row;
}

img.support-option{
  border: solid 2px #FB7837;
  border-radius: 50%;
  margin: 0px 12px;
  cursor: pointer;
}
</style>
