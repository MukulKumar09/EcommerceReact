import React, { useEffect, useState} from 'react';
function App(props) {
    const constant = "abcd";
    const [resp_arr, setRespArr] = useState([]);
    const [search, setSearch] = useState("");
    const [isPending, setisPending] = useState(true);
    useEffect(() => {
        fetch('https://localhost:7293/Vendor/allorder?userid='+props.userid).then(res => {
            return res.json()
        }).then(data => {
            console.log(data);
            setisPending(false);
            setRespArr(data);
        })
    }, [constant]);

    function setOrderStatus(id, orderid, status) {
        let temp = [...resp_arr];
        resp_arr[id].status = status;
        setRespArr(temp);
        fetch('https://localhost:7293/Vendor/orderupdate?orderId=' + orderid + '&status=' + status).then(() => {
            setisPending(false);
            props.toast('Order Status Updated');
        });
        temp = [];
    }

    const [status, setStatus] = useState("Pending");

    return (
        <div className="container p-4 mt-3">
            <div className="row"><div className="col"><h3><i className="bi bi-house-door me-4"></i>Vendor Console</h3></div><div className="col text-end"><h3>{localStorage.getItem('UserName')}</h3></div></div>
            <div className="mt-5">
                <button className="btn" onClick={() => { setStatus(''); }}><i className="bi bi-list-nested me-2"></i>All</button>
                <button className="btn" onClick={() => { setStatus('Pending'); }}><i className="bi bi-exclamation-circle me-2"></i>Pending</button>
                <button className="btn" onClick={() => { setStatus('Processing'); }}><i className="bi bi-hourglass me-2"></i>Processing</button>
                <button className="btn" onClick={() => { setStatus('Delivered'); }}><i className="bi bi-check-circle me-2"></i>Delivered</button>
                <button className="btn" onClick={() => { setStatus('Cancelled'); }}><i className="bi bi-x-circle me-2"></i>Cancelled</button>

            </div>
            <hr />
            <div className="row mt-5">
                <div className="col">
                    <h4>{status} Orders</h4>
                </div>
                <div className="col-4">
                    <input type="text" className="form-control"placeholder="Search Order" onChange={(e) => setSearch(e.target.value)} value={search }/>
                </div>
            </div>
            <table className="table table-hover align-middle mt-5">
                <thead>
                    <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Items</th>
                        <th scope="col">Status</th>
                        <th scope="col">Customer</th>
                        <th scope="col">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {resp_arr.filter(name => name.status.includes(status) && name.userName.includes(search)).map((order, ind) => {
                        return (
                            <tr key={ind }>
                                <th>#{order.orderId}</th>
                                <td>{order.products.map((product, index) => {
                                    return (
                                        <div key={index }>{product.productName} ({product.quantity})<br /></div>
                                    )
                                })}</td>
                                <td className="pe-5">{order.status == 'Delivered' || order.status == 'Cancelled' ? <>{order.status}</> : <select className="form-select" value={order.status} onChange={(e) => { setOrderStatus(ind, order.orderId, e.target.value) }}><option value="Pending">Pending</option><option value="Processing">Processing</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option></select> }</td>
                                <td>{order.userName}<br /><small className="text-muted">{order.phone}<br />{order.address}<br />{order.email}</small></td>
                                <td>₹{order.totalAmount}/-</td>
                            </tr>
                        );
                })}
                </tbody>
            </table>
            </div>
        );
}
export default App; 