import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Loader2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const VideoDetection = () => {
  const [video, setVideo] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if video
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const videoUrl = event.target?.result as string;
      setVideo(videoUrl);
      setProcessing(true);
      setResult(null);

      try {
        // TODO: Integrate @huggingface/transformers for video detection
        // Process video frame by frame
        await new Promise((resolve) => setTimeout(resolve, 5000));
        setResult(videoUrl); // Placeholder - will be replaced with detection result
        
        toast({
          title: "Detection complete",
          description: "Video processed successfully",
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
            Video Detection
          </h2>
          <p className="text-muted-foreground mt-2">
            Upload a video to detect objects in each frame
          </p>
        </div>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
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
                Processing video...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload Video
              </>
            )}
          </Button>

          {video && !result && (
            <div className="rounded-lg overflow-hidden border border-border/50 bg-muted/20">
              <video
                src={video}
                controls
                className="w-full h-auto"
              />
            </div>
          )}

          {result && !processing && (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border-2 border-primary/30 bg-muted/20 shadow-glow">
                <div className="bg-primary/10 px-4 py-2 border-b border-primary/30">
                  <p className="text-sm font-semibold text-primary">Detection Result</p>
                </div>
                <video
                  src={result}
                  controls
                  className="w-full h-auto"
                />
              </div>
              <Button
                variant="outline"
                className="w-full border-primary/30 hover:bg-primary/10"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Result
              </Button>
            </div>
          )}

          {processing && (
            <div className="rounded-lg border border-border/50 bg-muted/20 p-8 text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
              <p className="text-sm text-muted-foreground">
                Processing video frames... This may take a few minutes
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
