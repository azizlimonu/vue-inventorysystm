<script setup lang="ts">
import { ref } from 'vue';
import { useToastStore } from '../../stores/toast';
import { useProductStore } from '../../stores/product';
import { useCategoryStore } from '../../stores/category';
import type { IProduct } from '@/interface';

const toastStore = useToastStore();
const productStore = useProductStore();
const categoryStore = useCategoryStore();

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const props = defineProps<{ product: IProduct }>();

const image = ref<File | null>(null);
const preImage = ref(props.product.image);

const product = ref({
  name:  props.product.name,
  id:props.product.id,
  description: props.product.description,
  stock: props.product.stock,
  price: props.product.price ,
  category_id: props.product.category.id,
});

const handleFile = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    image.value = input.files[0];
    preImage.value = URL.createObjectURL(image.value);
  }
};

const handleSubmit = async () => {
  if (product.value.name.trim() === '') {
    toastStore.showToast('error', 'Input Valid Name');
    return;
  }

  if (product.value.stock <= 0) {
    toastStore.showToast('error', 'Input Valid Stock');
    return;
  }

  if (product.value.price <= 0) {
    toastStore.showToast('error', 'Input Valid Price');
    return;
  }

const edited=  await productStore.editProduct(props.product.id, image.value, product.value);
console.log("EDITED OK", edited);
};
</script>

<template>
  <form @submit.prevent="handleSubmit" class="product__form">
    <div class="text-center max-w-[560px] w-full">
      <h3>Upload Image</h3>
      <input
        v-if="!props.product"
        type="file"
        accept=".jpg, .png, .webp"
        @change="handleFile"
      />
      <p v-show="preImage === ''">No Image Chosen</p>
      <img :src="preImage" alt="image product" />
    </div>

    <div class="w-full">
      <h3>Product Details</h3>

      <div class="form-control">
        <label for="name">Product Name:</label>
        <input v-model="product.name" type="text" name="name" id="name" />
      </div>

      <div class="form-control">
        <label for="description">Description: </label>
        <textarea
          v-model="product.description"
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
          v-model="product.stock"
          type="number"
          min="0"
          name="stock"
          id="stock"
        />
      </div>

      <div class="form-control">
        <label for="price">Price: </label>
        <input
          v-model="product.price"
          type="number"
          min="0"
          name="price"
          id="price"
        />
      </div>

      <div class="form-control">
        <label for="category_id">Categories: </label>

        <select
          v-model="product.category_id"
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

      <button class="btn-primary">
        {{ props.product ? 'Update Product' : 'Create Product' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.product__form {
  @apply grid lg:flex w-full gap-12 items-center;
}

.product__form--select {
  @apply py-3 px-2 rounded-lg border border-slate-400 focus:outline-primary;
}

.product__form--textarea {
  @apply bg-white rounded-lg border border-slate-400 focus:outline-primary p-2;
}
</style>
