import { Calendar, MapPin } from "lucide-react";
import { CardContent } from "./ui/card";
import { Price, PriceValue } from "./shadcnblocks/price";

export default function CardProduct({product}: any) {
    return (
        <div className="group bg-card text-card-foreground shadow-sm flex flex-col h-96">
            <CardContent className="p-0 flex flex-col h-full">
                <div className="relative flex-[4] overflow-hidden">
                    <img 
                        src={product.image || "/placeholder.svg"} 
                        alt={product.title}
                        className="
                        h-full w-full 
                        object-cover 
                        transition-transform 
                        duration-300 
                        ease-out 
                        group-hover:scale-105
                        "
                    />
                </div>

                <div className="flex-[1] space-y-2 m-3 sm:m-4">
                    <div>
                        <p className="text-muted-foreground text-xs">{product.category.description}</p>
                        <h3 className="line-clamp-2 text-sm leading-tight font-medium">
                            {product.title}
                        </h3>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="space-y-2">
                            <div className="text-xs flex flex-col gap-1">
                                <p className="flex items-center gap-1 text-muted-foreground">
                                    <Calendar size={16} />
                                    <span>{product.date}</span>
                                </p>
                                <p className="flex items-center gap-1 text-muted-foreground">
                                    <MapPin size={16} />
                                    {product.place}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2 text-right">
                            <div className="text-sm">
                                <p className="font-semibold text-foreground text-xl">${product.price}</p>
                                {/*<p className="text-muted-foreground text-xs">240 unidades</p>*/}
                                <Price onSale={true}>
                                    <PriceValue price={100} currency="USD" />
                                </Price>
                            </div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </div>

    )
}