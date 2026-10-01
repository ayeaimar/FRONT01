import { Navigate } from 'react-router'
import { useUser } from '../Context/UserContext'

const Profile = () => {
    const { loading, userInfo } = useUser()

    if (loading) {
        return <p className="text-center mt-10">Cargando perfil...</p>
    }

    if (!userInfo?.id) {
        return <Navigate to="/login" replace />
    }

    return (
        <section className="max-w-xl mx-auto mt-10">
            <h1 className="text-3xl font-bold mb-6">Mi perfil</h1>
            <div className="card bg-base-100 shadow-md border">
                <div className="card-body gap-4">
                    <div>
                        <p className="text-sm text-gray-500">Nombre de usuario</p>
                        <p className="text-lg">{userInfo.username || 'No disponible'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Correo electrónico</p>
                        <p className="text-lg">{userInfo.email || 'No disponible'}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Tipo de cuenta</p>
                        <p className="text-lg">
                            {userInfo.isAdmin ? 'Administrador' : 'Cliente'}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile
