import React, { useEffect } from 'react'
import ProductCard from './componets/card/ProductCard'
import userEcomStore from './store/Ecom-store'

const Shop = () => {

  const getProduct = userEcomStore((state)=> state.getProduct )
  const products = userEcomStore((state)=> state.products)

  useEffect(()=>{

    getProduct()

  },[])


  return (
    <div className='flex'>


      <div className='w-1/4 p-4 bg-gray-100 h-screen'>
    Searchbar
      </div>


      <div className='w-1/2 p-4 h-screen overflow-y-auto'>

      <p className='text-2xl font-bold mb-4 text-center'> สินค้าทั้งหมด</p>
      <div className='flex flex-wrap gap-6 justify-center w-full items-center'>


      {
        products.map((item,index)=>
          <ProductCard key={index} item={item} />
        
        )
      }

        
      </div>
      </div>


    <div className='w-1/4 p-4 bg-gray-200 h-screen overflow-y-auto'>
      Cartv 
    </div>


    </div>
  )
}

export default Shop
