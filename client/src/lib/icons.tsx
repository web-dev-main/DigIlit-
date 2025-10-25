import {
  Users,
  Bot,
  Briefcase,
  Rocket,
  Zap,
  BarChart3,
  Megaphone,
  Lightbulb,
  Target,
  UsersRound,
  Wallet,
  Scale,
  Shield,
  Database,
  GraduationCap,
  Palette,
  Leaf,
  Globe,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  Users,
  Bot,
  Briefcase,
  Rocket,
  Zap,
  BarChart3,
  Megaphone,
  Lightbulb,
  Target,
  UsersRound,
  Wallet,
  Scale,
  Shield,
  Database,
  GraduationCap,
  Palette,
  Leaf,
  Globe,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Briefcase;
}
