import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Cart(props) {
    const navigate = useNavigate();
    const [resp_arr, setRespArr] = useState([]);
    const [total, setTotal] = useState(0);
    const [isPending, setisPending] = useState(true);

    useEffect(() => {
        fetch('https://localhost:7293/Cart/' + props.userid).then(res => {
            return res.json()
        }).then(data => {
            setisPending(false);
            setRespArr(data)
        });
    }, []);

    useEffect( //called when change in resp_arr
        () => {
            let sum = 0;
            resp_arr.map((item) => {
                sum = sum + (item.price * item.quantity);
            });
            setTotal(sum);
        },[resp_arr]
    );

    function setQuantity(id, prodid, quantity) {
        let temp = [...resp_arr];
        resp_arr[id].quantity = quantity;
        setRespArr(temp);
        fetch('https://localhost:7293/Cart?userid=' + props.userid + '&quantity=' + quantity + '&productid=' + prodid).then(() => {
            setisPending(false);
        });
        temp = [];
    }

    function deleteProduct(prodid) {
        fetch('https://localhost:7293/Cart/delete?userid='+props.userid+'&productid='+prodid).then(res => {
            return res.json();
        }).then(data => {
            setisPending(false);
            props.toast('Item removed!');
            setRespArr(data);
            
        })
    }

    function placeOrder() {
        fetch('https://localhost:7293/Cart/placeorder?userid=' + props.userid).then(() => {
            props.toast('Order Placed!');
            navigate("/orders");
        })
    }
    return (
        <div className="container mt-5">
            <div className="row"><div className="col"><h3><button className="btn me-5" onClick={() => navigate(-1)}><i className="bi bi-chevron-left"></i></button><i className="bi bi-bag me-4"></i>Cart</h3></div><div className="col text-end">
            </div></div>
            <div className="row mt-5">
                <div className="col-9">
                        <ul className="list-group">
                        {resp_arr.map((product, ind) => {
                                return (
                                    <li className="list-group-item list-group-item-action p-3" key={ind}>
                                        <div className="row">
                                            <div className="col d-flex"><img src={"./assets/productimages/" + product.imageURL + ".jpg"} alt="..." width="100px" /><div className="mt-auto mb-auto ms-4"><b className="pb-2">{product.productName}</b><br/><small className="text-muted">₹{product.price}/{product.unit}</small></div></div>
                                            <div className="col d-flex align-items-center justify-content-end">
                                                Qty: <select value={product.quantity} onChange={(e) => { setQuantity(ind, product.productId, parseInt(e.target.value, 10)) }} className="form-select ms-2 me-3" style={{width:"70px"} }>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                </select>
                                                <button className="btn btn-outline-danger" onClick={() => {
                                                    deleteProduct(product.productId)
                                                }}><i className="bi bi-trash2-fill"></i></button>
                                            </div>
                                            </div>
                                    </li>
                        );
                })}
                    </ul>
                </div>
                <div className="col">
                    <div className="container-flex p-4 border rounded"><div className="text-center fs-3">Billing</div>
                        {resp_arr.length == 0 ? <center className="mt-3">Cart is Empty</center> :<> <div className="row mt-5">
                        <div className="col">
                        Subtotal:
                        </div>
                        <div className="col text-end">
                            ₹{total}/-
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Discount:
                        </div>
                        <div className="col text-end">
                            ₹0/-
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Delivery:
                        </div>
                        <div className="col text-end">
                            ₹0/-
                        </div>
                            </div>
                    <div className="row">
                        <div className="col fw-bolder">
                            Grand Total:
                        </div>
                                <div className="col fw-bolder text-end">
                            ₹{total}/-
                        </div>
                    </div>
                     <button className="btn btn-secondary mt-5 w-100" onClick={() => {
                        placeOrder();
                    }}><i className="bi bi-cart-check me-3"></i>Proceed to Checkout</button></>}
                    </div>
                </div>
            </div>
            </div>
        );
}
export default Cart; 