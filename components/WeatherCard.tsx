import { WeatherDTO } from '@/lib/types';

export default function WeatherCard({ data, units }: { data: WeatherDTO; units: 'metric' | 'imperial' }) {
  const unitLabel = units === 'metric' ? '°C' : '°F';

  return (
    <div className="container" aria-live="polite">
      <div className="row-wrap" style={{ justifyContent: 'space-between' }}>
        <div>
          <h2>{data.city}{data.country ? `, ${data.country}` : ''}</h2>
          <div className="small" style={{ textTransform: 'capitalize' }}>{data.description}</div>
        </div>
        {data.icon && <img src={data.icon} alt={data.description || 'Weather icon'} width={80} height={80} />}
      </div>

      <div className="mt-4">
        <div style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1 }}>
          {Math.round(data.temperature)}{unitLabel}
        </div>
        <div className="small mt-2">Condition: {data.condition}</div>
      </div>
    </div>
  );
}
