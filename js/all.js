import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const app = createApp({
    //關注點分離
     data (){
        return {
            apiUrl:'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath: 'ptsai129', //個人 API Path,
            user:{
                "username":'',
                "password":''
            }
       }
     }, 
     methods:{
        signIn(){
             const signInUrl = `${this.apiUrl}/admin/signin`;
             axios.post(signInUrl , this.user)
             .then((res)=>{
                 //把res.data內的token 和expired存到token 和expired變數內
                 const {token , expired} = res.data; 
                //https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
                //把res.data內的token跟expired存在cookie 存在myToken這個名稱 expired是unix格式是要用new Date轉格式
                document.cookie = `myToken=${token}; expires=${new Date(expired)}; path=/`;
                 //跳轉到產品列表頁面
                 window.location = 'products.html';

             }).catch((error)=>{
                //登入若失敗清空欄位並用 alert 提醒使用者
                alert(error.data.message);
                this.user.username ="";
                this.user.password ="";
             })
         }

     }
 });
 //掛載
app.mount('#app');