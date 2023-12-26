<script lang="ts" setup>
import { useRoute } from 'vue-router';
import HeaderPage from '@/components/shared/HeaderPage.vue';
import { useCategoryStore } from '../../stores/category';
import { onMounted, ref } from 'vue';
import LoadingScreen from '@/components/shared/LoadingScreen.vue';
import EditCategoryForm from '@/components/categories/EditCategoryForm.vue';
import type { ICategoriesResponse } from '../../interface/categories/categories-response';


const { params } = useRoute();
const categoryStore = useCategoryStore();

const category = ref<ICategoriesResponse | undefined>({
    id: 0,
    created_at: '',
    name: '',
    slug: '',
    updated_at: '',
});


onMounted(async () => {
    category.value = await categoryStore.getCategoryByTerm(params.slug as string);
    console.log(category.value);
})
</script>

<template>
  <LoadingScreen v-if="categoryStore.isLoading" />

  <template v-else>
    <HeaderPage
      pathname="categories"
      btn-title="Go Back"
      title="Edit a Category"
      description="Edit the details of a category"
    />
    <EditCategoryForm :category="category!" />
  </template>
</template>
