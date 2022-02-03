<template>
  <div class="sign-up h-100">
    <!-- <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
      <path fill="#FB7837" fill-opacity="0.5" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
    <svg class="fixed-bottom z-back" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300">
      <path fill="#418EF2" fill-opacity="0.5" d="M0,96L40,133.3C80,171,160,245,240,261.3C320,277,400,235,480,208C560,181,640,171,720,154.7C800,139,880,117,960,133.3C1040,149,1120,203,1200,208C1280,213,1360,171,1400,149.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
    </svg> -->

    <div class="container-fluid h-100">
      <div class="row h-100">
        <!-- Mitad Izquierda -->
        <div class="col-md-6" id="img-doctors">
        </div>

        <!-- Mitad Derecha -->
        <div class="col-md-6 d-flex">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios'

  const path = '/register/doctor';

  export default {
    name: "SignUpDoctor",
    data( ){
      return{}
    },
    beforeCreate(){},
    methods:{}
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

#img-doctors{
	background-image: url("/static/img/registro-doctor.png");
	background-position: top center;
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
