'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import GoogleIcon from "@/assets/logos/svg/google-icon";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import { toast } from "sonner"
import FormProvider from "@/components/custom/hook-form/form-provider";
import {useRouter} from "next/navigation";
import {useAuthRegister} from "@/hooks/auth/use-auth";

interface IRegisterUser {
    name: string;
    lastName: string;
    username: string;
    phone: string;
    age: number;
    email: string;
    password: string;
}

const initialValue: IRegisterUser = {
    name: "",
    lastName: "",
    username: "",
    phone: "",
    age: 0,
    email: "",
    password: "",
};

export default function RegisterPage() {

    const [open, setOpen] = useState<boolean>(false);
    const { push } = useRouter()

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        lastName: yup.string().required("El apellido es requerido"),
        username: yup.string().required("El username es requerido"),
        phone: yup.string().required("El número de teléfono es requerido"),
        age: yup
            .number()
            .typeError("Age must be a number")
            .required("Age is required")
            .min(1, "Minimum age is 1"),
        email: yup.string().email("Ingrese correctamten el email").required("El email es requerido"),
        password: yup.string().required("Contraseña es requerido"),
    });

    const methods = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
    })

    const { register, handleSubmit, formState} = methods;

    const {
        trigger,
        isMutating,
    } = useAuthRegister()

    const onSubmit = handleSubmit(async (data): Promise<void> => {
        try {
            const result = await trigger(data);

            if (result.code == "00") {
                toast(`User ${data.name} ${data.lastName} successfully registered`, {
                    description: new Date().toISOString(),
                })

                push("login")

            }

        } catch (error) {
            console.log(error);
            toast("There was an error during registration", {
                description: new Date().toISOString(),
            })
        }
    })

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div
                            className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        </div>
                        Joinify
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-lg">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2 text-left">
                                <h1 className="text-2xl font-bold">Create an Account</h1>
                                <p className="text-balance text-sm text-muted-foreground">
                                    Sign up to get started
                                </p>
                            </div>
                            <FormProvider methods={methods} onSubmit={onSubmit}>
                                <div className="grid gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" type="text" {...register("name")} />
                                        {formState.errors.name && (
                                            <p className="text-xs text-red-500">{formState.errors.name.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">Lastname</Label>
                                        <Input id="lastName" type="text" {...register("lastName")} />
                                        {formState.errors.lastName && (
                                            <p className="text-xs text-red-500">{formState.errors.lastName.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="username">Username</Label>
                                        <Input id="username" type="text" {...register("username")} />
                                        {formState.errors.username && (
                                            <p className="text-xs text-red-500">{formState.errors.username.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" type="text" {...register("phone")} />
                                        {formState.errors.phone && (
                                            <p className="text-xs text-red-500">{formState.errors.phone.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input id="age" type="text" {...register("age")} />
                                        {formState.errors.age && (
                                            <p className="text-xs text-red-500">{formState.errors.age.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" {...register("email")} />
                                        {formState.errors.email && (
                                            <p className="text-xs text-red-500">{formState.errors.email.message}</p>
                                        )}
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" type="password" {...register("password")} />
                                        {formState.errors.password && (
                                            <p className="text-xs text-red-500">{formState.errors.password.message}</p>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Login
                                    </Button>
                                    <div
                                        className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                          <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                            Or continue with
                                          </span>
                                    </div>
                                    <Button variant="outline" className="w-full">
                                        <GoogleIcon/>
                                        Register with Google
                                    </Button>
                                </div>
                            </FormProvider>
                            <div className="text-center text-sm">
                                Have an account?{" "}
                                <Link href={"login"} className="underline">
                                Sign in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="https://images.unsplash.com/photo-1619658535018-5a55d32e4628?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}