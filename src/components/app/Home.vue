<template>
  <div class="container">
    <div class="row m-2 mt-4">
      <div class="col-lg-7 calendar-div p-3">
        <div class="p-3" :class="'border-color-'+this.authClass+'-dark'">
          <img src="/static/img/dashboardWelcomeIcon2.jpg" alt="" id="absolute-img" width="120px" height="120px" class="rounded rounded-circle" :class="'img-border-'+this.authClass" v-if="this.authority==='DOCTOR'">
          <img src="/static/img/dashboardWelcomeIcon.jpg" alt="" id="absolute-img" width="120px" height="120px" class="rounded rounded-circle" :class="'img-border-'+this.authClass" v-else>
          <div v-if="this.authority==='DOCTOR'">
            <span class="h4" :class="'text-color-purple'" style="font-weight: 600;">Hola, Doctor/a {{this.name}}</span><br>
            <span>Ten un buen dia y recuerda siempre cuidar de tus pacientes</span>
          </div>
          <div v-else>
            <span class="h4" :class="'text-color-secondary-dark'" style="font-weight: 600;">Hola, {{this.name}}</span><br>
            <span>Ten un buen dia y recuerda siempre cuidar de tu salud</span>
          </div>
        </div>

        <div class="title mt-4 text-white h6">{{this.month}}</div>
        <div class="calendar d-flex flex-column p-4" :class="'border-color-'+this.authClass+'-dark'">
          <div class="d-flex flex-row justify-content-between dateName-label text-center">
            <span>Lunes</span>
            <span>Martes</span>
            <span>Miercoles</span>
            <span>Jueves</span>
            <span>Viernes</span>
            <span>Sabado</span>
            <span>Domingo</span>
          </div>
          <div class="flex-fill dates d-flex flex-column justify-content-between mt-3">
            <div class="d-flex flex-row justify-content-between date-row" v-for="row in this.calendar" :key="row[-1]">
              <div v-for="date in row" :key="date.id" @click="getInfo(date)">
                <div class="space" :class="{'date-patient':bpatientClass, 'date-doctor':!bpatientClass, 'active':date.data}" v-if="date.num>0">
                  {{date.num}}
                  <div class="ball" v-if="date.data"></div>
                </div>
                <div class="space" v-else></div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <!-- <div class="modal-header m-0 p-0">
                    <h5 class="modal-title text-color-main-dark" id="termModalTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div> -->
                <div class="modal-body m-0 p-0">
                  <div class="conditional" v-if="this.authority==='PATIENT'">
                    <button type="button" class="btn btn-back m-1" data-dismiss="modal">
                      <img src="/static/svg/arrow-left-circle.svg">
                    </button>
                    <h5 class="text-color-main-dark pt-4 text-center">{{this.makeDate(this.currDate.date)}}</h5>

                    <div v-if="this.currDate.data">
                      <img src="/static/img/syntomsInCalendarIcon.png" alt="" class="mx-auto d-block mt-4 mb-3" width="200px" height="240px" style="border: solid 2px rgb(129, 125, 233); border-radius: 15px">

                      <div class="tables d-flex flex-row justify-content-center">
                        <div class="w-50 pb-4 pl-4 pr-4" v-if="this.currDate.data.symptoms.length>0">
                          <h6 class="text-color-main-dark text-center h5" style="font-weight:700">Sintomas</h6>
                          <table class="table">
                            <thead>
                                <tr class="bg-color-secondary-dark text-white">
                                    <th scope="col" class="text-center" >Descripción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="symptom in this.currDate.data.symptoms" :key="symptom">
                                    <td class="text-center">{{symptom}}</td>
                                </tr>
                            </tbody>
                          </table>
                        </div>
                        <div class="w-50 pb-4 pl-4 pr-4" v-if="this.currDate.data.medicine.length>0">
                          <h6 class="text-color-main-dark text-center h5" style="font-weight:700">Medicamentos</h6>
                          <table class="table">
                            <thead>
                                <tr class="bg-color-secondary-dark text-white">
                                    <th scope="col" class="text-center">Nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="med in this.currDate.data.medicine" :key="med">
                                    <td class="text-center">{{med}}</td>
                                </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <img src="/static/img/notificationCalendarIcon.png" alt="" class="mt-4 mx-auto d-block" width="300px" height="300px" style="border-radius:50%">
                      <p class="no-data-msg"><b class="text-color-purple">{{this.name}}</b> no tienes ningun síntoma o medicamento reportado este día, nos alegra que te sientas bien !!</p>
                    </div>
                  </div>

                  <!-- DOCTOR DOCTOR -->
                  <div class="else" v-else>
                    <button type="button" class="btn btn-back m-1" data-dismiss="modal">
                      <img src="/static/svg/arrow-left-circle.svg">
                    </button>
                    <h5 class="text-color-main-dark pt-4 text-center">{{this.makeDate(this.currDate.date)}}</h5>

                    <div v-if="this.currDate.data">
                      <img src="/static/img/consultDoctorPatientsIcon.png" alt="" class="mx-auto d-block" width="200px" height="240px" style="margin: 16px auto; border: solid 2px #418ef2; border-radius: 15px;">

                      <div v-for="patient in this.currDate.data" :key="patient.name">
                        <hr class="purple-division">
                        <h5 class="text-color-main-light text-center m-2" style="font-weight:700">{{patient.name}}</h5>
                        <div class="tables d-flex flex-row justify-content-center mt-3">
                          <div class="w-50 pb-2 pl-4 pr-4" v-if="patient.symptoms.length>0">
                            <h6 class="text-color-purple text-center h5" style="font-weight:700">Sintomas</h6>
                            <table class="table">
                              <thead>
                                  <tr class="bg-color-main-light text-white">
                                      <th scope="col" class="text-center" >Descripción</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="symptom in patient.symptoms" :key="symptom">
                                      <td class="text-center">{{symptom}}</td>
                                  </tr>
                              </tbody>
                            </table>
                          </div>
                          <div class="w-50 pb-4 pl-4 pr-4" v-if="patient.medicine.length>0">
                            <h6 class="text-color-purple text-center h5" style="font-weight:700">Medicamentos</h6>
                            <table class="table">
                              <thead>
                                  <tr class="bg-color-main-light text-white">
                                      <th scope="col" class="text-center">Nombre</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="med in patient.medicine" :key="med">
                                      <td class="text-center">{{med}}</td>
                                  </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <img src="/static/img/notificationInDoctorCalendarIcon.png" alt="" class="mt-4 mx-auto d-block" width="300px" height="300px" style="border-radius:50%">
                      <p class="no-data-msg"><b class="text-color-purple">Doctor/a {{this.name}}</b> ninguno de tus pacientes ha reportado algún medicamento o síntoma en este dia.</p>
                    </div>
                  </div>
                </div>
                <!-- <div class="modal-footer m-0">
                </div> -->
                </div>
            </div>
        </div>
        </div>
      </div>
      <div class="col-lg-5 sidebar p-3">
        <div class="h-100 d-flex flex-column">
          <div :class="'border-color-'+this.authClass+'-dark'" :style="this.divHeight" id="user-link-list">
            <div class="p-4">
              <h3 v-if="this.authority==='PATIENT'" :class="'text-color-'+this.authClass+'-dark'" class="h4 text-center mb-4" style="font-weight: 600">Mis Doctores</h3>
              <h3 v-else :class="'text-color-'+this.authClass+'-dark'" class="h4 text-center mb-4" style="font-weight: 600">Mis Pacientes</h3>
              
              <div v-if="this.authority==='DOCTOR'">
                <div class="mb-3 result p-3 patient-border d-flex flex-column" v-for="result in this.doctors" :key="result.name"> 
                  <div class="data flex-fill d-flex flex-row">
                    <img src="/static/img/userChatIcon.png" width="80px" height="80px" style="border: solid 2px gray; border-radius:50%">
                    <div class="text pl-3 flex-fill">
                      <b class="text-color-purple doctor-name h4">{{result.firstName+' '+result.lastName}}</b><br>
                      <span style="font-weight: 600">Doc: {{result.doc}}</span><br>
                      <div class="d-flex flex-row-reverse">
                        <button class="btn bg-color-purple text-white btn-profile" @click="toProfile(result.id)">Consultar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="mb-3 result p-3 doctor-border d-flex flex-column" v-for="result in this.doctors" :key="result.name"> 
                  <div class="data flex-fill d-flex flex-row">
                    <img src="/static/svg/doctorIconSearching.svg" width="80px" height="80px">
                    <div class="text pl-3 flex-fill">
                      <b class="text-color-main-light doctor-name h4">{{result.firstName+' '+result.lastName}}</b><br>
                      <span style="font-weight: 600">{{result.specialization}}</span><br>
                      <div class="d-flex flex-row">
                        <div class="flex-fill"></div>
                        <button class="btn text-white btn-profile docBtn" @click="toDoc(result.id)">Consultar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="else" v-if="this.doctors.length===0">
                <div class="empty text-center border-nice p-1" v-if="this.authority==='DOCTOR'">
                  <h3 class="text-color-main-dark h4" style="font-weight: 600">Todavía no tienes pacientes asociados</h3>
                  <img src="/static/svg/searchDoctorIcon.svg" width="150px" height="150px" class="m-3 img-search">
                  <p>Aquí aparecerán tus pacientes.</p>
                </div>
                <div class="empty text-center border-nice p-1" v-else>
                  <h3 class="text-color-main-dark h4" style="font-weight: 600">Todavía no tienes doctores asociados</h3>
                  <img src="/static/svg/searchDoctorIcon.svg" width="150px" height="150px" class="m-3 img-search">
                  <p>Aquí aparecerán tus doctores.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-3 flex-fill d-flex flex-row" id="nav-symptoms" @click="toSymptoms" v-if="this.authority==='PATIENT'">
            <img class="my-auto m-4" src="/static/img/pill.png" width="100px" height="100px" style="border: white; border-radius: 50%;">
            <div class="text-white d-flex align-items-center p-3">
              <span class="h4">Reportar<br>Sintomas y<br>Medicamentos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getAuthenticationToken} from '@/dataStorage';
