import { useEffect } from 'react'
import { useProduct } from '../Context/ProductContext'
import { useParams } from 'react-router'
import { useCart } from '../Context/CartContext'
import { useUser } from '../Context/UserContext'
import FormattedPrice from '../Components/FormattedPrice/FormattedPrice'

const DetailProduct = () => {
    const { id } = useParams()
    const { getProductById, product, productLoading } = useProduct()
    const { addToCart, openModal } = useCart()
    const { isAuthenticated } = useUser()
    useEffect(() => {
        getProductById(id)
    }, [id, getProductById])

    const handleAddToCart = async () => {
        await addToCart(product)
        openModal()
    }

    return (
        <>
            {productLoading ? (
                <div className="loading loading-spinner"></div>
            ) : (
                <div className="mt-6 md:flex">
                    <div className="md:w-1/2">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <section className="flex flex-col gap-5 pt-2 md:pt-0 md:pl-0 md:w-1/2">
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="text-xl badge badge-warning p-4 font-bold">
                            <FormattedPrice price={product.price} />
                        </p>
                        <p className="text-lg">{product.description}</p>
                        {isAuthenticated() && (
                            <button
                                onClick={handleAddToCart}
                                className="btn btn-success mt-2 md:mt-auto md:btn-lg"
                            >
                                Agregar al carrito
                            </button>
                        )}
                    </section>
                </div>
            )}
        </>
    )
}

export default DetailProduct
