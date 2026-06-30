interface StatsBadgeProps {
  crawledPages: number;
}

export const StatsBadge = ({ crawledPages }: StatsBadgeProps) => {
  return (
    <div className="mt-10 px-9 py-4 font-sans text-base font-extrabold text-[#333] border-[3px] border-[#D62121] rounded-lg bg-white uppercase tracking-[1px] animate-stat-pulse inline-block text-center">
      Powering search through
      <span className="text-[#2159D6] text-[32px] block my-1 font-black">
        {crawledPages.toLocaleString()}
      </span>
      Indexed Web Pages
    </div>
  );
};
