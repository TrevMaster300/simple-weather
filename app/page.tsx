'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import WeatherCard from '@/components/WeatherCard';
import ErrorAlert from '@/components/ErrorAlert';
import type { WeatherDTO, Units } from '@/lib/types';
import './globals.css';

export default function Page() {
  const [weather, setWeather] = useState<WeatherDTO | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchWeather(city: string, u: Units) {
    setLoading(true);
    setError(null);
    setWeather(null);
    setUnits(u);
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=${u}`, {
        method: 'GET'
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body?.message || 'Something went wrong.');
      } else {
        setWeather(body as WeatherDTO);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <header className="mt-4">
        <h1>Simple Weather App</h1>
        <p className="small">Built with Next.js (App Router). Enter a city to see the current conditions.</p>
      </header>

      <section className="mt-4">
        <SearchForm onSearch={fetchWeather} initialUnits={units} />
      </section>

      <section className="mt-4">
        {loading && (
          <div className="row">
            <div className="spinner" aria-hidden="true"></div>
            <div aria-live="polite">Fetching weather...</div>
          </div>
        )}

        {error && <ErrorAlert message={error} />}

        {weather && !loading && !error && <WeatherCard data={weather} units={units} />}
      </section>
    </main>
  );
}
