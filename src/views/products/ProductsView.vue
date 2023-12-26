<script lang="ts" setup>
import HeaderPage from "@/components/shared/HeaderPage.vue";
import ProductItem from "@/components/products/ProductItem.vue";

import { useProductStore } from '../../stores/product';
import { storeToRefs } from 'pinia';

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
console.log(products)
</script>

<template>
  <HeaderPage
    title="Product Management"
    btn-title="New Product"
    pathname="new-product"
    description="Manage your product inventory"
  />

  <!-- LISTADO DE PRODUCTOS -->
  <ul class="space-y-4">
    <li v-for="product in products" :key="product.id">
      <ProductItem :product="product" />
    </li>
  </ul>
</template>
