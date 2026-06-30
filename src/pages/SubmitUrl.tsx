import { Logo } from '../components/Logo';

interface SubmitUrlProps {
  onBack: () => void;
}

export const SubmitUrl = ({ onBack }: SubmitUrlProps) => {
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
          This feature is currently under active development. In <b>Yoink v2</b>, you will be able to submit any public URL to our distributed crawling pipeline. 
        </p>
        <p className="mb-4">
          Once submitted, our backend Go workers will automatically fetch, parse, tokenize, and add your website's documents directly into the global Inverted Index, making it instantly searchable across the entire Yoink network.
        </p>
        
        <div className="bg-[#ffffcc] border border-[#ffcc00] p-4 mt-6">
          <b className="text-[#333]">Status:</b> <span className="text-[#cc0000]">Coming in Version 2.0</span>
          <br /><br />
          <button 
            onClick={onBack}
            className="bg-[#e5e5e5] border border-[#999999] font-sans text-[13px] px-3 py-1 cursor-pointer text-black active:border-inset"
          >
            Return to Search
          </button>
        </div>
      </div>
    </div>
  );
};
