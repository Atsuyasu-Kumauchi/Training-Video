import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

// ---------------------
// FORM SCHEMAS (ZOD)
// ---------------------

const Step1Schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().optional().nullable(),
});

const Step2Schema = z.object({
    address: z.string().min(1, "Address required"),
    city: z.string().min(1, "City is required"),
});

const Step3Schema = z.object({
    username: z.string().min(3, "Username min 3 chars"),
    password: z.string().min(6, "Password min 6 chars"),
});

const FinalSchema = Step1Schema.and(Step2Schema).and(Step3Schema);

// Entire form type
type TFormValues = z.infer<typeof FinalSchema>;

// ---------------------
// UI COMPONENTS
// ---------------------

function Input({ label, register, error }: any) {
    return (
        <div className="mb-3">
            <label className="block mb-1 font-medium">{label}</label>
            <input className="border p-2 w-full" {...register} />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
    );
}

// ---------------------
// MAIN STEPPER COMPONENT
// ---------------------

export default function LoginStep() {
    const [step, setStep] = useState(1);

    const methods = useForm<TFormValues>({
        resolver: zodResolver(FinalSchema),
        mode: "onTouched",
        defaultValues: {
            name: "",
            email: "",
            address: "",
            city: "",
            username: "",
            password: "",
        },
    });

    const { handleSubmit, trigger, register, formState } = methods;

    const nextStep = async () => {
        const currentSchema =
            step === 1 ? Step1Schema :
                step === 2 ? Step2Schema :
                    Step3Schema;

        const fields = Object.keys(currentSchema.shape);
        const isValid = await trigger(fields as any);

        if (isValid) setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const onSubmit = (data: TFormValues) => {
        console.log("FINAL SUBMIT:", data);
        alert("Form submitted! Check console for output.");
    };

    return (
        <FormProvider {...methods}>
            <form className="max-w-xl mx-auto p-6 border rounded" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl font-bold mb-5">Stepper Form — Step {step}/4</h2>

                {/* -------- STEP 1 -------- */}
                {step === 1 && (
                    <>
                        <Input
                            label="Name"
                            register={register("name")}
                            error={formState.errors.name?.message}
                        />
                        <Input
                            label="Email"
                            register={register("email")}
                            error={formState.errors.email?.message}
                        />
                    </>
                )}

                {/* -------- STEP 2 -------- */}
                {step === 2 && (
                    <>
                        <Input
                            label="Address"
                            register={register("address")}
                            error={formState.errors.address?.message}
                        />
                        <Input
                            label="City"
                            register={register("city")}
                            error={formState.errors.city?.message}
                        />
                    </>
                )}

                {/* -------- STEP 3 -------- */}
                {step === 3 && (
                    <>
                        <Input
                            label="Username"
                            register={register("username")}
                            error={formState.errors.username?.message}
                        />
                        <Input
                            label="Password"
                            register={register("password")}
                            error={formState.errors.password?.message}
                        />
                    </>
                )}

                {/* -------- STEP 4: REVIEW -------- */}
                {step === 4 && (
                    <div className="space-y-3">
                        <p><b>Name:</b> {methods.getValues("name")}</p>
                        <p><b>Email:</b> {methods.getValues("email")}</p>
                        <p><b>Address:</b> {methods.getValues("address")}</p>
                        <p><b>City:</b> {methods.getValues("city")}</p>
                        <p><b>Username:</b> {methods.getValues("username")}</p>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="px-5 py-2 border rounded"
                        >
                            Back
                        </button>
                    )}

                    {step < 4 && (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-5 py-2 bg-blue-600 text-white rounded"
                        >
                            Next
                        </button>
                    )}

                    {step === 4 && (
                        <button type="submit" className="px-5 py-2 bg-green-600 text-white rounded">
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </FormProvider>
    );
}
