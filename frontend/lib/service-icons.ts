import type { ServiceIconId } from "@/types/service";
import {
  Box,
  Globe,
  Megaphone,
  Palette,
  Smartphone,
  View,
  type LucideIcon,
} from "lucide-react";

export const serviceIcons: Record<ServiceIconId, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  megaphone: Megaphone,
  view: View,
  box: Box,
  palette: Palette,
};
