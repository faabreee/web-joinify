import {Button} from "@/components/ui/button";
import {Icon} from "@iconify/react";
import React from "react";

export default function ChatMenu({}) {
    return (
        <div className="flex flex-col py-4 px-1 w-16 gap-2 bg-fuchsia-900 flex-shrink-0">
            <div className="flex items-center justify-center">
                <Button>
                    <Icon icon="solar:chat-line-bold"/>
                </Button>
            </div>
            <div className="flex items-center justify-center">
                <Button>
                    <Icon icon="solar:user-circle-bold"/>
                </Button>
            </div>
        </div>
    )
}