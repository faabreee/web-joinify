"use client";

import React, { useEffect, useState } from "react";
import { Search, Grid3X3, List, Heart, Star, ShoppingCart, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useProductStore } from "./store";
import CardProduct from "./card-product";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const categories = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "phones", label: "Phones", icon: "📱" },
  { id: "headsets", label: "Headsets", icon: "🎧" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "tv", label: "TV sets", icon: "📺" },
  { id: "sound", label: "Sound", icon: "🔊" },
  { id: "watches", label: "Watches", icon: "⌚" },
  { id: "others", label: "Others", icon: "💡" },
  { id: "internet", label: "Internet", icon: "🌐" }
];

const brands = [
  { id: "apple", label: "Apple" },
  { id: "samsung", label: "Samsung" },
  { id: "huawei", label: "Huawei" },
  { id: "microsoft", label: "Microsoft" },
  { id: "sony", label: "Sony" },
  { id: "bose", label: "Bose" },
  { id: "dell", label: "Dell" },
  { id: "lg", label: "LG" },
  { id: "jbl", label: "JBL" },
  { id: "philips", label: "Philips" },
  { id: "tp-link", label: "TP-Link" }
];

// Filter component for reuse in both desktop and mobile
function FilterSection() {
  const {
    priceRange,
    selectedBrands,
    selectedCategory, // Added selectedCategory
    setPriceRange,
    toggleBrand,
    setSelectedCategory // Added setSelectedCategory
  } = useProductStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Related categories</h3>
        <RadioGroup value={selectedCategory.toString()} onValueChange={setSelectedCategory}>
          <div className="space-y-2 text-sm">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <RadioGroupItem value={category.id} id={`category-${category.id}`} />
                <Label
                  htmlFor={`category-${category.id}`}
                  className="cursor-pointer text-sm font-normal">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h3 className="mb-3 font-semibold">Brands</h3>
        <div className="max-h-48 space-y-3 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <Label htmlFor={`brand-${brand.id}`} className="cursor-pointer text-sm font-normal">
                {brand.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="mb-3 font-semibold">Price</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={3000}
            step={10}
            className="w-full"
          />
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <Label htmlFor="price-from" className="text-muted-foreground text-xs">
                From
              </Label>
              <Input
                id="price-from"
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])
                }
                className="h-8"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="price-to" className="text-muted-foreground text-xs">
                To
              </Label>
              <Input
                id="price-to"
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 3000])
                }
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductList() {
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    applyFilters
  } = useProductStore();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply initial filters on mount
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div className="px-4 py-4 sm:py-6 w-full">
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Desktop Filters Sidebar 
        <aside className="hidden w-64 lg:block">
          <FilterSection />
        </aside>
        */}

        {/* Main Content */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="mb-4 flex flex-col gap-4 sm:mb-6">
            {/* Top row - Mobile filter button and product count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent lg:hidden">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 sm:w-96">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <ScrollArea className="h-full pr-4">
                      <div className="py-4">
                        <FilterSection />
                      </div>
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  {filteredProducts.length} products
                </div>
              </div>
            </div>

            {/* Bottom row - Search */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:w-64"
                />
              </div>


              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Filter Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Checkbox defaultChecked id="active" />
                        <Label className="cursor-pointer" htmlFor="active">
                          Active
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="pending" />
                        <Label className="cursor-pointer" htmlFor="pending">
                          Pending
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="archived" />
                        <Label className="cursor-pointer" htmlFor="archived">
                          Archived
                        </Label>
                      </div>
                    </div>
                    <Button className="w-full" size="sm">
                      Apply Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

            </div>
          </div>

          {filteredProducts.length !== 0 ? (
            <div className={`mx-auto grid gap-4 sm:gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}>
              {filteredProducts.map((product: any, index: number) => (
                  <CardProduct key={index} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">
                No products found matching your filters.
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Try adjusting your search criteria.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
