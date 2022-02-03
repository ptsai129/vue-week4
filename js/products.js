import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
//匯入元件
import pagination from '/js/pagination.js'

let productModal ={};
let delProductModal ={};


const app = createApp({
    //區域註冊 頁碼元件
    components:{  
        pagination

    },
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
            products: [],
            isNew :false, //編輯or新增產品modal標題判斷用
            temp:{
                imagesUrl:[]
            },
            pagination:{}
        }
    }, 
    methods:{
        //檢查登入狀態
        checkSignIn(){
            const checkSignInUrl = `${this.apiUrl}/api/user/check` ; 
            axios.post( checkSignInUrl).then((res)=>{
                this.getProductsList();
            }).then((error)=>{
                alert(error.data.message);
                //跳轉到登入頁面
                window.location = 'index.html';
            })
        },
        //取得產品列表  //參數預設值
        getProductsList(page = 1 ){
            const getProductsUrl = `${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`;
            axios.get(getProductsUrl).then((res)=>{
                this.products = res.data.products; 
                this.pagination = res.data.pagination;
            })
        }, 
        //開啟modal
        openModal(type, product){
             
           if ( type === 'new'){
            //如果判斷是新增產品 temp內的資料會被清空
            this.temp = {
                imagesUrl:[]
            }
             //modal標題顯示新增產品
             this.isNew = true;
            //打開modal
            productModal.show();

           }else if(type ==='edit'){
            //如果判斷是編輯產品 
            this.temp = {...product};
            //modal標題顯示編輯產品
            this.isNew = false; 
            productModal.show();
               
           }else if(type === 'delete'){
            this.temp ={...product};
            //顯示modal
            delProductModal.show();

           }
        },
        updateProducts(){
            let updateUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let requestMethod = 'post';
            //如果是編輯商品資料 api網址和請求方法會更改
            if( this.isNew === false){
                updateUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;
                requestMethod = 'put';
            }
            axios[requestMethod](updateUrl , {data: this.temp})
            .then((res)=>{
                //顯示已建立產品
                alert(res.data.message);
                //重新取得新的資料並渲染到畫面上
                 this.getProductsList();
                //關閉modal
                productModal.hide();
            })
            .catch((err)=>{
                alert(err.data.message);
          })
    },
     
      //刪除產品
      deleteProduct(){
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`)
        .then((res)=>{
            alert(res.data.message);
            delProductModal.hide();
            this.getProductsList();
        }).catch((err)=>{
            alert(err.data.message);
        })

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

//全域註冊元件 新增編輯產品modal
app.component('product-modal',{
    props:['temp', 'isNew'],
    template:'#productModalTemplate',
    data(){
        return{
            apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
            apiPath : 'ptsai129', //個人 API Path
        }
    },
    methods:{
        updateProducts(){
            let updateUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let requestMethod = 'post';
            //如果是編輯商品資料 api網址和請求方法會更改
            if( this.isNew === false){
                updateUrl = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.temp.id}`;
                requestMethod = 'put';
            }
            axios[requestMethod](updateUrl , {data: this.temp})
            .then((res)=>{
                //顯示已建立產品
                alert(res.data.message);
                //重新取得新的資料並渲染到畫面上
                this.$emit('update');
                //關閉modal
                productModal.hide();
            })
            .catch((err)=>{
                alert(err.data.message);
          })
    },
     
       

    },
    mounted(){
        productModal = new bootstrap.Modal(document.getElementById('productModal'),{
            keyboard:false//取消使用esc關閉modal功能
        })

    }
    
})

//全域註冊元件 新增編輯產品modal
app.component('delete-modal',{
 props:['item'],
 template:'#deleteProductTemplate',
 data(){
    return{
        apiUrl :'https://vue3-course-api.hexschool.io/v2', //api的網址
        apiPath : 'ptsai129', //個人 API Path
    }
},

methods:{

    deleteProduct(){
        axios.delete(`${this.apiUrl}/api/${this.apiPath}/admin/product/${this.item.id}`)
        .then((res)=>{
            alert(res.data.message);
            delProductModal.hide();
            this.$emit('update');
        }).catch((err)=>{
            alert(err.data.message);
        })

    }

},
mounted(){
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
        keyboard: false
    });
}


})

app.mount('#app');