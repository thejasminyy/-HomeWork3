const url = 'https://vue3-course-api.hexschool.io/'; // 站點
const path = 'jasmin'; // 個人api


Vue.createApp({
  data() {
    return {
      username:'',
      password:''
    }
  },methods:{
    login() {
      let user = {
        username:this.username,
        password:this.password
      };
      console.log(user)
      axios.post(`${url}admin/signin`,user).then((res) => {
        console.log(res);
      if(res.data.success){
        console.log(res.data.success)
        const token = res.data.token;
        const expired = res.data.expired;
        document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`;
        window.location = 'products.html';  //登入成功就跳轉頁面
      } else {
        alert(res.data.message);  //錯誤就跳提示訊息
      }
    }).catch((error) => {
      console.log(error);
    })
    }
  }
}).mount('#app')
