"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Index() {

    const logout = () => {
        sessionStorage.removeItem("access_token");
        document.cookie = "access_token=; path=/; max-age=0";
        window.location.href = "http://localhost:8081/logout";
    };

    return (
        <>
            <h1>Holaaa</h1>

            <Button>Holaaa</Button>


            <Link href='/inbox/chat'>
                <Button>Chat</Button>
            </Link>

            
            <Button onClick={logout}>Cerrar sesión</Button>

            <Link href='/authentication/login'>
                <Button>Login</Button>
            </Link>
            
        </>
    );
}