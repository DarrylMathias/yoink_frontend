import { useState } from 'react';
import { Logo } from '../components/Logo';
import { useUser, SignInButton, useAuth } from '@clerk/react';
import { z } from 'zod';
import { apiClient } from '../api/client';

interface SubmitUrlProps {
  onBack: () => void;
}

const urlSchema = z.string().url("Please enter a valid URL (e.g., https://example.com)");

export const SubmitUrl = ({ onBack }: SubmitUrlProps) => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isSignedIn) {
      setError('You must be logged in to submit a URL.');
      return;
    }

    const parsed = urlSchema.safeParse(url);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setError('');

    setStatus('loading');
    try {
      const token = await getToken();
      await apiClient.post('/url', { url }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus('success');
      setUrl('');
      setError('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setStatus('error');
      const statusCode = err.response?.status;
      const serverMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'An error occurred while submitting.';
      
      if (statusCode) {
        setError(`Error ${statusCode}: ${serverMessage}`);
      } else {
        setError(serverMessage);
      }
    }
  };

  return (
    <div className="p-3.5 px-2.5 font-sans min-h-screen bg-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-[#e5e5e5] pb-4 mb-1.5 sm:pr-[140px]">
        <div
          className="font-serif text-[32px] font-bold tracking-[-1px] cursor-pointer shrink-0 whitespace-nowrap"
          onClick={onBack}
        >
          <Logo isResultsPage={true} />
        </div>
        <div className="text-[13px] text-[#555] mt-1 sm:mt-0 font-bold">
          Submit URL
        </div>
      </div>

      <div className="bg-[#e5ecf9] border-t border-[#3366cc] py-1 px-2 text-[13px] flex justify-between mb-8">
        <div>
          <b>Custom Indexing Pipeline</b>
        </div>
      </div>

      <div className="max-w-[600px] ml-2 mt-4 text-[13px] text-black leading-relaxed">
        <h2 className="text-[#0000cc] text-[16px] mb-2 font-normal underline">Submit your own websites to the Yoink Index</h2>
        <p className="mb-4">
          This feature allows you to submit <b>any 5 public URLs</b> to our distributed crawling pipeline. 
        </p>
        <p className="mb-4">
          Once submitted, our backend Go workers will automatically fetch, parse, tokenize, and add your website's documents directly into the global Inverted Index, making it instantly searchable across the entire Yoink network.
        </p>

        <div className="mt-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor="url-input" className="font-bold">
              URL to index:
            </label>
            <input 
              id="url-input"
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="border border-[#d9d9d9] p-2 focus:outline-none focus:border-[#4d90fe]"
              disabled={status === 'loading' || !isSignedIn}
            />
            {error && <span className="text-[#cc0000] font-bold">{error}</span>}
            {!isSignedIn && !error && (
              <div className="flex flex-col gap-2 mt-1 mb-1 items-start bg-[#fff3cd] border border-[#ffeeba] text-[#856404] p-3 text-[13px]">
                <span>You must log in to submit a URL.</span>
                <SignInButton mode="modal">
                  <button type="button" className="bg-[#4d90fe] text-white border-none px-4 py-1.5 font-bold cursor-pointer hover:bg-[#357ae8]">
                    Log In / Sign Up
                  </button>
                </SignInButton>
              </div>
            )}
            
            <div className="mt-2 space-x-3">
              <button 
                type="submit"
                disabled={status === 'loading' || !isSignedIn}
                className="bg-[#f2f2f2] border border-[#f2f2f2] font-sans text-[13px] px-4 py-1.5 font-bold cursor-pointer hover:border-[#c6c6c6] hover:text-black hover:shadow-sm focus:border-[#4d90fe] disabled:opacity-50"
              >
                {status === 'loading' ? 'Submitting...' : 'Submit URL'}
              </button>
              
              <button 
                type="button"
                onClick={onBack}
                className="bg-transparent text-[#0000cc] hover:underline border-none cursor-pointer"
              >
                Return to Search
              </button>
            </div>
            {status === 'success' && (
              <span className="text-[#006621] font-bold mt-2">Successfully submitted to the indexing pipeline! You'll be receiving an email when your website is indexed.</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
