<template>
    <div class="myMedRecord container">
        <h3 class="text-center">Mi Historia Clinica</h3>
        <div class="view row">
            <div class="col-lg-3">
                <div class="card p-2" v-for="allergy in this.allergies">
                    <h5 class="card-title">{{allergy.allergen}}</h5>
                    <div class="card-body">
                        <p>Type: {{allergy.type}}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card p-2" v-for="illness in this.illnesses">
                    <h5 class="card-title">{{illness.illnessName}}</h5>
                    <div class="card-body">
                        <p>Detection Date: {{illness.detectionDate}}</p>
                        <span>Descripción:</span>
                        <p>{{illness.illnessDescription}}}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card p-2" v-for="personalRecord in this.personalRecords">
                    <h5 class="card-title">Fecha: {{personalRecord.date}}</h5>
                    <div class="card-body">
                        <p>{{personalRecord.description}}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3">
                <div class="card p-2" v-for="familyBackground in this.familyBackgrounds">
                    <h5 class="card-title">{{familyBackground.familyMember}}</h5>
                    <div class="card-body">
                        <p>{{familyBackground.description}}</p>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="text-center">Navigation</h3>
        <div class="navigation row">
            <div class="col-6">
                <button class="btn bg-color-main-light text-white" @click="toCreate">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {getAuthenticationToken} from '@/dataStorage';

export default {
  name: 'Roles',
  data( ){
    let dataObject = {
      authority: '',
      userId: '',
      allergies: [{allergen:'', type:''}],
      illnesses: [{illnessName:'', detectionDate:'', illnessDescription:''}],
      personalRecords: [{description:'', date:''}],
      familyBackgrounds: [{familyMember:'', description:''}]
    };
    const session = getAuthenticationToken( )

    dataObject.authority = session.authorities[0].authority;
    dataObject.userId = session.userId;

    if (dataObject.authority === "DOCTOR"){
        this.$router.push( {name: 'home'} );
        return dataObject;
    }

    const requestPath = "/patient/medicalHistory/"

    axios.get( this.$store.state.backURL + requestPath + session.userId, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo la Historia Medica' );
          }else{
            const data = response.data.data;
            
            // Get Registered Entries
            if (data.allergies !== []){dataObject.allergies = data.allergies;}
            if (data.illnesses !== []){dataObject.illnesses = data.illnesses;}
            if (data.personalRecords !== []){dataObject.personalRecords = data.personalRecords;}
            if (data.familyBackgrounds !== []){dataObject.familyBackgrounds = data.familyBackgrounds;}

            // Format Time
            for(let i=0; i<dataObject.illnesses.length; i++){
                dataObject.illnesses[i].detectionDate = dataObject.illnesses[i].detectionDate.split('T')[0];
            }

            // Format Time and Manage BackEnd Name Changes
            for(let i=0; i<dataObject.personalRecords.length; i++){
                dataObject.personalRecords[i].date = dataObject.personalRecords[i].date.split('T')[0];
                dataObject.personalRecords[i].description = dataObject.personalRecords[i].prDescription;
            }

            // console.log(data);
          }
        } ).catch( error => {
          alert( 'Error en la petición' );
          console.log( error );
        } );

    return dataObject
  },
  beforeCreate(){
  },
  methods:{
    next(event){
        this.step += 1;
        event.preventDefault();
    },
    back(){
        this.step -= 1;
    },
    myAlert(text){
        document.getElementById('my-message').innerText = text;
    },
    addAllergy(){this.allergies.push( {allergen:'', type:''} );},
    removeAllergy(){this.allergies.pop()},
    addIlness(){this.illnesses.push( {illnessName:'', detectionDate:'', illnessDescription:''} );},
    removeIlness(){this.illnesses.pop()},
    addPersonalRecord(){this.personalRecords.push( {date:'', description:''} );},
    removePersonalRecord(){this.personalRecords.pop()},
    addFamilyBackground(){this.familyBackgrounds.push( {familyMember:'', description:''} );},
    removeFamilyBackground(){this.familyBackgrounds.pop()},
    toProfile(){
        this.$router.push( {name: 'profile'} );
    },
    toCreate(){
        this.$router.push( {name: 'createMedRecord'} );
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
</style>