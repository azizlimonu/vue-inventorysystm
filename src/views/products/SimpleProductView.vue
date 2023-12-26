<script lang="ts" setup>
import { useRoute } from 'vue-router';

import HeaderPage from '@/components/shared/HeaderPage.vue';
import { useProductStore } from '../../stores/product';
import { storeToRefs } from 'pinia';
import LoadingScreen from '@/components/shared/LoadingScreen.vue';
import ProductContent from '@/components/products/ProductContent.vue';
import { onMounted } from 'vue';

const { params } = useRoute();

const productStore = useProductStore();
const { product, isLoading } = storeToRefs(productStore);

onMounted(async () => {
  try {
   const result= await productStore.getProductBySlug(params.slug as string);
  //  console.log("RESULT", result);
    product.value = result;
    // console.log("PRODUCT IS TRUE", result);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <LoadingScreen v-if="isLoading" />

  <template v-else>
    <HeaderPage
      title="Product Details"
      description="Product Description"
      btn-title="Go Back"
      pathname="products"
    />

    <ProductContent :product="product!" />
  </template>
</template>
