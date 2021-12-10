import Vue from 'vue';
import Router from 'vue-router';

import SignUpPick from './views/SignUpPick'
import SignUpPatient from "./views/SignUpPatient";
import SignUpDoctor from "./views/SignUpDoctor";

import SignUpPatient1 from "@/components/signup/patient1";
import SignUpPatient2 from "@/components/signup/patient2";
import SignUpPatient3 from "@/components/signup/patient3";

import SignUpDoctor1 from "@/components/signup/doctor1";
import SignUpDoctor2 from "@/components/signup/doctor2";
import SignUpDoctor3 from "@/components/signup/doctor3";

import Login from "./views/Login";
import Blank from "./views/Blank";
import PasswordRecovery from "./components/passwordRecovery/PasswordRecovery"
import PatientPassword from "./components/passwordRecovery/PatientPassword"
import DoctorPassword from "./components/passwordRecovery/DoctorPassword"
import App from "./views/App";

import Profile from "./components/app/Profile";
import Home from "./components/app/Home";
import DataUpdate from "./components/app/DataUpdate";
import MyMedRecord from "./components/medRecord/MyMedRecord"
import CreateMedRecord from "./components/medRecord/CreateMedRecord"
import UploadMedRecordFile from "./components/medRecord/UploadMedRecordFile"

import ViewMedRecord from "./components/medRecord/viewMedRecord/ViewMedRecord"
import ViewAllergies from "./components/medRecord/viewMedRecord/ViewAllergies"
import ViewIllnesses from "./components/medRecord/viewMedRecord/ViewIllnesses"
import ViewPersonalRecords from "./components/medRecord/viewMedRecord/ViewPersonalRecords"
import ViewFamilyBackgrounds from "./components/medRecord/viewMedRecord/ViewFamilyBackgrounds"
import ViewFiles from "./components/medRecord/viewMedRecord/ViewFiles"

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
      path: "/registro/doctor",
      name: "signup-doctor",
      component: SignUpDoctor,
      children: [
        {
          path: "1",
          name: "signupdoctor1",
          component: SignUpDoctor1
        },
        {
          path: "2",
          name: "signupdoctor2",
          component: SignUpDoctor2
        },
        {
          path: "3",
          name: "signupdoctor3",
          component: SignUpDoctor3
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
      path: "/recuperacion-contrasena",
      name: "blank-recu",
      component: Blank,
      children:[
        {
          path: "email",
          name: "passwordRecovery",
          component: PasswordRecovery
        },
        {
          path: "paciente",
          name:"patientPassword",
          component: PatientPassword
        },
        {
          path: "doctor",
          name:"doctorPassword",
          component: DoctorPassword
        }
      ]
    },
    {
      path: "/app",
      name: "app",
      component: App,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
        },
        {
          path: "/perfil",
          name: "profile",
          component: Profile,
        },
        {
          path: "/actualiza-datos",
          name: "dataUpdate",
          component: DataUpdate,
        },
        {
          path: "/mi-historia-clinica",
          name: "blank-myMed",
          component: Blank,
          children:[
            {
              path: "nav",
              name: "myMedRecord",
              component: MyMedRecord
            },
            {
              path: "create",
              name: "createMedRecord",
              component: CreateMedRecord
            },
            {
              path: "upload-file",
              name: "uploadMedRecordFile",
              component: UploadMedRecordFile
            },
            {
              path: 'view',
              name: 'blank-viewMyMed',
              component: Blank,
              children: [
                {
                  path: 'nav',
                  name: 'viewMedRecord',
                  component: ViewMedRecord
                },
                {
                  path: 'alergias',
                  name: 'viewAllergies',
                  component: ViewAllergies
                },
                {
                  path: 'enfermedades',
                  name: 'viewIllnesses',
                  component: ViewIllnesses
                },
                {
                  path: 'antecedentes',
                  name: 'viewPersonalRecords',
                  component: ViewPersonalRecords
                },
                {
                  path: 'antecedentes-familiares',
                  name: 'viewFamilyBackgrounds',
                  component: ViewFamilyBackgrounds
                },
                {
                  path: 'archivos',
                  name: 'viewFiles',
                  component: ViewFiles
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
