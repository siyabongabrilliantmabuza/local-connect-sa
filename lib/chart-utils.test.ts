import {
  formatChartCurrency,
  formatChartValue,
  formatChartPercentage,
  getChartPeriods,
  formatChartDate,
  generateMockChartData,
} from './chart-utils';

describe('Chart Utilities', () => {
  describe('formatChartCurrency', () => {
    it('formats currency values correctly', () => {
      // Test thousands
      const result1 = formatChartCurrency(1234);
      expect(result1).toBe('R 1,2K');
      
      // Test millions
      const result2 = formatChartCurrency(1000000);
      expect(result2).toBe('R 1M');
      
      // Test regular numbers
      const result3 = formatChartCurrency(123.45);
      expect(result3).toBe('R 123');
    });
  });

  describe('formatChartValue', () => {
    it('formats numbers with K/M suffixes', () => {
      expect(formatChartValue(1234)).toBe('1.2K');
      expect(formatChartValue(1000000)).toBe('1.0M');
      expect(formatChartValue(123)).toBe('123');
    });
  });

  describe('formatChartPercentage', () => {
    it('formats percentage values', () => {
      expect(formatChartPercentage(12.345)).toBe('12.3%');
      expect(formatChartPercentage(100)).toBe('100.0%');
      expect(formatChartPercentage(0.5)).toBe('0.5%');
    });
  });

  describe('getChartPeriods', () => {
    it('generates correct number of periods', () => {
      expect(getChartPeriods('day', 5)).toHaveLength(5);
      expect(getChartPeriods('week', 4)).toHaveLength(4);
      expect(getChartPeriods('month', 6)).toHaveLength(6);
      expect(getChartPeriods('year', 3)).toHaveLength(3);
    });
  });

  describe('formatChartDate', () => {
    it('formats dates according to period', () => {
      const date = new Date('2025-10-16');
      expect(formatChartDate(date, 'day')).toBe('16 Oct');
      expect(formatChartDate(date, 'week')).toBe('Oct 16');
      expect(formatChartDate(date, 'month')).toBe('Oct 2025');
      expect(formatChartDate(date, 'year')).toBe('2025');
    });
  });

  describe('generateMockChartData', () => {
    it('generates data with correct structure', () => {
      const data = generateMockChartData('day', 5);
      expect(data).toHaveLength(5);
      expect(data[0]).toHaveProperty('date');
      expect(data[0]).toHaveProperty('value');
    });

    it('respects min/max bounds', () => {
      const data = generateMockChartData('day', 10, { min: 100, max: 200 });
      data.forEach(item => {
        expect(item.value).toBeGreaterThanOrEqual(100);
        expect(item.value).toBeLessThanOrEqual(200);
      });
    });

    it('generates upward trend', () => {
      const upTrendData = generateMockChartData('day', 20, { trend: 'up', min: 1000, max: 5000 });
      // Calculate average of first half vs second half
      const firstHalf = upTrendData.slice(0, 10).reduce((sum, d) => sum + d.value, 0) / 10;
      const secondHalf = upTrendData.slice(10).reduce((sum, d) => sum + d.value, 0) / 10;
      expect(secondHalf).toBeGreaterThan(firstHalf);
    });

    it('generates downward trend', () => {
      const downTrendData = generateMockChartData('day', 20, { trend: 'down', min: 1000, max: 5000 });
      // Calculate average of first half vs second half
      const firstHalf = downTrendData.slice(0, 10).reduce((sum, d) => sum + d.value, 0) / 10;
      const secondHalf = downTrendData.slice(10).reduce((sum, d) => sum + d.value, 0) / 10;
      expect(firstHalf).toBeGreaterThan(secondHalf);
    });
  });
});
