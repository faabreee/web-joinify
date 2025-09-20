import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {

}

export default function Index({

}: Props) {
    return (
        <>
            <h1>Holaaa</h1>

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