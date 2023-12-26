<script lang="ts" setup>
import { useProductStore } from '../../stores/product';
import type { IProductsResponseData } from '@/interface';

const baseUrl = 'http://localhost:8000';

defineProps<{
    product: IProductsResponseData
}>()

const productStore = useProductStore();
</script>

<template>
  <div
    class="product__card grid lg:grid-cols-9 gap-7 items-center font-semibold"
  >
    <div>
      <img :src="baseUrl + product.image" :alt="product.name" />
    </div>
    <p>
      Product Name: <br />
      <span class="font-normal line-clamp-1">{{ product.name }}</span>
    </p>

    <p>
      Categories: <br />
      <span class="font-normal line-clamp-1">{{ product.category.name }}</span>
    </p>

    <p>
      Price: <br />
      <span class="font-normal">Rp. {{ product.price }}</span>
    </p>

    <p>
      Stock: <br />
      <span class="font-normal">{{ product.stock }}</span>
    </p>
    <div class="col-span-3">
      <p>Acciones</p>
      <div class="flex gap-2 items-center">
        <RouterLink
          :to="{ path: `/products/${ product.slug }` }"
          class="btn-primary text-center"
          >View</RouterLink
        >
        <RouterLink
          :to="{ path: `/products/edit/${ product.slug }` }"
          class="btn-primary text-center"
        >
          Edit
        </RouterLink>
        <button
          @click="productStore.deleteProductById(`${ product.id }`)"
          class="btn-delete"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
