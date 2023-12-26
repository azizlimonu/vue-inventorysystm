<script lang="ts" setup>
import ProductForm from "@/components/products/ProductForm.vue";
import HeaderPage from '@/components/shared/HeaderPage.vue';
</script>

<template>
  <HeaderPage
    title="New Product"
    description="Add a product to the inventory"
    btn-title="Go Back"
    pathname="products"
  />
  <ProductForm />
</template>
