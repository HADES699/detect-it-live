import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WebcamDetection = () => {
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720 },
      });
      
      setStream(mediaStream);
      setIsActive(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      toast({
        title: "Webcam started",
        description: "Real-time detection is now active",
      });

      // TODO: Start real-time detection loop with @huggingface/transformers
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use this feature",
        variant: "destructive",
      });
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsActive(false);
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      toast({
        title: "Webcam stopped",
        description: "Detection has been stopped",
      });
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="p-6 bg-gradient-card border-border/50 shadow-card">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Live Webcam Detection
          </h2>
          <p className="text-muted-foreground mt-2">
            Detect objects in real-time using your webcam
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3">
            {!isActive ? (
              <Button
                onClick={startWebcam}
                className="flex-1 h-12 bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                <Video className="mr-2 h-5 w-5" />
                Start Webcam
              </Button>
            ) : (
              <Button
                onClick={stopWebcam}
                variant="destructive"
                className="flex-1 h-12"
              >
                <VideoOff className="mr-2 h-5 w-5" />
                Stop Webcam
              </Button>
            )}
          </div>

          <div className="relative rounded-lg overflow-hidden border-2 border-border/50 bg-muted/20 aspect-video">
            {isActive ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-destructive/90 px-3 py-1.5 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="text-xs font-semibold text-white">LIVE</span>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Click "Start Webcam" to begin detection
                  </p>
                </div>
              </div>
            )}
          </div>

          {isActive && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm text-center text-primary font-medium">
                🎯 Real-time object detection active
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
