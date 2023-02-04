import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Products(props) {
    const navigate = useNavigate();
    const constant = "abcd";
    const [resp_arr, setRespArr] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        fetch('https://localhost:7293/Vendor/allproducts?userid=' + props.userid + '&stock=1' ).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            //setisPending(false);
            setRespArr(data);
        });
    }, [constant]);

    const [stock, setStock] = useState(0);
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                    <h3><button className="btn me-5" onClick={()=>navigate(-1) }><i class="bi bi-chevron-left"></i></button><i className="bi bi-grid me-4"></i>Products</h3>
                </div>
                <div className="col text-end">
                    <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProduct"><i className="bi bi-plus me-3"></i>Add Product</button>
                </div>
            </div>
            <div className="mt-5">
                <button className="btn" onClick={() => { setStock(0); }}><i className="bi bi-list-nested me-2"></i>All</button>
                <button className="btn" onClick={() => { setStock(1); }}><i className="bi bi-exclamation-circle me-2"></i>Low Stock</button>

            </div><hr />
            <div className="row mt-5">
                <div className="col">
                    <h4>{stock ? "Low Stock" : "All"} Products</h4>
                </div>
                <div className="col-4">
                    <input type="text" className="form-control" placeholder="Search Products" onChange={(e) => setSearch(e.target.value)} value={search} />
                </div>
                </div>
            <table className="table table-hover align-middle mt-5">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {resp_arr.filter(product => {
                        if (stock==0 && product.productName.includes(search)) {
                            return true;
                        } else {
                            if (product.stock <= 10 && product.productName.includes(search)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).map((product, ind) => {
            return (
                <tr key={ind}>
                    <td><img src={"./assets/productimages/" + product.imageURL + ".jpg"} alt="..." className="vendorproduct" />{product.productName}</td>
                    <td>{product.price}/{product.unit}</td>
                    <td>{product.stock}</td>
                    <td><button className="btn btn-outline-secondary me-3" data-bs-toggle="modal" data-bs-target="#editProduct"><i className="bi bi-pencil"></i></button><button className="btn btn-outline-danger"><i className="bi bi-trash2"></i></button></td>
                </tr>
            );
        })
                    }
                    </tbody>
            </table>
            <div class="modal fade" id="editProduct" tabindex="-1" aria-labelledby="editProductLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="editProductLabel">Edit Product Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="addProduct" tabindex="-1" aria-labelledby="addProductLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="addProductLabel">Add Product</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
}
export default Products;