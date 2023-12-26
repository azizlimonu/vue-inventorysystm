<script lang="ts" setup>
import { useCartStore } from '../../stores/cart';
import type { IProductsResponseData } from '@/interface';
import { useRoute } from 'vue-router';
const route = useRoute()
const {params}=route;
console.log(params);
const baseUrl = import.meta.env.VITE_API_URL;

const cartStore = useCartStore();

defineProps<{
    product: IProductsResponseData
}>()
</script>

<template>
  <p>PRODUCT DETAILS</p>
  <div
    class="product__card grid md:grid-cols-7 gap-2 items-center font-semibold text-sm"
  >
    <div>
      <img
        class="rounded-full max-w-[60px]"
        :src="baseUrl + product.image"
        :alt="product.name"
      />
    </div>
    <p>
      Product Name: <br />
      <span class="font-normal line-clamp-1">{{ product.name }}</span>
    </p>
    <p>
      Price: <br />
      <span class="font-normal">Rp. {{ product.price }}</span>
    </p>

    <p>
      Stock: <br />
      <span class="font-normal">{{ product.stock }}</span>
    </p>
    <div class="col-span-2">
      <p>Actions</p>
      <button
        @click="cartStore.addProductCart(product, 1)"
        class="btn-primary text-sm"
      >
        Add To Cart
      </button>
    </div>
  </div>
</template>
