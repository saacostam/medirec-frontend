<template>
    <div class="chat">
        <div class="container">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="/static/svg/arrow-left-circle.svg">
            </button>
            <div class="row">
                <div class="d-lg-block d-none col-lg-5 pt-5">
                    <img src="/static/img/doctorChatIcon.png" alt="" class="img-fluid m-2 ml-4 mt-5 d-block mx-auto" width="350px" height="350px">
                    <div class="patient-name" v-if="this.name">Paciente: {{this.name}}</div>
                    <div class="patient-name" v-else>Paciente</div>
                </div>
                <div class="col-lg-7 p-4 pt-lg-3 pt-md-5">
                    <div class="chat-div mt-lg-3 mt-md-5">
                        <div class="msg-space p-3" id="msg-scroll-id">
                            <div class="day-messages" v-for="day in this.chat" :key="day.date">
                                <div class="chat-date text-center">{{day[0].date.split('T')[0]}}</div>
                                <div class="messages m-2" v-for="message in day" :key="message.timestamp">
                                    <div class="patient-msg d-flex flex-row-reverse" v-if="message.sender[0]==='d'">
                                        <img src="/static/svg/doctorIconSearching.svg" alt="" width="90px" height="90px">
                                        <div class="patient-content">{{message.content}}</div>
                                    </div>
                                    <div class="doctor-msg d-flex flex-row" v-else>
                                        <img src="/static/img/patientChat.png" alt="" width="90px" height="90px">
                                        <div class="doctor-content">{{message.content}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="chat-division">
                        <form @submit="sendMessage" class="p-3 d-flex flex-row form-group">
                            <div class="input-group">
                                <input type="text" required v-model="message" class="msg-form flex-fill">
                                <div class="input-group-append">
                                    <input type="submit" value="Send" class="msg-submit form-control">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getAuthenticationToken} from '@/dataStorage';
import axios from 'axios';

export default {
    data(){
        const session = getAuthenticationToken();

        let dataObject = {
            message: "",
            stompClient: null,
            chat:{},
            name: 'Paciente'
        }

        const path = `/messages/p${this.$route.params.id}/d${session.userId}/all`

        axios.get(this.$store.state.backURL+path)
            .then( (response) => {
                const data = response.data.data;
                console.log(data)

                let tempChat = {}

                for (let i=0; i<data.length; i++){
                    if (!Array.isArray(tempChat[data[i].timestamp.split('T')[0]])){
                        tempChat[data[i].timestamp.split('T')[0]] = []
                    }
                    tempChat[data[i].timestamp.split('T')[0]].push({
                        recipient: data[i].recipientId,
                        sender: data[i].senderId,
                        content: data[i].content,
                        date: data[i].timestamp
                    })
                }

                console.log(tempChat)
                dataObject.chat = Object.assign({}, tempChat)  
                console.log(dataObject)
            })
            .catch(error => {
                if (error.response.data.message !== "No se pudo encontrar el chat asociado a los id's de los usuarios"){
                    this.$store.state.testToken();
                    alert( 'Error en la petición' );
                    console.log( error );
                }
            })

        const requestPath = `/patient/${this.$route.params.id}`;

        axios.get( this.$store.state.backURL + requestPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los datos de paciente' );
          }else{
            const data = response.data.data;
            dataObject.name = data.userFirstName+' '+data.userLastName
          }
        } ).catch( error => {
            this.$store.state.testToken();
            alert( 'Error en la petición' );
            console.log( error );
        } );

        return dataObject
    },
    beforeMount(){
        const Stomp = require("stompjs");
        let SockJS = require("sockjs-client");
        SockJS = new SockJS(this.$store.state.backURL+'/ws')
        this.stompClient = Stomp.over(SockJS);

        console.log(this.stompClient);

        this.stompClient.connect({}, this.onConnected, ()=>{console.log("Error")});
    },
    updated(){
        const temp = document.getElementById('msg-scroll-id');
        temp.scrollTop = temp.scrollHeight;
    },
    methods:{
        onConnected(){
            const session = getAuthenticationToken();
                
            console.log("connected");

            this.stompClient.subscribe(
            "/user/d" + session.userId + "/queue/messages", this.onMessageReceived);
        },
        onMessageReceived(){
            console.log("message received by doctor!")

            this.updateChat();
        },
        sendMessage(){
            event.preventDefault()
            const session = getAuthenticationToken();

            if (this.message !== "") {
                const message = {
                    senderId: "d"+session.userId,
                    recipientId: "p"+this.$route.params.id,
                    content: this.message,
                    timestamp: new Date(),
                };
            
                this.stompClient.send("/app/chat", {}, JSON.stringify(message));

                location.reload();
            }
        },
        back(){
            this.$router.push( {name:'navViewPatient'} );
        },
        updateChat(){
            const session = getAuthenticationToken();

            const path = `/messages/p${this.$route.params.id}/d${session.userId}/all`

            axios.get(this.$store.state.backURL+path)
                .then( (response) => {
                    const data = response.data.data;
                    console.log(data)

                    let tempChat = {}

                    for (let i=0; i<data.length; i++){
                        if (!Array.isArray(tempChat[data[i].timestamp.split('T')[0]])){
                            tempChat[data[i].timestamp.split('T')[0]] = []
                        }
                        tempChat[data[i].timestamp.split('T')[0]].push({
                            recipient: data[i].recipientId,
                            sender: data[i].senderId,
                            content: data[i].content,
                            date: data[i].timestamp
                        })
                    }

                    console.log(tempChat)
                    this.chat = Object.assign({}, tempChat)  
                })
                .catch(error => {
                    if (error.response.data.message !== "No se pudo encontrar el chat asociado a los id's de los usuarios"){
                        this.$store.state.testToken();
                        alert( 'Error en la petición' );
                        console.log( error );
                    }
                })
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
    z-index: 2;  
}

.btn-back:focus {
    box-shadow:unset;
}

.chat-div{
    border: solid 2px #418ef2;
    border-radius: 30px;
    height: 495px;
}

.msg-space{
    height: 410px;
    overflow-y: scroll;
    padding: 0px;
}

/*Width*/
.msg-space::-webkit-scrollbar {
  width: 0px;
}
/* Track */
.msg-space::-webkit-scrollbar-track {
  background: transparent;
}
/* Handle */
.msg-space::-webkit-scrollbar-thumb {
  background: #1f4567a1;
  border-radius: 3px;
}
/* Handle on hover */
.msg-space::-webkit-scrollbar-thumb:hover {
  background: #1F4567;
}

.chat-date{
    font-size: 0.9em;
    font-weight: 600;
}

.chat-division{
    background-color: #418ef2;
    height: 1px;
    padding: 0px;
    margin: 0px;
}

.patient-msg{
    width: 83%;
    margin-left: auto;
}

.doctor-msg{
    width: 83%;
    margin-right: auto
}

.patient-content, .doctor-content{
    margin: 16px;
    width: 100%;
    border-radius: 32px;
    padding: 16px 16px;
    font-weight: 600;
    font-size: 0.9em;
}

.doctor-content{
    border: solid 2px #FB7837;
}

.patient-content{
    border: solid 2px rgb(129, 125, 233);
}

.doc-name{
    background-color: #1F4567;
    text-align: center;
    color: white;
    padding: 10px;
    font-weight: 700;
    font-size: 1.2em;
}

.patient-name{
    background-color: rgb(86, 81, 226);
    color: white;
    text-align: center;
    font-size: 1.3em;
    width: 80%;
    margin: 24px auto;
    border-radius: 20px;
    padding: 6px;
}

</style>