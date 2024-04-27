import GamesList from "@/components/GamesList";
import TeamsList from "@/components/TeamsList";

export default function Home() {
  return (
    <div className="grid grid-cols-[65%_35%] justify-between items-start">
      <div className="px-2"><GamesList /></div>
      <div className="px-2"><TeamsList /></div>
    </div>
  );
}
