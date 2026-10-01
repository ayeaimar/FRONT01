import { useState } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import CardProduct from '../Components/CardProduct/CardProduct'
import { useProduct } from '../Context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()
    const [selectedCategory, setSelectedCategory] = useState('all')

    const categories = ['Taza', 'Indumentaria']
    const normalizeCategory = (category) => {
        const normalizedCategory = (category || 'Taza').trim().toUpperCase()

        if (normalizedCategory === 'TAZA' || normalizedCategory === 'TAZAS') {
            return 'Taza'
        }

        if (normalizedCategory === 'INDUMENTARIA') {
            return 'Indumentaria'
        }

        return category?.trim()
    }

    const filteredProducts =
        selectedCategory === 'all'
            ? products
            : products.filter(
                  (product) =>
                      normalizeCategory(product.category) === selectedCategory
              )

    console.log(products)
    return (
        <div>
            <p className="flex items-center justify-center gap-2 pt-6">
                Elegí tu producto
                <FaArrowDown aria-hidden="true" />
            </p>
            {!productsLoading && !error && (
                <div className="flex justify-center mt-6">
                    <select
                        value={selectedCategory}
                        onChange={(event) =>
                            setSelectedCategory(event.target.value)
                        }
                        className="select select-bordered"
                        aria-label="Filtrar productos por categoría"
                    >
                        <option value="all">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="flex flex-wrap gap-8 justify-center mt-10 px-4">
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : error ? (
                    <p>Error al cargar los productos</p>
                ) : (
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <CardProduct key={product._id} product={product} />
                        ))
                    ) : (
                        <p className="text-center w-full mt-4">
                            No hay productos en esta categoría
                        </p>
                    )
                )}
            </div>
        </div>
    )
}

export default Home
