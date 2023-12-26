import { onMounted, ref } from "vue";
import router from "@/router";
import { defineStore } from "pinia";

import productServices from "@/services/productServices";
import type { IProduct, IProductCreate, IProductsResponseData } from "@/interface";

import { useToastStore } from "./toast";
import { handleAxiosError } from "@/helpers/handle-axios-error";
import inventoryDb from "@/api/inventoryDb";

export const useProductStore = defineStore('product', () => {

    const toastStore = useToastStore();
    const isLoading = ref(false);
    const products = ref<IProductsResponseData[]>([]);
    const product = ref<IProduct>();

    async function getAllProducts() {
        isLoading.value = true;
        try {
            const data = await productServices.find();
            products.value = data;
            isLoading.value = false;

        } catch (error) {
            handleAxiosError(error);

        } finally {
            isLoading.value = false;
        }

    }

    async function createNewProduct(image: any, product: IProductCreate) {
        try {
            const message = await productServices.create(image, product);
            toastStore.showToast('success', message);

            router.push('/products');
            getAllProducts();

        } catch (error) {
            handleAxiosError(error);
        }
    }


    async function getProductBySlug(slug: string) {
        try {
            isLoading.value = true;
            const data = await productServices.findOne(slug);
            console.log("DATA", data);
            return data;

        } catch (error) {
            router.push('/products');
            handleAxiosError(error);
        } finally {
            isLoading.value = false;
        }
    }

    async function deleteProductById(id: string) {
        try {
            const message = await productServices.remove(id);
            toastStore.showToast('success', message);
            getAllProducts();
        } catch (error) {
            handleAxiosError(error);
        }
    }

    async function editProduct(id: number, image: any, product: any) {
        try {
            // If a new image is provided, upload it first
            let imageUrl = '';
            if (image) {
                const formData = new FormData();
                formData.append('image', image);
                const { data } = await inventoryDb.post('/upload', formData);
                imageUrl = data;
            }

            // Update the product details
            const { data } = await inventoryDb.put(`/products/${id}`, {
                ...product,
                image: imageUrl,
            });

            return data.message;
        } catch (error) {
            toastStore.showToast('error', "Error update product");
        }
    }


    onMounted(() => {
        getAllProducts();
    })

    return {
        products,
        product,
        isLoading,

        // METHODS
        createNewProduct,
        getProductBySlug,
        deleteProductById,
        editProduct
    }
})