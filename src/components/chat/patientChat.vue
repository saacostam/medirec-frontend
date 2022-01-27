<template>
    <div class="chat">
        <div class="doc-name">{{this.name}}</div>
        <div class="container">
            <button class="btn btn-back p-0 m-4" @click="back">
                <img src="../../../public/static/svg/arrow-left-circle.svg">
            </button>
            <div class="row">
                <div class="d-lg-block d-none col-lg-5 pt-5">
                    <img src="../../../public/static/img/chatPanel.png" alt="" class="img-fluid m-2 ml-4 mt-5" width="400px" height="300px">
                </div>
                <div class="col-lg-7 p-4 pt-lg-3 pt-md-5">
                    <div class="chat-div mt-lg-3 mt-md-5">
                        <div class="msg-space p-3" id="msg-scroll-id">
                            <div class="day-messages" v-for="day in this.chat" :key="day.date">
                                <div class="chat-date text-center">{{day[0].date.split('T')[0]}}</div>
                                <div class="messages m-2" v-for="message in day" :key="message.timestamp">
                                    <div class="patient-msg d-flex flex-row-reverse" v-if="message.sender[0]==='p'">
                                        <img src="../../../public/static/img/patientChat.png" alt="" width="90px" height="90px">
                                        <div class="patient-content">{{message.content}}</div>
                                    </div>
                                    <div class="doctor-msg d-flex flex-row" v-else>
                                        <img src="../../../public/static/svg/doctorIconSearching.svg" alt="" width="90px" height="90px">
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
            name: 'Doctor'
        }

        const path = `/messages/d${this.$route.params.id}/p${session.userId}/all`

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

        const requestPath = `/doctor/${this.$route.params.id}`;

        axios.get( this.$store.state.backURL + requestPath, { params: { sessionToken: session.token } } )
        .then( response => {
          if( response.status !== 200 ){
            alert( 'Error Obteniendo los Sintomas' );
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
        this.stompClient.connect({}, this.onConnected, ()=>{console.log("Error")});
    },
    updated(){
        const temp = document.getElementById('msg-scroll-id')
        temp.scrollTop = temp.scrollHeight;
    },
    methods:{
        onConnected(){
            const session = getAuthenticationToken();
                
            console.log("connected");

            this.stompClient.subscribe(
            "/user/p" + session.userId + "/queue/messages",this.onMessageReceived);
        },
        onMessageReceived(){
            console.log("message received by patient!")

            const session = getAuthenticationToken();
            const path = `/messages/d${this.$route.params.id}/p${session.userId}/new`

            axios.get(this.$store.state.backURL+path)
                .then( (response) => {
                    const message = response.data.data[0];
                    if (message){
                        console.log('Data', message)

                        let tempChat = this.chat
                        let today  = new Date()
                        today = String(today.getFullYear())+'-'+String(today.getMonth()+1).padStart(2, "0")+'-'+String(today.getDate()).padStart(2, "0")
                        tempChat[today.split('T')[0]].push({
                            content: message.content,
                            date: (new Date()).toUTCString(),
                            recipient: message.recipientId,
                            sender: message.senderId
                        })

                        this.chat = Object.assign({}, tempChat)  
                        console.log(this.chat)
                    }
                })
                .catch(error => {
                    this.$store.state.testToken();
                    alert( 'Error en la petición' );
                    console.log( error );
                })
        },
        sendMessage(){
            event.preventDefault()
            const session = getAuthenticationToken();

            if (this.message !== "") {
                const message = {
                    senderId: "p"+session.userId,
                    recipientId: "d"+this.$route.params.id,
                    content: this.message,
                    timestamp: new Date(),
                };
            
                this.stompClient.send("/app/chat", {}, JSON.stringify(message));

                let tempChat = this.chat
                let today  = new Date()
                today = String(today.getFullYear())+'-'+String(today.getMonth()+1).padStart(2, "0")+'-'+String(today.getDate()).padStart(2, "0")
                tempChat[today.split('T')[0]].push({
                    content: this.message,
                    date: (new Date()).toUTCString(),
                    recipient: message.recipientId,
                    sender: message.senderId
                })

                this.chat = Object.assign({}, tempChat)  
                console.log(this.chat)

                this.message = ''
            }
        },
        back(){
            this.$router.push( {name:'navViewDoctor'} );
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
    height: 450px;
}

.msg-space{
    height: 365px;
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
    border: solid 2px;
    width: 100%;
    border-radius: 32px;
    padding: 16px 16px;
    font-weight: 600;
    font-size: 0.9em;
}

.patient-content{
    border-color: #FB7837;
}

.doctor-content{
    border-color: rgb(129, 125, 233);
}

.doc-name{
    background-color: #1F4567;
    text-align: center;
    color: white;
    padding: 10px;
    font-weight: 700;
    font-size: 1.2em;
}

</style>