import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Check, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getIcon } from "@/lib/icons";
import type { Product } from "@shared/schema";

function clamp(min: string, pref: string, max: string) {
  return `clamp(${min}, ${pref}, ${max})`;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [cart, setCart] = useState<Set<string>>(new Set());

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleCart = (productId: string) => {
    const newCart = new Set(cart);
    if (newCart.has(productId)) {
      newCart.delete(productId);
    } else {
      newCart.add(productId);
    }
    setCart(newCart);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1
              className="font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary font-orbitron mb-6"
              style={{ fontSize: clamp("2.5rem", "8vw", "5rem") }}
            >
              Shop
            </h1>
            <p
              className="text-muted-foreground font-medium max-w-3xl mx-auto"
              style={{ fontSize: clamp("1rem", "2.5vw", "1.3rem") }}
            >
              Premium services and solutions to accelerate your business growth
            </p>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                  data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const inCart = cart.has(product.id);
              const Icon = getIcon(product.icon);
              return (
                <Card
                  key={product.id}
                  className="border-2 overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group"
                  data-testid={`card-product-${product.id}`}
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 via-muted/30 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    <Icon className="h-20 w-20 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {product.category}
                    </Badge>
                    <button
                      onClick={() => toggleCart(product.id)}
                      className={`absolute top-3 right-3 h-9 w-9 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover-elevate active-elevate-2 ${
                        inCart
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-background/80 backdrop-blur border-border hover:border-primary"
                      }`}
                      data-testid={`button-cart-${product.id}`}
                    >
                      {inCart ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <ShoppingCart className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {feature}
                          </span>
                        </div>
                      ))}
                      {product.features.length > 3 && (
                        <p className="text-xs text-muted-foreground/60 pl-4">
                          +{product.features.length - 3} more features
                        </p>
                      )}
                    </div>

                    <div className="flex items-end justify-between gap-4 pt-4 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Starting at</p>
                        <p className="text-2xl font-black text-primary font-orbitron">
                          ${parseFloat(product.price).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={inCart ? "secondary" : "default"}
                        onClick={() => toggleCart(product.id)}
                        data-testid={`button-add-${product.id}`}
                      >
                        {inCart ? "Added" : "Add"}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {cart.size > 0 && (
            <div className="fixed bottom-6 right-6 z-40">
              <Card className="p-4 border-2 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Cart Items</p>
                    <p className="text-2xl font-black text-primary font-orbitron">{cart.size}</p>
                  </div>
                  <Button size="lg" className="gap-2" data-testid="button-checkout">
                    <ShoppingCart className="h-5 w-5" />
                    Checkout
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary">
            Need Help Choosing?
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Our experts can help you select the perfect solution for your business needs
          </p>
          <Button size="lg" className="text-base" data-testid="button-consult-expert">
            Consult an Expert
          </Button>
        </div>
      </section>
    </div>
  );
}
