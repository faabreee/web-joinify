'use client'

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Icon} from "@iconify/react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import { Client, IMessage } from '@stomp/stompjs';
import React, {useEffect, useRef, useState} from 'react';
import SockJS from "sockjs-client";
import {toast} from "sonner";
import ChatMenu from "@/sections/inbox/chat-menu";

export default function ChatPage() {
    const [messages, setMessages] = useState<String[]>([]);
    const [input, setInput] = useState<string>('');
    const [client, setClient] = useState<Client | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8081/ws'); // conexion con el servidor
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Conectado');

                console.log('Iniciando suscripcion al topico');
                const subscription = stompClient.subscribe('/topic/messages', (msg: IMessage) => {
                    console.log(msg);
                    const body: any = JSON.parse(msg.body);

                    console.log('msg --> ', body);

                    setMessages((prev) => [...prev, body.message]);

                    console.log('messages --> ', messages)
                });
                console.log('Suscripcion al topico realizada con éxito', subscription);

            },
            onStompError: (frame) => {
                console.error('STOMP error', frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
            console.log('Desconectado');
        };

    }, []);


    const sendMessage = () => {
        try {
            if (client?.connected) {
                if (!input?.trim()) return;


                const messageSend = {
                    message: input.trim(),
                    user_send: 'Fabrizio',
                }






                client.publish({
                    destination: '/app/chat',
                    body: JSON.stringify(messageSend),
                });
                setInput('');

                toast.error("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                })

            }
        } catch (error) {
            toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
            })
        }
    };

    const handleChangeInput = (event: any) => {
        setInput(event.target.value);
    };

    return (
        <>
            <div className="flex h-screen antialiased text-gray-800">
                <div className="flex flex-row h-full w-full overflow-x-hidden">
                    <ChatMenu />

                    <div className="flex flex-col py-8 pl-2 pr-2 w-96 bg-amber-200 flex-shrink-0">
                        <div className="flex flex-row items-center justify-start h-12 w-full">
                        <div className="ml-2 font-bold text-2xl">JoinifyChat</div>
                        </div>
                        <div className="flex flex-col items-center bg-muted mt-4 w-full py-6 px-4 rounded-lg">
                            <Avatar className="size-20">
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div className="text-sm font-semibold mt-2">Fabrizio Reyes</div>
                            <div className="text-xs text-gray-500">Developer</div>
                        </div>
                        <div className="flex flex-col mt-8 flex-1 overflow-hidden">
                            <div className="flex flex-row items-center justify-between text-xs">
                                <span className="font-bold">Conversations</span>
                                <span
                                    className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">4</span>
                            </div>
                            <div className="flex flex-col space-y-1 mt-4 overflow-y-auto flex-1">
                                {Array.from({length: 30}).map((_, i) => (
                                    <div key={i}
                                         className="flex items-start p-3 hover:bg-gray-100 cursor-pointer rounded-xl">
                                        <div className="relative mr-3">
                                            <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
                                                <Avatar className="size-12">
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between">
                                                <h3 className="text-sm font-semibold truncate">Fabrizio</h3>
                                                <span className="text-xs text-gray-500">2025/05/08</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-gray-500 truncate">Hey How are you today?</p>
                                                <div
                                                    className="bg-[#25D366] text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center">
                                                    0
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col flex-auto h-full p-6 bg-blue-800">
                        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-muted h-full p-4">
                            <div className="flex flex-col h-full overflow-x-auto mb-4">
                                <div className="flex flex-col h-full">
                                    <div className="grid grid-cols-12 bg-gray-600">
                                        <div className="col-start-1 col-end-8 px-3 rounded-lg bg-amber-200">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>Mensaje tercero</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-start-6 col-end-13 px-3 rounded-lg bg-blue-400">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-t-xl rounded-bl-xl text-background">
                                                    <div>Mensaje yo</div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="col-start-1 col-end-8 px-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>Hey How are you today?</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-start-1 col-end-8 px-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>Hey How are you today?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-1 col-end-8 px-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet, consectetur adipisicing
                                                        elit. Vel ipsa commodi illum saepe numquam maxime
                                                        asperiores voluptate sit, minima perspiciatis.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 px-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-xl text-background">
                                                    <div>I'm ok what about you?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 px-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-xl text-background">
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 px-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-xl text-background">
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 px-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-t-xl rounded-bl-xl text-background">
                                                    <div>I'm ok what about you?</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-1 col-end-8 px-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>Lorem ipsum dolor sit amet !</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-6 col-end-13 px-3 rounded-lg">
                                            <div className="flex items-center justify-start flex-row-reverse">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative mr-3 text-sm bg-foreground py-2 px-3 shadow rounded-xl text-background">
                                                    <div>
                                                        Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                                                    </div>
                                                    <div
                                                        className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                                                    >
                                                        Seen
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-start-1 col-end-8 px-3 rounded-lg">
                                            <div className="flex flex-row items-center">
                                                <Avatar>
                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn"/>
                                                    <AvatarFallback>SC</AvatarFallback>
                                                </Avatar>
                                                <div
                                                    className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                >
                                                    <div>
                                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                        Perspiciatis, in.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {messages.map((item, index) => (
                                            <div key={index}
                                                 className={`col-start-1 col-end-8 px-3 rounded-lg bg-cyan-900 ${index === messages.length - 1 && 'fade-in-slide-up'}`}>
                                                <div className="flex flex-row items-center">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png"
                                                                     alt="@shadcn"/>
                                                        <AvatarFallback>SC</AvatarFallback>
                                                    </Avatar>
                                                    <div
                                                        className="relative ml-3 text-sm bg-white py-2 px-3 shadow rounded-xl"
                                                    >
                                                        <div>{item}{index}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-3">
                                <div className="flex-grow">
                                    <div className="relative w-full">
                                        <Input
                                            type="text"
                                            placeholder="Write a message here..."
                                            className="pr-11 rounded-xl"
                                            value={input}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && e.shiftKey) return
                                                if (e.key === 'Enter') sendMessage();
                                            }}
                                            onChange={handleChangeInput}/>
                                        <button
                                            className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                                            <Icon icon="solar:smile-circle-outline" width="24" height="24"/>
                                        </button>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <Button size="icon" className="rounded-xl h-9 w-9" onClick={() => sendMessage()}>
                                        <Icon icon="bxs:send" width="24" height="24"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}