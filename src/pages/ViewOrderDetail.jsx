import React,{useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ViewOrderDetails = ()=>{

    const params = useParams();
    const firebase = useFirebase();
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        firebase.getOrders(params.bookId).then((orders)=>setOrders(orders.docs));
        console.log(orders.docs);
    },[]);

    return (
        <div className="container">
            <h1>Orders</h1>
            {orders.map((order)=>{
                const data  = order.displayName;
                return (
                    <div key={order.id}>
                        Ordered By: {data}
                    </div>
                )
            })}
        </div>
    );
};

export default ViewOrderDetails;