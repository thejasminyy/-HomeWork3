const template = `
<tr v-for="item in products" :key="item.id">
  <td>{{ item.category }}</td>
  <td>{{ item.title }}</td>
  <td class="text-end">{{ item.origin_price }}</td>
  <td class="text-end">{{ item.price }}</td>
  <td>
    <span v-if="item.is_enabled" class="text-success">啟用</span>
    <span v-else>未啟用</span>
  </td>
  <td>
    <div class="btn-group">
      <button type="button" 
      class="btn btn-outline-primary btn-sm" @click="passProductId(item.id,'edit')">編輯
      </button>
      <button type="button" 
      class="btn btn-outline-danger btn-sm" @click="passProductId(item.id,'delete')">刪除 
      </button>
    </div>
  </td>
</tr>`;

let delProductModal = null;
export default  {
  data() {
    return {
      
    }
  },
  props: 'products',
  template: template,
  methods: {
    passProductId(id,pattern) {
      this.$emit('emit-product-id',id,pattern);
    }
  },
}