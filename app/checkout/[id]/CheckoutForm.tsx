"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

interface CheckoutFormProps {
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
  setShowThankYouModal: (value: boolean) => void;
  onGoBack: () => void;
  initialQuantity?: string;
}

export default function CheckoutForm({
  selectedProduct,
  setSelectedProduct,
  setShowThankYouModal,
  onGoBack,
  initialQuantity = "",
}: CheckoutFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);
  const [method, setMethod] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    if (!fullName.trim()) {
      toast.error("Full name is required", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Valid email is required", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (phone.trim().length < 10) {
      toast.error("Phone number must be at least 10 digits", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (!selectedProduct) {
      console.log("Selected Product is empty:", selectedProduct);
      toast.error("Please select a product", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (!quantity.trim()) {
      toast.error("Quantity is required", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (!method.trim()) {
      toast.error("Delivery method is required", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    if (!address.trim()) {
      toast.error("Address is required", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      console.log("Submitting Order:", {
        fullName,
        email,
        phone,
        selectedProduct,
        quantity,
        method,
        address,
        notes,
      });
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          selectedProduct,
          quantity,
          method,
          address,
          notes,
        }),
      });

      if (!res.ok) {
        console.error("API Response Error:", await res.text());
        throw new Error("Order submission failed");
      }

      console.log("Order Submitted Successfully");
      toast.success("Order submitted successfully!", {
        style: { backgroundColor: "#22c55e", color: "white" },
        icon: <CheckCircle2 className="text-white" />,
      });

      setFullName("");
      setEmail("");
      setPhone("");
      setSelectedProduct("");
      setQuantity("");
      setMethod("");
      setAddress("");
      setNotes("");
      setIsSubmitting(false);
      setShowThankYouModal(true);
    } catch (error) {
      console.error("Order Submission Error:", error);
      toast.error("Something went wrong while submitting your order", {
        style: { backgroundColor: "#ef4444", color: "white" },
        icon: <AlertTriangle className="text-white" />,
      });
    }
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) return; // use your existing validation

    const message = `Hello Zarephath Team! 👋

I'd like to place an order:

🛒 *Product*: ${selectedProduct}
📦 *Quantity/Size*: ${quantity}
🚚 *Delivery Method*: ${method}
📍 *Address*: ${address}
📞 *Phone*: ${phone}
📧 *Email*: ${email}
🧑 *Name*: ${fullName}
📝 *Notes*: ${notes || "None"}

Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/2348037594488?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <form
      onSubmit={handlePlaceOrder}
      className="space-y-6 bg-white p-6 rounded shadow"
    >
      <div>
        <Label htmlFor="fullName" className="pb-2">
          Full Name
        </Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div>
        <Label htmlFor="email" className="pb-2">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>

      <div>
        <Label htmlFor="phone" className="pb-2">
          Phone Number
        </Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Enter your phone number"
        />
      </div>

      <div>
        <Label htmlFor="product" className="pb-2">
          Product
        </Label>
        <Select
          value={selectedProduct}
          onValueChange={setSelectedProduct}
          required
        >
          <SelectTrigger id="product" className="w-full">
            <SelectValue placeholder="Select Product" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Unripe Plantain Flour">
              Unripe Plantain Flour
            </SelectItem>
            <SelectItem value="Red Palm Oil">Red Palm Oil</SelectItem>
            <SelectItem value="Roasted Peanuts">Roasted Peanuts</SelectItem>
            <SelectItem value="Yellow and White Unsour Garri">
              Yellow and White Unsour Garri
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="quantity" className="pb-2">
          Quantity / Size
        </Label>
        <Input
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="e.g. 2kg or 5 packs"
          required
        />
      </div>

      <div>
        <Label htmlFor="address" className="pb-2">
          Delivery/Shipping Address
        </Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Enter your full delivery/shipping address"
        />
      </div>

      <div>
        <Label htmlFor="method" className="pb-2">
          Preferred Delivery Method (Pickup / Delivery)
        </Label>
        <Select value={method} onValueChange={setMethod} required>
          <SelectTrigger id="method" className="w-full">
            <SelectValue placeholder="Select Delivery Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pickup">Pickup</SelectItem>
            <SelectItem value="delivery">Delivery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="notes" className="pb-2">
          Additional Notes (Optional)
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any special requests?"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white text-lg mt-2 flex justify-center items-center cursor-pointer"
      >
        {isSubmitting ? (
          <Loader2 className="animate-spin h-5 w-5 mx-auto" />
        ) : (
          "Place Your Order Now"
        )}
      </Button>
      <p className="text-sm text-black mt-2 font-bold">
        Or Order via{" "}
        <span
          className="text-[#408B69] cursor-pointer hover:underline"
          onClick={handleWhatsAppOrder}
        >
          WhatsApp
        </span>
      </p>

      <Button
        type="button"
        variant="outline"
        onClick={onGoBack}
        className="w-full border-green-700 text-green-700 hover:bg-green-100 mt-2 cursor-pointer"
      >
        Cancel & Go Back
      </Button>
    </form>
  );
}
