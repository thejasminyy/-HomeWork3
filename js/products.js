const url = 'https://vue3-course-api.hexschool.io/'; // 站點
const path = 'jasmin'; // 個人api

 //預設變數
  let productModal = null;
  let delProductModal = null;

Vue.createApp({
  data() {
    return  {
      products:[],
      temporaryProuct:{},
      deleteProductId:"",
    }
  },
  methods: {
    getProduct() {
      axios.get(`${url}api/${path}/admin/products`).then((res)=>{
        this.products = res.data.products;
        console.log(res.data.products);
      })
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
    modifyProduct(id) {
      //get modal data
      const data = {
        ...this.temporaryProuct,
        origin_price: parseInt(this.temporaryProuct.origin_price),
        price: parseInt(this.temporaryProuct.price)
      };
      if(id == undefined) {
        this.postNewProduct(data);
      }else{
        this.putProduct(id,data);
      }
    },
    deleteProduct(id) {
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

}).mount('#app');