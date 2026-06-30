interface LogoProps {
  isResultsPage?: boolean;
}

export const Logo = ({ isResultsPage = false }: LogoProps) => {
  const spanClass = isResultsPage
    ? 'inline-block'
    : 'inline-block animate-chaotic-bounce';
  return (
    <>
      <span className={`${spanClass} text-[#2159D6] [animation-delay:0.0s]`}>Y</span>
      <span className={`${spanClass} text-[#D62121] [animation-delay:0.3s]`}>o</span>
      <span className={`${spanClass} text-[#F2C314] [animation-delay:0.1s]`}>i</span>
      <span className={`${spanClass} text-[#2159D6] [animation-delay:0.4s]`}>n</span>
      <span className={`${spanClass} text-[#008744] [animation-delay:0.2s]`}>k</span>
      <span className={`${spanClass} text-[#D62121] [animation-delay:0.5s]`}>!</span>
    </>
  );
};
