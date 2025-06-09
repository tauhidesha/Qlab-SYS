"use client";

import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';
import { visualizeRepaint, VisualizeRepaintInput } from '@/ai/flows/visualize-repaint';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AiVisualizerPage() {
  const [vehiclePhotoDataUri, setVehiclePhotoDataUri] = useState<string | null>(null);
  const [vehiclePhotoPreview, setVehiclePhotoPreview] = useState<string | null>(null);
  const [repaintColor, setRepaintColor] = useState<string>('Metallic Red');
  const [transformedVehiclePhotoDataUri, setTransformedVehiclePhotoDataUri] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set preview
      const previewUrl = URL.createObjectURL(file);
      setVehiclePhotoPreview(previewUrl);

      // Read file as data URI for AI
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehiclePhotoDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
      setTransformedVehiclePhotoDataUri(null); // Clear previous result
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!vehiclePhotoDataUri || !repaintColor) {
      setError('Please upload a vehicle photo and specify a repaint color.');
      toast({
        title: "Missing Information",
        description: "Please upload a vehicle photo and specify a repaint color.",
        variant: "destructive",
      });
      return;
    }
    setError(null);
    setTransformedVehiclePhotoDataUri(null);

    startTransition(async () => {
      try {
        const input: VisualizeRepaintInput = {
          vehiclePhotoDataUri,
          repaintColor,
        };
        const result = await visualizeRepaint(input);
        setTransformedVehiclePhotoDataUri(result.transformedVehiclePhotoDataUri);
        toast({
          title: "Visualization Complete!",
          description: "The repainted vehicle image has been generated.",
        });
      } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
        setError(`Failed to visualize repaint: ${errorMessage}`);
        toast({
          title: "Visualization Failed",
          description: `Error: ${errorMessage}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="AI Vehicle Visualizer" />
      <main className="flex-1 overflow-y-auto p-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Virtual Repaint</CardTitle>
            <CardDescription>
              Upload a photo of a vehicle and choose a new color to see a virtual makeover.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vehicle-photo">Vehicle Photo</Label>
                  <Input id="vehicle-photo" type="file" accept="image/*" onChange={handleFileChange} required />
                  <p className="text-xs text-muted-foreground">Upload a clear photo of the vehicle.</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repaint-color">Repaint Color</Label>
                  <Input
                    id="repaint-color"
                    type="text"
                    value={repaintColor}
                    onChange={(e) => setRepaintColor(e.target.value)}
                    placeholder="e.g., Candy Apple Red, Matte Black"
                    required
                  />
                  <p className="text-xs text-muted-foreground">Describe the desired color.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 min-h-[200px]">
                <div className="border rounded-md p-4 flex flex-col items-center justify-center bg-muted/30">
                  <h3 className="text-lg font-medium mb-2">Original Vehicle</h3>
                  {vehiclePhotoPreview ? (
                    <Image src={vehiclePhotoPreview} alt="Original Vehicle" width={300} height={200} className="object-contain rounded-md max-h-[250px]" data-ai-hint="car motorcycle" />
                  ) : (
                    <div className="text-muted-foreground">Upload an image to see preview.</div>
                  )}
                </div>
                <div className="border rounded-md p-4 flex flex-col items-center justify-center bg-muted/30">
                  <h3 className="text-lg font-medium mb-2">Repainted Vehicle</h3>
                  {isPending && (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      <p className="mt-2 text-muted-foreground">Generating image...</p>
                    </div>
                  )}
                  {!isPending && transformedVehiclePhotoDataUri && (
                    <Image src={transformedVehiclePhotoDataUri} alt="Repainted Vehicle" width={300} height={200} className="object-contain rounded-md max-h-[250px]" data-ai-hint="painted car" />
                  )}
                  {!isPending && !transformedVehiclePhotoDataUri && !error && (
                     <div className="text-muted-foreground">Repainted image will appear here.</div>
                  )}
                   {!isPending && !transformedVehiclePhotoDataUri && error && (
                     <div className="text-destructive">Could not generate image.</div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isPending || !vehiclePhotoDataUri} className="w-full md:w-auto">
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Palette className="mr-2 h-4 w-4" />}
                Visualize Repaint
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
