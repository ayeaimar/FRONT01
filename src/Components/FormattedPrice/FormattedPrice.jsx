const currencyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
})

const FormattedPrice = ({ price }) => {
    return currencyFormatter.format(price)
}

export default FormattedPrice