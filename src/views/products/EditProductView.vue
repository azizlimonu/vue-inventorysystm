<script lang="ts" setup>
// import HeaderPage from '@/components/shared/HeaderPage.vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '../../stores/product';
import { onMounted, ref } from 'vue';
import LoadingScreen from '@/components/shared/LoadingScreen.vue';
import type { IProduct } from '../../interface/products/full-product';
import EditProductForm from '@/components/products/EditProductForm.vue';

const { params } = useRoute();
const productStore = useProductStore();

const product = ref<any | null>({
    id:0,
    name:"",
    description:"",
    stock:0,
    slug:"",
    price:0,
    image:"",
    category: "",
    createdAt:"",
});

onMounted(async () => {
   const result= await productStore.getProductBySlug(params.slug as string);
  product.value = result;

});
</script>

<template>
  <LoadingScreen v-if="productStore.isLoading" />

  <template v-else>
    <HeaderPage
      pathname="products"
      btn-title="Go Back"
      title="Edit Product"
      description="Edit the details of a product"
    />
    <EditProductForm :product="product" />
  </template>
</template>
