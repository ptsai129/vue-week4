import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
            products: [],
            tempProducts:[]
        }
    }, 
    methods:{
        checkSignIn(){
            const checkSignInUrl = `${this.apiUrl}/api/user/check` ; 
            axios.post( checkSignInUrl).then((res)=>{
               console.log('成功登入');
            }).then((error)=>{
                alert(error.data.message);
                //跳轉到登入頁面
                window.location = 'index.html';
            })
        },
        getProductsList(){
            
        }


    },

    mounted(){
            //取得cookie內的token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            //檢查是否已登入
            this.checkSignIn();



    }
})

app.mount('#app');