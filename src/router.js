import Vue from 'vue';
import Router from 'vue-router';
import SignUpPick from './views/SignUpPick'
import SignUpPatient from "./views/SignUpPatient";
import Login from "./views/Login";
import App from "./views/App";
import AddRole from "./components/AddRole";
import Profile from "./components/Profile";
import Courses from '@/views/Courses';
import Roles from "@/components/Roles";

import SignUpPatient1 from "@/components/signup/patient1";
import SignUpPatient2 from "@/components/signup/patient2";
import SignUpPatient3 from "@/components/signup/patient3";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/registro",
      name: "signup-pick",
      component: SignUpPick
    },
    {
      path: "/registro/paciente",
      name: "signup-paciente",
      component: SignUpPatient,
      children: [
        {
          path: "1",
          name: "signuppatient1",
          component: SignUpPatient1
        },
        {
          path: "2",
          name: "signuppatient2",
          component: SignUpPatient2
        },
        {
          path: "3",
          name: "signuppatient3",
          component: SignUpPatient3
        }
      ]
    },
    {
      path: "/",
      alias: "/iniciar-sesion",
      name: "login",
      component: Login
    },
    {
      path: '/mis-cursos',
      name: 'courses',
      component: Courses
    },
    {
      path: "/app",
      name: "app",
      component: App,
      children: [
        {
          path: "profile",
          name: "profile",
          component: Profile,
        },
        {
          path: "nuevo-rol",
          name: "add-role",
          component: AddRole
        },
        {
          path: "roles",
          name: "roles",
          component: Roles
        }
      ]
    }
  ]
})
