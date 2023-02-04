import { useEffect, useState } from "react";

function Profile() {
    const [data, setData] = useState("");
    useEffect(() => {
        fetch('https://localhost:7293/User?userid=' + localStorage.getItem("UserID")).then(res => {
            return res.json()
        }).then(data => {
            setData(data);
            console.log(data);
        })
    }, []);
    return (
        <div className="container mt-5">
            <h3><i className="bi bi-person me-4"></i>Profile</h3>
            {data ?
                <div className="mt-5">
                    <div className="row mt-4">
                        <div className="col-3">Name:</div> <div className="col"><input type="text" className="form-control" value={data[0].userName} /></div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">Email: </div> <div className="col"><input type="text" className="form-control" value={data[0].email} /></div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">Address: </div> <div className="col"><input type="text" className="form-control" value={data[0].address} /></div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-3">Phone: </div> <div className="col"><input type="text" className="form-control" value={data[0].phone} /></div>
                    </div>
                </div> : ""}
        </div>
        );
}
export default Profile;