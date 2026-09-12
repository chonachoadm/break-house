import { useNavigate } from "react-router-dom";
import { useSectionsService } from "../../services/sections.service";
import { useForm } from "react-hook-form";

const CreateSection = () => {
    const navigate = useNavigate();
    const { createSection } = useSectionsService();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = (data) => {
        createSection(data)
            .then(() => {
                navigate("/videos");
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Crear categoría</h1>
            <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="name">Nombre de la categoría</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
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
                    <label className="form-label" htmlFor="description">Breve descripción</label>
                    <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        {...register('description', {
                            required: "Este campo es obligatorio"
                        })}
                    >
                    </textarea>
                    {errors.description && (
                        <div>
                            {errors.description.message}
                        </div>
                    )}
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">Crear</button>
            </form>
        </div>
    )
}

export default CreateSection