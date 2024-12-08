import styles from '../styles/products.module.css'
import { useEffect, useState } from 'react'
import { DB, Product } from '../data-providers/Server'
import { IoExtensionPuzzle } from 'react-icons/io5'
import SearchFilter from '../components/SearchFilter'
import Pagination from '../components/Pagination'
import { PRODUCTS_KEY } from '../data-providers/const'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const productsPerPage = 10

  useEffect(() => {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY)
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts)
        if (Array.isArray(parsedProducts)) {
          setProducts(parsedProducts)
        } else {
          console.error('LocalStorage data is not an array')
        }
      } catch (error) {
        console.error('Error parsing LocalStorage data:', error)
      }
      setLoading(false)
    } else {
      fetchProductsFromServer()
    }
  }, [])

  const fetchProductsFromServer = async () => {
    const productsFromServer = await DB.getAllProducts()
    setProducts(productsFromServer)
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsFromServer))
    setLoading(false)
  }

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    }
  }, [products])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const currentPageProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  if (loading) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.productsPage}>
      <SearchFilter
        onSearch={(query) => {
          setSearchTerm(query)
          setCurrentPage(1)
        }}
        onReset={() => {
          setSearchTerm('')
          setCurrentPage(1)
        }}
      />

      {filteredProducts.length === 0 && (
        <div className={styles.noResults}>No results found</div>
      )}

      {filteredProducts.length > 0 &&
        currentPageProducts.map((product) => {
          const isSalad = product.ingredients.length > 0
          const isOutOfStock =
            !product.in_stock ||
            product.ingredients.some((ingredient) => {
              const ingredientProduct = products.find(
                (p) => p.id === ingredient.product_id
              )
              return !ingredientProduct?.in_stock
            })

          const stockClass = isOutOfStock ? styles.outOfStock : styles.inStock

          return (
            <div
              key={product.id}
              className={`${styles.productCard} ${stockClass}`}
            >
              <h1>{product.title}</h1>
              {isSalad && (
                <div className={styles.ingredients}>
                  <h3>Ingredients:</h3>
                  <ul>
                    {product.ingredients.map((ingredient, index) => {
                      const ingredientProduct = products.find(
                        (p) => p.id === ingredient.product_id
                      )
                      const ingredientQuantity =
                        ingredientProduct?.in_stock === false
                          ? 0
                          : ingredient.quantity
                      return (
                        <li key={index}>
                          {ingredientProduct?.title || 'Unknown'} (Quantity:{' '}
                          {ingredientQuantity})
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              <p>
                {isSalad ? <IoExtensionPuzzle color="black" size={25} /> : null}
              </p>
              {product.ingredients.length === 0 && (
                <button
                  onClick={() => {
                    const updatedProducts = products.map((p) =>
                      p.id === product.id ? { ...p, in_stock: !p.in_stock } : p
                    )
                    setProducts(updatedProducts)
                  }}
                  className={styles.toggleStockButton}
                >
                  {product.in_stock ? 'Set Out of Stock' : 'Set In Stock'}
                </button>
              )}
            </div>
          )
        })}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
