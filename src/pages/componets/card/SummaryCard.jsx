import React, { useEffect, useState } from "react";
import userEcomStore from "../../store/Ecom-store";
import { listUserCart, saveAddress } from "../../api/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// <div className="text-xl font-semibold text-red-600 flex justify-between">
// ยอดรวมก่อน VAT: <span className="text-black font-bold">฿{total.toFixed(2)}</span>
// </div>
// <div className="text-xl font-semibold text-gray-800 flex justify-between">
// VAT (7%): <span className="text-black font-bold">฿{vat.toFixed(2)}</span>
// </div>
// <div className="text-xl font-semibold text-gray-800 flex justify-between">
// ยอดรวมหลัง VAT: <span className="text-black font-bold">฿{totalWithVAT.toFixed(2)}</span>
// </div>

// <div className="flex justify-between text-xl font-bold text-gray-900 mt-4">
// <span>รวมสุทธิ</span>
// <span className="text-2xl text-green-600">฿{totalWithVAT.toFixed(2)}</span>
// </div>

const SummaryCard = () => {
  const token = userEcomStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0)

  const [address , setAddress] = useState('')
  const [addressSave, setAddressSave] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    hdlGetUserCart(token)

  }, []);

  const hdlGetUserCart = (token) => {
    listUserCart(token)
      .then((res) => {
        // console.log(res);
        setProducts(res.data.products)
        setCartTotal(res.data.cartTotal)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hdlSaveAddress = ()=>{

    if(!address){
      return toast.warning('Please fill address')
    }
    saveAddress(token,address)
    .then((res)=>{
      console.log(res)
      toast.success(res.data.message)
      setAddressSave(true)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const hdlGoToPayment =() =>{
    if(!addressSave){
      return toast.warning("กรุณากรอกที่อยู่ก่อน")
    }
    navigate('/user/payment')
  }

  console.log(products)

  return (
    <div className="mx-auto">
      <div className="flex   gap-4 ">
        {/* Left */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-3">
            <h1 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h1>
            <textarea
            required
            onChange={(e)=> setAddress(e.target.value)}
            placeholder="กรุณากรอกที่อยู่จัดส่ง"
            className="w-full px-2 rounded-md" />
            <button 
            onClick={hdlSaveAddress}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 hover:duration-200">
              Save Address
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-2/4">
          <div className="bg-gray-100 p-4 rounded-md border shadow-md space-y-4">
            <h1 className="text-lg font-bold">คำสั่งซี้อของคุณ</h1>
            {/* item */}

            {
              products?.map((item,index) =>
            <div key={index}>
              <div className="flex justify-between items-end">
                <div>
                  <p className="font-bold">{item.product.title}</p>
                  <p className="text-sm">จำนวน : {item.count} x {item.product.price}</p>
                </div>
                <div>
                  <p className="text-red-500 font-bold">{item.count * item.product.price}</p>
                </div>
              </div>
            </div>
              
              )
            }



            <div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง :</p>
                <p>0.00</p>
              </div>
              <div className="flex justify-between">
                <p>ส่วนลด :</p>
                <p>0.00</p>
              </div>
            </div>

            <hr />
            <div>
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ :</p>
                <p className="text-red-500 font-bold text-lg">{cartTotal}</p>
              </div>
            </div>
            <hr />
            <div>
              <button
              onClick={hdlGoToPayment}

              className="bg-green-400 w-full p-2 rounded-md shadow-md text-white hover:bg-green-600">
                ดำเนินการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
