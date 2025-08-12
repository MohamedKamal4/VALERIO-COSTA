
import AddBox from "./addBox"
import { Pagination } from "swiper/modules"
import { TfiClose } from "react-icons/tfi";
import { Swiper, SwiperSlide } from 'swiper/react';

export default function DetailsBox({openDetails , product , setOpenDetails , openModal , setOpenModal}){
    return (
        <>
        {openDetails &&
          <div className='d-flex p-0 flex-column bg-white position-fixed start-0' style={{overflow: 'hidden',transition: 'all 0.5s ' , bottom: openDetails ? '0' : '-100%' , boxShadow: '0 0 50px black ' , borderTopRightRadius: '40px' , borderTopLeftRadius: '40px' , width: '100vw' , height: '90vh' , zIndex: '9999999999999'}}>
            <div className='w-100 position-absolute top-0 start-0 d-flex justify-content-end py-3 px-2' style={{zIndex: '99'}}>
              <button type='button' className='btn'><TfiClose size={24} color={'#000'} onClick={() => setOpenDetails(false)} /></button>
            </div>
            <div className='w-100 h-100'>
              <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.MainImage} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.images[0]} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className='w-100 h-100' src={product.images[1]} alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className='w-100 position-absolute bottom-0 start-0' style={{ backgroundColor: '#ffffff96' , backdropFilter: 'blur(5px)', zIndex: '99'}}>
              <button className='btn w-100' style={{backgroundColor : 'inherit'}} onClick={() => {
                setOpenModal(!openModal)
              }}>{openModal ? 'CLOSE' : 'OPEN'} ADD FORM</button>
              {openModal &&
                <div className='w-100 p-3 gap-2' style={{transition: 'all 0.5s'}}>
                <div className='w-100 h-50'>
                  <p>{product.name}</p>
                  <p>PRICE : <span  className='name-product'>{product.price} $</span></p>
                  <p className='pt-1' style={{lineHeight: '10px'}}>DESCRIPTION : <span style={{fontSize: '10px'}}>{product.discription}</span></p>
                </div>
                <AddBox product={product} sizes={product.sizes} />
              </div>
              }
            </div>
          </div>
          }
        </>

    )
}