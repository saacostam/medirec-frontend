<template>
  <div class="login h-100"> 
    <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 160">
      <path fill="#FB7837" fill-opacity="0.5" d="M0,192L21.8,170.7C43.6,149,87,107,131,101.3C174.5,96,218,128,262,144C305.5,160,349,160,393,138.7C436.4,117,480,75,524,85.3C567.3,96,611,160,655,154.7C698.2,149,742,75,785,53.3C829.1,32,873,64,916,106.7C960,149,1004,203,1047,234.7C1090.9,267,1135,277,1178,256C1221.8,235,1265,181,1309,154.7C1352.7,128,1396,128,1418,128L1440,128L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
    </svg>
    <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#418EF2" fill-opacity="0.5" d="M0,320L21.8,277.3C43.6,235,87,149,131,117.3C174.5,85,218,107,262,133.3C305.5,160,349,192,393,176C436.4,160,480,96,524,101.3C567.3,107,611,181,655,197.3C698.2,213,742,171,785,181.3C829.1,192,873,256,916,282.7C960,309,1004,299,1047,282.7C1090.9,267,1135,245,1178,234.7C1221.8,224,1265,224,1309,229.3C1352.7,235,1396,245,1418,250.7L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path>
    </svg>

    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Mitad Izquierda -->
        <div class="col-md-6" id="img-doctor">
        </div>

        <!-- Mitad Derecha -->
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="col-8 col-sm-8 col-md-10 col-lg-8">
            <div class="logo text-center d-flex align-items-center justify-content-center mb-3">
              <img src="/static/svg/MedirecLogo.svg" alt="logo" width="auto" height="96" viewBox="0 0 96 96">
            </div>

            <form @submit="login" class="bg-color-main-light pt-4 pb-4 pl-4 pr-4 input-color form-group">
              <h2 class="text-center text-white mb-4 h4">Inicia Sesión</h2>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="/static/svg/envelope.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input v-model="email" type="email" class="form-control border-0 text-white" placeholder="Correo Electronico" required style="background-color: #dae1e6">
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="/static/svg/shield-lock.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input v-model="password" type="password" class="form-control border-0 text-white" placeholder="Contraseña" required style="background-color: #dae1e6">
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="/static/svg/person-badge.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <select v-model="role" class="form-control border-0" required style="background-color: #dae1e6">
                    <option value="PATIENT">Paciente</option>
                    <option value="DOCTOR">Doctor</option>
                  </select>
                </div>
              </div>
              <!---->
              <div class="mb-4 p-0 border-0 text-center alert alert-danger  " role="alert">
                <small id="my-message" class=""></small>
              </div>
              <!---->
              <div class="d-flex justify-content-center mb-0">
                <button type="submit" class="btn bg-color-secondary-dark text-white">Ingresar</button>
              </div>
            </form>
            <div>
              <p class="text-color-main-dark text-center mb-0 font-weight-half">¿No tienes cuenta? <router-link to="/registro">Registrate</router-link></p>
            </div>
            <div>
              <p class="text-color-main-dark text-center font-weight-half"><router-link :to="{ name: 'passwordRecovery'}"> ¿Olvidaste tu Contraseña?</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
    import axios from 'axios';
    import {setAuthenticationToken} from '@/dataStorage';

    const path = "/login";

    export default {
        name: "Login.vue",
        components: {},
        data(){
            return {
                email: '',
                password: '',
                role: 'PATIENT'
            }
        },
        methods: {
            login( event ){
                axios
                .post( this.$store.state.backURL + path, // URL: localhost:8080 + /login
                    {
                      email: this.email,
                      password: this.password,
                      role: this.role }, // Body
                    {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                    }
                ).then( response => {
                    if( response.status !== 200 ){
                        this.myAlert('Error en la autenticación');
                    }else{
                        setAuthenticationToken( response.data );
                        
                        this.$router.push( {name: 'home'} );
                    }
                } ).catch( error => {
                    if( error.response.status === 400 ){
                      this.myAlert('Credenciales Incorrectas');
                    }else{
                      this.myAlert('¡Parece que hubo un error de comunicación con el servidor!');
                    }
                } );

                event.preventDefault();
            },
            myAlert(text){
              document.getElementById('my-message').innerText = text;
            }
        }
    }
</script>




<style scoped>
/* .form-control::placeholder{
  color: white;
  opacity: 50%;
} */

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

.z-back{
	z-index: -100;
}

#submit{
	font-weight: 800;
}

a{
	color: #418ef2;
}

#img-doctor{
	background-image: url("/static/img/login-image.jpeg");
	background-position: top right;
	background-size:cover;
}

#div-login{
	border-radius: 25px;
}

.font-weight-half{
	font-weight: 500;
}

.input-color input:focus{
	background-color: #1F4567;
}
</style>
