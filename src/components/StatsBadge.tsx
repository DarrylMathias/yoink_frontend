interface StatsBadgeProps {
  crawledPages: number;
}

export const StatsBadge = ({ crawledPages }: StatsBadgeProps) => {
  return (
    <div className="mt-10 font-sans text-center">
      <div className="bg-[#ffffcc] border border-[#ffcc00] py-2 px-6 inline-block">
        <span className="text-[14px] text-black">
          Even as a toy project by Darryl, yoink has successfully crawled and indexed <strong className="text-[#0000cc] text-[18px]">{crawledPages.toLocaleString()}</strong> web pages.
        </span>
      </div>
    </div>
  );
};
