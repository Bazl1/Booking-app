import { IoClose } from "react-icons/io5";
import styles from "./PopupReviews.module.scss";
import { useForm } from "react-hook-form";
import TextInput from "../TextInput/TextInput";
import { useState } from "react";
import ProductsService from "@/services/ProductsService";
import toast from "react-hot-toast";

interface PopupReviewsProps {
    setOpen: (value: boolean) => void;
    id: string;
}

const PopupReviews = ({ setOpen, id }: PopupReviewsProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const [stars, setStars] = useState<number>(1);
    const [text, setText] = useState<string>("");

    const onSubmit = async () => {
        try {
            const data = new FormData();

            data.append("advertId ", id);
            data.append("stars", stars.toString());
            data.append("description", text);

            await ProductsService.createReview(data);
            toast.success("Testimonial created");
        } catch (error) {
            toast.error("Error creating a review ");
        }
    };

    return (
        <div className={styles.review}>
            <div className={styles.review__overflow}>
                <div className={styles.review__inner}>
                    <div className={styles.review__top}>
                        <h3 className={styles.review__title}>Review form</h3>
                        <button className={styles.review__close} onClick={() => setOpen(false)}>
                            <IoClose />
                        </button>
                    </div>
                    <form className={styles.review__form} onSubmit={() => handleSubmit(onSubmit)}>
                        <TextInput
                            type="number"
                            register={register}
                            registerName="stars"
                            value={stars}
                            setValue={setStars}
                            placeholder="Give me a 5-point rating"
                            errors={errors}
                            validationOptions={{
                                required: "Required field",
                                minLength: {
                                    value: 1,
                                    message: "Minimum 1 star",
                                },
                                maxLength: {
                                    value: 5,
                                    message: "Maximum 5 stars",
                                },
                            }}
                        />
                        <TextInput
                            type="text"
                            register={register}
                            registerName="text"
                            value={text}
                            setValue={setText}
                            placeholder="Describe your experiences"
                            errors={errors}
                            validationOptions={{
                                required: "Required field",
                            }}
                        />
                        <button className={styles.review__btn}>Create a review</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PopupReviews;
