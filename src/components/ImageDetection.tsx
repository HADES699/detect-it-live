import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ImageDetection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if image
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imageUrl = event.target?.result as string;
      setImage(imageUrl);
      setProcessing(true);

      try {
        // TODO: Integrate @huggingface/transformers for object detection
        // For now, simulate processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setResult(imageUrl); // Placeholder - will be replaced with detection result
        
        toast({
          title: "Detection complete",
          description: "Objects detected successfully",
        });
      } catch (error) {
        toast({
          title: "Detection failed",
          description: "An error occurred during processing",
          variant: "destructive",
        });
      } finally {
        setProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Image Detection
          </h2>
          <p className="text-muted-foreground mt-2">
            Upload an image to detect objects with bounding boxes and labels
          </p>
        </div>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={processing}
            className="w-full h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload Image
              </>
            )}
          </Button>

          {image && (
            <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20">
              <img
                src={image}
                alt="Uploaded"
                className="w-full h-auto"
              />
            </div>
          )}

          {result && !processing && (
            <div className="rounded-lg overflow-hidden border-2 border-primary/30 bg-muted/20 shadow-glow">
              <div className="bg-primary/10 px-4 py-2 border-b border-primary/30">
                <p className="text-sm font-semibold text-primary">Detection Result</p>
              </div>
              <img
                src={result}
                alt="Detection result"
                className="w-full h-auto"
              />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
