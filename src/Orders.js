import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function App(props) {
    const navigate = useNavigate();
    const constant = "abcd";
    const [resp_arr, setRespArr] = useState([]);
    const [isPending, setisPending] = useState(true);
    useEffect(() => {
        fetch('https://localhost:7293/Orders/'+props.userid).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            setisPending(false);
            setRespArr(data);
        })
    }, [constant]);

    return (
        <div className="container p-4 mt-3">
            <div className="row"><div className="col"><h3><button className="btn me-5" onClick={() => navigate(-1)}><i className="bi bi-chevron-left"></i></button><i className="bi bi-list-nested me-4"></i>Orders</h3></div><div className="col text-end">
            </div></div>
                {resp_arr.map((order) => {
                    return (
                        <div className="row mt-5 pb-5 border-bottom">
                            <div className="col-2">
                                <small className="text-muted">#{order.orderId}</small>
                                <h4>{order.status}</h4>
                                <div className="mb-3 text-muted"><small>{order.vendorName}</small></div>
                                <div>Total: ₹{order.totalAmount}</div>
                            </div>
                            <div className="col">
                                <ul className="list-group list-group-flush" key={order.orderId}>
                                    {order.products.map((product) => {
                                        return (
                                            <li className="list-group-item list-group-item-action">
                                                <div className="row">
                                                    <div className="col">{product.productName}<br /><small className="text-muted">Quantity: {product.quantity}</small></div>
                                                    <div className="col text-end">₹{product.price}/{product.unit}</div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul></div>
                            </div>
                        );
                })}
            </div>
        );
}
export default App; 