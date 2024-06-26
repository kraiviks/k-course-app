import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import { Input } from "@/shared/ui/input";
import { useUploadImage } from "../../../_vm/upsert-node/use-upload-image";

export function ImageField({
  src,
  onChange,
  onChangeSize,
  onError,
}: {
  src: string;
  onChange: (...event: any[]) => void;
  onChangeSize?: (sizes: { width: number; height: number }) => void;
  onError?: (type?: "big-size" | "unknown") => void;
}) {
  const { handleFileSelect, isPending } = useUploadImage({
    onSuccess: onChange,
    onImageSize: onChangeSize,
    onError,
  });

  return (
    <div className="space-y-2">
      <Input value={src} onChange={onChange} />
      <Button
        type="button"
        onClick={handleFileSelect}
        disabled={isPending}
        variant="link"
      >
        {isPending && (
          <Spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-label="Uploading an image"
          />
        )}
        Загрузить
      </Button>
    </div>
  );
}
