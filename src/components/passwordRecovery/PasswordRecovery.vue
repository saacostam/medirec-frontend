<template>
    <div class="container">
        <div class="row">
            <form @submit="submit" class="offset-md-3 col-md-6" v-if="!this.sent">
                <div class="form-group">
                    <label for="email">Correo Electronico</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>

                <div class="form-group">
                    <label for="role">Rol</label>
                    <select name="role" class="form-control" id="role" v-model="role" required>
                        <option value="PATIENT">Paciente</option>
                        <option value="DOCTOR">Doctor</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-primary" v-if="!this.inProgress">Submit</button>
                <div class="spinner-border" role="status" v-else>
                    <span class="sr-only">Loading...</span>
                </div>
            </form>
            <div v-else>
                <h4>Correo Enviado</h4>
                <p>Revise su correo para autenticar el proceso.</p>
                <button class="btn btn-primary" @click="toLogin">Volver al Login</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    let path = "/password/recovery/";

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
                    path += "patient/resetPassword";
                }else{
                    path += "doctor/resetPassword";
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
                        alert('Correo enviado satisfactoriamente!')
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
            }
        }
    }
</script>

<style scoped>

</style>