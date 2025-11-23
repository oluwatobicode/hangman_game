// Helper Component with Types
interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => (
  <div
    className="
    bg-white 
    text-[#2463FF] 
    rounded-xl 
    h-[80px] md:h-[100px] 
    flex flex-col items-center justify-center
    shadow-md
    transition-transform hover:scale-105
  "
  >
    <span className="text-2xl md:text-3xl font-black">{value}</span>
    <span className="text-xs md:text-sm font-medium uppercase tracking-wide opacity-80">
      {label}
    </span>
  </div>
);

export default StatCard;
