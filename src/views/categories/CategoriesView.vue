<script lang="ts" setup>
import { ref } from 'vue';
import HeaderPage from '@/components/shared/HeaderPage.vue';
import CategoryCard from "@/components/categories/CategoryCard.vue";
import { useCategoryStore } from '../../stores/category';

const categoryStore = useCategoryStore();

const title = ref('Categories')
</script>

<template>
  <HeaderPage
    btn-title="Category"
    pathname="new-category"
    :title="title"
    description="List Product Category"
  />

  <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
    <CategoryCard
      :key="category.id"
      :category="category"
      v-for="category in categoryStore.categories"
    />
  </div>
</template>
