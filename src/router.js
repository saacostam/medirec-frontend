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

import MyReviews from "./components/app/myReviews"

import MyMedRecord from "./components/medRecord/MyMedRecord"
import BlankMedRecord from "./components/medRecord/BlankMedRecord"
import CreateMedRecord from "./components/medRecord/CreateMedRecord"
import UpdateMedRecord from "./components/medRecord/UpdateMedRecord"
import UploadMedRecordFile from "./components/medRecord/UploadMedRecordFile"
import ViewMedRecord from "./components/medRecord/viewMedRecord/ViewMedRecord"
import ViewAllergies from "./components/medRecord/viewMedRecord/ViewAllergies"
import ViewIllnesses from "./components/medRecord/viewMedRecord/ViewIllnesses"
import ViewPersonalRecords from "./components/medRecord/viewMedRecord/ViewPersonalRecords"
import ViewFamilyBackgrounds from "./components/medRecord/viewMedRecord/ViewFamilyBackgrounds"
import ViewFiles from "./components/medRecord/viewMedRecord/ViewFiles"

import BlankMyDoctor from "./components/myDoctors/BlankMyDoctors"
import MyDoctors from "./components/myDoctors/MyDoctors"
import SearchDoctors from "./components/myDoctors/SearchDoctors"
import ViewDoctorProfile from "./components/myDoctors/ViewProfile"

import MyRequests from "./components/myRequests/MyRequests"

import blankSymptoms from "./components/symptoms/blank"
import navSymptoms from "./components/symptoms/nav"
import addSymptoms from "./components/symptoms/add"
import navViewSymptoms from "./components/symptoms/viewnav"
import viewSymptoms from "./components/symptoms/viewsymptoms"
import viewMeds from "./components/symptoms/viewmeds"

import blankViewDoctor from "./components/viewDoctor/blank"
import navViewDoctor from "./components/viewDoctor/nav"
import profileViewDoctor from "./components/viewDoctor/profile"
import rateDoctor from "./components/viewDoctor/rate"

import blankViewPatient from "./components/viewPatient/blank"
import navViewPatient from "./components/viewPatient/nav"
import profileViewPatient from "./components/viewPatient/profile"

import blankViewMedRecordPatient from "./components/viewPatient/BlankMedRecord"
import navViewMedRecordPatient from "./components/viewPatient/medRecord/ViewMedRecord"
import allergyViewMedRecordPatient from "./components/viewPatient/medRecord/ViewAllergies"
import illnessViewMedRecordPatient from "./components/viewPatient/medRecord/ViewIllnesses"
import personalViewMedRecordPatient from "./components/viewPatient/medRecord/ViewPersonalRecords"
import familyViewMedRecordPatient from "./components/viewPatient/medRecord/ViewFamilyBackgrounds"
import filesViewMedRecordPatient from "./components/viewPatient/medRecord/ViewFiles"

import blankViewSymptomsPatient from "./components/viewPatient/symptoms/blank"
import navViewSymptomsPatient from "./components/viewPatient/symptoms/viewnav"
import viewSymptomsPatient from "./components/viewPatient/symptoms/viewsymptoms"
import viewMedsPatient from "./components/viewPatient/symptoms/viewmeds"

import BlankMyPatient from "./components/myPatients/BlankMyPatients"
import MyPatients from "./components/myPatients/MyPatients"
import SearchPatients from "./components/myPatients/SearchPatients"
import ViewPatientProfile from "./components/myPatients/ViewProfile"

