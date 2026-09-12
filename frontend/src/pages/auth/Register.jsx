import { useNavigate } from "react-router-dom"
import { useUsersService } from "../../services/users.service";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Register = () => {
    const navigate = useNavigate();
    const { register: registerService } = useUsersService();
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        setError("");

        if (data.password !== data.passwordConf) {
            setError("Las contraseñas no coinciden");
            return;
        }

        registerService(data.name, data.email, data.password, data.passwordConf)
            .then(() => {
                navigate("/login");
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };

    return (
        <div className="row justify-content-center">
            <h1>Registro</h1>
            <form className="col-10 col-md-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="name">Nombre completo</label>
                    <input className="form-control"
                        type="text"
                        id="name"
                        {...register("name", {
                            required: "El nombre es obligatorio"
                        })}
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="email">Correo electrónico</label>
                    <input className="form-control"
                        type="email"
                        id="email"
                        {...register("email", {
                            required: "El email es obligatorio",
                        })}
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="password">Contraseña</label>
                    <input className="form-control"
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 6,
                                message: "La contraseña debe tener al menos 6 caracteres"
                            }
                        })}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">
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
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">Registrarse</button>
                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}
            </form>
            <p>¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a></p>
        </div>
    )
}

export default Register