import axios from 'axios';

export default {
  data(){
    const session = getAuthenticationToken();
    let divHeight = 0

    if (session.authorities[0].authority === 'PATIENT'){
      divHeight = "height:325px;"
    }else{
      divHeight = "height:495px;"
    }

    // Date Handling
    const today = new Date();
    const {calendar, month} = this.createCalendar(today)
    

    let dataObject = {
      class:'', name: '', 
      doctors:[], authority:session.authorities[0].authority,
      authClass:'main',
      divHeight: divHeight,
      today: today,
      month: month,
      calendar:calendar,
      bpatientClass: true,
      calendarData: [],
      currDate:today,
      monthNames:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    }

    let tempClass, requestPath, dataPath;
    if (session.authorities[0].authority==='DOCTOR'){
      tempClass = 'img-doc';
      requestPath = '/doctor';
      dataPath = `/doctor/${session.userId}/mypatients/symptoms`;
      dataObject.authClass = 'main';
      dataObject.bpatientClass = false;
    }else{
      tempClass = 'img-pat';
      requestPath = '/patient';
      dataPath = '/patient/medicalHistory/'+session.userId
      dataObject.authClass = 'secondary';
      dataObject.bpatientClass = true;
    }

    axios.get( this.$store.state.backURL + requestPath + '/' + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de perfil' );
          }else{
            const data = response.data.data;
            dataObject.name = data.userFirstName+' '+data.userLastName;
          }
        } ).catch( error => {
          this.$store.state.testToken();
          alert( 'Error en la petición' );
        } );

    if(session.authorities[0].authority === "DOCTOR"){
      axios.get( this.$store.state.backURL + dataPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if (response.status !== 200){
            alert('Error obteniendo datos de calendario')
          }else{
            const data = response.data.data
            console.log(data)
            let temp = []
            for (let i=0; i <data.length; i++){
              for (let j=0; j<data[i].symptoms.length; j++){
                data[i].symptoms[j].patientName = data[i].patientName
                temp.push( data[i].symptoms[j] )
              }
            }
            dataObject.calendarData = temp;
            this.bindCalendarDoctor()
          }
        } ).catch( error => {
          this.$store.state.testToken();
          console.log(error)
          alert( 'Error en la petición' )
        } );
    }else{
      axios.get( this.$store.state.backURL + dataPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if (response.status !== 200){
            console.log("Error obteniendo los datos del calendario")
          }else{
            const data = response.data.data
            dataObject.calendarData = data.symptoms;
            this.bindCalendarPatient()
          }
        } ).catch( error => {
          this.$store.state.testToken();
          console.log(error)
          alert( 'Error en la petición' );
        } );
    }
    
    return dataObject
  },
  beforeCreate(){
    const session =getAuthenticationToken();
    let requestPath;
    let request;
    if (session.authorities[0].authority==='DOCTOR'){
      requestPath = '/doctor';
      request = '/mypatients'
    }else{
      requestPath = '/patient';
      request = '/mydoctors'
    }

    const path = requestPath+'/prof='+session.userId+request;

    axios.get( this.$store.state.backURL + path, {})
    .then( response => {
    if( response.status !== 202 ){
        alert( 'Error Realizando la Busqueda' );
    }else{
        const data = response.data.data;
        this.doctors = data || [];
    }
    } ).catch( error => {
        this.$store.state.testToken();
        alert( 'Error en la petición' );
        console.log( error );
    } );
  },
  methods: {
    toProfile(id){
      this.$router.push( '/paciente/'+id+'/nav' );
    },
    toSymptoms(){
      this.$router.push( {name: 'navSymptoms'} );
    },
    toDoc(id){
      this.$router.push( '/doctor/'+id+'/nav' );
    },
    createCalendar(today){
      const monthNames = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
      const month = monthNames[today.getMonth()]

      const y = today.getFullYear(), m = today.getMonth();
      const firstDay = new Date(y, m, 1);
      const lastDay = new Date(y, m + 1, 0);

      let calendar = [], week = [], id = 0

      if (firstDay.getDay()!==0){
        for (let i = 0; i < (firstDay.getDay()-1)%7; i++){
          week.push({num:0, date:new Date(0), id:id});
          id += 1;
        }
      }

      let tempDay = firstDay.getDate()
      while(tempDay <= lastDay.getDate()){
        while (week.length < 7){
          week.push({num:tempDay, date:new Date(y, m, tempDay), id:id})
          tempDay+=1; id+=1

          if (tempDay > lastDay.getDate()){
            while (week.length < 7){
              week.push({num:0, date:new Date(0), id:id})
              id+=1;
            }
          }
        }
        calendar.push(week)
        week = []
      }

      return {calendar:calendar, month:month}
    },
    bindCalendarPatient(){
      for (let i=0; i<this.calendarData.length; i++){
        for (let j=0; j<this.calendar.length; j++){
          for (let z=0; z<this.calendar[j].length; z++){
            let date1 = new Date(this.calendarData[i].date), date2 = new Date(this.calendar[j][z].date)
            date1.setHours(0,0,0,0);
            date2.setHours(0,0,0,0)

            if ( date1.getTime() ===  date2.getTime()){
              const value = this.calendar[j][z]

              if (typeof value.data === 'object'){
                if (this.calendarData[i].description){value.data.symptoms.push(this.calendarData[i].description)}
                if (this.calendarData[i].medicine){value.data.medicine.push(this.calendarData[i].medicine)}
              }else{
                value.data = {'symptoms':[], 'medicine':[]};
                if (this.calendarData[i].description){value.data.symptoms.push(this.calendarData[i].description)}
                if (this.calendarData[i].medicine){value.data.medicine.push(this.calendarData[i].medicine)}
              }

              this.calendar[j].splice(z, 1, value)
            }
          }
        }
      }
      console.log(this.calendar);
    },
    bindCalendarDoctor(){
      for (let i=0; i<this.calendarData.length; i++){
        for (let j=0; j<this.calendar.length; j++){
          for (let z=0; z<this.calendar[j].length; z++){
            let date1 = new Date(this.calendarData[i].date), date2 = new Date(this.calendar[j][z].date)
            date1.setHours(0,0,0,0);
            date2.setHours(0,0,0,0)

            if ( date1.getTime() ===  date2.getTime()){
              const value = this.calendar[j][z]
              console.log(this.calendarData[i])

              if (typeof value.data !== 'object'){
                value.data = {}
              }
              if (!value.data[this.calendarData[i].patientName]){
                value.data[this.calendarData[i].patientName] = {name:this.calendarData[i].patientName}
              }
              if (!value.data[this.calendarData[i].patientName].symptoms){
                value.data[this.calendarData[i].patientName].symptoms = []
              }
              if (!value.data[this.calendarData[i].patientName].medicine){
                value.data[this.calendarData[i].patientName].medicine = []
              }

              if (this.calendarData[i].description){
                value.data[this.calendarData[i].patientName].symptoms.push(this.calendarData[i].description)
              }
              if (this.calendarData[i].medicine){
                value.data[this.calendarData[i].patientName].medicine.push(this.calendarData[i].medicine)
              }

              console.log(value)
              this.calendar[j].splice(z, 1, value)
            }
          }
        }
      }
      console.log(this.calendar);
    },
    getInfo(date){
      this.currDate = date;
      $('#infoModal').modal('show')
    },
    makeDate(iDate){
      const date = new Date(iDate);
      return ''+String(date.getDate()).padStart(2, "0")+'/'+String(date.getMonth()+1).padStart(2, "0")+'/'+date.getFullYear()
    }
  }
}
</script>

