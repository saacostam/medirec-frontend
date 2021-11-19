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
      component: SignUpPatient
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
