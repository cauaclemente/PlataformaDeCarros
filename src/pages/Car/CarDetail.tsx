import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import { Container } from "../../components/Container";

import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Services/firebase";

interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  whatsapp: string;
  images: ImagesCarProps[];
}

interface ImagesCarProps {
  uid: string;
  name: string;
  url: string;
}

const CarDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarProps[]>([]);
  const [slidePreview, setSlidePreview] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      try {
        const snapshot = await getDoc(docRef);

        if (!snapshot.data()) {
          navigate("/");
          return;
        }

        const carData: CarProps = {
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
          images: snapshot.data()?.images || [],
        };

        setCar([carData]);
      } catch (error) {
        console.error("Error loading car:", error);
      }
    }

    loadCar();
  }, [id, navigate]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidePreview(1);
      } else {
        setSlidePreview(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!car || car.length === 0 || !car[0] || !car[0].images) {

    return <div></div>;
  }

  return (
    <Container>
      <Swiper
        slidesPerView={slidePreview}
        pagination={{ clickable: true }}
        navigation
      >
        {car[0]?.images.map((image) => (
          <SwiperSlide key={image.name}>
            <img
              src={image.url}
              className="w-full h-96 object-cover"
              alt={`Car Image - ${image.name}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <main className="bg-white w-full rounded-lg p-6 my-4">
        <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
          <h1 className="font-bold text-3xl text-black">{car[0]?.name}</h1>
          <h1 className="font-bold text-3xl text-black">R$ {car[0]?.price}</h1>
        </div>
        <p>{car[0]?.model}</p>
        <div className="flex w-full gap-6 my-4">
          <div className="flex flex-col gap-4">
            <div>
              <p>Cidade</p>
              <strong>{car[0]?.city}</strong>
            </div>
            <div>
              <p>Ano</p>
              <strong>{car[0]?.year}</strong>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p>Km</p>
              <strong>{car[0]?.km}</strong>
            </div>
          </div>
        </div>
        <strong>Descrição</strong>
        <p className="mb-4">{car[0]?.description}</p>
        <strong>WhatsApp</strong>
        <p>{car[0]?.whatsapp}</p>
        <a
          href={`https://api.whatsapp.com/send?phone=${car[0]?.whatsapp}&text=Olá ${car[0].owner} vi esse ${car[0].name} no site WebAutomotivos e fiquei interessado!`}
          target="_blank"
          className="cursor-pointer bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium max-[360px]:text-base"
        >
          Conversar com vendedor
          <FaWhatsapp size={26} color="#fff" />
        </a>
      </main>
    </Container>
  );
};

export default CarDetail;
