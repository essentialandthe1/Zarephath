"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface ThankYouModalProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onGoBack?: () => void;
}

export default function ThankYouModal({
  open,
  onOpenChange,
  onGoBack,
}: ThankYouModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto text-center">
        <DialogHeader className="flex flex-col items-center">
          <CheckCircle2 className="text-green-600 w-12 h-12 mx-auto mb-4" />
          <DialogTitle className="text-2xl">Thank You!</DialogTitle>
          <DialogDescription className="mt-2 text-gray-600">
            Your order has been received successfully. We will get in touch with
            you shortly.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button
            onClick={() => {
              onOpenChange(false);
              onGoBack?.();
            }}
            className="bg-green-700 hover:bg-green-800 text-white w-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
