import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  GraduationCap,
  FileText,
  UserCheck,
  Presentation,
  Code,
  Palette,
  Lightbulb,
  Compass,
  Briefcase,
  Laptop,
  CheckCircle,
  FileCheck,
  Sparkles,
  Layers,
} from 'lucide-react';

export const ALLOWED_ICONS: Record<string, LucideIcon> = {
  BookOpen,
  GraduationCap,
  FileText,
  UserCheck,
  Presentation,
  Code,
  Palette,
  Lightbulb,
  Compass,
  Briefcase,
  Laptop,
  CheckCircle,
  FileCheck,
  Sparkles,
  Layers,
};

export const AVAILABLE_ICON_NAMES = Object.keys(ALLOWED_ICONS);

export const ServiceIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-6 h-6' }) => {
  const IconComponent = ALLOWED_ICONS[name] || BookOpen;
  return <IconComponent className={className} />;
};
