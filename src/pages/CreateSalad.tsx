/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { PRODUCTS_KEY } from '../data-providers/const'
import { DB, Ingredient } from '../data-providers/Server'
import styles from '../styles/createSalad.module.css'

export default function CreateSalad() {
  const [saladName, setSaladName] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  )
  const [loading, setLoading] = useState(false)
  const [ingredients, setIngredients] = useState<any[]>([])

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
    const validIngredients = savedProducts.filter(
      (product: any) =>
        Array.isArray(product.ingredients) && product.ingredients.length === 0
    )
    setIngredients(validIngredients)
  }, [])

  const handleIngredientToggle = (ingredient: any) => {
    if (!ingredient.in_stock) return
    const exists = selectedIngredients.some(
      (item) => item.product_id === ingredient.id
    )
    if (exists) {
      setSelectedIngredients((prev) =>
        prev.filter((item) => item.product_id !== ingredient.id)
      )
    } else {
      setSelectedIngredients((prev) => [
        ...prev,
        { product_id: ingredient.id, quantity: 1 },
      ])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (selectedIngredients.length === 0) {
        alert('Please select at least one ingredient.')
        setLoading(false)
        return
      }
      const newSalad = await DB.createSalad(saladName, selectedIngredients)
      const savedProducts = JSON.parse(
        localStorage.getItem(PRODUCTS_KEY) || '[]'
      )
      const updatedProducts = [...savedProducts, newSalad]
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))
      setSaladName('')
      setSelectedIngredients([])
    } catch (error) {
      console.error('Error creating salad:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.createSaladContainer}>
      <h1 className={styles.title}>Create New Salad</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.ingredientsContainer}>
          {ingredients.map((ingredient) => (
            <button
              key={ingredient.id}
              type="button"
              className={`${styles.ingredientButton} ${
                selectedIngredients.some(
                  (item) => item.product_id === ingredient.id
                )
                  ? styles.selected
                  : ''
              } ${!ingredient.in_stock ? styles.outOfStock : ''}`}
              onClick={() => handleIngredientToggle(ingredient)}
              disabled={!ingredient.in_stock}
            >
              {ingredient.title}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Salad Name"
          value={saladName}
          onChange={(e) => setSaladName(e.target.value)}
          className={styles.input}
          required
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading || !saladName}
        >
          {loading ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
