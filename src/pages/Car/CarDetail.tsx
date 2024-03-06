import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FaWhatsapp } from"react-icons/fa"

import { Container } from "../../components/Container"

import { getDoc, doc} from "firebase/firestore"
import { db } from "../../Services/firebase"

interface CarProps{
  id: string,
  name: string,
  model: string,
  city: string,
  year: string,
  km: string,
  description: string,
  created: string,
  prince: string | number,
  owner: string,
  uid: string,
  whatsapp: string,
  images: ImageCarProps[],
}

interface ImageCarProps{
  uid: string,
  name: string,
  url: string,
}
const CarDetail = () => {
  const { id } = useParams()
  const [car, setCar] = useState<CarProps[]>([])

  useEffect(() => {
    async function loadCar(){
      if(!id){ return }

      const docRef = doc(db, "cars", id)
      getDoc(docRef)
      .then((snapshot) => {
        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          city: snapshot.data()?.city,
          model: snapshot.data()?.model,
          uid: snapshot.data()?.uid,
          description: snapshot.data()?.description,
          created: snapshot.data()?.created,
          whatsapp: snapshot.data()?.whatsapp,
          price: snapshot.data()?.price,
          km: snapshot.data()?.km,
          owner: snapshot.data()?.owner,
          images: snapshot.data()?.images
          
        })
      })
      .catch(() => {

      })
    }
    loadCar()
  }, [id])

  return (
    <Container>
      <h1>Slider</h1>

      {car && (
        <main className="bg-white w-full rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>
          <div className=" flex w-full gap-6 my-4">
            <div className=" flex flex-col gap-4">

              <div>
                <p> Cidade</p>
                <strong>{car?.city}</strong>
              </div>
              <div>
                <p>Ano</p>
                <strong>{car?.year}</strong>
              </div>
            </div>

            <div className=" flex flex-col gap-4">
              <div>
                <p> Km</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>
            <strong>Descrição</strong>
              <p className=" mb-4">{car?.description}</p>
            <strong> WhatsApp</strong>
              <p>{car.whatsapp}</p>
            <a
              className=" cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium max-[360px]:text-base"
            >
              Conversar com vendedor
              <FaWhatsapp size={26} color="#fff" />
            </a>
        </main>
      )}
    </Container>
  )
}

export default CarDetail