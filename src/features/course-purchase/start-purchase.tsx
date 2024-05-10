"use client";
import { useEffect } from "react";
import { coursePurchaseApi } from "./_api";
import { useSearchParams } from "next/navigation";
import { createCoursePurchaseSchema } from "./_domain/schemas";
import { useToast } from "@/shared/ui/use-toast";
import { useRouter } from "next/navigation";

export function StartPurchase() {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const createPaymentLink =
    coursePurchaseApi.coursePurchase.start.useMutation();

  useEffect(() => {
    const res = createCoursePurchaseSchema.safeParse(
      Object.fromEntries(searchParams.entries()),
    );

    if (res.success) {
      createPaymentLink.mutate(res.data, {
        onSuccess({ url }) {
          router.replace(url);
        },
        onError() {
          toast({
            title: "Something went wrong",
            description: "Error of forming a link to purchase",
            variant: "destructive",
          });
          router.replace(res.data.urlReturn);
        },
      });
    } else {
      toast({
        title: "Something went wrong",
        description: "Course purchase parameters error",
        variant: "destructive",
      });
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
