import React, { useEffect, useState } from 'react';

function App(props) {
    const constant = "abcd";
    const [resp_arr, setRespArr] = useState([]);
    const [sortColumn, setSortColumn] = useState("productName");
    const [sortOrder, setSortOrder] = useState("asec");
    const [isPending, setisPending] = useState(true);

    useEffect(() => {
        fetch('https://localhost:7293/Products').then(res => {
            return res.json()
        }).then(data => {
            sortMe(data);
        })
    }, []);

    function sortMe(data) {
        let temp = [];
        console.log(sortColumn, sortOrder);
        function comparedesc(a, b) {
                if (a[sortColumn] < b[sortColumn]) {
                    return 1;
                }
                if (a[sortColumn] > b[sortColumn]) {
                    return -1;
                }
            return 0;
        }
        function compareasec(a, b) {
            if (a[sortColumn] > b[sortColumn]) {
                return 1;
            }
            if (a[sortColumn] < b[sortColumn]) {
                return -1;
            }
            return 0;
            }
        temp = [...data];
        if(sortOrder=="asec")
            temp.sort(compareasec);
        else
            temp.sort(comparedesc);
        setRespArr(temp);
    }

    useEffect(() => {
        sortMe(resp_arr);
    },[sortColumn,sortOrder])

    function addCart(productid, quantity){
        fetch('https://localhost:7293/Cart?userid=' + props.userid + '&productid=' + productid + '&quantity=' + quantity).then(() => {
            console.log("Item added!");
        })
    }

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    function searchFunc() {
        console.log(search);
    }
    return (    
        <div className="container">
            <div className="row mt-5">
                <div className="col">
                    <h3><i className="bi bi-shop me-4"></i>Explore Products</h3>
                    </div>
                <div className="col">
                    <form onSubmit={searchFunc} className="input-group">
                        <div className="input-group">
                            <span class="input-group-text"><i class="bi bi-search"></i></span>
                            <input type="text" value={search} onChange={(e) => {
                            setSearch(e.target.value);
                        }} className="form-control" placeholder="Start searching..." />
                            {/* }<button type="submit" className="btn btn-outline-secondary me-5"><i className="bi bi-search"></i></button>*/}
                            </div>
                    </form>
                </div>
                <div className="col">
                    <div className="input-group ms-auto" style={{ width: "380px" }}>
                        <span class="input-group-text"><i class="bi bi-filter-left"></i></span>
                        <select className="form-select" value={sortColumn} onChange={(e) => {
                            setSortColumn(e.target.value);
                    }}>
                        <option value="productName">Alphabetically</option>
                        <option value="price">Price</option>
                        <option value="vendorName">Seller</option>
                    </select>
                        <select className="form-select" value={sortOrder} onChange={(e) => {
                            setSortOrder(e.target.value);
                    }}>
                        <option value="asec">Ascending</option>
                        <option value="desc">Descending</option>
                        </select>
                    </div>
                </div> 
            </div>
            <div className="row mt-5">
                <div className="col-2">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action" onClick={() => setCategory("")}>All</li>
                        <li className="list-group-item list-group-item-action" onClick={()=>setCategory("General")}>General</li>
                        <li className="list-group-item list-group-item-action" onClick={()=>setCategory("Fruits")}>Fruits</li>
                        <li className="list-group-item list-group-item-action" onClick={()=>setCategory("Vegetables")}>Vegetables</li>
                    </ul>
                </div>
                <div className="col">
                    {search != "" ? <>Search Results for "{search}" </> : ""}
                    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {resp_arr.filter(name => name.productName.includes(search) && name.categoryName.includes(category) ).map((item) => {
                return (
                    <div className="col" key={item.productId}>
                        <div className="card">
                            <div className="card-img-container">
                                <img src={"./assets/productimages/" + item.imageURL + ".jpg"} alt="..." />
                                </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-8">
                                        <h5 className="card-title">{item.productName}</h5>
                                        <p className="card-text">₹{item.price}/{item.unit}</p>
                                        <p className="card-text"><small className="pt-3 text-muted">{item.categoryName}<br />
                                            {item.vendorName}</small></p>
                                    </div>
                                    <div className="col d-flex justify-content-center align-items-center">
                                        <button className="btn fs-3" onClick={() => {
                                            props.toast(item.productName+' added to Cart');
                                           addCart(item.productId, 1)
                                        } }>+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
            })}


                    </div>
                    </div>
            </div>
            </div>
        );
}
export default App; 