<style scoped>
.bg-color-purple{
  background-color: rgb(129, 125, 233);
}

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
  background-image: url("/static/img/patientDashboard.jpeg");
  background-size: cover;
}
.img-doc{
  background-image: url("/static/img/doctorDashboard.jpg");
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

.text-color-purple{
	color: rgb(129, 125, 233);
}

.border-color-main-light{
	border-color: #418ef2;
}

.border-color-main-dark, .img-border-main{
	border: solid 2px #1F4567;
  border-radius: 25px;
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

.patient-border{
  border: solid 2px rgb(129, 125, 233);
  border-radius: 25px;
}

.border-color-secondary-dark, .img-border-secondary{
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

.btn-profile{
  border-radius: 30px;
}

#user-link-list{
  overflow: auto;
}
/*Width*/
#user-link-list::-webkit-scrollbar {
  width: 0px;
}
/* Track */
#user-link-list::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
#user-link-list::-webkit-scrollbar-thumb {
  background: #1f4567a1;
  border-radius: 3px;
}
/* Handle on hover */
#user-link-list::-webkit-scrollbar-thumb:hover {
  background: #1F4567;
}

#nav-symptoms{
  background-color: rgb(129, 125, 233);
  border-radius: 25px;
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

#nav-symptoms:hover{
  cursor: pointer;
}

