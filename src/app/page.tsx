import { HeatmapContainer } from "@/components/heatmap-container";

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="w-screen h-screen bg-background flex items-center justify-center text-center p-8">
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl font-bold font-headline">Welcome to Templarium Heatmap</h1>
          <p className="text-destructive text-lg p-3 bg-destructive/10 rounded-lg">
            Google Maps API Key is missing.
          </p>
          <div className="text-left bg-card p-6 rounded-lg border">
            <p className="mb-4">
              To use the interactive map, you need a Google Maps API key with the <strong className="text-primary">Maps JavaScript API</strong> and <strong className="text-primary">Places API</strong> enabled.
            </p>
            <p className="mb-2">
              1. Get a key from the <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>.
            </p>
            <p className="mb-4">
              2. Create a <code>.env.local</code> file in your project's root directory.
            </p>
            <p className="mb-2">3. Add your key to the file:</p>
            <pre className="bg-muted p-4 rounded-md text-left font-code text-sm">
              {`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"`}
            </pre>
            <p className="mt-4">
              After adding the key, you may need to restart the application for the changes to take effect.
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <main>
      <HeatmapContainer apiKey={apiKey} />
    </main>
  );
}
