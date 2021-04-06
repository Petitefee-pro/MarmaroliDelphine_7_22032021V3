<template>
   <div class="form-row flex-column justify-content-center m-0 p-0">  
        <ul class="nav nav-fill">
            <li class="nav-item h-50 bg-secondary">
                <router-link class="nav-link pl-4 p-1 col-1 text-white font-weight-bold" to="/forum">
                    <i class="fas fa-angle-left"></i>
                </router-link>
            </li>   
            <li class="nav-item h-50 bg-secondary">
                <router-link class="nav-link p-1 text-white font-weight-bold" to="/forum-texte">Forum texte</router-link>
            </li>
            <li class="nav-item h-50 bg-secondary">
                <router-link class="nav-link p-1 text-white font-weight-bold" to="/forum-multimedia">Forum multimédia</router-link> 
            </li>
        </ul>  
        <view-routeur></view-routeur>
        <h1 class="text-center text-white">Forum Texte</h1>
        <div class=" formulaire border border-white rounded">
            <form id="forum" @submit.prevent="submitFormForum" class="row justify-content-center was-validated needs-validation p-0" novalidate>
                <div class="form-group col-11 col-md-10 m-0 pr-1 pl-1">
                    <label for="post" class="col-auto col-form-label col-form-label-sm"></label> 
                    <textarea name="post" id="post" class=" placeholder form-control form-control-lg" placeholder="Veuillez saisir un nouveau post" v-model="post" pattern="[A-Za-z0-9\s\-éöàäèüáúóêûîôâ']{2,1500}" required></textarea>
                    <div class="valid-feedback">Valide</div>
                    <div class="invalid-feedback"></div>
                </div>
                <div class="form-group col-6 col-md-7 col-lg-9 col-xl-11 mb-2 text-center">
                    <button type="submit" @click.prevent="submitFormForum" class="publier btn btn-primary btn-lg col-12 col-md-5 ">Publier</button>
                </div>            
            </form>
        </div>
        <!--<div class="border border-white rounded">
            <router-link class="text-white font-weight-bold mr-2" to="/post">
                <button class="btn btn-primary btn-sm col-12">Que voulez-vous dire ?</button>
            </router-link>
        </div>-->
        <div class="pt-1">
            <section v-if="errored">
                <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
            </section>
            <section v-else class="d-flex flex-column" >
                <div v-if="loading">Chargement...</div>
                <div v-else v-for="post in info" :key="post.idForum" class="forums col-12 m-0 p-0 pb-1">
                    <div class="boder border border-white rounded " >
                        <p class=" post text-white m-0 p-1">{{ post.contenuTexte }}</p>
                        <p class=" pseudo text-right m-0 p-1 lead">par {{ post.pseudo }}</p>
                    </div>
                    <div class="text-center pb-1">
                        <router-link class="text-white font-weight-bold mr-2" to="/commentaire">
                            <button class="btn btn-primary btn-sm col-5"><i class="far fa-comment-dots"></i></button>
                        </router-link>
                        <button v-if="'pseudo' === 'tata' || 'toto' || 'titi'" class="btn btn-primary btn-sm col-5"><i class="far fa-trash-alt"></i></button>
                    </div>                 
                </div>
            </section>
        </div>   
        <div>
            
            
            
        </div>        
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'forum',
    data(){
        return {
            pseudo:'',
            info: null,
            loading: true,
            errored: false            
        }
    },
    methods:{        
        submitFormForum: function (){
            let pseudo = localStorage.getItem('pseudo');
            let post = this.post;
            let regexPost = /[A-Za-z0-9\s\-éöàäèüáúóêûîôâ']{2,1500}/g;
            if((regexPost.test(post) === true)
            ){
                let message = {
                    pseudo: pseudo,
                    post: post,
                    idUser: localStorage.getItem('idUser')
                }
                console.log(message);
                const envoi = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify({ message }),
                    mode: 'cors',
                    cache: 'default'
                }
            console.log(envoi);
            fetch("http://localhost:3000/api/forum", envoi)
            .then(response => {
                console.log(response);
                location.replace('http://localhost:8080/forum-texte')
            })            
            .catch(error => alert("Erreur : " + error));
            }
        },
        
    },
    created() {
        axios
            .get ("http://localhost:3000/api/forum/", {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem('token')
                }
            })
            .then( response => {
                console.log(response)
                this.loading = false
                this.error = false
                this.info = response.data.result
            })                
            .catch(error => {
                console.log(error)
                this.errored = true
            })
        
    }
}
</script>

<style scoped>
.placeholder{
    font-size: 12px;
    font-style: italic;
}
.publier{
    font-size: 14px;
    font-weight: bold;
}
.post{
    font-size: 14px;
    font-family: 'Times New Roman', Times, serif;
}
.pseudo{
    font-size: 10px;
    font-style: italic;
    color: rgb(176, 196, 233);
}

</style>