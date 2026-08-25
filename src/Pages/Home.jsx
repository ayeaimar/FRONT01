import CardProduct from '../Components/CardProduct/CardProduct'
import { useProduct } from '../Context/ProductContext'

const Home = () => {
    const { products, productsLoading, error } = useProduct()
    return (
        <div>
            <p className="text-center mt-4">Elegí tu producto ⬇</p>
            <div className="flex flex-wrap gap-5 justify-center">
                {productsLoading ? (
                    <div className="loading loading-spinner"></div>
                ) : error ? (
                    <p>Error al cargar los productos</p>
                ) : (
                    products.map((product) => (
                        <CardProduct key={product._id} product={product} />
                    ))
                )}
            </div>
        </div>
    )
}

export default Home
