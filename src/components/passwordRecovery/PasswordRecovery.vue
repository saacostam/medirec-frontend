<template>
    <div class="container-fluid h-100">
        <div class="row h-100">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>

            <div class="col-md-7 h-100" v-if="!this.sent">
                <div class="h-100 d-flex justify-content-center align-items-center flex-column p-5">
                    <h3 class="text-center text-color-main-dark mb-4" style="font-weight:700; font-size:30px">Recuperación de Contraseña</h3>
                    <div class="form-div bg-color-main-light w-100 p-4 border-div">
                        <form @submit="submit" class="form p-2">
                            <p class="text-white form-text mb-4">Ingresa tu correo electrónico para buscar tu cuenta.</p>

                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text bg-color-main-dark border-0 text-white">
                                            <img src="/static/svg/envelope.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                        </div>
                                    </div>
                                    <input v-model="email" type="email" class="form-control bg-color-main-dark border-0 text-white spec-input" placeholder="Correo Electrónico" required>
                                </div>
                            </div>
                            <div class="form-group mb-4">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text bg-color-main-dark border-0 text-white">
                                            <img src="/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                                        </div>
                                    </div>
                                    <select v-model="role" type="email" class="form-control bg-color-main-dark border-0 text-white spec-input" placeholder="Correo Electrónico" required>
                                        <option value="PATIENT">Paciente</option>
                                        <option value="DOCTOR">Doctor</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex justify-content-center">
                                <input type="submit" value="Buscar" class="btn text-white spec-button" style="font-weight:600" v-if="!this.inProgress">
                                <div class="spinner-border m-2 text-white" role="status" v-else>
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-7 h-100" v-else>
                <div class="h-100 d-flex justify-content-center align-items-center flex-column p-5">
                    <h3 class="text-center text-color-main-dark mb-4" style="font-weight:700">Recuperación de Contraseña</h3>
                    <div class="form-div bg-color-main-light w-100 p-4 border-div d-flex justify-content-center align-items-center" style="height:250px">
                        <p class="text-white form-text mb-4 text-center" style="font-size: 24px">El correo se ha enviado <b class="text-color-main-dark">correctamente.</b></p>
                    </div>
                </div>
            </div>
            <div class="col-md-5 h-100">
                <div class="d-flex h-100 flex-column justify-content-center align-items-center mr-5 pr-5">
                    <img src="/static/svg/MedirecLogo.svg" class="">
                    <div>
                        <img src="/static/img/passwordRecovery.jpg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    let path;

    export default {
        name: "Login.vue",
        components: {},
        data(){
            return {
                email: '',
                role: 'PATIENT',
                inProgress: false,
                sent: false,
            }
        },
        methods: {
            submit( event ){
                event.preventDefault();
                if (this.role==='PATIENT'){
                    path = "/password/recovery/patient/resetPassword";
                }else{
                    path = "/password/recovery/doctor/resetPassword";
                }

                this.inProgress = true;

                axios
                .post( this.$store.state.backURL + path, // URL: localhost:8080 + /login
                    {
                      email: this.email
                    },
                    {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    }
                ).then( response => {
                    if( response.status !== 202 ){
                        alert('Error en la autenticación');
                    }else{
                        this.sent = true;
                    }
                    this.inProgress = false;
                } ).catch( error => {
                    alert('¡Parece que hubo un error de comunicación con el servidor!', error);
                    this.inProgress = false;
                } );
            },
            toLogin(){
                this.$router.push( {name: 'login'} );
            },
            back(){
                this.$router.push( {name: 'login'} );
            }
        }
    }
</script>

<style scoped>
.btn-back{
    width: 44px;
    height: 44px;

    border-radius: 22px;
    position: absolute;

    z-index: 20;
}

.btn-back:focus {
    box-shadow:unset;
}

.circle{
    border: solid 2px rgb(86, 81, 226);
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
    background-color: rgb(86, 81, 226);
    color: white;
}

.text-color-main-light{
    color: #418ef2;
}

.text-color-green{
    color: rgb(86, 81, 226);
}

.bg-color-green{
    background-color: rgb(86, 81, 226);
}

hr {
    position: absolute;
    width: 37%;
    margin-left: 20%;
    margin-right: 20%;
    color: rgb(86, 81, 226);
    border: solid 5px rgb(86, 81, 226);
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
    background-color: rgb(203, 202,246);
}

.text-color-secondary-dark{
    color: #FB7837
}

.spec-button{
    background-color: #FB7837;
    font-size: 20px;
    padding: 5px 35px;
    border-radius: 20px;
}

.bg-color-secondary-dark{
    background-color: rgb(86, 81, 226);
}

.border-div{
    border-radius: 25px;
}

.form-text{
    font-size: 20px;
}

.spec-input{
    height: 50px;
    font-size: 20px;
}
</style>