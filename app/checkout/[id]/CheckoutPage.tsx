"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import ThankYouModal from "./ThankYouModal";

export default function CheckoutPage({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sizeFromQuery = searchParams.get("size") || "";
  const priceFromQuery = searchParams.get("price") || "";

  const [selectedProduct, setSelectedProduct] = useState(id);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [quantity, setQuantity] = useState(sizeFromQuery);

  useEffect(() => {
    setSelectedProduct(id);
    setQuantity(sizeFromQuery);
  }, [id, sizeFromQuery]);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section className="py-16 bg-gray-50" id="order">
      <div className="container max-w-2xl px-4 mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-800">
          Place Your Order
        </h2>
        <p className="text-center text-black font-semibold">
          Please fill out the form below to place your order.
        </p>
        <CheckoutForm
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          setShowThankYouModal={setShowThankYouModal}
          onGoBack={handleGoBack}
          initialQuantity={quantity}
        />
      </div>
      <ThankYouModal
        open={showThankYouModal}
        onOpenChange={setShowThankYouModal}
        onGoBack={handleGoBack}
      />
    </section>
  );
}
