const url = 'https://vue3-course-api.hexschool.io/'; // 站點
const path = 'jasmin'; // 個人api
// import pagination from '../components/pagation.js';
import pagination from './components/pagation.js';

// import productList from '../components/productList.js';
import productList from './components/productList.js';
// import productModalComponent from '../comments/productModal.js';
import productModalComponent from './comments/productModal.js';

// import deleteModalComponent from '../comments/deleteModal.js'
import deleteModalComponent from './comments/deleteModal.js'



 //預設變數
  let productModal = null;
  let delProductModal = null;

const app = Vue.createApp({
  data() {
    return  {
      products:[],
      temporaryProuct:{},
      totalPageNum:0,
      currentPage: 1,
      deleteProductId:"",
    }
  },
  components: {
    pagination, 
    productList,
    productModalComponent,
    deleteModalComponent   
  },
  methods: {
    getProduct(page) {
      axios.get(`${url}api/${path}/admin/products? page=${page}`).then((res)=>{
        this.products = res.data.products;
        //取得總頁數
        this.totalPageNum = res.data.pagination.total_pages;      
        console.log(res.data.products);
      })
    },
    getPageNum(pageNum) {
      if (pageNum == "pre") {
        //如果不是在第一頁
        if(this.currentPage !==1){
           this.currentPage -= 1; 
        }      
      } else if(pageNum == "next") {
        //如果不是在最後一頁
        if (this.currentPage !== this.totalPageNum ){
        this.currentPage += 1;
        }        
      } else{
        this.currentPage = pageNum;
      }     
    },
    getProductId(id,pattern){     
      this.showProductModal(pattern,id);       
    }, 
    showProductModal(pattern,direction) {
      if(pattern == 'create') {
        //add
        productModal.show();
        this.temporaryProuct={};
      } else if(pattern == 'edit') {
        //edit
        productModal.show();
        this.temporaryProuct  = this.products.find(product=>{
          return product.id == direction
        });        
      } else if(pattern == 'delete') {
        //delete
        this.deleteProductId = direction;
        delProductModal.show();
      }
    },
    getModifyProduct(product){
      //利用product是否有id來判定是編輯還是新增
      if(product.id){
        //編輯
        this.putProduct(product.id,product);
      }else{
        //新增
      this. postNewProduct(product);
      }
     },  
    deleteProduct() {
      const id = this.deleteProductId;
      axios.delete(`${url}api/${path}/admin/product/${id}`).then(res=>{
        if(!res.data.success) {
          alert(res.data.message);  
          delProductModal.hide();
        } else {
          alert(res.data.message);
          this.deleteProductId = "";
          delProductModal.hide();
          this.getProduct();
        }
      })
    },
    postNewProduct(newProduct) {
      axios.post(`${url}api/${path}/admin/product`, { data: newProduct }).then(res=>{
        if(!res.data.success) {
          productModal.hide();
          alert(`${res.data.message}`);
        } else {
          alert("產品建立成功!!");
          productModal.hide();
          this.getProduct();
        }
      })
    },
    putProduct(id,editedProduct) {
      axios.put(`${url}api/${path}/admin/product/${id}`, { data: editedProduct }).then(res=>{
        alert(res.data.message);
        productModal.hide();
        this.getProduct();
      })
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //判斷是否有帶token
    if(token == ""){
      alert('您尚未登入請重新登入');
      window.location = 'login.html';
    }

    axios.defaults.headers.common.Authorization = token;
    console.log(this);
    this.getProduct();

    //addProductModal實體化
    productModal = new bootstrap.Modal(document.querySelector('#productModal'));
    //deleteProductModal實體化
    delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
  }

});
app.mount('#app');