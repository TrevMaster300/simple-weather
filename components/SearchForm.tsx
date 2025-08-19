'use client';

import { useState } from 'react';
import type { Units } from '@/lib/types';

export default function SearchForm({
  onSearch,
  initialUnits = 'metric'
}: {
  onSearch: (city: string, units: Units) => void;
  initialUnits?: Units;
}) {
  const [city, setCity] = useState('');
  const [units, setUnits] = useState<Units>(initialUnits);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = city.trim();
    if (!normalized) return;
    onSearch(normalized, units);
  }

  return (
    <form onSubmit={submit} className="container" aria-label="Search weather by city">
      <label htmlFor="city" className="small">City</label>
      <input
        id="city"
        className="input mt-2"
        placeholder="e.g., Cape Town"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        aria-required="true"
      />

      <div className="row mt-3">
        <label htmlFor="units" className="small">Units</label>
        <select id="units" className="select" value={units} onChange={(e) => setUnits(e.target.value as Units)}>
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
        <button className="button" type="submit">Get Weather</button>
      </div>
      <div className="small mt-2">Tip: Try "Cape Town", "Johannesburg", or "London".</div>
    </form>
  );
}
