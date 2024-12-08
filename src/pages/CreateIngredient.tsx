import { useState } from 'react'
import { PRODUCTS_KEY } from '../data-providers/const'
import { DB } from '../data-providers/Server'
import styles from '../styles/createIngredient.module.css'

export default function CreateIngredient() {
  const [ingredientName, setIngredientName] = useState('')
  const [ingredientQuantity, setIngredientQuantity] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const newIngredient = await DB.createIngredient(
        ingredientName,
        ingredientQuantity
      )
      const savedProducts = JSON.parse(
        localStorage.getItem(PRODUCTS_KEY) || '[]'
      )
      const updatedProducts = [...savedProducts, newIngredient]
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts))
      setIngredientName('')
      setIngredientQuantity(1)
    } catch (error) {
      console.error('Error creating ingredient:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.createIngredientContainer}>
      <h1>Create Ingredient</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ingredient Name:</label>
          <input
            type="text"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </div>
        <div>
          <label>Ingredient Quantity:</label>
          <input
            type="number"
            value={ingredientQuantity}
            onChange={(e) => setIngredientQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Ingredient'}
        </button>
      </form>
    </div>
  )
}
