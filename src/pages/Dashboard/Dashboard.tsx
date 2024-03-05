import { useState, useEffect, useContext } from "react"
import { FiTrash2 } from "react-icons/fi"

import { Container } from "../../components/Container"
import { DashboardHeader } from "../../components/Panelhealder"
import { AuthContext } from "../../Contexts/AuthContext"

import { collection, getDocs, where, query, doc, deleteDoc} from "firebase/firestore"
import { db } from "../../Services/firebase"


interface CarProps{
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

const Dashboard = () => {

  const [cars, setCars] = useState<CarProps[]>([])
  const { user } = useContext(AuthContext)

  useEffect(() => {

    function loadCars(){
      if(!user?.uid){
        return;
      }

      const carsRef = collection(db, "cars")
      const queryRef = query(carsRef, where("uid", "==", user.uid))
  
      getDocs(queryRef)
      .then((snapshot) => {
        let listcars = [] as CarProps
  
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
  },[user])

  async function handleDeleteCar(id: string){
    const docRef = doc(db, "cars", id)
    await deleteDoc(docRef)
    setCars(cars.filter(car => car.id !==id))
  }

  return (
    <Container>
      <DashboardHeader />
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
       {cars.map(car => (
          <section key={car.id} className="w-full bg-white rounded-lg relative">
          <button
          onClick={() => handleDeleteCar(car.id)}
          className="bg-white absolute w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
          >
            <FiTrash2 size={22} />
          </button>
          <img
            className="w-full bg-white rounded-lg mb-2 max-h-70"
            src={car.images[0].url}
            alt="Imagem do carro"
            />
            <p className="font-bold mt-1 px-2 mb-2"> {car.name} </p>
            <div className="flex flex-col px-2">
              <span className="text-zinc-700">
                Ano {car.year} | {car.km} Km
              </span>
              <strong className="text-black font-bold mt-4">
                R$ {car.price}
              </strong>
            </div>
            <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-black">
                  {car.city}
                </span>
            </div>
        </section>  
       ))}
      </main>

    </Container>
  )
}

export default Dashboard