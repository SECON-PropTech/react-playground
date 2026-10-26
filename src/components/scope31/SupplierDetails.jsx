function SupplierDetails({ supplier }) {
    return (
        <div>
            <h3>Leverantörsdetaljer</h3>

            <h4>{supplier.name}
                
                <p>Land: {supplier.country}</p>
                <p>Kategori: {supplier.category}</p>
                <p>Totalt inköp: {supplier.total} kr</p>
            </h4>
        </div>
    );
}

export default SupplierDetails;