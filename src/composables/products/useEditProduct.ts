import { ref } from 'vue';

import { useToastStore } from '../../stores/toast';
import { useProductStore } from '@/stores/product';
import type { IProduct } from '@/interface';
import { useRoute } from 'vue-router';

export const useEditProduct = () => {

  const toastStore = useToastStore();
  const productStore = useProductStore();
  const { params } = useRoute();
  const isLoading = ref(false);

  const handleSubmit = async (product: IProduct) => {

    if (product.name.trim() === "") {
      toastStore.showToast('error', "Input Valid Name Product");
      return;
    }

    if (product.name.trim() === '') {
      toastStore.showToast('error', 'Input Valid Name');
      return;
    }

    if (product.stock <= 0) {
      toastStore.showToast('error', 'Input Valid Stock');
      return;
    }

    if (product.price <= 0) {
      toastStore.showToast('error', 'Input Valid Price');
      return;
    }

    isLoading.value = true;
    await productStore.editProduct(params.slug as string, product.image, product);
    isLoading.value = false;

  }

  return {
    handleSubmit,
    isLoading,
  }
}