import patientChat from "./components/chat/patientChat"
import doctorChat from "./components/chat/doctorChat"

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: "/registro",
            name: "signup-pick",
            component: SignUpPick
        },
        {
            path: "/registro/paciente",
            name: "signup-paciente",
            component: SignUpPatient,
            children: [{
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
            children: [{
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
            children: [{
                    path: "email",
                    name: "passwordRecovery",
                    component: PasswordRecovery
                },
                {
                    path: "paciente",
                    name: "patientPassword",
                    component: PatientPassword
                },
                {
                    path: "doctor",
                    name: "doctorPassword",
                    component: DoctorPassword
                }
            ]
        },
        {
            path: "/app",
            name: "app",
            component: App,
            children: [{
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
                    path: "/mis-reseñas",
                    name: "MyReviews",
                    component: MyReviews
                },
                {
                    path: "/mi-historia-clinica",
                    name: "blank-myMed",
                    component: BlankMedRecord,
                    children: [{
                            path: "nav",
                            name: "myMedRecord",
                            component: MyMedRecord
                        },
                        {
                            path: "crear",
                            name: "createMedRecord",
                            component: CreateMedRecord
                        },
                        {
                            path: 'actualizar',
                            name: 'updateMedRecord',
                            component: UpdateMedRecord
                        },
                        {
                            path: "subir-archivo",
                            name: "uploadMedRecordFile",
                            component: UploadMedRecordFile
                        },
                        {
                            path: 'view',
                            name: 'blank-viewMyMed',
                            component: Blank,
                            children: [{
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
                },
                {
                    path: '/mis-doctores',
                    name: 'blank-myDoc',
                    component: BlankMyDoctor,
                    children: [{
                            path: 'nav',
                            name: 'myDoctors',
                            component: MyDoctors
                        },
                        {
                            path: 'buscar',
                            name: 'searchDoctors',
                            component: SearchDoctors
                        },
                        {
                            path: 'perfil/:id',
                            name: 'viewDoctorProfile',
                            component: ViewDoctorProfile
                        }
                    ]
                },
                {
                    path: '/mis-pacientes',
                    name: 'blank-myPat',
                    component: BlankMyPatient,
                    children: [{
                            path: 'nav',
                            name: 'myPatients',
                            component: MyPatients
                        },
                        {
                            path: 'buscar',
                            name: 'searchPatients',
                            component: SearchPatients
                        },
                        {
                            path: 'perfil/:id',
                            name: 'viewPatientProfile',
                            component: ViewPatientProfile
                        }
                    ]
                },
                {
                    path: "/mis-solicitudes",
                    name: "myRequests",
                    component: MyRequests
                },
                {
                    path: "/mis-sintomas-y-medicamentos",
                    name: "mySymptoms",
                    component: blankSymptoms,
                    children: [{
                            path: "nav",
                            name: "navSymptoms",
                            component: navSymptoms
                        },
                        {
                            path: "añadir",
                            name: "addSymptoms",
                            component: addSymptoms
                        },
                        {
                            path: "nav-visualizacion",
                            name: "navViewSymptoms",
                            component: navViewSymptoms
                        },
                        {
                            path: 'visualizacion-sintomas',
                            name: "viewSymptoms",
                            component: viewSymptoms
                        },
                        {
                            path: 'visualizacion-medicamentos',
                            name: "viewMeds",
                            component: viewMeds
                        }
                    ]
                },
                {
                    path: "/doctor/:id",
                    name: "blankViewDoctor",
                    component: blankViewDoctor,
                    children: [{
                            path: "nav",
                            name: "navViewDoctor",
                            component: navViewDoctor
                        },
                        {
                            path: "perfil",
                            name: "profileViewDoctor",
                            component: profileViewDoctor
                        },
                        {
                            path: "calificacion",
                            name: "rateDoctor",
                            component: rateDoctor
                        },
                        {
                            path: "chat",
                            name: "patientChat",
                            component: patientChat
                        }
                    ]
                },
                {
                    path: "/paciente/:id",
                    name: "blankViewPatient",
                    component: blankViewPatient,
                    children: [{
                            path: "nav",
                            name: "navViewPatient",
                            component: navViewPatient
                        },
                        {
                            path: "perfil",
                            name: "profileViewPatient",
                            component: profileViewPatient
                        },
                        {
                            path: "chat",
                            name: "doctorChat",
                            component: doctorChat
                        },
                        {
                            path: "historia-medica",
                            name: "blankViewMedRecordPatient",
                            component: blankViewMedRecordPatient,
                            children: [{
                                    path: "nav",
                                    name: "navViewMedRecordPatient",
                                    component: navViewMedRecordPatient
                                },
                                {
                                    path: "alergias",
                                    name: "allergyViewMedRecordPatient",
                                    component: allergyViewMedRecordPatient
                                },
                                {
                                    path: "enfermedades",
                                    name: "illnessViewMedRecordPatient",
                                    component: illnessViewMedRecordPatient
                                },
                                {
                                    path: "antecedentes-personales",
                                    name: "personalViewMedRecordPatient",
                                    component: personalViewMedRecordPatient
                                },
                                {
                                    path: "antecedentes-familiares",
                                    name: "familyViewMedRecordPatient",
                                    component: familyViewMedRecordPatient
                                },
                                {
                                    path: "archivos",
                                    name: "filesViewMedRecordPatient",
                                    component: filesViewMedRecordPatient
                                }
                            ]
                        },
                        {
                            path: "sintomas-y-medicamentos",
                            name: "blankViewSymptomsPatient",
                            component: blankViewSymptomsPatient,
                            children: [{
                                    path: "visualizar-nav",
                                    name: "navViewSymptomsPatient",
                                    component: navViewSymptomsPatient
                                },
                                {
                                    path: "sintomas",
                                    name: "viewSymptomsPatient",
                                    component: viewSymptomsPatient
                                },
                                {
                                    path: "medicamentos",
                                    name: "viewMedsPatient",
                                    component: viewMedsPatient
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
})