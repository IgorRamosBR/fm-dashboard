import { CategoryModel } from "../models/category";

const URL = "https://b7yjwtjc7a.execute-api.us-east-1.amazonaws.com/dev/categories";

async function getCategories(): Promise<CategoryModel[]> {
    return fetch(URL)
        .then(response => response.json())
        .then(response => {return response as CategoryModel[]})
        .then(cat => cat.sort((a,b) => a.priority >= b.priority ? 1 : -1))
}

async function createCategory(category: CategoryModel) {
    const response = await fetch(URL, {
        method: 'POST',
          body: JSON.stringify(category),
    })
    
    if(response.status < 200 || response.status > 299) {
        throw new Error('Error to create the category')
    }
}

async function updateCategoryOrder(categories: CategoryModel[]) {
    const response = await fetch(`${URL}/order`, {
        method: 'PUT',
          body: JSON.stringify(categories),
    })
    
    if(response.status < 200 || response.status > 299) {
        throw new Error('Error to update category order')
    }
}

export const CategoryApi = {
    getCategories,
    createCategory,
    updateCategoryOrder,
}