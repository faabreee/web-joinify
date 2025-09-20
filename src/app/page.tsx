"use client";

import { Button } from "@/components/ui/button";
import { UserContext } from "@/utils/UserProvider";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useContext } from "react";

type Props = {

}

export default function Index({}: Props) {
    const userContext = useContext(UserContext);
    const router = useRouter();

    if (!userContext) {
        return <p>No hay contexto disponible</p>;
    }

    const { user, setUser } = userContext;

    if (!user) router.push("/authentication/login");


    return (
        <>
            <h1>Holaaa {user?.fullName} </h1>

            <Button>Holaaa</Button>


            <Link href='/inbox/chat'>
                <Button>Chat</Button>
            </Link>

            <Link href='/authentication/login'>
                <Button>Login</Button>
            </Link>
            
        </>
    );
}