import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <Spinner className="h-14 w-14"/>
        </div>
    )
}