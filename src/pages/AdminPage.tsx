import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { NumberInput } from "../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Yup from "yup";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { MdCurrencyRupee } from "react-icons/md";

const AdminPage: React.FC = () => {
  const { user, updatePrice } = useGlobalContext();
  const { charge_customers, id, amount } = user;

  const { category_6, category_7, category_8, category_9, category_10 } =
    amount;

  const formSchema = Yup.object({
    charge_customers: Yup.string().oneOf(["yes", "no"]).required(),
    customSongRequestAmount: Yup.number()
      .positive()
      .integer()
      .min(99, "Custom amount Amount must be above 99")
      .nullable(),
    regularSongRequestAmounts_1: Yup.number()
      .positive()
      .integer()
      .min(79, "Custom amount Amount must be above 79")
      .nullable(),
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
    formState: { errors, isValid },
  } = useForm<ValidationSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      charge_customers: charge_customers === true ? "yes" : "no",
      customSongRequestAmount: category_6,
      regularSongRequestAmounts_1: category_7,
      regularSongRequestAmounts_2: category_8,
      regularSongRequestAmounts_3: category_9,
      regularSongRequestAmounts_4: category_10,
    },
  });

  const chargeCustomersValue = watch("charge_customers");
  const customSongRequestAmount = watch("customSongRequestAmount");
  const regularSongRequestAmounts_1 = watch("regularSongRequestAmounts_1");
  const regularSongRequestAmounts_2 = watch("regularSongRequestAmounts_2");
  const regularSongRequestAmounts_3 = watch("regularSongRequestAmounts_3");
  const regularSongRequestAmounts_4 = watch("regularSongRequestAmounts_4");

  const data = [
    {
      name: "Custom",
      total: customSongRequestAmount,
    },
    {
      name: "Category1",
      total: regularSongRequestAmounts_1,
    },
    {
      name: "Category2",
      total: regularSongRequestAmounts_2,
    },
    {
      name: "Category3",
      total: regularSongRequestAmounts_3,
    },
    {
      name: "Category4",
      total: regularSongRequestAmounts_4,
    },
  ];

  const onSubmit: SubmitHandler<ValidationSchema> = (data: any) => {
    try {
      const {
        customSongRequestAmount,
        regularSongRequestAmounts_1,
        regularSongRequestAmounts_2,
        regularSongRequestAmounts_3,
        regularSongRequestAmounts_4,
      } = data;

      const amount = {
        category_6: customSongRequestAmount,
        category_7: regularSongRequestAmounts_1,
        category_8: regularSongRequestAmounts_2,
        category_9: regularSongRequestAmounts_3,
        category_10: regularSongRequestAmounts_4,
      };

      updatePrice(id, { amount });
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
                defaultValue={charge_customers === true ? "yes" : "no"}
              >
                <div className="RadioGroupContainer">
                  <RadioGroup.Item
                    className="RadioGroupItem"
                    value="yes"
                    onClick={() => setValue("charge_customers", "yes")}
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
                    value="no"
                    onClick={() => setValue("charge_customers", "no")}
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
            <NumberInput
              {...register("customSongRequestAmount")}
              disabled={chargeCustomersValue === "no"}
            />
          </div>
          <div className="admin-input-grid">
            <p>Regular song request amounts, from high to low-</p>
            <div className="amount-box-wrapper">
              <NumberInput
                {...register("regularSongRequestAmounts_1")}
                disabled={chargeCustomersValue === "no"}
              />
              <NumberInput
                {...register("regularSongRequestAmounts_2")}
                disabled={chargeCustomersValue === "no"}
              />
              <NumberInput
                {...register("regularSongRequestAmounts_3")}
                disabled={chargeCustomersValue === "no"}
              />
              <NumberInput
                {...register("regularSongRequestAmounts_4")}
                disabled={chargeCustomersValue === "no"}
              />
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
          {chargeCustomersValue === "yes" && (
            <div className="graph">
              <MdCurrencyRupee className="rs-icon" />
              <ResponsiveContainer
                className="graph-container"
                width={"100%"}
                height={400}
              >
                <BarChart data={data}>
                  <XAxis
                    fontSize={"14px"}
                    stroke="#ffffff"
                    dataKey={"name"}
                    tickLine={false}
                  />
                  <YAxis
                    fontSize={"12px"}
                    stroke="#ffffff"
                    tickLine={false}
                    tickFormatter={() => ""}
                  />
                  <Bar
                    dataKey="total"
                    barSize={30}
                    fill="#f0c3f1"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <button
            className="save-button"
            type="submit"
            disabled={chargeCustomersValue === "no" || !isValid}
          >
            Save
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminPage;
