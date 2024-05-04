import { useState } from "react";
import TextInput from "../TextInput/TextInput";
import styles from "./PopupFilter.module.scss";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { IAmenities, amenitiesState } from "@/shared/utils/amenitiesState";
import { useFilterStore } from "@/store";
import { ProductsResponse } from "@/types/response/ProductsResponse";

interface PopupFilterProps {
    setOpen: (value: boolean) => void;
    setProducts: (value: ProductsResponse) => void;
}

const PopupFilter = ({ setOpen, setProducts }: PopupFilterProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
    });

    const setMinCostForm = useFilterStore((state) => state.setMinCost);
    const setMaxCostForm = useFilterStore((state) => state.setMaxCost);
    const setSingleBedsForm = useFilterStore((state) => state.setSingleBeds);
    const setDoubleBedsForm = useFilterStore((state) => state.setDoubleBeds);
    const setAmenitiesForm = useFilterStore((state) => state.setAmenities);

    const search = useFilterStore((state) => state.search);

    const [minValue, setMinValue] = useState<number | null>(null);
    const [maxValue, setMaxValue] = useState<number | null>(null);
    const [singleBeds, setSingleBeds] = useState<number | null>(null);
    const [doubleBeds, setDoubleBeds] = useState<number | null>(null);
    const [amenities, setAmenities] = useState<IAmenities[]>(amenitiesState);

    const handleToggleCheck = (e: any, name: string) => {
        e.preventDefault();
        const updateAmenities = amenitiesState.map((item: IAmenities) => {
            if (item.name === name) {
                item.value = !item.value;
            }
            return item;
        });
        setAmenities(updateAmenities);
    };

    const onSubmit = () => {
        setMinCostForm(minValue || null);
        setMaxCostForm(maxValue || null);
        setSingleBedsForm(singleBeds || null);
        setDoubleBedsForm(doubleBeds || null);
        setAmenitiesForm(amenities || null);

        search().then((res: ProductsResponse) => setProducts(res));
    };

    return (
        <div className={styles.filter}>
            <div className="container">
                <div className={styles.filter__inner}>
                    <button onClick={() => setOpen(false)} className={styles.filter__close}>
                        <IoClose />
                    </button>
                    <form className={styles.filter__form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.filter__row}>
                            <h3 className={styles.filter__title}>Price range</h3>
                            <div className={styles.filter__columns}>
                                <TextInput
                                    type="number"
                                    registerName="minValue"
                                    min={0}
                                    value={minValue}
                                    setValue={setMinValue}
                                    placeholder="Minimum cost"
                                    register={register}
                                    errors={errors}
                                />

                                <TextInput
                                    type="number"
                                    registerName="maxValue"
                                    max={10000}
                                    value={maxValue}
                                    setValue={setMaxValue}
                                    placeholder="Maximum cost"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className={styles.filter__row}>
                            <h3 className={styles.filter__title}>Beds</h3>
                            <div className={styles.filter__row}>
                                <h4 className={styles.filter__subtitle}>Single beds</h4>
                                <div className={styles.filter__columns}>
                                    <button
                                        className={
                                            singleBeds === null
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(null);
                                        }}
                                    >
                                        Any
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 1
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(1);
                                        }}
                                    >
                                        1
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 2
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(2);
                                        }}
                                    >
                                        2
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 3
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(3);
                                        }}
                                    >
                                        3
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 4
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(4);
                                        }}
                                    >
                                        4
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 5
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(5);
                                        }}
                                    >
                                        5
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 6
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(6);
                                        }}
                                    >
                                        6
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 7
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(7);
                                        }}
                                    >
                                        7
                                    </button>
                                    <button
                                        className={
                                            singleBeds === 8
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSingleBeds(8);
                                        }}
                                    >
                                        8+
                                    </button>
                                </div>
                                <h4 className={styles.filter__subtitle}>Double beds</h4>
                                <div className={styles.filter__columns}>
                                    <button
                                        className={
                                            doubleBeds === null
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(null);
                                        }}
                                    >
                                        Any
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 1
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(1);
                                        }}
                                    >
                                        1
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 2
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(2);
                                        }}
                                    >
                                        2
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 3
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(3);
                                        }}
                                    >
                                        3
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 4
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(4);
                                        }}
                                    >
                                        4
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 5
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(5);
                                        }}
                                    >
                                        5
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 6
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(6);
                                        }}
                                    >
                                        6
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 7
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(7);
                                        }}
                                    >
                                        7
                                    </button>
                                    <button
                                        className={
                                            doubleBeds === 8
                                                ? `${styles.filter__btn} ${styles.filter__btn_active}`
                                                : `${styles.filter__btn}`
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setDoubleBeds(8);
                                        }}
                                    >
                                        8+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.filter__row}>
                            <h3 className={styles.filter__title}>Amenities</h3>
                            <div className={styles.filter__columns_grid}>
                                <div className={styles.filter__amenities}>
                                    {amenities &&
                                        amenities.map((item: IAmenities, index) => {
                                            return (
                                                <button
                                                    key={index}
                                                    onClick={(e) => handleToggleCheck(e, item.name)}
                                                    className={
                                                        item.value
                                                            ? `${styles.filter__amenities_item} ${styles.filter__amenities_item_active}`
                                                            : `${styles.filter__amenities_item}`
                                                    }
                                                >
                                                    {item.icon}
                                                    {item.name}
                                                </button>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                        <button className={styles.filter__submit}>Show results</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PopupFilter;
