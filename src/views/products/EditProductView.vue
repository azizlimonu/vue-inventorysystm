<script lang="ts" setup>
import { useRoute } from 'vue-router';
import HeaderPage from '@/components/shared/HeaderPage.vue';
import { useProductStore } from '../../stores/product';
import { onMounted, ref } from 'vue';
import LoadingScreen from '@/components/shared/LoadingScreen.vue';
import type { IProduct } from '../../interface/products/full-product';
import EditProductFormView from '@/components/products/EditProductForm.vue';

const { params } = useRoute();
const productStore = useProductStore();

const product = ref<any | undefined>({
     id:          0,
    name:        "",
    description: "",
    stock:       0,
    slug:        "",
    price:       0,
    image:       "",
    category:  {
      id:'',
      name:'',
      slug:'',
      created_at: "",
      updated_at: "",
    },
    createdAt:   "",
});


onMounted(async () => {
    product.value = await productStore.getProductBySlug(params.slug as string);
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
    <EditProductFormView :product="product" />
  </template>
</template>
