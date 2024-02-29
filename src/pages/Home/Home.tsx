import {Container} from "../../components/Container/index"
import { FaSearch } from "react-icons/fa";

const Home = () => {
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
          <section className="w-full bg-white rounded-lg">             
            <img 
              className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all"
              src="https://image.webmotors.com.br/_fotos/anunciousados/gigante/2024/202402/20240227/volkswagen-nivus-1.0-200-tsi-total-flex-highline-automatico-wmimagem12254182858.jpg?s=fill&w=552&h=414&q=60"
              alt="Carro" />
            <p className="font-bold mt-1 mb-2 px-2">VOLKSWAGEN NIVUS</p>

            <div className="flex flex-col px-2">
              <span className="text-zinc-700 mb-6"> Ano 2021/2022 | 14.000 km</span>
              <strong className="text-black font-medium text-xl">R$ 110.000</strong>
            </div>

            <div className="w-full h-px bg-slate-200 my-2"></div>

            <div className="px-2 pb-2">
              <span className="text-zinc-700">
                Caieiras - Sp
              </span>
            </div>

          </section>
        </main>
      </Container>
      
    )
  }
  
export default Home