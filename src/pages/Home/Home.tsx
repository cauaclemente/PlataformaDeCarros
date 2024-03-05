import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {Container} from "../../components/Container/index"
import { FaSearch} from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

import {
  collection,
  query,
  getDocs,
  orderBy
} from "firebase/firestore"
import { db } from "../../Services/firebase"


interface CarsProps{
  id: string;
  name: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string;
  images: CarImagesProps[];
}

interface CarImagesProps{
  name: string;
  uid: string;
  url: string;
}

const Home = () => {

  const [cars, setCars] = useState<CarsProps[]>([])
  const [loadImages, setLoadImages] = useState<string[]>([])

  useEffect(() => {

    function loadCars(){
      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, orderBy("created", "desc"))

      getDocs(queryRef)
      .then((snapshot) => {
        let listcars = [] as CarsProps

        snapshot.forEach(doc => {
          listcars.push({
            id: doc.id,
            name: doc.data().name,
            year: doc.data().year,
            km: doc.data().km,
            city: doc.data().city,
            price: doc.data().price,
            images: doc.data().images,
            uid: doc.data().uid
          })
        })
          setCars(listcars)
      })
    }
    loadCars()
  },[])

  function handleImageLoad(id: string){
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id])
  }

    return (
      <Container>
        <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
          <input
            className="w-full border-2 rounded-lg h-9 px-3 outline-none"
            placeholder="Digite o nome do carro..."
          />
          <button className="px-2">
            <FaSearch size={24}  color="#e50000"/>
          </button>
        </section>
        
        <h1 className="font-bold text-center mt-6 text-2xl mb-4">
          Carros novos e usados em todo Brasil
        </h1>

        <main className="grid gird-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cars.map(car => (
            <Link key={car.id} to={`/car/${car.id}`}>
              <section className="w-full bg-white rounded-lg hover:scale-105 transition-all">   
                <div
                  className="w-full h-72 rounded-lg bg-slate-200 flex items-center justify-center"
                  style={{display: loadImages.includes(car.id) ? "none" : "block"}}  
                 >
                <CgSpinner className=" h-72 m-auto animate-spin " size={28} />
                </div>          
                  <img 
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
                    src={car.images[0].url}
                    alt="Carro" 
                    onLoad={() => handleImageLoad(car.id)}
                    style={{display: loadImages.includes(car.id) ? "block" : "none"}}
                    />
                  <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>

                  <div className="flex flex-col px-2">
                    <span className="text-zinc-700 mb-6"> Ano {car.year} | {car.km} km</span>
                    <strong className="text-black font-medium text-xl">R$ {car.price}</strong>
                  </div>

                  <div className="w-full h-px bg-slate-200 my-2"></div>

                  <div className="px-2 pb-2">
                    <span className="text-zinc-700">
                      {car.city}
                    </span>
                  </div>
              </section>
            </Link>
          ))}
          
        </main>
      </Container>
      
    )
  }
  
export default Home