import { Activity, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../../contexts/AuthContext'
import { useUsersService } from '../../services/users.service'
import { useForm } from "react-hook-form"

const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useUsersService()
  const [loginError, setLoginError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" })

  const onSubmit = (formData) => {
    setLoginError("");
    console.log(formData);

    loginService({
      email: formData.email,
      password: formData.password
    })
      .then(data => {
        login(data.token, formData.email)
        navigate("/")
      })
      .catch(err => {
        console.error("No se pudo loguear", err);
        setLoginError(err.message)
      })
  }

  return (
    <div>
      <div className="row justify-content-center">
        <h1>Iniciar Sesión</h1>
        <form className="col-10 col-md-6" onSubmit={handleSubmit(onSubmit, (errors) => {
          console.log("Errores de validacion: ", errors);
        })} >
          <div className="d-flex flex-column align-items-start mb-4">
            <label className="form-label">Email</label>
            <input className="form-control" type="email" placeholder='Ingrese su mail' name='email'
              {...register("email", {
                required: "El email es obligatorio",
              })}
            />
            <Activity mode={errors?.email ? "visible" : "hidden"}>
              <div className='invalid-feedback'>
                {errors?.email?.message}
              </div>
            </Activity>
          </div>
          <div className="d-flex flex-column align-items-start mb-4">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input className="form-control" type="password" id="password" name="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres"
                }
              })} />
            <Activity mode={errors?.password ? "visible" : "hidden"}>
              <div className='invalid-feedback'>
                {errors?.password?.message}
              </div>
            </Activity>
          </div>
          <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0" type='submit'>Ingresar</button>
          {loginError && (
            <div>
              {loginError}
            </div>
          )}
        </form>
      </div>
      <div>
        <p>¿No tenés cuenta? <a href="/register">Registrate</a></p>
      </div>
    </div>
  )
}

export default Login