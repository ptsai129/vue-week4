//預設匯出
export default{
 //使用props接受外部傳來的值 自定義接收到值的名稱為pages
 props:['pages'],
 //第八行如果沒有前一頁要disabled掉
 template:`<nav aria-label="Page navigation example">
 <ul class="pagination">
   <li class="page-item" :class="{ disabled: !pages.has_pre}" > 
     <a class="page-link" href="#" aria-label="Previous"      @click.prevent="$emit('get-productlist', pages.current_page-1)">
       <span aria-hidden="true">&laquo;</span>
     </a>
   </li>
   <li class="page-item" :class="{active: page === pages.current_page }" v-for="page in pages.total_pages" :key="page +'page'">
   <a class="page-link" href="#" @click.prevent="$emit('get-productlist', page)">{{ page }}</a>
   </li>
   <li class="page-item"  :class="{ disabled: !pages.has_next}" >
     <a class="page-link" href="#" aria-label="Next"  @click.prevent="$emit('get-productlist', pages.current_page + 1)">
       <span aria-hidden="true">&raquo;</span>
     </a>
   </li>
 </ul>
</nav>`
}