#nav-symptoms:active{
  border: solid transparent 1px;
}

#nav-symptoms span.h4{
  font-weight: 650;
}

.docBtn{
  margin: 4px auto; 
  background-color: #418ef2;
  border: solid 1px gray;
}

.dateName-label{
  font-weight: 600;
}

.dateName-label span{
  width:60px;
}

.date-row{
  margin: 0 10px
}

.date-row div.space{
  width: 38px;
  height:38px;
}



.date-row div.date-patient{
  text-align: center;
  font-size: 1.5em;
  padding: 0;
  font-weight: 700;
  border-radius: 50%;
  border: solid #FB7837 1px;
}
.date-row div.date-patient:hover{
  cursor: pointer;
}



.date-row div.date-doctor{
  text-align: center;
  font-size: 1.5em;
  padding: 0;
  font-weight: 700;
  border-radius: 50%;
  border: solid rgb(129, 125, 233) 1px;
}
.date-row div.date-doctor:hover{
  cursor: pointer;
}


.date-row .date-doctor.active{
  color: white;
  background: rgb(129, 125, 233);
}

.date-row .date-patient.active{
  color: white;
  background: #FB7837;
}

.date-row .date-patient .ball{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position:relative;
  left: 26px;
  top: -38px;
  background: rgb(129, 125, 233);
}

.date-row .date-doctor .ball{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position:relative;
  left: 26px;
  top: -38px;
  background: #FB7837;
}


.calendar{
  height: 350px;
}

.tables{
  font-size: 0.9em;
}

.tables th, .tables td{
  border: solid 1px gray;
}

.no-data-msg{
  font-size: 1.3em;
  padding: 32px 96px;
  font-weight: 600;
  text-align: center;
  line-height: 26px;
}

.purple-division{
  background-color: rgb(129, 125, 233);
  margin: 16px 0;
}

</style>