import logoImg from "../../assets/WebAutomotivos-reduzida.jpg";

import { Container } from "../../components/Container";
import { Link } from "react-router-dom";
import { Input } from "../../components/input/index";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio"),
  email: z.string().email("Insira um email válido").min(1,"O campo email é obrigatório"),
  password: z.string().min(6,"A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório")
})

type FormData = z.infer<typeof schema>

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange"
  })


  function onSubmit(data: FormData){
    console.log(data);
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
              type="text"
              placeholder="Digite seu nome..."
              name="name"
              error={errors.name?.message}
              register={register}
            />
          </div>

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

        <Link to="/login">
          Já possui uma conta? <span className="text-red-500"> Faça o login! </span> 
        </Link>

      </div>
    </Container>
  )
}

export default Register