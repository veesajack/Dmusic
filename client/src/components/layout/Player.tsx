import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(100);

  return (
    <div className="h-20 bg-sidebar border-t border-border px-4 flex items-center">
      <div className="flex-1 flex items-center">
        <img
          src="https://placehold.co/56x56"
          alt="Cover Art"
          className="w-14 h-14 rounded"
        />
        <div className="ml-4">
          <h3 className="text 

-sm font-medium">Song Title</h3>
          <p className="text-xs text-muted-foreground">Artist Name</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
          
          <Button variant="ghost" size="icon">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full max-w-md mt-2">
          <span className="text-xs">0:00</span>
          <Slider
            value={[progress]}
            onValueChange={(values) => setProgress(values[0])}
            max={100}
            step={1}
            className="flex-1"
          />
          <span className="text-xs">3:45</span>
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center gap-2">
        <Volume2 className="h-5 w-5" />
        <Slider
          value={[volume]}
          onValueChange={(values) => setVolume(values[0])}
          max={100}
          step={1}
          className="w-28"
        />
      </div>
    </div>
  );
}
