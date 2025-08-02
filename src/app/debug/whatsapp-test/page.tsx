// src/app/debug/whatsapp-test/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function WhatsAppTestPage() {
  const [number, setNumber] = useState('62817941010');
  const [message, setMessage] = useState(`*Test Struk Manual dari Browser*

ID Transaksi: TEST001
Pelanggan: Debug Customer
Tanggal: ${new Date().toLocaleString('id-ID')}

Item:
- Test Service = Rp 100.000

Total: Rp 100.000

Terima kasih!`);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSend = async () => {
    setLoading(true);
    setResult(null);
    
    try {
      console.log('Sending to API:', { number, message });
      
      const response = await fetch('/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number, message }),
      });
      
      const data = await response.json();
      
      console.log('API Response:', { status: response.status, data });
      
      setResult({
        success: response.ok,
        status: response.status,
        data
      });
      
      if (response.ok) {
        toast({
          title: "Success!",
          description: `Message sent successfully to ${number}`,
        });
      } else {
        toast({
          title: "Error",
          description: data.error || 'Failed to send message',
          variant: "destructive",
        });
      }
      
    } catch (error) {
      console.error('Request error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setResult({
        success: false,
        error: errorMessage
      });
      
      toast({
        title: "Network Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">WhatsApp API Test</h1>
        <p className="text-gray-600">Debug manual WhatsApp sending from browser</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium mb-2">
            Phone Number (with country code)
          </label>
          <Input
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="62817941010"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            placeholder="Enter your message here..."
          />
        </div>
        
        <Button 
          onClick={handleSend} 
          disabled={loading || !number || !message}
          className="w-full"
        >
          {loading ? 'Sending...' : 'Send WhatsApp Message'}
        </Button>
      </div>
      
      {result && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Result:</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
