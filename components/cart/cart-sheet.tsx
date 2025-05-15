"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { closeCart, removeFromCart, updateQuantity } from "@/lib/redux/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

export default function CartSheet() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const items = useAppSelector((state) => state.cart.items);
  
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (
    id: string,
    value: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    const itemKey = `${id}-${selectedSize}-${selectedColor}`;
    setQuantities({ ...quantities, [itemKey]: value });
  };

  const handleUpdateQuantity = (
    id: string,
    quantity: number,
    selectedSize?: string,
    selectedColor?: string
  ) => {
    dispatch(updateQuantity({ id, quantity, selectedSize, selectedColor }));
    const itemKey = `${id}-${selectedSize}-${selectedColor}`;
    setQuantities({ ...quantities, [itemKey]: 0 });
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(closeCart())}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="mb-4 text-muted-foreground">Your cart is empty</p>
              <Button
                onClick={() => dispatch(closeCart())}
                className="mt-2"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map((item) => {
                const itemKey = `${item.id}-${item.selectedSize}-${item.selectedColor}`;
                return (
                  <li key={itemKey} className="py-6 flex">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm font-medium">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        {item.selectedSize && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Size: {item.selectedSize}
                          </p>
                        )}
                        {item.selectedColor && (
                          <div className="mt-1 flex items-center">
                            <span className="text-xs text-muted-foreground mr-1">
                              Color:
                            </span>
                            <span
                              className="h-3 w-3 rounded-full border"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 flex items-end justify-between">
                        <div className="flex items-center">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none"
                              onClick={() =>
                                item.quantity > 1 &&
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity - 1,
                                    selectedSize: item.selectedSize,
                                    selectedColor: item.selectedColor,
                                  })
                                )
                              }
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={
                                quantities[itemKey] !== undefined
                                  ? quantities[itemKey]
                                  : item.quantity
                              }
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value),
                                  item.selectedSize,
                                  item.selectedColor
                                )
                              }
                              className="w-12 h-7 border-0 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                              min={1}
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-none"
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    id: item.id,
                                    quantity: item.quantity + 1,
                                    selectedSize: item.selectedSize,
                                    selectedColor: item.selectedColor,
                                  })
                                )
                              }
                            >
                              +
                            </Button>
                          </div>
                          {quantities[itemKey] !== undefined &&
                            quantities[itemKey] !== item.quantity && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs ml-2"
                                onClick={() =>
                                  handleUpdateQuantity(
                                    item.id,
                                    quantities[itemKey],
                                    item.selectedSize,
                                    item.selectedColor
                                  )
                                }
                              >
                                Update
                              </Button>
                            )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            dispatch(
                              removeFromCart({
                                id: item.id,
                                selectedSize: item.selectedSize,
                                selectedColor: item.selectedColor,
                              })
                            )
                          }
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <SheetFooter className="border-t pt-6">
            <div className="w-full space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">Subtotal</p>
                <p className="text-base font-medium">{formatPrice(subtotal)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  size="lg"
                  asChild
                  onClick={() => dispatch(closeCart())}
                >
                  <Link href="/checkout">Checkout</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  asChild
                  onClick={() => dispatch(closeCart())}
                >
                  <Link href="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}