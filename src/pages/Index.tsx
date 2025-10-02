import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageDetection } from "@/components/ImageDetection";
import { VideoDetection } from "@/components/VideoDetection";
import { WebcamDetection } from "@/components/WebcamDetection";
import { Scan } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
              <Scan className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Detect-It Live
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered object detection in your browser. Upload images, process videos, 
            or detect objects in real-time with your webcam.
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="image" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-14 bg-card border border-border/50 p-1">
              <TabsTrigger 
                value="image"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Image Detection
              </TabsTrigger>
              <TabsTrigger 
                value="video"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Video Detection
              </TabsTrigger>
              <TabsTrigger 
                value="webcam"
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
              >
                Live Webcam
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="image" className="mt-0">
                <ImageDetection />
              </TabsContent>

              <TabsContent value="video" className="mt-0">
                <VideoDetection />
              </TabsContent>

              <TabsContent value="webcam" className="mt-0">
                <WebcamDetection />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Info card */}
        <div className="max-w-4xl mx-auto mt-8 p-6 rounded-lg bg-card/50 border border-border/50 backdrop-blur-sm">
          <h3 className="font-semibold text-lg mb-2 text-primary">Powered by AI</h3>
          <p className="text-sm text-muted-foreground">
            This application uses WebGPU-accelerated object detection models running entirely in your browser. 
            Your images and videos are processed locally - nothing is uploaded to external servers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
