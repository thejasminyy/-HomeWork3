export default {
  data() {
      return {
          
      }
  },
  props:['totalPageNum','currentPage'],
  template:`
  <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" @click.prevent="clickPage('pre')">Previous</a></li>
    
    <li class="page-item" :class="{'active':num===currentPage }" v-for="num in totalPageNum"><a class="page-link" href="#" @click.prevent="clickPage(num)" >{{num}}</a></li>
    
    <li class="page-item"><a class="page-link" href="#" @click.prevent="clickPage('next')">Next</a></li>
  </ul>
</nav>`,
  methods: {
    clickPage(num){
      //傳送點擊的頁數
      this.$emit('emit-page-num',num);   
     }
  },
}