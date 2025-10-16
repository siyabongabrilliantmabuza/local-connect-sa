import { format } from 'date-fns';

// Color palette with South African-inspired colors
export const chartColors = {
  primary: {
    base: '#7C3AED', // Purple
    light: '#DDD6FE',
    dark: '#5B21B6',
  },
  secondary: {
    base: '#10B981', // Green
    light: '#A7F3D0',
    dark: '#059669',
  },
  accent: {
    base: '#F59E0B', // Yellow/Gold
    light: '#FDE68A',
    dark: '#D97706',
  },
  neutral: {
    base: '#6B7280',
    light: '#F3F4F6',
    dark: '#374151',
  },
};

// Format currency values (ZAR)
export function formatChartCurrency(value: number): string {
  if (value >= 1000000) {
    return `R ${(value / 1000000).toFixed(0)}M`;
  }
  if (value >= 1000) {
    const thousands = (value / 1000).toFixed(1).replace('.', ',');
    return `R ${thousands}K`;
  }
  return `R ${Math.round(value)}`;
}

// Format numbers with K/M suffixes
export function formatChartValue(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
}

// Format percentage values
export function formatChartPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

// Generate gradient for area charts
export function getChartGradient(ctx: CanvasRenderingContext2D, height: number, color: string) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color}33`); // 20% opacity
  gradient.addColorStop(1, `${color}00`); // 0% opacity
  return gradient;
}

// Generate time periods for charts
export function getChartPeriods(period: 'day' | 'week' | 'month' | 'year' = 'day', count = 7) {
  const dates: Date[] = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const date = new Date(now);
    switch (period) {
      case 'day':
        date.setDate(date.getDate() - i);
        break;
      case 'week':
        date.setDate(date.getDate() - i * 7);
        break;
      case 'month':
        date.setMonth(date.getMonth() - i);
        break;
      case 'year':
        date.setFullYear(date.getFullYear() - i);
        break;
    }
    dates.push(date);
  }

  return dates;
}

// Format dates for chart labels
export function formatChartDate(date: Date, period: 'day' | 'week' | 'month' | 'year' = 'day'): string {
  switch (period) {
    case 'day':
      return format(date, 'd MMM');
    case 'week':
      return format(date, 'MMM d');
    case 'month':
      return format(date, 'MMM yyyy');
    case 'year':
      return format(date, 'yyyy');
    default:
      return format(date, 'd MMM yyyy');
  }
}

// Generate mock data for charts
export function generateMockChartData(
  period: 'day' | 'week' | 'month' | 'year' = 'day',
  count = 7,
  options: {
    min?: number;
    max?: number;
    trend?: 'up' | 'down' | 'stable';
  } = {}
) {
  const { min = 0, max = 1000, trend = 'stable' } = options;
  const dates = getChartPeriods(period, count);
  
  let prevValue = (min + max) / 2;
  const trendFactor = trend === 'up' ? 1.1 : trend === 'down' ? 0.9 : 1;

  return dates.map((date) => {
    // Add random variation while maintaining the trend
    const variation = (Math.random() - 0.5) * (max - min) * 0.2;
    prevValue = Math.min(max, Math.max(min, prevValue * trendFactor + variation));
    
    return {
      date: formatChartDate(date, period),
      value: Math.round(prevValue),
    };
  });
}

// Chart theme options
export const chartThemeOptions = {
  light: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    textColor: '#1e293b',
    gridColor: '#f1f5f9',
  },
  dark: {
    backgroundColor: '#0f172a',
    borderColor: '#334155',
    textColor: '#e2e8f0',
    gridColor: '#1e293b',
  },
};

// Common chart options
export const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      align: 'end' as const,
    },
    tooltip: {
      mode: 'index' as const,
      intersect: false,
      padding: 12,
      borderWidth: 1,
      titleFont: {
        size: 14,
        weight: '600',
      },
      bodyFont: {
        size: 13,
      },
      bodySpacing: 8,
      boxPadding: 6,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
  interaction: {
    mode: 'nearest' as const,
    axis: 'x' as const,
    intersect: false,
  },
};
