import { useEffect, useState } from "react"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import { FoodData } from "../../interface/FoodData";
import "./create-modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface CreateModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function CreateModal({closeModal}: CreateModalProps)  {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const { mutate, isSuccess, isLoading } = useFoodDataMutate();

    const submit = () => {
        if(title.length > 0 && image.length > 0) {
            const foodData: FoodData = {title, price, image};
            mutate(foodData);
        } else {
            alert("Preencha todos os campos!");
        }
    }

    useEffect(() => {
        if(!isSuccess) return
        closeModal();
    }, [isSuccess])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Title" value={title} updateValue={setTitle} />
                    <Input label="Price" value={price} updateValue={setPrice} />
                    <Input label="Image" value={image} updateValue={setImage} />
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'Postando...' : 'Postar'}
                </button>
                <button onClick={closeModal} className="btn-cancel">Cancelar</button>
            </div>
        </div>
    )
}