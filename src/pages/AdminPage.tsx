import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { yupResolver } from "@hookform/resolvers/yup";

const AdminPage: React.FC = () => {
  const { user } = useGlobalContext();

  const formSchema = Yup.object({
    charge_customers: Yup.string().oneOf(["Yes", "No"]).required(),
    customSongRequestAmount: Yup.number()
      .positive()
      .integer()
      .min(99, "Custom amount Amount must be above 99")
      .nullable(),
    regularSongRequestAmounts_1: Yup.number().nullable(),
    regularSongRequestAmounts_2: Yup.number()
      .positive()
      .integer()
      .min(59, "Second regular amount must be above 39")
      .nullable(),
    regularSongRequestAmounts_3: Yup.number()
      .positive()
      .integer()
      .min(39, "Third regular amount must be above 39")
      .nullable(),
    regularSongRequestAmounts_4: Yup.number()
      .positive()
      .integer()
      .min(19, "Fourth regular amount must be above 19")
      .nullable(),
  });

  type ValidationSchema = Yup.InferType<typeof formSchema>;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      charge_customers: "No",
      customSongRequestAmount: null,
      regularSongRequestAmounts_1: null,
      regularSongRequestAmounts_2: null,
      regularSongRequestAmounts_3: null,
      regularSongRequestAmounts_4: null,
    },
  });

  const chargeCustomersValue = watch("charge_customers");

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <main>
      <section className="container">
        <h1>{`${user?.name}, ${user?.location} on Dhun Jam`}</h1>
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="admin-input-grid">
            <p>Do you want to charge your customers for requesting songs?</p>
            <div className="radio-input-wrapper">
              <RadioGroup.Root
                className="RadioGroupRoot"
                aria-label="Charge Customer"
              >
                <div className="RadioGroupContainer">
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="Yes"
                    onClick={() => setValue("charge_customers", "Yes")}
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="Yes">
                    Yes
                  </label>
                  <p>
                    {errors.charge_customers && errors.charge_customers.message}
                  </p>
                </div>
                <div className="RadioGroupContainer">
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="No"
                    onClick={() => setValue("charge_customers", "No")}
                  >
                    <RadioGroup.Indicator className="RadioGroupIndicator" />
                  </RadioGroup.Item>
                  <label className="Label" htmlFor="No">
                    No
                  </label>
                </div>
              </RadioGroup.Root>
            </div>
          </div>

          <div className="admin-input-grid">
            <p>Custom song request amount-</p>
            <div className="number-input-container">
              <input
                className="request-amount-input"
                {...register("customSongRequestAmount")}
                disabled={chargeCustomersValue === "No"}
              />
              <p className="error-message">{}</p>
            </div>
          </div>
          <div className="admin-input-grid">
            <p>Regular song request amounts, from high to low-</p>
            <div className="amount-box-wrapper">
              <div className="number-input-container">
                <input
                  className="request-amount-input"
                  {...register("regularSongRequestAmounts_1")}
                  disabled={chargeCustomersValue === "No"}
                />
              </div>
              <div className="number-input-container">
                <input
                  className="request-amount-input"
                  {...register("regularSongRequestAmounts_2")}
                  disabled={chargeCustomersValue === "No"}
                />
              </div>
              <div className="number-input-container">
                <input
                  className="request-amount-input"
                  {...register("regularSongRequestAmounts_3")}
                  disabled={chargeCustomersValue === "No"}
                />
              </div>
              <div className="number-input-container">
                <input
                  className="request-amount-input"
                  {...register("regularSongRequestAmounts_4")}
                  disabled={chargeCustomersValue === "No"}
                />
              </div>
            </div>
          </div>
          <p className="error-message">
            {(errors.customSongRequestAmount &&
              errors.customSongRequestAmount.message) ||
              (errors.regularSongRequestAmounts_1 &&
                errors.regularSongRequestAmounts_1.message) ||
              (errors.regularSongRequestAmounts_2 &&
                errors.regularSongRequestAmounts_2.message) ||
              (errors.regularSongRequestAmounts_3 &&
                errors.regularSongRequestAmounts_3.message) ||
              (errors.regularSongRequestAmounts_4 &&
                errors.regularSongRequestAmounts_4.message)}
          </p>
          <button className="save-button" type="submit">
            Save Here
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminPage;
