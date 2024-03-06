import logoImg from "../../assets/WebAutomotivos-reduzida.jpg";
import { Container } from "../../components/Container";
import { Input } from "../../components/input/index";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../Services/firebase";

import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Insira um email válido").min(1,"O campo email é obrigatório"),
  password: z.string().min(1,"O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

function Login() {

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })

  useEffect(() => {
    async function handleLogout(){
      await signOut(auth)
    }
    handleLogout()
  },[])

  function onSubmit(data: FormData){
    signInWithEmailAndPassword(auth, data.email, data.password)
    .then(() =>{
      toast.success("Bem vindo de volta")
      navigate("/dashboard", {replace: true})
    })
    .catch((error) => {
      console.log(error)
      toast.error("Erro ao fazer login")
    })
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <Link to="/" className="mb-6">
          <img
            src={logoImg}
            alt="Logo do site"
            className="w-64 h-24 rounded"
          />
        </Link>

        <form 
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>

          <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
            Acessar
          </button>

        </form>

        <Link to="/register">
          Ainda não possui uma conta? <span style={{color: "#ff0000"}}> Cadastre-se </span> 
        </Link>

      </div>
    </Container>
  )
}

export default Login