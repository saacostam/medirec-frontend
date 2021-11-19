<template>
  <div class="sign-up h-100">
    <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
      <path fill="#FB7837" fill-opacity="0.5" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
      <path fill="#418EF2" fill-opacity="0.5" d="M0,96L40,133.3C80,171,160,245,240,261.3C320,277,400,235,480,208C560,181,640,171,720,154.7C800,139,880,117,960,133.3C1040,149,1120,203,1200,208C1280,213,1360,171,1400,149.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
    </svg>

    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="offset-md-2 col-md-8 d-flex align-items-center justify-content-center">
          <div class="">
            <div class="logo text-center d-flex align-items-center justify-content-center mb-3">
              <img src="../../public/static/img/heart-rate.png" alt="logo" width="96" height="96" viewBox="0 0 96 96">
              <h1 class="text-color-main-light d-inline ml-2">MediRec</h1>
            </div>

            <form @submit="signUp" class="bg-color-main-light pt-4 pb-4 pl-4 pr-4 input-color form-group">
              <h2 class="text-center text-white mb-4 h4">Registro de Paciente</h2>

              <div class="form-row">
                <div class="col">
                  <div class="form-group mb-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text bg-color-main-dark border-0 text-white">
                          <img src="../../public/static/svg/person-circle.svg" class="user" width="16" height="16" viewBox="0 0 16 16">
                        </div>
                      </div>
                      <input v-model="firstName" type="text" class="form-control bg-color-main-dark border-0 text-white" placeholder="Nombres" required>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="form-group mb-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text bg-color-main-dark border-0 text-white">
                          <img src="../../public/static/svg/person-circle.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                        </div>
                      </div>
                      <input v-model="lastName" type="text" class="form-control bg-color-main-dark border-0 text-white" placeholder="Apellidos" required>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col">
                  <div class="form-group mb-4">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text bg-color-main-dark border-0 text-white">
                          <img src="../../public/static/svg/person-badge.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                        </div>
                      </div>
                      <input v-model="doc" type="number" class="form-control bg-color-main-dark border-0 text-white" placeholder="Documento" required>
                      <div class="input-group-append">
                        <select v-model="docType" class="bg-color-main-dark border-0 text-white" required>
                          <option value="CC">CC</option>
                          <option value="TI">TI</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="../../public/static/svg/envelope.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input v-model="email" type="email" class="form-control bg-color-main-dark border-0 text-white" placeholder="Correo Electronico" required>
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="../../public/static/svg/bandaid.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input v-model="eps" type="text" class="form-control bg-color-main-dark border-0 text-white" placeholder="EPS" required>
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="../../public/static/svg/shield-lock.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input v-model="password" type="password" class="form-control bg-color-main-dark border-0 text-white" placeholder="Contraseña" required>
                </div>
              </div>
              <div class="form-group mb-4">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text bg-color-main-dark border-0 text-white">
                      <img src="../../public/static/svg/shield-lock.svg" class="password" width="16" height="16" viewBox="0 0 16 16">
                    </div>
                  </div>
                  <input class="form-control bg-color-main-dark border-0 text-white" type="password"
                     placeholder="Confirmar Contraseña" v-model="cPassword" required
                     :class="{ 'is-invalid': cPassword !== '' && cPassword !== password,
                                 'is-valid': cPassword !== '' && cPassword === password }"/>
                </div>
              </div>
              <div class="d-flex justify-content-center mb-0">
                <button type="submit" class="btn bg-color-secondary-dark text-white">Ingresar</button>
              </div>
            </form>
            <div>
              <p class="text-color-main-dark text-center mb-0 font-weight-half">¿Ya tienes cuenta? <router-link to="/">Inicia Sesión</router-link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  const path = '/register/patient';

  export default {
    name: "SignUpPatient",
    data( ){
      return{
        firstName: '',
        lastName: '',
        docType: 'CC',
        doc: '',
        email: '',
        password: '',
        cPassword: '',
        eps: '',
        response: null
      }
    },
    beforeCreate( ){},
    methods:{
      signUp( event ){
        if( this.password !== this.cPassword ){
          event.preventDefault( );
          return;
        }
        axios
          .post( this.$store.state.backURL + path,
            {
              firstName: this.firstName.trim( ),
              lastName: this.lastName.trim( ),
              docType: this.docType.trim( ),
              doc: this.doc,
              email: this.email,
              password: this.password,
              eps: this.eps
            }
          ).then( response => {
            if( response.status !== 200 ){
              alert( "Error en el almacenamiento del usuario" )
            }else{
              this.$router.push( {name: 'login'} );
            }
          }).catch( error =>{
            if( error.response.status === 400 ){
              alert( "Parece que ya existe un usuario con el nombre de usuario \"" + this.username + "\"" );
            }else{
              alert( "Error en la aplicación" );
            }
          });
        event.preventDefault( );
        return true;
      }
    }
  }
</script>

<style scoped>
.form-control::placeholder{
  color: white;
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
	background-image: url("../../public/static/img/login-image.jpeg");
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
