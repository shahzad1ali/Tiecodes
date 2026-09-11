import {
  Bot,
  Boxes,
  Brain,
  CarTaxiFront,
  ChartSpline,
  ClipboardList,
  Code2,
  Coins,
  Cpu,
  Fuel,
  Gauge,
  Globe,
  HardHat,
  Link2,
  MapPin,
  MapPinned,
  Megaphone,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingDown,
  Truck,
  UserRoundCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Bot,
  Boxes,
  Brain,
  CarTaxiFront,
  ChartSpline,
  ClipboardList,
  Code2,
  Coins,
  Cpu,
  Fuel,
  Gauge,
  Globe,
  HardHat,
  Link2,
  MapPin,
  MapPinned,
  Megaphone,
  Radar,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  TrendingDown,
  Truck,
  UserRoundCheck,
  Wrench,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Comp = icons[name] ?? Truck;
  return <Comp className={className} aria-hidden />;
}
