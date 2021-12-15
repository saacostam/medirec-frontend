<template>
  <div class="container" v-if="this.authority==='PATIENT'">
    <div class="row m-3 mt-5">
      <div class="col-lg-7 calendar p-3">
        <div class="border-color-secondary-dark p-3">
          <img src="../../../public/static/img/dashboardWelcomeIcon.jpg" alt="" id="absolute-img" width="120px" height="120px" class="rounded rounded-circle img-border">
          <span class="text-color-secondary-dark h4">Hola, {{this.name}}</span><br>
          <span>Ten un buen dia y recurda siempre cuidar de tu salud</span>
        </div>

        <div class="title mt-4 text-white h6">Calendar</div>
        <div class="calendar border-color-secondary-dark p-3 pl-5 pr-5">
          <h4 class="h5 text-color-main-dark text-center mb-3" style="font-weight: 600">Diciembre</h4>
          <div class="ml-5 mr-5 d-flex flex-row justify-content-between dates-label">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div class="ml-5 mr-5 pt-3">
            <div class="d-flex flex-row justify-content-between dates mb-3">
              <span class="disable">31</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
            </div>
            <div class="d-flex flex-row justify-content-between dates mb-3">
              <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
            </div>
            <div class="d-flex flex-row justify-content-between dates mb-3">
              <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
            </div>
            <div class="d-flex flex-row justify-content-between dates mb-3">
              <span>21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>
            </div>
            <div class="d-flex flex-row justify-content-between dates mb-3">
              <span>28</span><span>29</span><span>30</span><span>31</span><span class="disable">1</span><span class="disable">2</span><span class="disable">3</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-5 sidebar p-3">
        <div class="border-color-secondary-dark p-3">
          <h3 class="text-color-secondary-dark h4 text-center mb-4" style="font-weight: 600">Mis Doctores</h3>
          <div class="mb-4 result p-3 doctor-border d-flex flex-column" v-for="result in this.doctors" :key="result.name"> 
            <div class="data flex-fill d-flex flex-row">
              <img src="../../../public/static/svg/doctorIconSearching.svg" width="80px" height="80px">
              <div class="text pl-3">
                <b class="text-color-main-light doctor-name h4">{{result.firstName+' '+result.lastName}}</b><br>
                <span style="font-weight: 600">{{result.specialization}}</span><br>
              </div>
            </div>
          </div>
          <div class="else" v-if="this.doctors.length===0">
            <div class="empty text-center border-nice p-3">
              <h3 class="text-color-main-dark h4" style="font-weight: 600">Todavía no tienes doctores asociados</h3>
              <img src="../../../public/static/svg/searchDoctorIcon.svg" width="150px" height="150px" class="m-3 img-search">
              <p>Aquí aparecerán tus doctores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="h-100 d-flex flex-column" v-else>
    <div class="message text-center mt-4 text-color-main-dark">
      <h1>¡Estamos construyendo una mejor aplicación para ti, espéranos!!!</h1>
    </div>
    <div class="flex-fill d-flex justify-content-center align-items-end m-0 p-0 img-doc">
    </div>
  </div>
</template>

<script>
import {getAuthenticationToken} from '@/dataStorage';
import axios from 'axios';

export default {
  data(){
    const session = getAuthenticationToken();

    let dataObject = {class:'', name: '', doctors:[], authority:session.authorities[0].authority}

    let tempClass;
    let requestPath;

    if (session.authorities[0].authority==='DOCTOR'){
      tempClass = 'img-doc';
      requestPath = '/doctor';
    }else{
      tempClass = 'img-pat';
      requestPath = '/patient';
    }

    axios.get( this.$store.state.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
            console.log(data)
            dataObject.name = data.userFirstName+' '+data.userLastName;
          }
        } ).catch( error => {
          this.$store.state.testToken();
          alert( 'Error en la petición' );
        } );

    return dataObject
  },
  beforeCreate(){
    const session =getAuthenticationToken();
    const path = '/patient/prof='+session.userId+'/mydoctors';

    axios.get( this.$store.state.backURL + path, {})
    .then( response => {
    if( response.status !== 202 ){
        alert( 'Error Realizando la Busqueda' );
    }else{
        const data = response.data.data;
        console.log(data);
        this.doctors = data || [];
    }
    } ).catch( error => {
        this.$store.state.testToken();
        alert( 'Error en la petición' );
        console.log( error );
    } );
  },
}
</script>

<style scoped>
.title{
  background-color:#1F4567;
  padding: 5px 30px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin: 0 auto;
  width: fit-content;
  font-weight: 600;
}

.img{
  opacity: 0.9;
}
.img-pat{
  background-image: url("../../../public/static/img/patientDashboard.jpeg");
  background-size: cover;
}
.img-doc{
  background-image: url("../../../public/static/img/doctorDashboard.jpg");
  background-size: cover;
}
.menu{
  width: 250px;
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

.text-color-secondary-dark{
	color: #FB7837;
}

.doctor-border{
  border: solid 2px #418ef2;
  border-radius: 25px;
}

.border-color-secondary-dark, .img-border{
  border: solid 2px #FB7837;
  border-radius: 25px;
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

#absolute-img{
  position: absolute;
  top: 0px;
  left: 75%;
}

.dates-label span{
  color: rgb(183, 190,202);
  font-weight: 700;
  width: 20px;
  text-align: center;
}

.dates span{
  color:#1F4567;
  font-weight: 700;
  width: 20px;
  text-align: center;
}

.dates span.disable{
  color: rgb(183, 190,202);
}
</style>