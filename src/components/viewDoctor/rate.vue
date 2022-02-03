<template>
    <div class="view-medRecord d-flex flex-column">
        <div class="d-block title text-white text-center w-100">{{name}}</div>
        <div class="flex-fill">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="container mt-5">
                <div class="row p-2 mt-5 pt-5">
                    <div class="col-lg-5 d-none d-lg-flex">
                        <img src="/static/img/ratingPanel.png" class="mx-auto img-fluid" style="width:100%; height: 100%; max-width:350px; max-height: 350px">
                    </div>
                    <div class="col-lg-6">
                        <div class="review" v-if="this.done === false">
                            <form @submit="next" class="form-group flex-fill d-flex flex-column">
                                <!---->
                                <div class="rate-ui d-flex flex-row justify-content-center m-3">
                                    <div class="rate-option flex-fill d-flex justify-content-center" @click="rate(1)">
                                        <img src="/static/svg/star-fill.svg" alt="" v-if="this.score>=1">
                                        <img src="/static/svg/star.svg" alt="" v-else>
                                    </div>

                                    <div class="rate-option flex-fill d-flex justify-content-center" @click="rate(2)">
                                        <img src="/static/svg/star-fill.svg" alt="" v-if="this.score>=2">
                                        <img src="/static/svg/star.svg" alt="" v-else>
                                    </div>

                                    <div class="rate-option flex-fill d-flex justify-content-center" @click="rate(3)">
                                        <img src="/static/svg/star-fill.svg" alt="" v-if="this.score>=3">
                                        <img src="/static/svg/star.svg" alt="" v-else>
                                    </div>

                                    <div class="rate-option flex-fill d-flex justify-content-center" @click="rate(4)">
                                        <img src="/static/svg/star-fill.svg" alt="" v-if="this.score>=4">
                                        <img src="/static/svg/star.svg" alt="" v-else>
                                    </div>

                                    <div class="rate-option flex-fill d-flex justify-content-center" @click="rate(5)">
                                        <img src="/static/svg/star-fill.svg" alt="" v-if="this.score>=5">
                                        <img src="/static/svg/star.svg" alt="" v-else>
                                    </div>
                                </div>
                                <input v-model="this.score" type="number" required id="score-input">
                                <div class="text-ins mt-4">
                                    Escribe una pequeña reseña del doctor al que estas <b class="text-color-purple">calificando</b> para que otros usuarios puedan conocer su forma de trabajar !!!
                                </div>

                                <div class="flex-fill mt-3">
                                    <div class="form-group border-color-main-light">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text border-0 bg-color-main-light">
                                                    <img src="/static/svg/asterisk.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                                </div>
                                            </div>
                                            <textarea v-model="comment" type="text" class="form-control border-0 bg-color-main-lighter" placeholder="Reseña" required style="height:80px">
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-center">
                                    <button type="submit" class="btn bg-color-main-light text-white" id="send-btn">Enviar</button>
                                </div>
                            </form>
                        </div>
                        <div v-else>
                            <div class="bg-white p-1">
                                <div class="flex-fill d-flex flex-column align-items-center justify-content-center">
                                    <img src="/static/img/comprobado-patient.png" class="col-4 img-fluid">
                                    <div class="message row">
                                        <p class="offset-2 col-8 text-center text-msg">Se ha enviado tu reseña de manera satisfactoria</p>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <button @click="toProfile" class="btn bg-color-main-light text-white" id="back-btn">Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offset-lg-1"></div>
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
            score: '',
            comment: ""
        }
    },
    beforeCreate(){
        const session = getAuthenticationToken();
        const requestPath = `/doctor/${this.$route.params.id}`;

        axios.get( this.$store.state.backURL + requestPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los Sintomas' );
          }else{
            const data = response.data.data;
            this.name = data.userFirstName+' '+data.userLastName
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
        toProfile(){
            this.$router.push( {name: 'navViewDoctor'} );
        },
        back(){
            this.$router.push( {name: 'navViewDoctor'} );
        },
        rate(n){
            this.score = n;
        },
        next(){
            event.preventDefault()

            const session = getAuthenticationToken();
            const path = `/patient/scores/${this.$route.params.id}`;

            axios.post( this.$store.state.backURL + path,
            {
                scoreId: null,
                score: this.score,
                opinion: this.comment
            }, // Body
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: { sessionToken: session.token,  doctorId: this.$route.params.id }
            }
            ).then( response => {
                if (response.status !== 200){
                    alert('Error en la petición')
                }
                else{
                    this.done = true;
                }
            } ).catch( error => {
                if( error.response.status === 400 ){
                    alert( "Error 400" );
                }else{
                    alert( "¡Parece que hubo un error de comunicación con el servidor!" );
                }
            });
        }
    }
}
</script>

<style scoped>
#send-btn{
    padding: 4px 72px;
    border-radius: 20px;
    border: solid 1px gray;
}

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

.text-color-purple{
    color: rgb(86, 81, 226);
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
    background-color: rgb(197, 220, 251)
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

.rate-option{
    margin: 5px;
    cursor: pointer;
    user-select: none;
}

.rate-option img{
    width: 100%;
    height: auto;
}

.text-ins{
    font-size: 1.3em;
    font-weight: 600;
    text-align: justify;
    line-height: 24px;
}

.form-control::placeholder{
    color: #1F4567;
    opacity: 50%;
}

.form-group{
    border-radius: 20px;
}

#score-input{
    border: none;
    height: 1px;
    width: 1px;
    margin: 0px auto;
    padding: 0px;
}

#score-input:active{
    border: none;
}

.text-msg{
    margin: 32px auto;
    font-size: 1.2em;
    color: #1F4567;
    font-weight: 600;
    line-height: 24px;
}

#back-btn{
    padding: 6px 32px;
    border-radius: 10px
}
</style>