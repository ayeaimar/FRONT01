import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useProduct } from '../../../Context/ProductContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

const CreateProductForm = () => {
    const [file, setFile] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ mode: 'onChange' })

    const { createProduct } = useProduct()

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('stock', data.stock)
        formData.append('category', data.category)
        formData.append('imageUrl', file)

        if (file) {
            formData.append('imageUrl', file)
        }

        const result = await createProduct(formData)

        if (result.success) {
            toast.success(result.message)
            reset()
            navigate('/admin/dashboard/products')
        } else {
            toast.error(result.message)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col gap-4 lg:gap-6 max-w-[500px] mx-auto"
        >
            <div>
                <input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message: 'Mínimo 3 caracteres',
                        },
                        maxLength: {
                            value: 50,
                            message: 'Máximo 50 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.name
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    autoComplete="name"
                />
                {errors.name && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('description', {
                        required: 'La descripción es requerida',
                        minLength: {
                            value: 50,
                            message: 'Mínimo 50 caracteres',
                        },
                        maxLength: {
                            value: 500,
                            message: 'Máximo 500 caracteres',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.description
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="text"
                    placeholder="Descripción"
                    name="description"
                    autoComplete="description"
                />
                {errors.description && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div>
                <select
                    {...register('category', {
                        required: 'La categoría es requerida',
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.category
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    defaultValue=""
                >
                    <option value="">Seleccionar categoría</option>
                    <option value="Indumentaria">Indumentaria</option>
                    <option value="Taza">Taza</option>
                </select>
                {errors.category && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.category.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('price', {
                        required: 'El precio es requerido',
                        min: {
                            value: 2,
                            message: 'El precio debe ser máyor a 1',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.price
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="number"
                    placeholder="Precio"
                    name="price"
                    autoComplete="price"
                />
                {errors.price && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.price.message}
                    </p>
                )}
            </div>
            <div>
                <input
                    {...register('stock', {
                        required: 'El stock es requerido',
                        min: {
                            value: 0,
                            message:
                                'El stock minimo debe ser mayor o igual a 0',
                        },
                    })}
                    className={`p-2 outline-2 rounded border focus:outline-primary w-full ${
                        errors.stock
                            ? 'border-red-500 outline-red-500 focus:outline-red-500'
                            : ''
                    }`}
                    type="number"
                    placeholder="Stock"
                    name="stock"
                    autoComplete="stock"
                />
                {errors.stock && (
                    <p className="text-red-400 text-sm mt-2 ml-1">
                        {errors.stock.message}
                    </p>
                )}
            </div>
            <div>
                <label className="text-sm font-semibold">
                    Imagen del producto:
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => setFile(event.target.files?.[0] || null)}
                    required
                    className="border p-2 rounded w-full"
                />
            </div>

            <button className="btn btn-primary" type="submit">
                Crear Producto
            </button>
        </form>
    )
}

export default CreateProductForm
