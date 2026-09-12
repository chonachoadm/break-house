import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsersService } from "../../services/users.service";
import { useForm } from "react-hook-form";



const CreateUser = () => {
    const navigate = useNavigate();
    const { createUser } = useUsersService();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        createUser(data)
            .then(() => {
                navigate("/users");
            })
            .catch(err => {
                setError(err.message)
            });
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Crear Usuario</h1>
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
            <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="name">Nombre completo</label>
                    <input
                        className="form-control"
                        id="name"
                        {...register('name', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.name && (
                        <div>
                            {errors.name.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="email">Correo electrónico</label>
                    <input
                        className="form-control"
                        id="email"
                        {...register('email', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.email && (
                        <div>
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="password">Contraseña</label>
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        {...register('password', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.password && (
                        <div>
                            {errors.password.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="passwordConf">Confirmar contraseña</label>
                    <input className="form-control"
                        id="passwordConf"
                        type="password"
                        {...register("passwordConf", {
                            required: "Debes confirmar la contraseña"
                        })}
                    />
                    {errors.passwordConf && (
                        <div className="invalid-feedback">
                            {errors.passwordConf.message}
                        </div>
                    )}
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">
                    Crear usuario
                </button>
            </form>
        </div>
    );

}

export default CreateUser