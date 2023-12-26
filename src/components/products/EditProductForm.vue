<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type { IProduct } from '@/interface';
import {useEditProduct} from '../../composables/products/useEditProduct';


const props = defineProps<{
    product: IProduct;
}>();

const image = ref('');

const editedProduct = ref<any | null>(null);

const handleFile = (e: any) => {
    const file = e.target.files[0];
    image.value = file;
    props.product.image = URL.createObjectURL(file);
}

const {handleEdit, isLoading} = useEditProduct();
</script>

<template>
  <form @submit.prevent="handleEdit(props.product)" class="product__form">
    <div class="text-center max-w-[560px] w-full">
      <h3>Upload Image</h3>
      <input type="file" accept=".jpg, .png, .webp" @change="handleFile" />
      <p v-show="props.product.image === ''">No Image Chosen</p>
      <img :src="props.product.image" />
    </div>

    <div class="w-full">
      <h3>Product Details</h3>

      <div class="form-control">
        <label for="name">Product Name:</label>
        <input v-model="props.product.name" type="text" name="name" id="name" />
      </div>

      <div class="form-control">
        <label for="description">Description: </label>
        <textarea
          v-model="props.product.description"
          class="product__form--textarea"
          cols="3"
          rows="3"
          type="text"
          name="description"
          id="description"
        ></textarea>
      </div>

      <div class="form-control">
        <label for="stock">Stock: </label>
        <input
          v-model="props.product.stock"
          type="number"
          min="0"
          name="stock"
          id="stock"
        />
      </div>

      <div class="form-control">
        <label for="price">Price: </label>
        <input
          v-model="props.product.price"
          type="number"
          min="0"
          name="price"
          id="price"
        />
      </div>

      <div class="form-control">
        <label for="category_id">Categories: </label>
        <select
          v-model="props.product.category.id"
          class="product__form--select"
          name="category_id"
          id="category_id"
        >
          <option disabled value="">Select Category</option>
          <option
            :key="category.id"
            :value="category.id"
            v-for="category in categoryStore.categories"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="btn-primary">Edit Product</button>
    </div>
  </form>
</template>
<style scoped>
.product__form {
    @apply grid lg:flex w-full gap-12 items-center
}

.product__form--select {
    @apply py-3 px-2 rounded-lg border border-slate-400 focus:outline-primary
}

.product__form--textarea {
    @apply bg-white rounded-lg border border-slate-400 focus:outline-primary p-2
}
</style>
