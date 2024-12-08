/* eslint-disable @typescript-eslint/no-explicit-any */
import { products as mockProducts } from '../mock-data/products'
import { questions } from '../mock-data/questions'

let UNIQUE_ID = 31

const getDeepCopy = (obj: any) => JSON.parse(JSON.stringify(obj))
const simulateApiCall = () => new Promise((resolve) => setTimeout(resolve, 500))

export interface Ingredient {
  [x: string]: string | number
  product_id: number
  quantity: number
}

export interface Product {
  id: number
  title: string
  in_stock: boolean
  ingredients: Ingredient[]
}

export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

const getAllProducts = async (): Promise<Product[]> =>
  new Promise((resolve) =>
    setTimeout(() => resolve(getDeepCopy(mockProducts)), 1000)
  )

export const createIngredient = async (
  name: string,
  quantity: number
): Promise<Product> => {
  const newProduct: Product = {
    id: UNIQUE_ID++,
    title: name,
    in_stock: quantity > 0,
    ingredients: [],
  }

  mockProducts.push(newProduct)
  await simulateApiCall()
  return getDeepCopy(newProduct)
}

const getProductById = async (id: number): Promise<Product | undefined> =>
  new Promise((resolve) => {
    setTimeout(
      () => resolve(getDeepCopy(mockProducts.find((p) => p.id === id))),
      1000
    )
  })

export const toggleProductInStock = async (id: number) => {
  const productIndex = mockProducts.findIndex((product) => product.id === id)
  if (productIndex === -1) throw new Error('Product not found')

  const updatedProducts = [...mockProducts]
  const product = updatedProducts[productIndex]
  product.in_stock = !product.in_stock

  updatedProducts.forEach((p) =>
    p.ingredients.forEach((ingredient) => {
      if (ingredient.product_id === id) p.in_stock = product.in_stock
    })
  )

  await simulateApiCall()
  return updatedProducts
}

export const createSalad = async (
  title: string,
  ingredients: Ingredient[]
): Promise<Product> => {
  const inStock = ingredients.every((ingredient) => {
    const product = mockProducts.find(
      (prod) => prod.id === ingredient.product_id
    )
    return product?.in_stock ?? false
  })

  const newSalad: Product = {
    id: UNIQUE_ID++,
    title,
    in_stock: inStock,
    ingredients,
  }

  mockProducts.push(newSalad)
  await simulateApiCall()
  return getDeepCopy(newSalad)
}

const getQuestions = async (): Promise<Question[]> =>
  new Promise((resolve) => setTimeout(() => resolve(questions), 1000))

export const DB = {
  getAllProducts,
  getProductById,
  getQuestions,
  toggleProductInStock,
  createIngredient,
  createSalad,
}
