import { Container } from "../../../components/Container"
import { DashboardHeader } from "../../../components/Panelhealder"
import { Input } from "../../../components/input/index"
import { AuthContext } from "../../../Contexts/AuthContext"

import { ChangeEvent, useState, useContext } from "react"
import { FiUpload, FiTrash } from "react-icons/fi"
import { v4 as uuidV4 } from "uuid"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { storage } from "../../../Services/firebase"
import {
  ref,
  getBytes,
  getDownloadURL,
  deleteObject,
  uploadBytes
} from "firebase/storage"

const schema = z.object({
  name: z.string().min(1,"O campo nome é obrigatório"),
  model: z.string().min(1,"O modelo é obrigatório"),
  year: z.string().min(1,"O ano dp carro é obrigatório"),
  km: z.string().min(1,"O km é obrigatório"),
  price: z.string().min(1,"O valor do carro é obrigatório"),
  city: z.string().min(1,"A cidade é obrigatório"),
  whatsapp: z.string().min(1,"O telefone é obrigatório").refine((value) => /^(\d{11,12})$/.test(value), {
    message: "Numero de telefone invalido."
  }),
  description: z.string().min(1,"A descrição é obrigatória")
})  

type FormData = z.infer<typeof schema>;

interface ImageItemProps{
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

 function New() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  const [carImages, setCarImages] = useState<ImageItemProps[]>([])


  async function handleFile(e: ChangeEvent<HTMLInputElement>){
    if(e.target.files && e.target.files[0]){
      const image = e.target.files[0]

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        await handleUpload(image)
      }else{
        alert("Envie uma imagem jpeg ou png!")
        return;
      }


    }
  }
  
  
  async function handleUpload(image: File){
    if(!user?.uid){
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();

    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)

    uploadBytes(uploadRef, image)
    .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadUrl) => {
          const imageItem = {
            name: uidImage,
            uid: currentUid,
            previewUrl: URL.createObjectURL(image),
            url: downloadUrl,
          }

          setCarImages((images) => [...images, imageItem] )


        })
    })

  }

  function onSubmit(data: FormData){
    console.log(data);
  }

  async function handleDeleteImage(item: ImageItemProps){
    const imagePath = `images/${item.uid}/${item.name}`;

    const imageRef = ref(storage, imagePath);

    try{
      await deleteObject(imageRef)
      setCarImages(carImages.filter((car) => car.url !== item.url))
    }catch(error){
      console.log("ERRO AO DELETAR " + error)
    }


  }


  return (
    <Container>
      <DashboardHeader/>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              className="opacity-0 cursor-pointer" 
              onChange={handleFile} 
            />
          </div>
        </button>

        {carImages.map( item => (
          <div key={item.name} className="flex items-center justify-center relative">
            <button className="absolute" onClick={() => handleDeleteImage(item) }>
              <FiTrash size={28} color="#FFF" />
            </button>
            <img
              src={item.previewUrl}
              className="rounded-lg w-full h-32 object-cover cursor-pointer"
              alt="Foto do carro"
            />
          </div>
        ))}
      </div>

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form
          className="w-full"
          onSubmit={handleSubmit(onSubmit)}  
        >
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do carro</p>
            <Input
              type="text"
              register={register}
              name="name"
              error={errors.name?.message}
              placeholder="Ex: Celta 1.0..."
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do carro</p>
            <Input
              type="text"
              register={register}
              name="model"
              error={errors.model?.message}
              placeholder="Ex: 1.0, Flex, MANUAL..."
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                type="text"
                register={register}
                name="year"
                error={errors.year?.message}
                placeholder="Ex: 2019/2019"
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Km rodados</p>
              <Input
                type="text"
                register={register}
                name="km"
                error={errors.km?.message}
                placeholder="Ex: 32.900..."
              />
            </div>

          </div>


          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <Input
                type="text"
                register={register}
                name="whatsapp"
                error={errors.whatsapp?.message}
                placeholder="Ex: 11987654732..."
              />
            </div>

            <div className="w-full">
              <p className="mb-2 font-medium">Cidade</p>
              <Input
                type="text"
                register={register}
                name="city"
                error={errors.city?.message}
                placeholder="Ex: Perus - SP"
              />
            </div>

          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              type="text"
              register={register}
              name="price"
              error={errors.price?.message}
              placeholder="Ex: 22.000"
            />
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2"
              {...register("description")}
              name="description"
              id="description"
              placeholder="Digite detalhes do carro..."
            />
            {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
          </div>

          <button type="submit" className="w-full rounded-md bg-zinc-900 text-white font-medium h-10 hover:bg-red-600 transition-all">
            Cadastrar
          </button>

        </form>
      </div>
    </Container>
  )
}

export default New